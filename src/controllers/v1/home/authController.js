const controller = require("controllers");
const User = require("models/User");
const PasswordReset = require("models/PasswordReset");
const jwt = require("jsonwebtoken");
const mail = require("helpers/mail");
const uniqid = require("uniqid");

class authController extends controller {
  async register(req, res) {
    try {
      if (!(await this.validationData(req, res))) return;
      const { name, email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return this.failed(res, req, "User already exists!", 403);
      }
      const newUser = new User({
        name,
        email,
        password,
      });
      await newUser.save();
      return res.json({
        message: "done",
      });
    } catch (err) {
      this.failed(res, req, err.messages);
    }
  }

  async login(req, res) {
    try {
      if (!(await this.validationData(req, res))) return;
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !user.comparePassword(password)) {
        return this.failed(
          res,
          req,
          "The information entered is incorrect.",
          403
        );
      }
      //Create Token
      const token = jwt.sign({ userId: user._id }, config.jwt.secret_key, {
        expiresIn: 60 * 60 * 24 * 30 * 3,
      });
      return res.json({
        user,
        token,
      });
    } catch (err) {
      this.failed(res, req, err.messages);
    }
  }

  async sendResetLink(req, res, next) {
    try {
      if (!(await this.validationData(req, res))) return;
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return this.failed(res, req, "the user is not exist", 404);
      }

      const newPasswordReset = new PasswordReset({
        email: req.body.email,
        token: uniqid(),
      });

      await newPasswordReset.save();

      let mailOptions = {
        from: `"nodejs-api" <${config.url_frontend}>`, // sender address
        to: `${newPasswordReset.email}`, // list of receivers
        subject: "Reset Password", // Subject line
        html: `
                  <h2>Reset Password</h2>
                  <p>Please Click on link for reset password :</p>
                  <a href="${config.url_frontend}/password-reset/${newPasswordReset.token}">Reset</a>
              `, // html body
      };

      mail.sendMail(mailOptions, (err, info) => {
        if (err) return this.failed(res, req, err.message);

        return res.json({
          message: "sent",
        });
      });
      return;
    } catch (err) {
      this.failed(res, req, err.messages);
    }
  }

  async resetPassword(req, res) {
    try {
      if (!(await this.validationData(req, res))) return;
      let field = await PasswordReset.findOne({
        $and: [{ email: req.body.email }, { token: req.body.token }],
      });
      if (!field) {
        return this.failed(
          res,
          req,
          "The information entered is incorrect",
          403
        );
      }

      if (field.use) {
        return this.failed(
          res,
          req,
          "This link has already been used to recover the password",
          403
        );
      }

      let user = await User.findOneAndUpdate(
        { email: field.email },
        { $set: { password: req.body.password } }
      );
      if (!user) {
        return this.failed(res, req, "Update failed", 403);
      }

      await field.update({ use: true });
      return res.json({
        message: "updated",
      });
    } catch (err) {
      this.failed(res, req, err.messages);
    }
  }
}

module.exports = new authController();

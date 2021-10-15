// const controller = require('src/controllers');
const controller = require("src/controllers");
const User = require("src/models/User");
const PasswordReset = require("src/models/PasswordReset");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const mail = require("src/helpers/mail");
const uniqid = require("uniqid");

class authController extends controller {
  async register(req, res, next) {
    try {
      if (!(await this.validationData(req, res))) return;
      passport.authenticate(
        "local.register",
        { session: false },
        (err, user, info) => {
          if (err) return this.failed(res, err.message);
          if (user)
            return res.json({
              message: "Done !",
            });
          return this.failed(res, [info.message || "server error"], 403);
        }
      )(req, res, next);
    } catch (err) {
      this.failed(res, err.messages);
    }
  }

  async login(req, res, next) {
    try {
      if (!(await this.validationData(req, res))) return;
      passport.authenticate(
        "local.login",
        { session: false },
        (err, user, info) => {
          if (err) return this.failed(res, err.message);
          if (!user) return this.failed(res, "user is invalid!", 403);

          req.login(user, { session: false }, (err) => {
            if (err) return this.failed(res, err.message);

            //create token
            const token = jwt.sign({ id: user.id }, config.jwt.secret_key, {
              expiresIn: 60 * 60 * 12,
            });

            return res.json({
              user,
              token,
            });
          });
        }
      )(req, res);
    } catch (err) {
      this.failed(res, err.messages);
    }
  }

  async sendResetLink(req, res, next) {
    if (!(await this.validationData(req, res))) return;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return this.failed(res, "the user is not exist", 404);
    }

    const newPasswordReset = new PasswordReset({
      email: req.body.email,
      token: uniqid(),
    });

    await newPasswordReset.save();

    let mailOptions = {
      from: '"nodejs-api" <test@test.com>', // sender address
      to: `${newPasswordReset.email}`, // list of receivers
      subject: "Reset Password", // Subject line
      html: `
                <h2>Reset Password</h2>
                <p>Please Click on link for reset password :</p>
                <a href="http://test.com/password-reset/${newPasswordReset.token}">Reset</a>
            `, // html body
    };

    mail.sendMail(mailOptions, (err, info) => {
      if (err) return this.failed(res, err.message);

      return res.json({
        message: "sent",
      });
    });
    return;
  }

  async resetPassword(req, res) {
    if (!(await this.validationData(req, res))) return;
    let field = await PasswordReset.findOne({
      $and: [{ email: req.body.email }, { token: req.body.token }],
    });
    if (!field) {
      return this.failed(res, "The information entered is incorrect", 403);
    }

    if (field.use) {
      return this.failed(
        res,
        "This link has already been used to recover the password",
        403
      );
    }

    let user = await User.findOneAndUpdate(
      { email: field.email },
      { $set: { password: req.body.password } }
    );
    if (!user) {
      return this.failed(res, "Update failed", 403);
    }

    await field.update({ use: true });
    return res.json({
      message: "updated",
    });
  }
}

module.exports = new authController();

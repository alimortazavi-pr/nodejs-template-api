const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("src/models/User");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  "local.register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) return done(err);
        if (user) return done(null, false, { message: "User is already!" });

        const newUser = new User({
          name: req.body.name,
          email,
          password,
        });

        newUser.save((err) => {
          if (err) return done(err, false, { message: "please try again." });
          done(null, newUser, { message: "done!" });
        });
      });
    }
  )
);

passport.use(
  "local.login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) return done(err);

        if (!user || !user.comparePassword(password)) {
          return done(null, false, {
            message: "The information entered is incorrect.",
          });
        }

        done(null, user);
      });
    }
  )
);

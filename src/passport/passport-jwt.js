const passport = require("passport");
const passportJwt = require("passport-jwt");
const User = require("src/models/User");

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromHeader("token"),
      ]),
      secretOrKey: config.jwt.secret_key,
    },
    async (jwtPayload, done) => {
      try {
        let user = await User.findById(jwtPayload.id);

        if (user) return done(null, user);
        else
          done(null, false, {
            message: "You do not have permission to access.",
          });
      } catch (err) {
        done(null, false, { message: err.message });
      }
    }
  )
);

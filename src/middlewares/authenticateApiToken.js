const middleware = require("src/middlewares");
const passport = require("passport");

class authenticateApiToken extends middleware {
  Authenticated(req, res, next) {
    if (req.headers.authorization) {
      let authorization = req.headers.authorization.split(" ");
      req.headers.authorization = authorization[1];
    }
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (!user || err)
        return res.status(401).json({
          message: info.message || "You do not have permission to access.",
        });

      req.user = user;

      next();
    })(req, res, next);
  }

  NotAuthenticated(req, res, next) {
    if (req.headers.authorization) {
      let authorization = req.headers.authorization.split(" ");
      req.headers.authorization = authorization[1];
    }
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (user || err)
        return res.json({
          message: "You do not have permission to access.",
        });
      next();
    })(req, res, next);
  }

  CheckAuthenticated(req, res, next) {
    if (req.headers.authorization) {
      let authorization = req.headers.authorization.split(" ");
      req.headers.authorization = authorization[1];
    }
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (user || err) req.user = user;

      next();
    })(req, res, next);
  }
}

module.exports = new authenticateApiToken();

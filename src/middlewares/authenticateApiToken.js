const middleware = require("src/middlewares");
const jwt = require("jsonwebtoken");
const User = require("src/models/User");

class authenticateApiToken extends middleware {
  async Authenticated(req, res, next) {
    try {
      let token;
      if (req.headers.authorization) {
        let authorization = req.headers.authorization.split(" ");
        token = authorization[1];
      }
      if (!token) {
        return this.failed(res, "You do not have permission to access", 401);
      }
      let decodedToken = jwt.verify(
        req.headers.authorization,
        config.jwt.secret_key
      );
      if (!decodedToken) {
        return this.failed(res, "You do not have permission to access", 401);
      }
      const user = await User.findById(decodedToken.userId);
      if (!user) {
        return this.failed(res, "User is not exist", 401);
      }
      req.user = user;

      next();
    } catch (err) {
      this.failed(res, err.messages);
    }
  }

  async CheckAuthenticated(req, res, next) {
    try {
      if (req.headers.authorization) {
        let authorization = req.headers.authorization.split(" ");
        req.headers.authorization = authorization[1];
      }
      let decodedToken = jwt.verify(
        req.headers.authorization,
        config.jwt.secret_key
      );
      if (decodedToken) {
        const user = await User.findById(decodedToken.userId);
        if (user) {
          req.user = user;
        }
      }

      next();
    } catch (err) {
      this.failed(res, err.messages);
    }
  }
}

module.exports = new authenticateApiToken();

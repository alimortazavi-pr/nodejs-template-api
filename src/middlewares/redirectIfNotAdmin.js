const middleware = require("src/middlewares");

class redirectIfNotAdmin extends middleware {
  handler(req, res, next) {
    try {
      if (req.user) {
        if (req.user.admin) {
          return next();
        } else {
          return res.status(401).json({
            message: "You do not have permission to access.",
          });
        }
      }
      return res.status(401).json({
        message: "You do not have permission to access.",
      });
    } catch (err) {
      this.failed(res, err.messages);
    }
  }
}

module.exports = new redirectIfNotAdmin();

const middleware = require("src/middlewares");

class redirectIfNotAdmin extends middleware {
  handler(req, res, next) {
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
  }
}

module.exports = new redirectIfNotAdmin();

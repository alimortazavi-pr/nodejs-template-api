const middleware = require("src/middlewares");

class addImageToBody extends middleware {
  handler(req, res, next) {
    if (req.file || req.files.length !== 0) {
      req.body.image = "exist";
      req.body.images = "exist";
    } else {
      req.body.image = "";
      req.body.images = "";
    }
    next();
  }
}

module.exports = new addImageToBody();

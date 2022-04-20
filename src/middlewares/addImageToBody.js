const middleware = require("middlewares");

class addImageToBody extends middleware {
  handler(req, res, next) {
    try {
      if (req.file || req.files.length !== 0) {
        req.body.image = "exist";
        req.body.images = "exist";
      } else {
        req.body.image = "";
        req.body.images = "";
      }
      next();
    } catch (err) {
      this.failed(res, err.messages);
    }
  }
}

module.exports = new addImageToBody();

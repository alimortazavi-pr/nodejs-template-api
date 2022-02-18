const controller = require("src/controllers");
const Image = require("src/models/Image");
const fs = require("fs");

class imageController extends controller {
  async destroy(req, res) {
    try {
      if (!this.isValidMongoId(req, res, req.params.image)) return;
      let image = await Image.findOne({
        _id: req.params.image,
        user: req.user._id,
      });
      if (!image) {
        return this.failed(res, req, "image not found", 404);
      }

      if (fs.existsSync(`public/${image.path}`)) {
        fs.unlinkSync(`public/${image.path}`);
        await Image.deleteOne({ _id: req.params.image });
      } else {
        await Image.deleteOne({ _id: req.params.image });
      }

      return res.json({
        message: "Deleted",
      });
    } catch (err) {
      this.failed(res, req, err.message);
    }
  }
}

module.exports = new imageController();

const controller = require("src/controllers");

class adminController extends controller {
  index(req, res) {
    try {
      return res.json("Admin");
    } catch (err) {
      this.failed(res, err.message);
    }
  }
}

module.exports = new adminController();

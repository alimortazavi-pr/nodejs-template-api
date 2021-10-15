const controller = require("src/controllers");

class homeConroller extends controller {
  index(req, res) {
    try {
      return res.json("Home");
    } catch (err) {
      this.failed(res, err.message);
    }
  }

  checkLogin(req, res) {
    try {
      return res.json({
        user: req.user,
      });
    } catch (err) {
      this.failed(res, err.message);
    }
  }
}

module.exports = new homeConroller();

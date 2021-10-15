const router = require("express").Router();

//Controllers
const adminController = require("src/controllers/v1/admin/adminController");

router.get("/", adminController.index);

module.exports = router;

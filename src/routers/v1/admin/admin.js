const router = require("express").Router();

//Controllers
const adminController = require("controllers/v1/admin/adminController");

router.get("/", adminController.index);

module.exports = router;

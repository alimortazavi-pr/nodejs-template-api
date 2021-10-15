const router = require("express").Router();

//Controllers
const homeController = require("src/controllers/v1/home/homeController");

//middlewares
const authenticateApiToken = require("src/middlewares/authenticateApiToken");

router.get("/", homeController.index);
router.get(
  "/check-login",
  authenticateApiToken.Authenticated,
  homeController.checkLogin
);

module.exports = router;

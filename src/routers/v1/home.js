const router = require("express").Router();

//Controllers
const homeController = require("src/controllers/v1/home/homeController");
const imageController = require("src/controllers/v1/home/imageController");

//middlewares
const authenticateApiToken = require("src/middlewares/authenticateApiToken");

router.get("/", homeController.index);
router.get(
  "/check-login",
  authenticateApiToken.Authenticated,
  homeController.checkLogin
);

//Images
router.delete(
  "/images/:image",
  authenticateApiToken.Authenticated,
  imageController.destroy
);

module.exports = router;

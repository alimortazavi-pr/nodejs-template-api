const router = require("express").Router();

//middlewares
const authenticateApiToken = require("middlewares/authenticateApiToken");
const redirectIfNotAdmin = require("middlewares/redirectIfNotAdmin");

const adminRouter = require("routers/v1/admin");
router.use(
  "/admin",
  authenticateApiToken.Authenticated,
  redirectIfNotAdmin.handler,
  adminRouter
);

const homeRouter = require("routers/v1/home");
router.use("/", homeRouter);

router.all("*", (req, res) => {
  return res.status(404).json({
    message: "PAGE NOT FOUND!",
  });
});

module.exports = router;

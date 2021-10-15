const router = require("express").Router();

//middlewares
const authenticateApiToken = require("src/middlewares/authenticateApiToken");
const redirectIfNotAdmin = require("src/middlewares/redirectIfNotAdmin");

const authRouter = require("src/routers/v1/auth");
router.use("/auth", authenticateApiToken.NotAuthenticated, authRouter);

const adminRouter = require("src/routers/v1/admin");
router.use(
  "/admin",
  authenticateApiToken.Authenticated,
  redirectIfNotAdmin.handler,
  adminRouter
);

const homeRouter = require("src/routers/v1/home");
router.use("/", homeRouter);

router.all("*", (req, res) => {
  return res.status(404).json({
    message: "PAGE NOT FOUND!",
  });
});

module.exports = router;

const router = require("express").Router();

//middlewares
const authenticateApiToken = require("src/middlewares/authenticateApiToken");
const redirectIfNotAdmin = require("src/middlewares/redirectIfNotAdmin");

const authRouter = require("src/routers/v1/home/auth");
router.use("/auth", authRouter);

const homeRouter = require("src/routers/v1/home/home");
router.use("/", homeRouter);

module.exports = router;

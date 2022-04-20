const router = require("express").Router();

//middlewares
const authenticateApiToken = require("middlewares/authenticateApiToken");
const redirectIfNotAdmin = require("middlewares/redirectIfNotAdmin");

const authRouter = require("routers/v1/home/auth");
router.use("/auth", authRouter);

const homeRouter = require("routers/v1/home/home");
router.use("/", homeRouter);

module.exports = router;

const router = require("express").Router();

//middlewares
const authenticateApiToken = require("src/middlewares/authenticateApiToken");
const redirectIfNotAdmin = require("src/middlewares/redirectIfNotAdmin");

const adminRouter = require("src/routers/v1/admin/admin");
router.use("/", adminRouter);

module.exports = router;

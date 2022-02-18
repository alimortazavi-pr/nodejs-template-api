const router = require("express").Router();

//middlewares

const adminRouter = require("src/routers/v1/admin/admin");
router.use("/", adminRouter);

module.exports = router;

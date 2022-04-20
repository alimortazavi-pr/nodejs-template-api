const express = require("express");
const router = express.Router();

//controllers
const authController = require("controllers/v1/home/authController");

//validators
const authValidator = require("validators/authValidator");

router.post("/register", authValidator.register(), authController.register);
router.post("/login", authValidator.login(), authController.login);

//Reset Password
router.post(
  "/password/email",
  authValidator.forgetPassword(),
  authController.sendResetLink
);
router.post(
  "/password/reset",
  authValidator.resetPassword(),
  authController.resetPassword
);

module.exports = router;

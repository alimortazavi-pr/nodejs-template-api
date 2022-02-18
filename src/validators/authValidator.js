const validator = require("src/validators");
const { check } = require("express-validator");

class authValidator extends validator {
  register() {
    return [
      check("name", "Please fill name field.").notEmpty(),
      check("email", "Invalid email.").isEmail(),
      check(
        "password",
        "Password field should be at least 8 characters."
      ).isLength({ min: 8 }),
    ];
  }

  login() {
    return [
      check("email", "Invalid email.").isEmail(),
      check("password", "Please fill password field.").isLength({ min: 8 }),
    ];
  }

  forgetPassword() {
    return [check("email", "Invalid email.").isEmail()];
  }

  resetPassword() {
    return [
      check("email", "Invalid email.").isEmail(),
      check("token", "Please fill token field.").notEmpty(),
      check(
        "password",
        "Password field should be at least 8 characters."
      ).isLength({
        min: 8,
      }),
    ];
  }
}

module.exports = new authValidator();

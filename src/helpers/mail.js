const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "test@test.com",
    pass: "123456789",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.verify(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("📭 MailServer is ready!");
  }
});

module.exports = transporter;

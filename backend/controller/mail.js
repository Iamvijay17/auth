import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fs from "fs";

dotenv.config();

export const signup_mail = async (req, res) => {
  const { email, verificationCode } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com", // Elastic Email SMTP server
      port: 2525, // SMTP port
     auth: {
        user: process.env.ELASTIC_EMAIL, // Your Elastic Email address
        pass: process.env.ELASTIC_API_KEY, // Your Elastic Email API Key
      },
  });

  const verification_link = `${process.env.API_BASE_URL}/api/v1/verify/${verificationCode}`;

  let htmlContent = fs.readFileSync(
    "./templates/verification.html",
    "utf8"
  );

  htmlContent = htmlContent
    .replace("{{verificationToken}}", verification_link)
    .replace("{{otpCode}}", verificationCode);

  const mailOptions = {
    from: process.env.ELASTIC_EMAIL,
    to: email,
    subject: "Email Verification",
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
};

export const forgotPassword_mail = async (req, res) => {
  console.log(req.body);
  const { email, resetPasswordToken } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com", // Elastic Email SMTP server
      port: 2525, // SMTP port
     auth: {
        user: process.env.ELASTIC_EMAIL, // Your Elastic Email address
        pass: process.env.ELASTIC_API_KEY, // Your Elastic Email API Key
      },
  });

  const resetPassword_link = `${process.env.API_BASE_URL}/api/v1/reset-password/${resetPasswordToken}`;

  let htmlContent = fs.readFileSync(
    "./templates/resetPassword.html",
    "utf8"
  );

  htmlContent = htmlContent
    .replace("{{resetLink}}", resetPassword_link)

  const mailOptions = {
     from: process.env.ELASTIC_EMAIL,
    to: email,
    subject: "Reset Password",
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error, 'error');
    } else {
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
};

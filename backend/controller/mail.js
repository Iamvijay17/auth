import nodemailer from "nodemailer";
import fs from "fs";

export const signup_mail = async (req, res) => {
  const { email, verificationCode } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const verification_link = `http://localhost:5000/api/v1/verify/${verificationCode}`;

  let htmlContent = fs.readFileSync(
    "./backend/templates/verification.html",
    "utf8"
  );

  htmlContent = htmlContent
    .replace("{{verificationToken}}", verification_link)
    .replace("{{otpCode}}", verificationCode);

  const mailOptions = {
    from: process.env.EMAIL,
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
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const resetPassword_link = `http://localhost:5000/api/v1/reset-password/${resetPasswordToken}`;

  let htmlContent = fs.readFileSync(
    "./backend/templates/resetPassword.html",
    "utf8"
  );

  htmlContent = htmlContent
    .replace("{{resetLink}}", resetPassword_link)

  const mailOptions = {
    from: process.env.EMAIL,
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

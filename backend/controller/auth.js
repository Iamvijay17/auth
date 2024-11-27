import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";
import {
  generatePasswordResetToken,
  generateToken,
  generateTokenAndSetCookie,
} from "../utils/index.js";
import axios from "axios";
import fs from "fs";
import nodemailer from "nodemailer";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const userAlreadyExists = await User.findOne({ email });

    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateToken();

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    const mailApiUrl = "http://localhost:5000/api/v1/signup-mail";

    try {
      const emailResponse = await axios.post(mailApiUrl, {
        email,
        verificationToken,
      });

      if (emailResponse.status === 200) {
        await user.save();
        generateTokenAndSetCookie(res, user._id);

        return res.status(201).json({
          message: "User created successfully. Verification email sent.",
          user: { ...user._doc, password: undefined },
        });
      } else {
        return res.status(500).json({
          message: "Error occurred while sending verification email.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error occurred during signup process. Email not sent.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(res, user._id);

    return res.status(200).json({
      message: "User signed in successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verify = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (Date.now() > user.verificationExpires) {
      return res.status(400).json({ message: "Verification token expired" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (user.verificationToken !== token) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    let htmlContent = fs.readFileSync(
      "./backend/templates/verificationDone.html",
      "utf8"
    );

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Email Verification Done",
      html: htmlContent,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationExpires = undefined;
        user.save();
      }
    });

    return res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const resetPasswordToken = generatePasswordResetToken(user._id);
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();
    
    const mailApiUrl = "http://localhost:5000/api/v1/forgot-password-mail";
    
    console.log(mailApiUrl);
    try {
      const emailResponse = await axios.post(mailApiUrl, {
        email,
        resetPasswordToken,
      });

      console.log(mailApiUrl);
      if (emailResponse.status === 200) {
        return res.status(200).json({
          message: "Password reset email sent successfully",
        });
      } else {
        return res.status(500).json({
          message: "Error occurred while sending password reset email.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message:
          "Error occurred during password reset process. Email not sent.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({ resetPasswordToken: token });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({ message: "Reset token expired" });
    }

    if (user.resetPasswordToken !== token) {
      return res.status(400).json({ message: "Invalid reset token" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
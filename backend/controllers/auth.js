import User from "../models/User.js";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import {
  generateAccessToken,
  generatePasswordResetToken,
  generateTokenAndSetCookie,
  generateVerificationCode,
} from "../utils/index.js";
import axios from "axios";
import fs from "fs";
import nodemailer from "nodemailer";
dotenv.config();


export const signup = async (req, res) => {
  const { email, password, name, userId, address, avatar, settings } = req.body;

  // Validate required fields
  if (!email || !password || !name || !userId) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email }).select("_id");
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email." });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Generate verification details
    const verificationCode = generateVerificationCode();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expires in 24 hours

    // Determine if the user is the first to sign up (assign "admin" role)
    const isFirstUser = (await User.countDocuments()) === 0;
    const role = isFirstUser ? "admin" : "user";

    // Create a new user instance
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      userId,
      role,
      verificationCode,
      verificationExpires,
      avatar: avatar || null,
      address: address || {},
      settings: {
        language: settings?.language || "en",
        notificationsEnabled: true,
        theme: settings?.theme || "light",
        is2FAEnabled: false,
        emailNotifications: [],
        isAccountDeactivated: false,
        profileVisibility: "public",
      },
    });

    // Mail API for sending verification email
    const mailApiUrl = `${process.env.API_BASE_URL}/api/v1/signup-mail`;

    // Save user and send verification email concurrently
    const saveUserPromise = newUser.save();
    const sendEmailPromise = axios.post(mailApiUrl, {
      email,
      verificationCode,
    });

    const [savedUser, emailResponse] = await Promise.allSettled([
      saveUserPromise,
      sendEmailPromise,
    ]);

    // Handle user save result
    if (savedUser.status === "rejected") {
      console.error("Error saving user:", savedUser.reason);
      return res.status(500).json({ message: "Error saving user. Please try again." });
    }

    // Handle email sending result
    if (emailResponse.status === "rejected" || emailResponse.value.status !== 200) {
      console.error("Error sending verification email:", emailResponse.reason);
      return res.status(500).json({
        message: "User created successfully, but verification email could not be sent.",
      });
    }

    // Generate token and set in a cookie
    generateTokenAndSetCookie(res, savedUser.value._id);

    // Respond with success
    return res.status(201).json({
      message: "User created successfully. Verification email sent.",
      user: { ...savedUser.value._doc, password: undefined }, // Exclude sensitive fields
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "An unexpected error occurred." });
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

     if (!user.isVerified) {
      if (Date.now() > user.verificationExpires) {
        return res.status(400).json({ message: "Verification token expired. Please request a new verification email." });
      }
      return res.status(400).json({ message: "User not verified. Please check your email to verify your account." });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(res, user.userId);
    const accessToken = generateAccessToken(user.userId, user.role);

    return res.status(200).json({
      message: "User signed in successfully",
      user: { ...user._doc, password: undefined },
      accessToken
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verify = async (req, res) => {
  const { verificationCode, userId } = req.body;

   if (!verificationCode || !userId) {
    return res.status(400).json({ message: "Verification code and user ID are required" });
  }

  try {
   const user = await User.findOne({ userId: userId, verificationCode: verificationCode });

    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (Date.now() > user.verificationExpires) {
      return res.status(400).json({ message: "Verification token expired" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    let htmlContent = fs.readFileSync(
      "./templates/verificationDone.html",
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
        user.verificationCode = undefined;
        user.verificationExpires = undefined;
        user.save();
      }
    });

    const accessToken = generateAccessToken(userId);

    return res.status(200).json({ message: "User verified successfully", accessToken });
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

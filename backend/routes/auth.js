import express from "express";
import {
  forgotPassword,
  resetPassword,
  signin,
  signup,
  verify,
} from "../controller/auth.js";
import { forgotPassword_mail, signup_mail } from "../controller/mail.js";

const router = express.Router();

// Signup and Signin routes
router.post("/signup", signup);
router.post("/signin", signin);

// Mail routes
router.post("/signup-mail", signup_mail); // Send email after signup (Verification email)
router.post("/forgot-password-mail", forgotPassword_mail); // Send email for forgot password (reset link email)

// Verification route (email verification)
router.post("/verify", verify);

// Password reset routes
router.post("/forgot-password", forgotPassword); // Handle password reset request
router.post("/reset-password/:resetToken", resetPassword); // Handle password reset with token

export default router;

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

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/signup-mail", signup_mail); // Send email after signup (Verification email)

router.post("/forgot-password-mail", forgotPassword_mail); // Send email for forgot password (reset link email)
router.post("/verify", verify);
router.post("/forgot-password", forgotPassword); // Handle password reset request

router.post("/reset-password/:resetToken", resetPassword); // Handle password reset with token

export default router;

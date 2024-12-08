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

/**
 * @swagger
 * api/v1/signup:
 *   post:
 *     summary: Create a new user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/signup", signup);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
*/
// Signup and Signin routes
router.post("/signin", signin);
/**
 * @swagger
 * /auth/signup-mail:
 *   post:
 *     summary: Send a verification email after signup
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verification email sent
 *       400:
 *         description: Invalid email
 *       500:
 *         description: Internal server error
 */
// Mail routes
router.post("/signup-mail", signup_mail); // Send email after signup (Verification email)
/**
 * @swagger
 * /auth/forgot-password-mail:
 *   post:
 *     summary: Send a reset link email for password reset
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset link email sent
 *       400:
 *         description: Invalid email
 *       500:
 *         description: Internal server error
 */
router.post("/forgot-password-mail", forgotPassword_mail); // Send email for forgot password (reset link email)
/**
 * @swagger
 * /auth/verify:
 *   post:
 *     summary: Verify user email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified
 *       400:
 *         description: Invalid token
 *       500:
 *         description: Internal server error
 */
// Verification route (email verification)
router.post("/verify", verify);
/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset requested
 *       400:
 *         description: Invalid email
 *       500:
 *         description: Internal server error
 */
// Password reset routes
router.post("/forgot-password", forgotPassword); // Handle password reset request

/**
 * @swagger
 * /auth/reset-password/{resetToken}:
 *   post:
 *     summary: Reset password using the token
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: resetToken
 *         required: true
 *         description: The reset token sent via email
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid token or password
 *       500:
 *         description: Internal server error
 */
router.post("/reset-password/:resetToken", resetPassword); // Handle password reset with token

export default router;

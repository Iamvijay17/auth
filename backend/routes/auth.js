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
 * tags:
 *   name: Auth
 *   description: Authentication and related operations
 */

/**
 * @swagger
 * /api/v1/signup:
 *   post:
 *     summary: User Signup
 *     description: Registers a new user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Passw0rd!
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request.
 */
router.post("/signup", signup);

/**
 * @swagger
 * /api/v1/signin:
 *   post:
 *     summary: User Signin
 *     description: Authenticates a user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Passw0rd!
 *     responses:
 *       200:
 *         description: User signed in successfully.
 *       401:
 *         description: Unauthorized.
 */
router.post("/signin", signin);

/**
 * @swagger
 * /api/v1/signup-mail:
 *   post:
 *     summary: Signup Email
 *     description: Sends a verification email after signup.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *     responses:
 *       200:
 *         description: Verification email sent successfully.
 *       400:
 *         description: Bad request.
 */
router.post("/signup-mail", signup_mail);

/**
 * @swagger
 * /api/v1/forgot-password-mail:
 *   post:
 *     summary: Forgot Password Email
 *     description: Sends an email with a reset link for forgotten passwords.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *     responses:
 *       200:
 *         description: Reset link email sent successfully.
 *       400:
 *         description: Bad request.
 */
router.post("/forgot-password-mail", forgotPassword_mail);

/**
 * @swagger
 * /api/v1/verify:
 *   post:
 *     summary: Verify Account
 *     description: Verifies the user's account with a token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: some-verification-token
 *     responses:
 *       200:
 *         description: Account verified successfully.
 *       400:
 *         description: Bad request.
 */
router.post("/verify", verify);

/**
 * @swagger
 * /api/v1/forgot-password:
 *   post:
 *     summary: Forgot Password
 *     description: Handles password reset request.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *     responses:
 *       200:
 *         description: Reset link sent successfully.
 *       400:
 *         description: Bad request.
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /api/v1/reset-password/{resetToken}:
 *   post:
 *     summary: Reset Password
 *     description: Resets the password using a reset token.
 *     tags: [Auth]
 *     parameters:
 *       - name: resetToken
 *         in: path
 *         required: true
 *         description: The token required for password reset.
 *         schema:
 *           type: string
 *           example: some-reset-token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: NewPassw0rd!
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Invalid or expired reset token.
 */
router.post("/reset-password/:resetToken", resetPassword);

export default router;

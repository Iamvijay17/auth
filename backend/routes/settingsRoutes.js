import express from "express";
import { verifyToken, authorizeRoles } from "../middleware/index.js";
import {
  getUserSettings,
  updateUserSettings,
  getAllUserSettings,
  toggleNotifications,
} from "../controllers/settingsController.js";

const router = express.Router();

// Get the settings of the logged-in user
router.get("/", verifyToken, getUserSettings);

// Update the settings of the logged-in user
router.put("/", verifyToken, updateUserSettings);

// Get the settings of all users (only for admin role)
router.get("/all", verifyToken, authorizeRoles("admin"), getAllUserSettings);

// Toggle notification settings (for users and admins)
router.patch("/notifications", verifyToken, toggleNotifications);

// Toggle 2FA (for user)
router.patch("/2fa", verifyToken, toggle2FA);

// Update email notifications (for user)
router.patch("/email-notifications", verifyToken, updateEmailNotifications);

// Deactivate account (for user)
router.patch("/deactivate", verifyToken, deactivateAccount);

const settingsRoutes = router;

export default settingsRoutes;


/**
 * @swagger
 * /settings:
 *   get:
 *     summary: Get the settings of the logged-in user
 *     tags:
 *       - Settings
 *     responses:
 *       200:
 *         description: Successfully fetched user settings
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /settings:
 *   put:
 *     summary: Update the settings of the logged-in user
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               language:
 *                 type: string
 *               notificationsEnabled:
 *                 type: boolean
 *               theme:
 *                 type: string
 *                 enum: [light, dark]
 *               preferredLanguage:
 *                 type: string
 *               is2FAEnabled:
 *                 type: boolean
 *               emailNotifications:
 *                 type: array
 *                 items:
 *                   type: string
 *               isAccountDeactivated:
 *                 type: boolean
 *               profileVisibility:
 *                 type: string
 *                 enum: [public, private, friends]
 *     responses:
 *       200:
 *         description: Successfully updated user settings
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /settings/all:
 *   get:
 *     summary: Get the settings of all users (only for admin role)
 *     tags:
 *       - Settings
 *     responses:
 *       200:
 *         description: Successfully fetched settings for all users
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       403:
 *         description: Forbidden (admin role required)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /settings/notifications:
 *   patch:
 *     summary: Toggle notification settings for users and admins
 *     tags:
 *       - Settings
 *     responses:
 *       200:
 *         description: Successfully toggled notification settings
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /settings/2fa:
 *   patch:
 *     summary: Toggle 2FA settings for the user
 *     tags:
 *       - Settings
 *     responses:
 *       200:
 *         description: Successfully toggled 2FA settings
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /settings/email-notifications:
 *   patch:
 *     summary: Update email notification settings for the user
 *     tags:
 *       - Settings
 *     responses:
 *       200:
 *         description: Successfully updated email notification settings
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /settings/deactivate:
 *   patch:
 *     summary: Deactivate the account for the user
 *     tags:
 *       - Settings
 *     responses:
 *       200:
 *         description: Successfully deactivated the account
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error
 */

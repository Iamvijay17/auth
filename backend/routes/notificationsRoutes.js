import express from 'express';
import { createNotification, getUnreadNotifications, markAsRead } from '../controllers/notificationsController.js';
import { verifyToken } from '../middleware/index.js';

const router = express.Router();

router.post('/', verifyToken, createNotification);
router.get('/unread', verifyToken, getUnreadNotifications);
router.patch('/:id', verifyToken, markAsRead);

const NotificationRoutes = router;

export default NotificationRoutes;

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: APIs for managing notifications
 */

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Create a notification
 *     description: Create a new notification for a specific user.
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "641db6c1e123456789abcdef"
 *               message:
 *                 type: string
 *                 example: "Your booking has been confirmed."
 *               type:
 *                 type: string
 *                 example: "booking"
 *     responses:
 *       200:
 *         description: Notification created successfully.
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/notifications/unread:
 *   get:
 *     summary: Get unread notifications
 *     description: Retrieve all unread notifications for the authenticated user.
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved unread notifications.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "641db6c1e123456789abcdef"
 *                   message:
 *                     type: string
 *                     example: "Your booking has been confirmed."
 *                   type:
 *                     type: string
 *                     example: "booking"
 *                   isRead:
 *                     type: boolean
 *                     example: false
 *       401:
 *         description: Unauthorized. Token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/notifications/{id}:
 *   patch:
 *     summary: Mark notification as read
 *     description: Update a notification's status to mark it as read.
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "641db6c1e123456789abcdef"
 *         description: ID of the notification to be marked as read.
 *     responses:
 *       200:
 *         description: Notification marked as read.
 *       404:
 *         description: Notification not found.
 *       401:
 *         description: Unauthorized. Token missing or invalid.
 *       500:
 *         description: Internal server error.
 */


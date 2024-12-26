import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/index.js';
import { getDashboardStats, getAllBookings } from '../controllers/adminController.js';

const router = express.Router();


router.get('/stats', verifyToken, authorizeRoles('admin'), getDashboardStats);


router.get('/bookings', verifyToken, authorizeRoles('admin'), getAllBookings);

const adminRoutes = router;

export default adminRoutes;

/**
 * @swagger
 * /api/v1/admin/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     description: Retrieve statistics for the admin dashboard.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved statistics.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: number
 *                   example: 120
 *                 totalBookings:
 *                   type: number
 *                   example: 45
 *                 totalRevenue:
 *                   type: number
 *                   example: 15000
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/admin/bookings:
 *   get:
 *     summary: Get all bookings
 *     description: Retrieve a list of all bookings in the system.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved bookings.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   bookingId:
 *                     type: string
 *                     example: "booking123"
 *                   userId:
 *                     type: string
 *                     example: "user123"
 *                   packageId:
 *                     type: string
 *                     example: "package456"
 *                   amount:
 *                     type: number
 *                     example: 1000
 *                   status:
 *                     type: string
 *                     example: "confirmed"
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       500:
 *         description: Internal server error.
 */

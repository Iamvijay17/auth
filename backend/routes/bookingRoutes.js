import express from 'express';
import { 
  createBooking, 
  getUserBookings, 
  getAllBookings, 
  updateBookingStatus, 
  deleteBooking 
} from '../controllers/bookingController.js';
import { verifyToken, authorizeRoles } from '../middleware/index.js';

const router = express.Router();

router.post('/', verifyToken, authorizeRoles('admin'), createBooking);
router.get('/user', verifyToken, authorizeRoles('admin'), getUserBookings);
router.get('/', verifyToken, authorizeRoles('admin'), getAllBookings);
router.put('/:id/status', verifyToken, authorizeRoles('admin'), updateBookingStatus);
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteBooking);

const bookingRoutes = router;
export default bookingRoutes;

/**
 * @swagger
 * /api/v1/bookings:
 *   post:
 *     summary: Create a new booking
 *     description: Create a new booking in the system. Only accessible by admin.
 *     tags: [Bookings]
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
 *                 example: "user123"
 *               packageId:
 *                 type: string
 *                 example: "package456"
 *               amount:
 *                 type: number
 *                 example: 1500
 *     responses:
 *       201:
 *         description: Booking created successfully.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/bookings/user:
 *   get:
 *     summary: Get user-specific bookings
 *     description: Retrieve all bookings for the authenticated user. Only accessible by admin.
 *     tags: [Bookings]
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
 *                   packageId:
 *                     type: string
 *                     example: "package456"
 *                   amount:
 *                     type: number
 *                     example: 1500
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/bookings:
 *   get:
 *     summary: Get all bookings
 *     description: Retrieve a list of all bookings. Only accessible by admin.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all bookings.
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
 *                     example: 1500
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

/**
 * @swagger
 * /api/v1/bookings/{id}/status:
 *   put:
 *     summary: Update booking status
 *     description: Update the status of a booking by ID. Only accessible by admin.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Booking ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "confirmed"
 *     responses:
 *       200:
 *         description: Booking status updated successfully.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       404:
 *         description: Booking not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     description: Delete a booking by ID. Only accessible by admin.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Booking ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted successfully.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       404:
 *         description: Booking not found.
 *       500:
 *         description: Internal server error.
 */


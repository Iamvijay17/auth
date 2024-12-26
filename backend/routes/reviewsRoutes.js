import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/index.js';
import {
  addReview,
  getReviewsForDestination,
  updateReview,
  deleteReview,
} from '../controllers/reviewsController.js';

const router = express.Router();

router.post('/', verifyToken, addReview);
router.get('/:destinationId', getReviewsForDestination);
router.put('/:reviewId', verifyToken, updateReview);
router.delete('/:reviewId', verifyToken, authorizeRoles('admin', 'user'), deleteReview);

const reviewsRoutes = router;

export default reviewsRoutes;

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: APIs for managing reviews for destinations
 */

/**
 * @swagger
 * /api/v1/reviews:
 *   post:
 *     summary: Add a new review
 *     description: Allows users to add a review for a destination.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               destinationId:
 *                 type: string
 *                 example: "641db6c1e123456789abcdef"
 *               rating:
 *                 type: number
 *                 example: 4
 *               reviewText:
 *                 type: string
 *                 example: "Great experience, would definitely recommend!"
 *     responses:
 *       201:
 *         description: Review added successfully.
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/reviews/{destinationId}:
 *   get:
 *     summary: Get all reviews for a destination
 *     description: Retrieve all reviews for a specific destination.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: destinationId
 *         required: true
 *         schema:
 *           type: string
 *           example: "641db6c1e123456789abcdef"
 *         description: ID of the destination to get reviews for.
 *     responses:
 *       200:
 *         description: List of reviews for the destination.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   reviewId:
 *                     type: string
 *                     example: "641db6c1e123456789abcdef"
 *                   userId:
 *                     type: string
 *                     example: "641db6c1e123456789abcdef"
 *                   rating:
 *                     type: number
 *                     example: 4
 *                   reviewText:
 *                     type: string
 *                     example: "Great experience, would definitely recommend!"
 *                   createdAt:
 *                     type: string
 *                     example: "2024-12-25T12:30:00Z"
 *       404:
 *         description: Destination not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/reviews/{reviewId}:
 *   put:
 *     summary: Update a review
 *     description: Allows users to update their review for a destination.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *           example: "641db6c1e123456789abcdef"
 *         description: ID of the review to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 5
 *               reviewText:
 *                 type: string
 *                 example: "Amazing experience, will come again!"
 *     responses:
 *       200:
 *         description: Review updated successfully.
 *       400:
 *         description: Invalid input data.
 *       404:
 *         description: Review not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review
 *     description: Allows users or admins to delete a review.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *           example: "641db6c1e123456789abcdef"
 *         description: ID of the review to be deleted.
 *     responses:
 *       200:
 *         description: Review deleted successfully.
 *       404:
 *         description: Review not found.
 *       401:
 *         description: Unauthorized. Token missing or invalid.
 *       500:
 *         description: Internal server error.
 */


import express from 'express';
import { verifyToken } from '../middleware/index.js';
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from '../controllers/favoritesController.js';

const router = express.Router();


router.post('/add', verifyToken, addToFavorites);
router.get('/', verifyToken, getFavorites);
router.delete('/:destinationId', verifyToken, removeFromFavorites);

const favoritesRoutes = router;

export default favoritesRoutes;

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Manage user favorite destinations
 */

/**
 * @swagger
 * /api/favorites/add:
 *   post:
 *     summary: Add a destination to favorites
 *     description: Add a destination to the user's list of favorites. Requires authentication.
 *     tags: [Favorites]
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
 *                 example: "63f29b1e2b2f4b0001a9cdef"
 *             required:
 *               - destinationId
 *     responses:
 *       200:
 *         description: Destination added to favorites successfully.
 *       400:
 *         description: Invalid request or destination already in favorites.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Get favorite destinations
 *     description: Retrieve all destinations marked as favorites by the user. Requires authentication.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favorite destinations retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   destinationId:
 *                     type: string
 *                     example: "63f29b1e2b2f4b0001a9cdef"
 *                   name:
 *                     type: string
 *                     example: "Paris"
 *                   addedAt:
 *                     type: string
 *                     example: "2024-12-26T10:00:00.000Z"
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/favorites/{destinationId}:
 *   delete:
 *     summary: Remove a destination from favorites
 *     description: Remove a destination from the user's list of favorites by ID. Requires authentication.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: destinationId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the destination to remove from favorites.
 *     responses:
 *       200:
 *         description: Destination removed from favorites successfully.
 *       404:
 *         description: Destination not found in favorites.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       500:
 *         description: Internal server error.
 */

import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { addToWishlist, getWishlist, removeFromWishlist } from '../controllers/wishlistController.js';

const router = express.Router();

router.post('/add', verifyToken, addToWishlist);
router.get('/', verifyToken, getWishlist);
router.delete('/:itemId', verifyToken, removeFromWishlist);

const wishlistRoutes = router;

export default wishlistRoutes;

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: APIs for managing user wishlist
 */

/**
 * @swagger
 * /api/v1/wishlist/add:
 *   post:
 *     summary: Add an item to the wishlist
 *     description: Allows a user to add a destination to their wishlist.
 *     tags: [Wishlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: ID of the item (destination) to add to the wishlist.
 *                 example: "641db6c1e123456789abcdef"
 *     responses:
 *       200:
 *         description: Item successfully added to the wishlist.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/wishlist:
 *   get:
 *     summary: Get all items in the wishlist
 *     description: Fetches all the items (destinations) added to the user's wishlist.
 *     tags: [Wishlist]
 *     responses:
 *       200:
 *         description: List of items in the user's wishlist.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   itemId:
 *                     type: string
 *                     example: "641db6c1e123456789abcdef"
 *                   name:
 *                     type: string
 *                     example: "Goa Beach"
 *                   location:
 *                     type: string
 *                     example: "Goa, India"
 *                   description:
 *                     type: string
 *                     example: "A beautiful beach destination."
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/wishlist/{itemId}:
 *   delete:
 *     summary: Remove an item from the wishlist
 *     description: Removes a specific destination from the user's wishlist.
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *           example: "641db6c1e123456789abcdef"
 *         description: The ID of the item to remove from the wishlist.
 *     responses:
 *       200:
 *         description: Item successfully removed from the wishlist.
 *       404:
 *         description: Item not found in the wishlist.
 *       500:
 *         description: Internal server error.
 */


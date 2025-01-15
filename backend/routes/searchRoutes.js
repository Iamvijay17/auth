import express from 'express';
import { searchDestinations } from '../controllers/searchController.js';

const router = express.Router();

router.get('/destinations', searchDestinations);

const searchRoutes = router;

export default searchRoutes;

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: APIs for searching destinations
 */

/**
 * @swagger
 * /api/v1/search:
 *   get:
 *     summary: Search destinations by query
 *     description: Allows users to search for destinations based on a query parameter.
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "beach"
 *         description: Search keyword for filtering destinations (e.g., 'beach', 'mountain').
 *     responses:
 *       200:
 *         description: List of destinations matching the search query.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   destinationId:
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
 *                     example: "A beautiful beach destination with golden sands."
 *       400:
 *         description: Invalid query parameter.
 *       500:
 *         description: Internal server error.
 */


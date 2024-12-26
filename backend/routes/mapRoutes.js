import express from 'express';
import { getNearbyAttractions } from '../controllers/mapController.js';

const router = express.Router();

router.get('/nearby-attractions', getNearbyAttractions);

const mapRoutes = router;

export default mapRoutes;

/**
 * @swagger
 * tags:
 *   name: Map
 *   description: APIs for map-related features
 */

/**
 * @swagger
 * /api/v1/map/nearby-attractions:
 *   get:
 *     summary: Get nearby attractions
 *     description: Fetch a list of nearby attractions based on the user's current location.
 *     tags: [Map]
 *     parameters:
 *       - in: query
 *         name: latitude
 *         required: true
 *         schema:
 *           type: number
 *           example: 40.7128
 *         description: Latitude of the user's current location.
 *       - in: query
 *         name: longitude
 *         required: true
 *         schema:
 *           type: number
 *           example: -74.0060
 *         description: Longitude of the user's current location.
 *       - in: query
 *         name: radius
 *         required: false
 *         schema:
 *           type: number
 *           example: 5
 *         description: Radius in kilometers to search for nearby attractions (default is 5km).
 *     responses:
 *       200:
 *         description: Successfully retrieved a list of nearby attractions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Central Park"
 *                   location:
 *                     type: object
 *                     properties:
 *                       latitude:
 *                         type: number
 *                         example: 40.785091
 *                       longitude:
 *                         type: number
 *                         example: -73.968285
 *                   distance:
 *                     type: number
 *                     example: 2.3
 *                     description: Distance from the current location in kilometers.
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal server error.
 */


import express from 'express';
import { 
  addReview, 
  createDestination, 
  deleteDestination, 
  getAllDestinations, 
  getDestinationById, 
  updateDestination 
} from '../controllers/destinationController.js';
import { verifyToken, authorizeRoles } from '../middleware/index.js';

const router = express.Router();

router.get('/', verifyToken, authorizeRoles("admin", "user"), getAllDestinations);
router.get('/:id', verifyToken, authorizeRoles("admin", "user"), getDestinationById);
router.post('/', verifyToken, authorizeRoles('admin'), createDestination);
router.put('/:id', verifyToken, authorizeRoles('admin'), updateDestination);
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteDestination);
router.post('/:id/reviews', verifyToken, authorizeRoles('user'), addReview);

const destinationRoutes = router;

export default destinationRoutes;

/**
 * @swagger
 * /api/v1/destinations:
 *   get:
 *     summary: Get all destinations
 *     description: Retrieve a list of all destinations. Accessible by admin and user roles.
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all destinations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "destination123"
 *                   name:
 *                     type: string
 *                     example: "Hawaii"
 *                   description:
 *                     type: string
 *                     example: "A tropical paradise with beautiful beaches."
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /api/v1/destinations/{id}:
 *   get:
 *     summary: Get destination by ID
 *     description: Retrieve details of a specific destination by its ID. Accessible by admin and user roles.
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the destination to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved destination details.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       404:
 *         description: Destination not found.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /api/v1/destinations:
 *   post:
 *     summary: Create a new destination
 *     description: Add a new destination to the system. Only accessible by admin.
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Hawaii"
 *               description:
 *                 type: string
 *                 example: "A tropical paradise with beautiful beaches."
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["image1.jpg", "image2.jpg"]
 *     responses:
 *       201:
 *         description: Destination created successfully.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /api/v1/destinations/{id}:
 *   put:
 *     summary: Update a destination
 *     description: Update the details of an existing destination by ID. Only accessible by admin.
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the destination to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Hawaii"
 *               description:
 *                 type: string
 *                 example: "Updated description of Hawaii."
 *     responses:
 *       200:
 *         description: Destination updated successfully.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       404:
 *         description: Destination not found.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /api/v1/destinations/{id}:
 *   delete:
 *     summary: Delete a destination
 *     description: Remove a destination from the system by ID. Only accessible by admin.
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the destination to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Destination deleted successfully.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       404:
 *         description: Destination not found.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /api/v1/destinations/{id}/reviews:
 *   post:
 *     summary: Add a review to a destination
 *     description: Add a user review to a specific destination. Only accessible by users.
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the destination to add a review for
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 4.5
 *               comment:
 *                 type: string
 *                 example: "Amazing place to visit!"
 *     responses:
 *       201:
 *         description: Review added successfully.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       404:
 *         description: Destination not found.
 *       500:
 *         description: Internal server error.
 */



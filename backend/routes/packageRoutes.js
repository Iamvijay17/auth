import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/index.js';
import { createPackage, getAllPackages, deletePackage } from '../controllers/packageController.js';

const router = express.Router();

router.post('/create', verifyToken, authorizeRoles('admin'), createPackage);
router.get('/', getAllPackages);
router.delete('/:id', verifyToken, authorizeRoles('admin'), deletePackage);

const packageRoutes = router;

export default packageRoutes;

/**
 * @swagger
 * tags:
 *   name: Packages
 *   description: APIs for managing travel packages
 */

/**
 * @swagger
 * /api/v1/packages/create:
 *   post:
 *     summary: Create a new package
 *     description: Allows the admin to create a new travel package.
 *     tags: [Packages]
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
 *                 example: "Golden Triangle Tour"
 *               description:
 *                 type: string
 *                 example: "A beautiful 7-day tour exploring the Golden Triangle cities of India."
 *               price:
 *                 type: number
 *                 example: 500
 *               duration:
 *                 type: string
 *                 example: "7 days"
 *               destinationIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "641db6c1e123456789abcdef"
 *     responses:
 *       201:
 *         description: Package created successfully.
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/packages:
 *   get:
 *     summary: Get all packages
 *     description: Retrieve a list of all available travel packages.
 *     tags: [Packages]
 *     responses:
 *       200:
 *         description: A list of travel packages.
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
 *                   name:
 *                     type: string
 *                     example: "Golden Triangle Tour"
 *                   description:
 *                     type: string
 *                     example: "A beautiful 7-day tour exploring the Golden Triangle cities of India."
 *                   price:
 *                     type: number
 *                     example: 500
 *                   duration:
 *                     type: string
 *                     example: "7 days"
 *                   destinationIds:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "641db6c1e123456789abcdef"
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/packages/{id}:
 *   delete:
 *     summary: Delete a package
 *     description: Allows the admin to delete a specific travel package.
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "641db6c1e123456789abcdef"
 *         description: ID of the package to be deleted.
 *     responses:
 *       200:
 *         description: Package deleted successfully.
 *       404:
 *         description: Package not found.
 *       401:
 *         description: Unauthorized. Token missing or invalid.
 *       500:
 *         description: Internal server error.
 */


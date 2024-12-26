import express from 'express';
import { registerVendor, loginVendor } from '../controllers/vendorController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vendor
 *   description: Vendor registration and authentication
 */

/**
 * @swagger
 * /api/v1/vendor/register:
 *   post:
 *     summary: Vendor registration
 *     description: Allows a vendor to register for an account.
 *     tags: [Vendor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vendor registered successfully
 *       400:
 *         description: Vendor already exists
 *       500:
 *         description: Server error
 */
router.post('/register', registerVendor);

/**
 * @swagger
 * /api/v1/vendor/login:
 *   post:
 *     summary: Vendor login
 *     description: Allows a vendor to log in and obtain a JWT token.
 *     tags: [Vendor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: Vendor not found
 */
router.post('/login', loginVendor);

/**
 * @swagger
 * /api/vendor/profile:
 *   get:
 *     summary: Get vendor profile
 *     description: Fetch the current vendor's profile information.
 *     tags: [Vendor]
 *     responses:
 *       200:
 *         description: Vendor profile information
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Server error
 */
router.get('/profile', verifyToken, getVendorProfile);

/**
 * @swagger
 * /api/vendor/profile:
 *   put:
 *     summary: Update vendor profile
 *     description: Allows the vendor to update their profile information.
 *     tags: [Vendor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               description:
 *                 type: string
 *               profileImage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Server error
 */
router.put('/profile', verifyToken, updateVendorProfile);


export default router;

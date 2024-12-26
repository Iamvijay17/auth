import express from 'express';
import { verifyToken } from '../middleware/index.js';
import { applyDiscount } from '../controllers/discountController.js';

const router = express.Router();


router.post('/apply', verifyToken, applyDiscount);

const discountRoutes = router;

export default discountRoutes;

/**
 * @swagger
 * /api/v1/discounts/apply:
 *   post:
 *     summary: Apply a discount
 *     description: Apply a discount code to a user's purchase. Requires user authentication.
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "SUMMER2024"
 *               totalAmount:
 *                 type: number
 *                 example: 100
 *             required:
 *               - code
 *               - totalAmount
 *     responses:
 *       200:
 *         description: Discount applied successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 discountAmount:
 *                   type: number
 *                   example: 10
 *                 finalAmount:
 *                   type: number
 *                   example: 90
 *       400:
 *         description: Invalid discount code or other bad request.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       500:
 *         description: Internal server error.
 */


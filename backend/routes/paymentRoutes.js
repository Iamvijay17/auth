import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/index.js';
import { getVendorPayments } from '../controllers/paymentController.js';

const router = express.Router();

/**
 * @swagger
 * /api/payments/vendor:
 *   get:
 *     summary: Get vendor payment history
 *     description: Fetch all payment transactions for the vendor.
 *     tags: [Vendor]
 *     responses:
 *       200:
 *         description: Payment history list
 *       500:
 *         description: Server error
 */
router.get('/vendor', verifyToken, authorizeRoles('vendor'), getVendorPayments);

const paymentRoutes = router;

export default paymentRoutes;

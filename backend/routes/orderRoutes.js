import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/index.js';
import { getVendorOrders, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

/**
 * @swagger
 * /api/orders/vendor:
 *   get:
 *     summary: Get orders for vendor
 *     description: Fetch all orders made to the vendor.
 *     tags: [Vendor]
 *     responses:
 *       200:
 *         description: List of orders
 *       500:
 *         description: Server error
 */
router.get('/vendor', verifyToken, authorizeRoles('vendor'), getVendorOrders);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status
 *     description: Allow the vendor to update the status of an order.
 *     tags: [Vendor]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Order ID
 *       - name: status
 *         in: body
 *         required: true
 *         description: The new status for the order (pending, confirmed, etc.)
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               enum: [pending, confirmed, completed, canceled]
 *     responses:
 *       200:
 *         description: Order status updated
 *       500:
 *         description: Server error
 */
router.put('/:id/status', verifyToken, authorizeRoles('vendor'), updateOrderStatus);

export default router;

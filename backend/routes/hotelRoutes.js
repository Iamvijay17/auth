import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/index.js';
import { addHotel, getVendorHotels } from '../controllers/hotelController.js';

const router = express.Router();

// Add a hotel (only vendor can add)
router.post('/', verifyToken, authorizeRoles('vendor'), addHotel);

// Get hotels for the logged-in vendor
router.get('/', verifyToken, authorizeRoles('vendor'), getVendorHotels);

export default router;

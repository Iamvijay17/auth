import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/index.js';
import { addTravelAgency, getVendorTravelAgencies } from '../controllers/travelAgencyController.js';

const router = express.Router();

// Add a travel agency collaboration
router.post('/', verifyToken, authorizeRoles('vendor'), addTravelAgency);

// Get travel agencies for the logged-in vendor
router.get('/', verifyToken, authorizeRoles('vendor'), getVendorTravelAgencies);

export default router;

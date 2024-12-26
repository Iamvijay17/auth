// routes/travelAgencyRoutes.js
import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/index.js';
import { addTravelAgency, getTravelAgencyById, updateTravelAgency, deleteTravelAgency, getFilteredTravelAgencies, associateTravelAgencyWithHotel } from '../controllers/travelAgencyController.js';
import { createPackageForTravelAgency, getTravelAgenciesForDestination } from '../controllers/packageController.js';
import { addReviewForTravelAgency, getReviewsForTravelAgency } from '../controllers/reviewsController.js';
import { addRatingForTravelAgency, getRatingsForTravelAgency } from '../controllers/ratingController.js';
import { addEmployeeToTravelAgency, deleteEmployeeFromTravelAgency, getEmployeesForTravelAgency, updateEmployeeDetails } from '../controllers/employeeController.js';
import { assignTaskToEmployee } from '../controllers/taskController.js';
import { markAttendance } from '../controllers/attendanceController.js';
import { addPerformanceReview, getEmployeePerformance } from '../controllers/performanceReviewController.js';
import { applyForLeave, getLeaveBalance } from '../controllers/leaveController.js';
import { updateTaskProgress } from '../controllers/taskProgressController.js';
import { setEmployeeSalary } from '../controllers/salaryController.js';

const router = express.Router();
router.post('/', verifyToken, authorizeRoles('vendor'), addTravelAgency);
router.get('/:id', verifyToken, authorizeRoles('vendor', "admin"), getTravelAgencyById);
router.put('/:id', verifyToken, authorizeRoles('vendor', "admin"), updateTravelAgency);
router.delete('/:id', verifyToken, authorizeRoles('vendor', "admin"), deleteTravelAgency);
router.get('/filter', getFilteredTravelAgencies);
router.post('/:id/associate-hotel', verifyToken, authorizeRoles('vendor', "admin"), associateTravelAgencyWithHotel);
router.post('/:id/package', verifyToken, authorizeRoles('vendor'), createPackageForTravelAgency);
router.get('/destinations/:id/travel-agencies', getTravelAgenciesForDestination);
router.post('/:id/review', verifyToken, addReviewForTravelAgency);
router.get('/:id/reviews', getReviewsForTravelAgency);
router.post('/:id/rating', verifyToken, addRatingForTravelAgency);
router.get('/:id/ratings', getRatingsForTravelAgency);
router.post('/:id/employees', verifyToken, authorizeRoles('vendor'), addEmployeeToTravelAgency);
router.get('/:id/employees', verifyToken, authorizeRoles('vendor', 'admin'), getEmployeesForTravelAgency);
router.put('/:agencyId/employees/:employeeId', verifyToken, authorizeRoles('vendor'), updateEmployeeDetails);
router.post('/:agencyId/employees/:employeeId/task', verifyToken, authorizeRoles('vendor'), assignTaskToEmployee);
router.delete('/:agencyId/employees/:employeeId', verifyToken, authorizeRoles('vendor'), deleteEmployeeFromTravelAgency);

router.post('/:agencyId/employees/:employeeId/attendance', verifyToken, authorizeRoles('vendor'), markAttendance);
router.post('/:agencyId/employees/:employeeId/review', verifyToken, authorizeRoles('vendor', 'admin'), addPerformanceReview);
router.post('/:agencyId/employees/:employeeId/leave', verifyToken, authorizeRoles('vendor'), applyForLeave);
router.put('/:agencyId/employees/:employeeId/task/:taskId/progress', verifyToken, authorizeRoles('vendor'), updateTaskProgress);
router.post('/:agencyId/employees/:employeeId/salary', verifyToken, authorizeRoles('vendor', 'admin'), setEmployeeSalary);
router.get('/:agencyId/employees/:employeeId/leave-balance', verifyToken, authorizeRoles('vendor', 'admin'), getLeaveBalance);
router.get('/:agencyId/employees/:employeeId/performance', verifyToken, getEmployeePerformance);

const travelAgencyRoutes = router;

export default travelAgencyRoutes;

/**
 * @swagger
 * /api/v1/travel-agencies:
 *   post:
 *     summary: Add a travel agency collaboration
 *     description: Allows a vendor to add a new travel agency collaboration.
 *     tags: [Travel Agency]
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
 *               location:
 *                 type: string
 *               services:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Travel agency collaboration created successfully.
 *       400:
 *         description: Invalid request body.
 *       403:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/travel-agencies/{id}:
 *   get:
 *     summary: Get travel agencies for the logged-in vendor
 *     description: Retrieve all travel agencies associated with a specific vendor.
 *     tags: [Travel Agency]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Vendor ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of travel agencies.
 *       404:
 *         description: Travel agencies not found for the given vendor.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/travel-agencies/{id}:
 *   put:
 *     summary: Update a travel agency
 *     description: Allows a vendor to update the details of a travel agency.
 *     tags: [Travel Agency]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Travel agency ID
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
 *               location:
 *                 type: string
 *               services:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Travel agency updated successfully.
 *       400:
 *         description: Invalid data provided.
 *       404:
 *         description: Travel agency not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/travel-agencies/{id}:
 *   delete:
 *     summary: Delete a travel agency
 *     description: Allows a vendor to delete a specific travel agency.
 *     tags: [Travel Agency]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Travel agency ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Travel agency deleted successfully.
 *       404:
 *         description: Travel agency not found.
 *       403:
 *         description: Unauthorized to delete the agency.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/travel-agencies/filter:
 *   get:
 *     summary: Filter travel agencies
 *     description: Allows filtering of travel agencies by location or services.
 *     tags: [Travel Agency]
 *     parameters:
 *       - name: location
 *         in: query
 *         description: Filter travel agencies by location.
 *         schema:
 *           type: string
 *       - name: service
 *         in: query
 *         description: Filter travel agencies by service type.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of filtered travel agencies.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/travel-agencies/{id}/associate-hotel:
 *   post:
 *     summary: Associate a travel agency with a hotel
 *     description: Allows a vendor to associate a specific travel agency with a hotel.
 *     tags: [Travel Agency]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Travel agency ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelId:
 *                 type: string
 *                 description: The hotel ID to associate with the travel agency.
 *     responses:
 *       200:
 *         description: Successfully associated the hotel with the travel agency.
 *       400:
 *         description: Invalid request data.
 *       404:
 *         description: Travel agency or hotel not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/travel-agencies/{id}/package:
 *   post:
 *     summary: Create a package for a travel agency
 *     description: Allows a travel agency to create a package for a destination.
 *     tags: [Travel Agency]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Travel agency ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               destinationId:
 *                 type: string
 *               packageName:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Package created successfully.
 *       400:
 *         description: Invalid request body.
 *       404:
 *         description: Travel agency not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/destinations/{id}/travel-agencies:
 *   get:
 *     summary: Get travel agencies offering packages for a destination
 *     description: Retrieve travel agencies that offer packages for a specific destination.
 *     tags: [Travel Agency]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Destination ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of travel agencies.
 *       404:
 *         description: No travel agencies found for the destination.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/travel-agencies/{id}/review:
 *   post:
 *     summary: Add a review for a travel agency
 *     description: Allows users to leave a review for a specific travel agency.
 *     tags: [Travel Agency]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Travel agency ID
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
 *                 format: float
 *               reviewText:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review added successfully.
 *       400:
 *         description: Invalid request body.
 *       404:
 *         description: Travel agency not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/travel-agencies/{id}/reviews:
 *   get:
 *     summary: Get reviews for a specific travel agency
 *     description: Retrieve all reviews for a travel agency.
 *     tags: [Travel Agency]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Travel agency ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews.
 *       404:
 *         description: No reviews found for this travel agency.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/travel-agencies/{id}/rating:
 *   post:
 *     summary: Add a rating for a travel agency
 *     description: Allows users to rate a travel agency.
 *     tags: [Travel Agency]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Travel agency ID
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
 *                 description: Rating value (1-5)
 *     responses:
 *       201:
 *         description: Rating added successfully.
 *       400:
 *         description: Invalid request body.
 *       404:
 *         description: Travel agency not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/travel-agencies/{id}/ratings:
 *   get:
 *     summary: Get the average rating of a travel agency
 *     description: Retrieve the average rating for a specific travel agency.
 *     tags: [Travel Agency]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Travel agency ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Average rating.
 *       404:
 *         description: Travel agency not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/travel-agencies/{id}/employees:
 *   post:
 *     summary: Add an employee to a travel agency
 *     description: Allows travel agencies to add employees.
 *     tags: [Travel Agency]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Travel agency ID
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
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee added successfully.
 *       400:
 *         description: Invalid request body.
 *       404:
 *         description: Travel agency not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/travel-agencies/{id}/employees:
 *   get:
 *     summary: Get all employees for a specific travel agency
 *     description: Retrieve all employees working for a specific travel agency.
 *     tags: [Travel Agency]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Travel agency ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of employees.
 *       404:
 *         description: No employees found for the travel agency.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/travel-agencies/{agencyId}/employees/{employeeId}:
 *   put:
 *     summary: Update employee details
 *     description: Allows travel agencies to update employee information.
 *     tags: [Travel Agency]
 *     parameters:
 *       - name: agencyId
 *         in: path
 *         required: true
 *         description: Travel agency ID
 *         schema:
 *           type: string
 *       - name: employeeId
 *         in: path
 *         required: true
 *         description: Employee ID
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
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated successfully.
 *       400:
 *         description: Invalid request body.
 *       404:
 *         description: Employee or travel agency not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/travel-agencies/{agencyId}/employees/{employeeId}:
 *   delete:
 *     summary: Delete an employee from a travel agency
 *     description: Removes an employee from the travel agency.
 *     tags: [Travel Agency]
 *     parameters:
 *       - name: agencyId
 *         in: path
 *         required: true
 *         description: Travel agency ID
 *         schema:
 *           type: string
 *       - name: employeeId
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee removed successfully.
 *       404:
 *         description: Employee or travel agency not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/travel-agencies/{agencyId}/employees/{employeeId}/task:
 *   post:
 *     summary: Assign a task to an employee
 *     description: Allows travel agencies to assign tasks to employees.
 *     tags: [Travel Agency]
 *     parameters:
 *       - name: agencyId
 *         in: path
 *         required: true
 *         description: Travel agency ID
 *         schema:
 *           type: string
 *       - name: employeeId
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskTitle:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Task assigned successfully.
 *       400:
 *         description: Invalid request body.
 *       404:
 *         description: Employee or travel agency not found.
 *       500:
 *         description: Internal server error.
 */
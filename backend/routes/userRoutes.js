import express from "express";
import { verifyToken, authorizeRoles } from "../middleware/index.js";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";

const userRouter = express.Router();


userRouter.get("/user/:userId", verifyToken, authorizeRoles("admin", "user"), getUserById);


userRouter.put("/user/:userId", verifyToken, authorizeRoles("admin", "user"), updateUserById);


userRouter.delete("/user/:userId", verifyToken, authorizeRoles("admin"), deleteUserById);


userRouter.get("/users", verifyToken, authorizeRoles("admin", "user"), getAllUsers);

export default userRouter;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management operations
 */

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   get:
 *     summary: Get User by ID
 *     description: Fetches details of a user by their ID.
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found.
 */

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   put:
 *     summary: Update User by ID
 *     description: Updates a user's details by their ID.
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to update
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
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 */

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   delete:
 *     summary: Delete User by ID
 *     description: Deletes a user by their ID.
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get All Users
 *     description: Fetches details of all users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users fetched successfully.
 */
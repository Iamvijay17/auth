import express from "express";
import authenticateUser from "../middleware/index.js";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controller/user.js";

const userRouter = express.Router();

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
userRouter.get("/user/:userId", authenticateUser, getUserById);

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
userRouter.put("/user/:userId", authenticateUser, updateUserById);

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
userRouter.delete("/user/:userId", authenticateUser, deleteUserById);

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
userRouter.get("/users", authenticateUser, getAllUsers);

export default userRouter;

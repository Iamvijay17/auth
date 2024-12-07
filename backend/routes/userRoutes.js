import express from 'express';
import authenticateUser from '../middleware/index.js';
import { deleteUserById, getAllUsers, getUserById, updateUserById } from '../controller/user.js';

const userRouter = express.Router();

// Route to fetch a user by userId
userRouter.get('/user/:userId', authenticateUser, getUserById);

// Route to update a user by userId
userRouter.put('/user/:userId', authenticateUser, updateUserById);

// Route to delete a user by userId
userRouter.delete('/user/:userId', authenticateUser, deleteUserById);

// Route to fetch all users
userRouter.get('/users', authenticateUser, getAllUsers);

export default userRouter;

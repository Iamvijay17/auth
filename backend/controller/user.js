import { User } from "../models/user.js";


// Get user by userId
export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId }).select('-password -_id -__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user by userId
export const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const { name, email } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { userId },
      { name, email },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete user by userId
export const deleteUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOneAndDelete({ userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
   const users = await User.find().select('-password -_id -__v');
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

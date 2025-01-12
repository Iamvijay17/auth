import User from '../models/User.js';
import Destination from '../models/Destination.js';

/**
 * Add a destination to favorites
 */
export const addToFavorites = async (req, res) => {
  const { destinationId } = req.body;

  try {
    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    const user = await User.findById(req.user.id);
    if (user.favorites.includes(destinationId)) {
      return res.status(400).json({ message: 'Already in favorites' });
    }

    user.favorites.push(destinationId);
    await user.save();

    res.status(200).json({ message: 'Added to favorites', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get user's favorites
 */
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Remove a destination from favorites
 */
export const removeFromFavorites = async (req, res) => {
  const { destinationId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    user.favorites = user.favorites.filter((id) => id.toString() !== destinationId);

    await user.save();
    res.status(200).json({ message: 'Removed from favorites', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

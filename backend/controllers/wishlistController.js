import User from '../models/User.js';

/**
 * Add an item to the wishlist
 */
export const addToWishlist = async (req, res) => {
  const { itemId, itemType } = req.body; // itemType: 'destination' or 'package'

  try {
    const user = await User.findById(req.user.id);
    user.wishlist.push({ itemId, itemType });

    await user.save();
    res.status(200).json({ message: 'Added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get the wishlist
 */
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist.itemId');
    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Remove an item from the wishlist
 */
export const removeFromWishlist = async (req, res) => {
  const { itemId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter((item) => item.itemId.toString() !== itemId);

    await user.save();
    res.status(200).json({ message: 'Removed from wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

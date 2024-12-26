import Discount from '../models/Discount.js';

/**
 * Apply a discount code
 */
export const applyDiscount = async (req, res) => {
  const { code } = req.body;

  try {
    const discount = await Discount.findOne({ code, isActive: true });
    if (!discount) {
      return res.status(404).json({ message: 'Invalid or expired discount code' });
    }

    res.status(200).json({ discount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

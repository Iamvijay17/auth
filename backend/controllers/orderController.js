import Order from '../models/Order.js';

/**
 * Get orders for a vendor
 */
export const getVendorOrders = async (req, res) => {
  try {
    const orders = await Order.find({ vendorId: req.user.id }).populate('userId productId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update order status
 */
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

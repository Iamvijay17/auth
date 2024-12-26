import Payment from '../models/Payment.js';

/**
 * Get vendor payment history
 */
export const getVendorPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ vendorId: req.user.id });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Booking from '../models/Booking.js';

/**
 * Get booking history for a user
 */
export const getBookingHistory = async (req, res) => {
  const userId = req.user.id;  // Assuming user is authenticated

  try {
    const bookings = await Booking.find({ user: userId }).populate('package');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Generate booking report for admins (filter by date range)
 */
export const generateBookingReport = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const report = await Booking.aggregate([
      { $match: { createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
      { $group: { _id: null, totalBookings: { $sum: 1 }, totalRevenue: { $sum: "$price" } } },
    ]);
    
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

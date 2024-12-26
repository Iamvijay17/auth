import User from '../models/user.js';
import Booking from '../models/Booking.js';
import Destination from '../models/Destination.js';

/**
 * Get summary stats for the admin dashboard
 */
export const getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const destinationCount = await Destination.countDocuments();

    res.status(200).json({ userCount, bookingCount, destinationCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all bookings for admin
 */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user').populate('destination');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

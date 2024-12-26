import Booking from '../models/Booking.js';
import Destination from '../models/Destination.js';

/**
 * Get most popular destinations
 */
export const getPopularDestinations = async (req, res) => {
  try {
    const popularDestinations = await Booking.aggregate([
      { $group: { _id: '$destination', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }, // Top 5 most popular destinations
    ]);

    const destinations = await Destination.find({
      _id: { $in: popularDestinations.map(item => item._id) },
    });

    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get booking trends for the past month
 */
export const getBookingTrends = async (req, res) => {
  try {
    const trends = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) },
        },
      },
      { $group: { _id: { $dayOfMonth: '$createdAt' }, count: { $sum: 1 } } },
      { $sort: { '_id': 1 } },
    ]);

    res.status(200).json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import User from '../models/User.js';

/**
 * Award loyalty points to a user based on their total bookings
 */
export const awardLoyaltyPoints = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const totalBookings = await Booking.countDocuments({ user: userId });

    let points = 0;

    if (totalBookings >= 5) {
      points = 100; // Reward 100 points for 5 bookings
    } else if (totalBookings >= 3) {
      points = 50; // Reward 50 points for 3 bookings
    } else if (totalBookings >= 1) {
      points = 10; // Reward 10 points for 1 booking
    }

    user.points += points;
    await user.save();

    res.status(200).json({ message: 'Loyalty points awarded', points: user.points });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Redeem loyalty points for discounts
 */
export const redeemLoyaltyPoints = async (req, res) => {
  const { pointsToRedeem } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (user.points < pointsToRedeem) {
      return res.status(400).json({ message: 'Not enough loyalty points' });
    }

    user.points -= pointsToRedeem;
    await user.save();

    // Apply discount (example: 10 points = $1)
    const discountAmount = pointsToRedeem / 10;

    res.status(200).json({ message: `Discount of $${discountAmount} applied` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

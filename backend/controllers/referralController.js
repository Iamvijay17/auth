import User from '../models/user.js';
import Referral from '../models/Referral.js';

/**
 * Create a referral for a user
 */
export const createReferral = async (req, res) => {
  const { referrerId, referredEmail } = req.body;

  try {
    const referrer = await User.findById(referrerId);
    const referredUser = await User.findOne({ email: referredEmail });

    if (!referredUser) {
      return res.status(404).json({ message: 'Referred user not found' });
    }

    const referral = new Referral({
      referrer: referrerId,
      referred: referredUser._id,
    });

    await referral.save();
    res.status(200).json({ message: 'Referral created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all referrals for a user
 */
export const getReferrals = async (req, res) => {
  const { userId } = req.params;

  try {
    const referrals = await Referral.find({ referrer: userId }).populate('referred');
    res.status(200).json(referrals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

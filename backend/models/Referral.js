import mongoose from 'mongoose';

const referralSchema = new mongoose.Schema(
  {
    referrer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    referred: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rewardEarned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Referral = mongoose.model('Referral', referralSchema);

export default Referral;

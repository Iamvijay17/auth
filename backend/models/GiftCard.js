import mongoose from 'mongoose';

const giftCardSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const GiftCard = mongoose.model('GiftCard', giftCardSchema);

export default GiftCard;

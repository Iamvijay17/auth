import mongoose from 'mongoose';

const discountSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
     codeId: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validTo: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
    },
    deletedBy: {
      type: String,
    },
    createdBy: {
      type: String,
    },
usedBy: [
  {
    type: String
  }
]

  },
  { timestamps: true }
);

discountSchema.methods.isValid = function () {
  const currentDate = new Date();
  return this.isActive && currentDate >= this.validFrom && currentDate <= this.validTo;
};

const Discount = mongoose.model('Discount', discountSchema);

export default Discount;

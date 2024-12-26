import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    destinations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',  // Assuming you have a Destination model
        required: true,
      },
    ],
    duration: {
      type: Number, // Duration in days
      required: true,
    },
    image: {
      type: String, // URL to an image for the package
      default: 'default-image.jpg',
    },
    availability: {
      type: Boolean,
      default: true, // Whether the package is available for booking
    },
  },
  { timestamps: true }
);

const Package = mongoose.model('Package', packageSchema);

export default Package;

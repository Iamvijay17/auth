import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, { timestamps: true });

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviews: [reviewSchema],
}, { timestamps: true });

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;

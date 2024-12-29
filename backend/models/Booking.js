import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  destinationId: { type: String, required: true, unique: true },
  bookingDate: { type: Date, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  numberOfGuests: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;

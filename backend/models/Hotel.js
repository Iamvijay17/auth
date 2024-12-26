import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },  // Vendor adding the hotel
  name: { type: String, required: true },
  location: { type: String, required: true },
  amenities: { type: [String], default: [] },  // List of amenities
  pricePerNight: { type: Number, required: true },
  roomsAvailable: { type: Number, default: 0 },
  imageUrl: { type: String },  // URL to the image of the hotel
  description: { type: String },
  isActive: { type: Boolean, default: true },  // Active status
});

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;

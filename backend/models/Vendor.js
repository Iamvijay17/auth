import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  description: { type: String },
  profileImage: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Vendor = mongoose.model('Vendor', vendorSchema);
export default Vendor;

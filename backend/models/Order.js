import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  bookingDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'canceled'], default: 'pending' },
  totalAmount: { type: Number, required: true },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;

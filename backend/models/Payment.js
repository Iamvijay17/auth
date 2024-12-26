import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;

import mongoose from 'mongoose';

const travelAgencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contactInfo: { type: String },
  website: { type: String },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },  // Vendor who collaborates with the agency
});

const TravelAgency = mongoose.model('TravelAgency', travelAgencySchema);
export default TravelAgency;

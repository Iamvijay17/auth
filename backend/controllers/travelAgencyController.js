import TravelAgency from '../models/TravelAgency.js';

// Add a new travel agency collaboration
export const addTravelAgency = async (req, res) => {
  const { name, location, contactInfo, website } = req.body;
  try {
    const newAgency = new TravelAgency({
      name,
      location,
      contactInfo,
      website,
      vendorId: req.user.id,
    });

    await newAgency.save();
    res.status(201).json(newAgency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all travel agencies associated with a vendor
export const getVendorTravelAgencies = async (req, res) => {
  try {
    const agencies = await TravelAgency.find({ vendorId: req.user.id });
    res.status(200).json(agencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

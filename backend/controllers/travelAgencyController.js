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
export const getTravelAgencyById  = async (req, res) => {
  try {
    const agencies = await TravelAgency.find({ vendorId: req.user.id });
    res.status(200).json(agencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a travel agency
export const updateTravelAgency = async (req, res) => {
  const { name, location, contactInfo, website } = req.body;

  try {
    const agency = await TravelAgency.findById(req.params.id);

    if (!agency) {
      return res.status(404).json({ message: 'Travel Agency not found' });
    }

    if (agency.vendorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this travel agency' });
    }

    agency.name = name || agency.name;
    agency.location = location || agency.location;
    agency.contactInfo = contactInfo || agency.contactInfo;
    agency.website = website || agency.website;

    await agency.save();

    res.status(200).json(agency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a travel agency
export const deleteTravelAgency = async (req, res) => {
  try {
    const agency = await TravelAgency.findById(req.params.id);

    if (!agency) {
      return res.status(404).json({ message: 'Travel Agency not found' });
    }

    if (agency.vendorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this travel agency' });
    }

    await agency.remove();

    res.status(200).json({ message: 'Travel Agency deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get travel agencies filtered by location or service
export const getFilteredTravelAgencies = async (req, res) => {
  const { location, service } = req.query;

  try {
    let filter = {};

    if (location) filter.location = new RegExp(location, 'i');  // Case-insensitive search by location
    if (service) filter.services = { $in: [service] };  // Search by service offered (assuming you store services in an array)

    const agencies = await TravelAgency.find(filter);

    res.status(200).json(agencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Associate a travel agency with a hotel
export const associateTravelAgencyWithHotel = async (req, res) => {
  const { hotelId } = req.body;

  try {
    const agency = await TravelAgency.findById(req.params.id);
    const hotel = await Hotel.findById(hotelId);

    if (!agency) {
      return res.status(404).json({ message: 'Travel Agency not found' });
    }

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    // Update the travel agency or hotel with the reference
    hotel.travelAgencyId = agency._id;  // Assuming the hotel model has a travelAgencyId field
    await hotel.save();

    res.status(200).json({ message: 'Hotel associated with travel agency' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


import Hotel from '../models/Hotel.js';

// Add a hotel
export const addHotel = async (req, res) => {
  const { name, location, amenities, pricePerNight, roomsAvailable, imageUrl, description } = req.body;
  try {
    const newHotel = new Hotel({
      vendorId: req.user.id,
      name,
      location,
      amenities,
      pricePerNight,
      roomsAvailable,
      imageUrl,
      description,
    });

    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get hotels added by the vendor
export const getVendorHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ vendorId: req.user.id });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

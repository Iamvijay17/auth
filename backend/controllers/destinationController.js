import Destination from '../models/Destination.js';

// Get all destinations
export const getAllDestinations = async (req, res) => {
  try {
    const { search, location, minPrice, maxPrice, rating, categories } = req.query;

    const filter = {};
    if (search) filter.name = new RegExp(search, 'i');
    if (location) filter.location = location;
    if (minPrice || maxPrice) filter.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };
    if (rating) filter.rating = { $gte: rating };
    if (categories) filter.categories = { $in: categories.split(",") }; // Filter by multiple categories

    const destinations = await Destination.find(filter);
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get destination by ID
export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new destination
export const createDestination = async (req, res) => {
  try {
    const newDestination = new Destination(req.body);
    const savedDestination = await newDestination.save();
    res.status(201).json({ message: 'Destination created successfully', destination: savedDestination });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update destination
export const updateDestination = async (req, res) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDestination) return res.status(404).json({ message: 'Destination not found' });
    res.status(200).json({ message: 'Destination updated successfully', destination: updatedDestination });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete destination
export const deleteDestination = async (req, res) => {
  try {
    const deletedDestination = await Destination.findByIdAndDelete(req.params.id);
    if (!deletedDestination) return res.status(404).json({ message: 'Destination not found' });
    res.status(200).json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add review
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const destination = await Destination.findById(req.params.id);

    if (!destination) return res.status(404).json({ message: 'Destination not found' });

    // New review structure with user info
    const review = { 
      userId: req.user.id, 
      userName: req.user.name, // Assuming the user's name is available from the auth system
      rating, 
      comment,
      helpfulVotes: 0 
    };
    destination.reviews.push(review);

    // Recalculate rating
    const totalRatings = destination.reviews.reduce((sum, review) => sum + review.rating, 0);
    destination.rating = totalRatings / destination.reviews.length;
    destination.totalReviews = destination.reviews.length; // Update the total reviews count

    await destination.save();
    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

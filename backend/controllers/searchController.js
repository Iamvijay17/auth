import Destination from '../models/Destination.js';

/**
 * Search destinations globally
 */
export const searchDestinations = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required.' });
  }

  try {
    const results = await Destination.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Search in the `name` field
        { description: { $regex: query, $options: 'i' } }, // Search in the `description` field
        { location: { $regex: query, $options: 'i' } } // Search in the `location` field
      ]
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

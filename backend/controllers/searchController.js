import Destination from '../models/Destination.js';

/**
 * Search destinations
 */
export const searchDestinations = async (req, res) => {
  const { query } = req.query;

  try {
    const results = await Destination.find({
      name: { $regex: query, $options: 'i' }, // Case-insensitive search
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

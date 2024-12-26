/**
 * Get nearby attractions
 */
export const getNearbyAttractions = async (req, res) => {
  const { lat, lng, radius } = req.query;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data.results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

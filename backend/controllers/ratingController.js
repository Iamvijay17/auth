export const addRatingForTravelAgency = async (req, res) => {
  try {
    const { id } = req.params; // Travel agency ID
    const { rating } = req.body; // Rating value (e.g., 1-5)

    const travelAgency = await TravelAgency.findById(id);
    if (!travelAgency) return res.status(404).json({ message: 'Travel agency not found' });

    travelAgency.ratings.push(rating);
    await travelAgency.save();

    // Calculate average rating
    const averageRating = travelAgency.ratings.reduce((acc, curr) => acc + curr, 0) / travelAgency.ratings.length;

    res.status(201).json({ message: 'Rating added successfully', averageRating });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getRatingsForTravelAgency = async (req, res) => {
  try {
    const { id } = req.params; // Travel agency ID
    const travelAgency = await TravelAgency.findById(id);

    if (!travelAgency) return res.status(404).json({ message: 'Travel agency not found' });

    const averageRating = travelAgency.ratings.reduce((acc, curr) => acc + curr, 0) / travelAgency.ratings.length;

    res.status(200).json({ averageRating });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
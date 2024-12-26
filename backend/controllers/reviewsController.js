import Review from '../models/Review.js';
import Destination from '../models/Destination.js';

/**
 * Add a new review.
 */
export const addReview = async (req, res) => {
  const { destination, rating, comment } = req.body;

  try {
    // Ensure the destination exists
    const dest = await Destination.findById(destination);
    if (!dest) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    // Create the review
    const review = await Review.create({
      user: req.user.id,
      destination,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all reviews for a destination.
 */
export const getReviewsForDestination = async (req, res) => {
  try {
    const { destinationId } = req.params;

    const reviews = await Review.find({ destination: destinationId })
      .populate('user', 'name email') // Populate user details
      .sort({ createdAt: -1 }); // Sort by latest

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update a review.
 */
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if the user is the owner of the review
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this review' });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    const updatedReview = await review.save();

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a review.
 */
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if the user is the owner or has admin privileges
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to delete this review' });
    }

    await review.deleteOne();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    helpfulVotes: { type: Number, default: 0 }, // To track how many users found the review helpful
  },
  { timestamps: true }
);

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    destinationId: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    images: [{ type: String }], // URLs to images
    price: { type: Number, required: true }, // Price per person
    categories: [{ type: String }], // e.g., Beach, Mountain, City, Adventure
    facilities: [
      {
        name: { type: String },
        icon: { type: String }, // Icon URL or name for better UI representation
      },
    ], // e.g., Free Wi-Fi, Parking, Pool
    activities: [{ type: String }], // Popular activities, e.g., snorkeling, hiking
    rating: { type: Number, default: 0 }, // Average rating
    totalReviews: { type: Number, default: 0 }, // Total number of reviews
    reviews: [reviewSchema],
    popular: { type: Boolean, default: false }, // Mark as popular destination
    availability: { type: Boolean, default: true }, // Availability status
    featured: { type: Boolean, default: false }, // Mark as a featured destination
    duration: { type: String }, // Suggested duration for the trip, e.g., "5 days / 4 nights"
    coordinates: {
      lat: { type: Number }, // Latitude
      lng: { type: Number }, // Longitude
    },
    tags: [{ type: String }], // Tags for search and filtering
    videoUrl: { type: String }, // Optional video showcasing the destination
    seasonalInfo: {
      bestTimeToVisit: { type: String }, // Best months to visit
      weather: { type: String }, // Weather conditions
    },
  },
  { timestamps: true,
    versionKey: false,
   }
);

const Destination = mongoose.model("Destination", destinationSchema);
export default Destination;

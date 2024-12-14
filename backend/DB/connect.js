import mongoose from "mongoose";

// Enable strict query parsing
mongoose.set("strictQuery", true);

// Database connection function
export const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error(
      "Error: MONGODB_URI is not defined in environment variables."
    );
    process.exit(1); // Exit the application if no URI is provided
  }

  const isProduction = process.env.APP_ENV === "production";

  try {
    // Check if the database is already connected
    if (mongoose.connection.readyState !== 0) {
      console.log("MongoDB is already connected.");
      return;
    }

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Connected to MongoDB in ${
        isProduction ? "production" : "development"
      } mode.`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the application on failure
  }
};

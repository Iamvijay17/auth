import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connectDB = async () => {
   const MONGODB_URI = "mongodb+srv://clevermerkle2:EckzTOeZjqb1POOi@curddb.r9ufyvy.mongodb.net/wanderlust_voyages?retryWrites=true&w=majority&appName=wanderlust_voyages";

  const isProduction = process.env.APP_ENV === "production" ? "in production" : "in development";
  try {
    await mongoose.connect(MONGODB_URI);

    console.log(`Connected to MongoDB ${isProduction}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

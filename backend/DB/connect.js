import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connectDB = async () => {
    const MONGODB_URI = process.env.APP_ENV === "production" ? process.env.MONGODB_URI : process.env.MONGODB_URI;
    const isProduction = process.env.APP_ENV === "production" ? "in production" : "in development";
    try {
        await mongoose.connect(MONGODB_URI);

        console.log(`Connected to MongoDB ${isProduction}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connectDB = async () => {

    const MONGODB_URI = process.env.NODE_ENV === "production" ? process.env.MONGODB_LIVE_URI : process.env.MONGODB_URI;
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB" + process.env.NODE_ENV === "production" ? " in production" : " in development");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
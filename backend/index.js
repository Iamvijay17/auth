import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./DB/connect.js";
import swaggerUi from "swagger-ui-express";
import AuthRouter from "./routes/auth.js";
import userRouter from "./routes/userRoutes.js";
import swaggerSpec from "./swagger.js";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const version = process.env.API_VERSION || "v1"; // Default version to 'v1' if not defined


// Update the CORS configuration based on environment
const corsOptions = {
  origin: process.env.NODE_ENV === "production" ? "https://your-frontend-domain.com" : "*", // Use your actual frontend domain in production
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};

app.use(cors(corsOptions));

// Apply compression for response optimization
app.use(compression());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.send("Hello World!");
});




// Set up Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define API routes with versioning
app.use(`/api/${version}`, AuthRouter);
app.use(`/api/${version}`, userRouter);

// Start the server and connect to the database
app.listen(port, () => {
  connectDB(); // Ensure the database is connected
  console.log(`Server is running on port ${port}`);
});
app.get("/test-db", async (req, res) => {
  try {
    await connectDB(); // Ensure the DB connection
    res.status(200).send("MongoDB connected successfully.");
  } catch (error) {
    res.status(500).send("MongoDB connection failed.");
    console.error("MongoDB connection error:", error);
  }
});

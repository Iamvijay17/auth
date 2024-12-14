import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./DB/connect.js";
import swaggerUi from "swagger-ui-express";
import AuthRouter from "./routes/auth.js";
import userRouter from "./routes/userRoutes.js";
import swaggerSpec from "./swagger.js";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const version = process.env.API_VERSION || "v1"; // Default version to 'v1' if not defined

// Set allowed origins for CORS based on environment
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://wanderlustvoyages.vercel.app"]
    : ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

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

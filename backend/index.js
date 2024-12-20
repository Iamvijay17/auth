import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { connectDB } from "./DB/connect.js";
import AuthRouter from "./routes/auth.js";
import userRouter from "./routes/userRoutes.js";
import swaggerSpec from "./swagger.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const version = process.env.API_VERSION || "v1";

// Enable CORS
app.use(cors({
  origin: "*", // Replace with your frontend URL in production
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
}));

app.use(cors(corsOptions));

// Apply compression for response optimization
app.use(compression());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.send("API is running! ✅");
});

// Set up Swagger documentation
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define API routes with versioning
app.use(`/api/${version}`, AuthRouter);
app.use(`/api/${version}`, userRouter);

// Start the server and connect to the database
app.listen(port, () => {
  connectDB(); // Ensure the database is connected
  console.log(`Server is running on port ${port}`);
});

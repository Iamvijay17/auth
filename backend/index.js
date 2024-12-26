import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { connectDB } from "./DB/connect.js";
import AuthRouter from "./routes/auth.js";
import userRouter from "./routes/userRoutes.js";
import swaggerSpec from "./swagger.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import reviewsRoutes from "./routes/reviewsRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import discountRoutes from "./routes/discountRoutes.js";
import favoritesRoutes from "./routes/favoritesRoutes.js";
import mapRoutes from "./routes/mapRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import NotificationRoutes from "./routes/notificationsRoutes.js";
import travelAgencyRoutes from "./routes/travelAgencyRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const version = process.env.API_VERSION || "v1";

// Enable CORS
app.use(cors({
  origin: "*", // Replace with your frontend URL in production
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
}));

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
app.use(`/api/${version}/destinations`, destinationRoutes);
app.use(`/api/${version}/bookings`, bookingRoutes);
app.use(`/api/${version}/reviews`, reviewsRoutes);
app.get(`/api/${version}/search`, searchRoutes);
app.get(`/api/${version}/admin`, adminRoutes);
app.get(`/api/${version}/discount`, discountRoutes);
app.get(`/api/${version}/favorites`, favoritesRoutes);
app.get(`/api/${version}/map`, mapRoutes);
app.get(`/api/${version}/notifications`, NotificationRoutes);
app.get(`/api/${version}/packages`, packageRoutes);
app.get(`/api/${version}/payment`, paymentRoutes);
app.get(`/api/${version}/payment`, reviewsRoutes);
app.get(`/api/${version}/travel-agencies`, travelAgencyRoutes);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server and connect to the database
app.listen(port, () => {
  connectDB(); // Ensure the database is connected
  console.log(`Server is running on port ${port}`);
});

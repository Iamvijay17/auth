import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url"; // Import this for __dirname
import { connectDB } from "./DB/connect.js"; // Database connection function
import adminRoutes from "./routes/adminRoutes.js";
import AuthRouter from "./routes/auth.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import discountRoutes from "./routes/discountRoutes.js";
import favoritesRoutes from "./routes/favoritesRoutes.js";
import mapRoutes from "./routes/mapRoutes.js";
import NotificationRoutes from "./routes/notificationsRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import reviewsRoutes from "./routes/reviewsRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import travelAgencyRoutes from "./routes/travelAgencyRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"; // Import upload routes
import userRouter from "./routes/userRoutes.js";
import swaggerSpec from "./swagger.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const version = process.env.API_VERSION || "v1";

// Define __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS
app.use(cors({
  origin: "*", // Replace with your frontend URL in production
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
app.use(`/api/${version}/search`, searchRoutes);
app.use(`/api/${version}/admin`, adminRoutes);
app.use(`/api/${version}/discount`, discountRoutes);
app.use(`/api/${version}/favorites`, favoritesRoutes);
app.use(`/api/${version}/map`, mapRoutes);
app.use(`/api/${version}/notifications`, NotificationRoutes);
app.use(`/api/${version}/packages`, packageRoutes);
app.use(`/api/${version}/payment`, paymentRoutes);
app.use(`/api/${version}/travel-agencies`, travelAgencyRoutes);
app.use(`/api/${version}/upload`, uploadRoutes);

// Serve static files (like avatars) from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!", message: err.message });
});

// Start the server and connect to the database
app.listen(port, () => {
  connectDB(); // Ensure the database is connected
  console.log(`Server is running on port ${port}`);
});

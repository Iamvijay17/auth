import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from 'http';
import path from "path";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import { connectDB } from "./DB/connect.js";
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
import uploadRoutes from "./routes/uploadRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { setupSocket } from "./socket/setupSocket.js";
import swaggerSpec from "./swagger.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const version = process.env.API_VERSION || "v1";

const server = http.createServer(app);
setupSocket(server);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(compression());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("API is running! ✅");
});



app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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
app.use(`/api/${version}/asdfasf`, NotificationRoutes);
app.use(`/api/${version}/packages`, packageRoutes);
app.use(`/api/${version}/payment`, paymentRoutes);
app.use(`/api/${version}/travel-agencies`, travelAgencyRoutes);
app.use(`/api/${version}/upload`, uploadRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!", message: err.message });
});

server.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});

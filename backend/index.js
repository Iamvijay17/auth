import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./DB/connect.js";

import AuthRouter from "./routes/auth.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const version = process.env.API_VERSION;



app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(`/api/${version}`, AuthRouter);
app.use(`/api/${version}`, userRouter);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});
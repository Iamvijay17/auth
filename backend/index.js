import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./DB/connect.js";
import swaggerUi from "swagger-ui-express"

import AuthRouter from "./routes/auth.js";
import userRouter from "./routes/userRoutes.js";
import swaggerSpec from "./swagger.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const version = process.env.API_VERSION;


app.get("/", (req, res) => {
    res.send("Hello World!");
});

const allowedOrigins = process.env.NODE_ENV === 'production' ? ['https://wanderlustvoyages.vercel.app'] : ['http://localhost:3000'];

// app.use(cors({
//     origin: allowedOrigins,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET", "PUT", "DELETE", "POST", "PATCH"],
    credentials: true
}))

app.use(compression());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(`/api/${version}`, AuthRouter);
app.use(`/api/${version}`, userRouter);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});

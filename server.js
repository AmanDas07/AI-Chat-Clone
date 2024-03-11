import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./config/db.js"
import fs from "fs";
import path from 'path';
import errorHandler from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoute.js"
import openaiRoutes from "./routes/openaiRoutes.js"
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(errorHandler);

dotenv.config();

connectDb();


app.use("/api/v1", authRoutes);
app.use("/api/v1/openai", openaiRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.DEV_MODE} mode on ${PORT}`.bgBlue.white);
})
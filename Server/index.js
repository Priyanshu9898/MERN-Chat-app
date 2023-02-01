import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./Routes/UserRouter.js";

dotenv.config({
    path: "./config/config.env"
})


const app = express();

app.use(cors());
app.use(express.json());

import { connectDB } from "./config/Database.js";
const PORT = process.env.PORT || 5000;
// console.log(PORT);

connectDB();

app.use("/api/auth", auth);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    
});
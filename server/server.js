import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import mongoose from "mongoose";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

app.get("/", (req, res) => res.send("API RUNNING"))

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
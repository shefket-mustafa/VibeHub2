import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import mongoose from "mongoose";


import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";
import { postRoutes } from "./routes/postRoutes.js";
import friendsRoutes from "./routes/friendsRoute.js";
import { groupsRoutes } from "./routes/groupsRoute.js";

dotenv.config(); //import .env variables

const app = express(); //initiate an express server instance
app.use(cors()); // enable cross origin recource sharing else may see errors
app.use(express.json()); // parses json data to req.body

const PORT = process.env.PORT || 3000; // setting a fallback for the port

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("Missing MONGO_URI in environment variables");
}

mongoose.connect(mongoUri) //connecting our server to the backend
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

app.get("/", (req, res) => res.send("API RUNNING")) // check if the app is running on / request
app.use("/auth", registerRoute); //connecting the routes to the server
app.use("/auth", loginRoute);
app.use("/posts", postRoutes);
app.use("/friends", friendsRoutes);
app.use("/groups", groupsRoutes);


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)); //listen for requests 
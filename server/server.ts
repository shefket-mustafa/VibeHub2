import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import mongoose from "mongoose";


import registerRoute from "./routes/registerRoute.ts";
import loginRoute from "./routes/loginRoute.ts";


dotenv.config(); //import .env variables

const app = express(); //initiate an express server instance
app.use(cors()); // enable cross origin recource sharing else may see errors
app.use(express.json()); // parses json data to req.body

const PORT = process.env.PORT || 3000; // setting a fallback for the port

mongoose.connect(process.env.MONGO_URI) //connecting our server to the backend
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

app.get("/", (req, res) => res.send("API RUNNING")) // check if the app is running on / request
app.use("/auth", registerRoute); //connecting the routes to the server
app.use("/auth", loginRoute);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)); //listen for requests 
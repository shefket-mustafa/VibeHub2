import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import http from "http"
import { Server } from "socket.io"

import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";
import { postRoutes } from "./routes/postRoutes.js";
import friendsRoutes from "./routes/friendsRoute.js";
import { groupsRoutes } from "./routes/groupsRoute.js";
import {addUser, removeUser, getAllOnlineUsers, getUserSocketId} from "./socketStore.js"
import { DirectMessages } from "./models/directMessages.js";
import messagesRoutes from "./routes/messagesRoute.js";

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
app.use("/messages", messagesRoutes);

// --- SOCKET.IO SETUP ---  
const server = http.createServer(app); //This creates the real HTTP server from our Express app.
//Express app is just a request handler. http.createServer(app) makes a full server object so Socket.IO can attach to it.

const io = new Server(server, {
  //This creates a Socket.IO server attached to the same HTTP server.
  cors: {origin: "*"} 
  //means “accept WebSocket connections from any origin”
  //Without this browser would block it.
})


io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  //This runs every time a client connects via Socket.IO.
  // socket.id is the unique ID Socket.IO gives each client connection.

  socket.on("privateMessage", async({senderId, recipientId, content}) => {
    //saving on db
    try{
      const message = await DirectMessages.create({
        senderId,
        recipientId,
        content
      })

      const safeMessage = {
        _id: message._id.toString(),
        senderId: message.senderId.toString(),
        recipientId: message.recipientId.toString(),
        content: message.content,
        createdAt: message.createdAt,
      };

      //emit to recipient if online
      const recipientSocketId = getUserSocketId(recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("privateMessage", safeMessage);
      }
    //  ADD THIS so sender also gets the saved message instantly
      socket.emit("privateMessage", safeMessage);


    }catch(err){
      console.error("Error sending private message:", err);
    }
  })

  socket.on("userOnline", (userId) => {
    addUser(userId, socket.id)
    console.log("Online users: ", getAllOnlineUsers())

    io.emit("onlineUsers", getAllOnlineUsers())
    //The client sends an event called "userOnline" with its userId.
    //Server saves that in onlineUsers[userId] = socket.id.
    //Then broadcasts an "onlineUsers" event with all online user IDs to everyone.
  })

  socket.on("disconnect", () => {
    removeUser(socket.id)

    io.emit("onlineUsers", getAllOnlineUsers())
    console.log("User disconnected: ",socket.id)
    //Socket.IO fires this automatically when the client closes the page or loses connection.
    //We loop over onlineUsers to find which userId had this socket.id and remove them.
    //Then broadcast the updated list of online users again.
  })
})

server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)); //listen for requests 

export { io }

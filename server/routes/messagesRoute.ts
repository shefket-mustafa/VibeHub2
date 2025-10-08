import { Router } from "express";
import express from "express"
import { RequestWithUser, authMiddleware } from "../middlewares/authMiddleware.js";
import { DirectMessages } from "../models/directMessages.js";

const messagesRoutes = Router();

messagesRoutes.get("/:friendId", authMiddleware, async(req: RequestWithUser, res: express.Response) => {
    try{

        const userId = req.user?.id;
        const {friendId} = req.params;
    
        if(!userId) return res.status(401).json({error: "Unauthorized!"});
    
        const messages = await DirectMessages.find({
            $or: [
                { senderId: userId, recipientId: friendId },
                { senderId: friendId, recipientId: userId },
            ]
        }).sort({createdAt: 1}).lean()// plain JS objects

          // convert ObjectIds to strings
    const safeMessages = messages.map((m) => ({
        ...m,
        _id: m._id.toString(),
        senderId: m.senderId.toString(),
        recipientId: m.recipientId.toString(),
      }));
    
        return res.json({messages: safeMessages})

    }catch(err){
        return res.status(500).json({error: "Server error!"})
    }

})

export default messagesRoutes;
import { Router } from "express";
import express from "express"
import { RequestWithUser, authMiddleware } from "../middlewares/authMiddleware.js";
import { DirectMessages } from "../models/directMessages.js";

const messagesRoutes = Router();

messagesRoutes.get("/friendId", authMiddleware, async(req: RequestWithUser, res: express.Response) => {
    try{

        const userId = req.user?.id;
        const {friendId} = req.params;
    
        if(!userId) return res.status(401).json({error: "Unauthorized!"});
    
        const messages = await DirectMessages.find({
            $or: [
                {sender:userId, recipient:friendId},
                {sender:friendId, recipient: userId}
            ]
        }).sort({createdAt: 1})
    
        return res.json(messages)

    }catch(err){
        return res.status(500).json({error: "Server error!"})
    }

})

export default messagesRoutes;
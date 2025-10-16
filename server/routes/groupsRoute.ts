import { Router } from "express";
import express from "express";
import { RequestWithUser, authMiddleware } from "../middlewares/authMiddleware.js";
import { Group } from "../models/Group.js";
import mongoose from "mongoose";
import { GroupMessages } from "../models/GroupMessages.js";


export const groupsRoutes = Router();

groupsRoutes.post("/create", authMiddleware, async (req: RequestWithUser,res: express.Response) => {

    try{
        const { name, description, type } = req.body;

        const group = new Group({
         name,
         description,
         owner: req.user?.id,
         members: [req.user?.id]
        })
     
        await group.save();
        res.json({message: "Group successfully created!", group})
    }catch(err){
        return res.status(500).json({error: "Server error!"})
    }
    
})

groupsRoutes.get("/my-groups", authMiddleware, async(req: RequestWithUser, res: express.Response) => {

    try{
        const groups = await Group.find({members: req.user?.id}).populate("members", "username email").populate("owner", "username email");;

        res.json(groups)
    }catch(err){
        res.status(500).json({error: "Server error!"})
    }
})

groupsRoutes.get("/discover", authMiddleware, async(req: RequestWithUser, res: express.Response) => {


    try{
        const groups = await Group.find({members: {$nin: [req.user?.id]}}).populate("members", "username email").populate("owner", "username email")
        // Give me all groups where the members array does not include this user id.
        
        res.json(groups)
    }catch(err){
        return res.status(500).json({error: "Server error!"})
    }
})

groupsRoutes.get("/:id", authMiddleware, async(req: RequestWithUser, res: express.Response) => {
    try{

        const group = await Group.findById(req.params.id)
        .populate("members", "username email")
        .populate("owner", "username email");;
        if (!group) return res.status(404).json({ message: "Group not found" });
        res.json(group);
    }catch(err){
        return res.status(500).json({error: "Server error!"})
    }
})

groupsRoutes.delete("/delete/:id", authMiddleware, async(req: RequestWithUser, res: express.Response) => {

    try {
        const {id} = req.params;
        const userId = req.user?.id;
        
        const group = await Group.findById(id);
        if(!group){
            return res.status(400).json({error: "Group not found!"})
        }
        if(group.owner.toString() !== userId){
            return res.status(401).json({error: "You are not the owner!"})
        }

            await Group.findByIdAndDelete(id);

        return res.json({message: "Group successfully deleted!"})
    }catch(err){
        return res.status(500).json({error: "Server error!"})
    }
})

groupsRoutes.post("/join/:id", authMiddleware, async (req: RequestWithUser, res: express.Response) => {

    try{
        const {id} = req.params;
        const user = req.user?.id;
        const userId = new mongoose.Types.ObjectId(user);
        const group = await Group.findById(id);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
          }
        if(!group){
            return res.status(404).json({error: "Group not found"})
        };

        if(group.members.includes(userId)){
            return res.status(400).json({error: "You have already joined this group!"})
        }

        group.members.push(userId);
        await group.save();
        return res.json({message: "You have joined the group!"})
    }catch(err){
        res.status(500).json({error: "Server error!"})
    }
})

groupsRoutes.get("/:id/messages", authMiddleware, async(req: RequestWithUser, res: express.Response) => {

    try{
        const {id} = req.params;
        const user = new mongoose.Types.ObjectId(req.user?.id);
        const group = await Group.findOne({_id: id, members: user});
        if(!group){
            return res.status(404).json({error: "Group not found!"})
        }
     
        const messages = await GroupMessages.find({group: id})
        .populate("sender", "username email")
        .sort({createdAt: -1}) //oldest->newest

        return res.json(messages)

    }catch(err){
        return res.status(500).json({error: "Server error!"})
    }
})

groupsRoutes.post("/:id/messages", authMiddleware, async(req: RequestWithUser, res: express.Response) => {

    try {

        const {id} = req.params;
        const userId = new mongoose.Types.ObjectId(req.user?.id);
        const {text} = req.body;
        const group = await Group.findOne({_id: id, members: userId});
        if(!group){
            return res.status(400).json({error: "You are not a member of this group!"})
        }

        const newMessage = new GroupMessages({
            group: id,
            sender: userId,
            text
        })

        await newMessage.save();
        await newMessage.populate("sender", "username email")
        return res.json({message: "Message sent!", newMessage})
    }catch(err){
        return res.status(500).json({error: "Server error!"})
    }
})
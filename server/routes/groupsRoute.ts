import { Router } from "express";
import express from "express";
import { RequestWithUser, authMiddleware } from "../middlewares/authMiddleware.js";
import { Group } from "../models/Group.js";


export const groupsRoutes = Router();

groupsRoutes.post("/create", authMiddleware, async (req: RequestWithUser,res: express.Response) => {

    try{
        const { name, description, type } = req.body;

        const group = new Group({
         name,
         description,
         type,
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
        const groups = await Group.find({members: req.user?.id});

        res.json(groups)
    }catch(err){
        res.status(500).json({error: "Server error!"})
    }
})

groupsRoutes.get("/discover", authMiddleware, async(req: RequestWithUser, res: express.Response) => {


    try{
        const groups = await Group.find({members: {$ne: req.user?.id}})

        res.json(groups)
    }catch(err){
        return res.status(500).json({error: "Server error!"})
    }
})

groupsRoutes.get("/:id", authMiddleware, async(req: RequestWithUser, res: express.Response) => {
    try{

        const group = await Group.findById(req.params.id).populate("members", "username email");
        if (!group) return res.status(404).json({ message: "Group not found" });
        res.json(group);
    }catch(err){
        return res.status(500).json({error: "Server error!"})
    }
})
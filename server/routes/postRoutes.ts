import { Router } from "express";
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import Post from "../models/Post.ts";


export const postRoutes = Router();

postRoutes.post("/create", authMiddleware, async (req: any,res: express.Response) => {

    try{
        const { content } = req.body;

        const newPost = await Post.create({
            content,
            authorId: req.user.id
        })

        return res.status(201).json(newPost);


    }catch(err){
        console.error(err)
        return res.status(500).json({error: "Failed to create a post"})
    }

})

postRoutes.get("/allPosts", async (req: express.Request, res: express.Response) => {

    try {
        const result = await Post.find({}).sort({createdAt: -1})
        return res.status(201).json(result)

    }catch(err){
        return res.status(500).json({error: "Failed to fetch posts!"})
    }

})
import { Router } from "express";
import express from "express";
import {  authMiddleware } from "../middlewares/authMiddleware.ts";
import type {  DecodedUser } from "../middlewares/authMiddleware.ts";
import Post from "../models/Post.ts";


export const postRoutes = Router();
type RequestWithUser = express.Request & { user?: DecodedUser };

postRoutes.post("/create", authMiddleware, async (req: RequestWithUser,res: express.Response) => {

    try{
        const { content } = req.body;

        if (!req.user) {
            return res.status(401).json({ error: "Not authenticated" });
          }

        const newPost = await Post.create({
            content,
            authorId: req.user.id,
            authorName: req.user.username
        })

        return res.status(201).json(newPost);


    }catch(err){
        console.error(err)
        return res.status(500).json({error: "Failed to create a post"})
    }

})

postRoutes.get("/allPosts", async (req: express.Request, res: express.Response) => {

    try {
        const result = await Post.find({}).sort({createdAt: -1}).lean()

        const posts = result.map(p => ({
            ...p,
            authorId: p.authorId.toString(),
          }));
        return res.status(201).json(posts)

    }catch(err){
        return res.status(500).json({error: "Failed to fetch posts!"})
    }

})

postRoutes.delete("/delete/:id", authMiddleware, async (req: RequestWithUser, res: express.Response) => {

    try{

        if(!req.user){
            return res.status(401).json({error: "Not authenticated!"})
        }
        const postId  = req.params.id;

        const result = await Post.findOneAndDelete({
            _id: postId,
            authorId: req.user.id
        })

        if (!result) {
            return res.status(403).json({ error: "Not allowed to delete this post" });
          }
          return res.json({message: "Post deleted successfully!"})

    }catch(err){
        console.error(err);
        return res.status(500).json({ error: "Failed to delete post" });
    
    }

}) 
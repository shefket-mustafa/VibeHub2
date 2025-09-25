import { Router } from "express";
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import type { DecodedUser } from "../middlewares/authMiddleware.js";
import Post from "../models/Post.js";
import mongoose from "mongoose";
import multer from "multer"
import cloudinary from "../cloudinary.js";
import streamifier from "streamifier";
import type { UploadApiResponse } from "cloudinary";

const upload = multer({storage: multer.memoryStorage() });

export const postRoutes = Router();
type RequestWithUser = express.Request & { user?: DecodedUser };


postRoutes.post(
  "/create",
  authMiddleware,
  upload.single("file"),
  async (req: RequestWithUser, res: express.Response) => {
    try {
      const { content } = req.body;

        // Upload to Cloudinary if a file is attached
      let imageUrl:string | null = null;


      if(req.file){
        const file = req.file;
        const result: UploadApiResponse = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "posts" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result as UploadApiResponse);
            }
          )
          streamifier.createReadStream(file.buffer).pipe(stream);
        }) 
        imageUrl = result.secure_url;
      }

      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const newPost = await Post.create({
        content,
        image: imageUrl,
        authorId: req.user.id,
        authorName: req.user.username,
      });

      return res.status(201).json(newPost);
    } catch (err) {
      console.error("❌ Post creation failed:", err);
      return res.status(500).json({ error: String(err) });
    }
  }
);

postRoutes.get(
  "/allPosts",
  async (req: RequestWithUser, res: express.Response) => {
    try {
      const result = await Post.find({}).sort({ createdAt: -1 }).lean();
      const userId = req.user?.id;

      const posts = result.map((p) => ({
        ...p,
        authorId: p.authorId.toString(),
        likes: p.likes.length,
        liked: userId ? p.likes.some((u) => u.toString() === userId) : false,
      }));
      return res.status(201).json(posts);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch posts!" });
    }
  }
);

postRoutes.delete(
  "/delete/:id",
  authMiddleware,
  async (req: RequestWithUser, res: express.Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated!" });
      }
      const postId = req.params.id;

      const result = await Post.findOneAndDelete({
        _id: postId,
        authorId: req.user.id,
      });

      if (!result) {
        return res
          .status(403)
          .json({ error: "Not allowed to delete this post" });
      }
      return res.json({ message: "Post deleted successfully!" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete post" });
    }
  }
);

postRoutes.patch(
  "/:id/like",
  authMiddleware,
  async (req: RequestWithUser, res: express.Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated!" });
      }

      const postId = req.params.id;
      const userId = req.user.id;

      const post = await Post.findById(postId);
      if (!post) return res.status(401).json({ error: "Post not found!" });

      const alreadyLikedPosts = post.likes.some((u) => u.toString() === userId);

      if (alreadyLikedPosts) {
        //Unlike
        post.likes = post.likes.filter((u) => u.toString() !== userId);
      } else {
        post.likes.push(new mongoose.Types.ObjectId(userId));
      }

      await post.save();
      return res.json({ likes: post.likes.length, liked: !alreadyLikedPosts });
      return;
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to like post!" });
    }
  }
);

postRoutes.get(
  "/user/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      const posts = await Post.find({ authorId: req.params.id })
        .sort({ createdAt: -1 })
        .lean();

      const normalized = posts.map((p) => ({
        ...p,
        authorId: p.authorId.toString(),
      }));

      return res.json(normalized);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch user posts" });
    }
  }
);

postRoutes.post(
  "/:id/comments",
  authMiddleware,
  async (req: RequestWithUser, res: express.Response) => {
    try {
      if (!req.user)
        return res.status(401).json({ error: "Not Authenticated!" });

      const { content } = req.body;
      if (!content || content.trim().length === 0) {
        return res.status(400).json({ error: "Comment  is required" });
      }

      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ error: "Post not found" });

      post.comments.push({
        authorId: req.user.id,
        authorName: req.user.username,
        content,
      });

      await post.save();

      res.json(post.comments[post.comments.length - 1]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to add comment!" });
    }
  }
);

postRoutes.get(
  "/:id/comments",
  async (req: express.Request, res: express.Response) => {
    try {
      const post = await Post.findById(req.params.id).lean();
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post.comments || []);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed fetching comments" });
    }
  },

);

postRoutes.post("/upload-image", upload.single("file"), (req: RequestWithUser, res: express.Response) => {
  //expects one file from a form field named "file".
  if(!req.file){
    //Multer attaches the file info to req.
    return res.status(400).json({error: "No file uploaded"});
  }
  res.json({message: "File uploaded", file: req.file})
})
import { Router } from "express";
import express from "express"
import { RequestWithUser, authMiddleware } from "../middlewares/authMiddleware.js";
import type { UploadApiResponse } from "cloudinary";
import cloudinary from "../cloudinary.js";
import streamifier from "streamifier"
import User from "../models/User.js";
import multer from "multer"

const userRoutes = Router();

const upload = multer({storage: multer.memoryStorage() });

userRoutes.put("/editProfile/:id", authMiddleware, upload.single("profilePicture"), async(req: RequestWithUser, res: express.Response) => {

    try{
        if(!req.user || req.user.id !== req.params.id) return res.status(403).json({error: "Unauthorized!"});

        const {username, bio, age, city, country} = req.body;

        if(username){
            const currentUser = await User.findById(req.params.id);
            if(username !== currentUser?.username) {

                const existingUsername = await User.findOne({ username });
                if(existingUsername && existingUsername._id.toString() !== req.params.id) { 
                    //existingUser._id is a MongoDB ObjectId thats why toString
                    
                    return res.status(400).json({error: "Username already taken!"})
                }
            }
        }
        let profilePictureUrl = req.body.profilePicture;

        if(req.file){
            const result: UploadApiResponse = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {folder: "avatars"},
                    (error, result) => {
                        if(error) reject(error);
                        else resolve(result as UploadApiResponse)
                    }
                )
                streamifier.createReadStream(req.file!.buffer).pipe(stream)
            })
            profilePictureUrl = result.secure_url;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {username, bio, age, city, country, profilePicture: profilePictureUrl},
            {new: true}
        )

        return res.json(updatedUser)

    }catch(err){
        console.error("Failed to update profile!", err);
        return res.status(500).json({error: String(err)})
    }
})

export default userRoutes;
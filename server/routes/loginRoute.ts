import { Router } from "express"
import express from "express"
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const loginRoute = Router();

loginRoute.post("/login", async (req: express.Request,res: express.Response) => {
try{
    const { email, password} = req.body;

    
    const existingUser = await User.findOne({ email });
    if(!existingUser) {
        return res.status(400).json({error: "Invalid credentials!"})
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if(!isMatch) return res.status(401).json({error: "Invalid credentials!"})

        const token = jwt.sign(
            {id: existingUser._id, email: existingUser.email, username: existingUser.username},
            process.env.JWT_SECRET as string, {expiresIn: "2h"}
        )

    return res.json({token, user: {id: existingUser._id, username: existingUser.username, email: existingUser.email}})
}catch(err){
    console.error(err)
    return res.status(500).json({error: "Login failed!"})
}
   
})

loginRoute.post("/forgot-password", async (req: express.Request,res: express.Response) => {

    try {
        const { email } = req.body;

        const user =await User.findOne({email});
        if (!user){
            return res.status(401).json({error: "User not found!"})
        };

        const resetToken = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {expiresIn: "15m"});

        console.log("Generated reset token:", resetToken);
        res.json({token: resetToken})

    }catch(err){
        console.error(err);
        return res.status(500).json({error: "Failed to reset password!"})
        
    }
})

loginRoute.post("/forgotten-password/:token", async (req: express.Request, res: express.Response) => {

    try {
        const { password } = req.body;
        const { token } = req.params;

        if(!password) {
            return res.status(401).json({error: "Password is required!"})
        }

        let decoded;
        try{
            decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {id: string}

        }catch(err){
            console.error(err);
            return res.status(500).json({error: "Invalid token"})
        }

        let user = await User.findById(decoded.id);

        if(!user){
            return res.status(401).json({error: "User not found"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword
        await user.save()

        return res.json({message: "Password successfully reset!"})


    }catch(err){
        console.error(err);
        return res.status(500).json({error: "Password reset failed"})
    }
})

export default loginRoute;
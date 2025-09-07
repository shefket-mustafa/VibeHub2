import { Router} from "express"
import express from "express"
import bcrypt from "bcrypt";
import User from "../models/User.js";

const registerRoute = Router();

registerRoute.post("/register", async (req: express.Request,res: express.Response) => { // doing the express. insteead
try{                                                                        //of importing them cuz of the module type 
    const { username, email, password} = req.body;                           //made id :module in package 

    
    const existingUser = await User.findOne({ email });
    
    if(existingUser) {
        return res.status(400).json({error: "Email already in use!"})
    }

    const existingUsername = await User.findOne({ username });
    
    if(existingUser) {
        return res.status(400).json({error: "Email already in use!"})
    }
    if(existingUsername) {
        return res.status(400).json({error: "Username already in use!"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({username, email, password: hashedPassword})

    return res.status(201).json({message: "User registered successfully!"})
}catch(err){
    console.error(err)
    return res.status(500).json({error: "Registration failed!"})
}
})

export default registerRoute;
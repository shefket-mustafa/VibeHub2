import { Router } from "express";
import express from "express";


const postRoutes = Router();

postRoutes.post("/create", (req: express.Request,res: express.Response) => {

    try{
        

    }catch(err){
        console.error(err)
        throw new Error("Failed to create a post!")
    }

})
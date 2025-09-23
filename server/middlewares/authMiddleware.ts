import jwt from "jsonwebtoken";
import express from "express"

 export type DecodedUser = {
    id: string;
    username: string;
    email: string;
  };

  export type RequestWithUser = express.Request & { user?: DecodedUser };

export const authMiddleware = (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).json({error: "No token provided!"});

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedUser;
        req.user = decoded; // access to user in the routes
        next();

    }catch(err){
        return res.status(401).json({error: "Invalid token"})
    }
}

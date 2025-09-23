import { Router } from "express";
import express from "express";
import {
  RequestWithUser,
  authMiddleware,
} from "../middlewares/authMiddleware.js";
import { FriendRequest } from "../models/FriendRequests.js";
import User from "../models/User.js";

const friendsRoutes = Router();

friendsRoutes.post( "/request/:recipientId", authMiddleware,
  async (req: RequestWithUser, res: express.Response) => {
    try {
      const requesterId = req.user?.id;
      const { recipientId } = req.params;

      if (!requesterId) {
        return res.status(401).json({ error: "Unauthorized!" });
      }

      if (requesterId === recipientId) {
        return res
          .status(400)
          .json({ error: "Cannot send a request to yourself!" });
      }

      const existing = await FriendRequest.findOne({

        $or: [
            {requester: requesterId, recipient: recipientId},
            {requester: recipientId, recipient: requesterId}
        ]
      })

      if (existing && existing.status === "accepted") {
        return res.status(400).json({ error: "Friend request already sent!" });
      }


      const newFriendRequest = new FriendRequest({
        requester: requesterId,
        recipient: recipientId,
      });

      await newFriendRequest.save();
      return res.json({message: "Friend request sent!", newFriendRequest})
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }
);

friendsRoutes.patch("/accept/:requestId", authMiddleware, async (req: RequestWithUser,res: express.Response) => {

    try{
            const {requestId} = req.params;
            const requesterId = req.user?.id;

            if(!requesterId){
                return res.status(400).json({error: "Unauthorized action!"})
            }

            const request = await FriendRequest.findById(requestId); 

            if(!request || request.status !== "pending"){
                return res.status(400).json({error: "Request already accepted!"})
            }

            if(request.recipient.toString() !== requesterId){
                return res.status(403).json({error: "Not authorized to accept this request!"})
            }
            
            request.status = "accepted";
            await request.save(); 

            return res.json({ message: "Friend request accepted!", request });

    }catch(err){
        console.error(err);
        return res.status(500).json({error: "Server error!"})
    }
})

friendsRoutes.get("/all", authMiddleware, async(req: RequestWithUser, res: express.Response) => {
    try{

        const userId = req.user?.id;
        if(!userId) {
            return res.status(400).json({error: "Unauthorized!"})
        };

        const requests = await FriendRequest.find({
            $or: [{recipient: userId}, {requester: userId}],
            status: "accepted"
        })
        .populate("requester", "_id username email")
        .populate("recipient", "_id username email")

        const friends = requests.map((req) => {
            if(req.requester._id.toString() === userId){
                return req.recipient
            } else {
                return req.requester
            }
        })

        return res.json({message: "Friends fetched successfully", friends })

    }catch(err){
        console.error(err);
        return res.status(500).json({error: "Server error!"})
    }
})

friendsRoutes.get("/incoming", authMiddleware, async(req: RequestWithUser, res: express.Response) => {
    try{
        const userId = req.user?.id;

        if(!userId){
            return res.status(401).json({error: "Not authorized!"})
        }
        const incomingRequests = await FriendRequest.find({
            recipient: userId,
            status: "pending"
        })
        .populate("requester", "_id username email")

        return res.json({incomingRequests})

    }catch(err){
        console.error(err);
        return res.status(500).json({error: "Server error!"})
    }
})

friendsRoutes.delete("/delete/:requestId/cancel", authMiddleware, async (req: RequestWithUser, res: express.Response) => {

    try{
        const userId = req.user?.id;
        const {requestId} = req.params;

        if(!userId){
            return res.status(401).json({error: "Not authorized!"})
        }

        const requestDocument = await FriendRequest.findById(requestId);

        if(!requestDocument || requestDocument.status !== "pending"){
            return res.status(404).json({error: "Pending request not found"})
        }
        if(requestDocument.requester.toString() !== userId){
            return res.status(401).json({error: "Not authorized to cancel this request"})
        }

        await requestDocument.deleteOne();
        return res.json({message: "Request cancelled!"})
    }catch(err){
        console.error(err);
        return res.status(500).json({error: "Server error"});
    };
})

friendsRoutes.delete("/delete/:friendId/remove", authMiddleware, async(req: RequestWithUser, res: express.Response) => {

    try{
        const userId = req.user?.id;
        const {friendId} = req.params;

        if(!userId){
            return res.status(401).json({error: "Not authorized!"})
        }

        const friend = await FriendRequest.findOneAndDelete({
            status: "accepted",
            $or: [
                {requester: userId, recipient: friendId},
                {requester: friendId, recipient: userId}
            ]
        })

        if(!friend){
            return res.status(404).json({error: "Friend not found!"})
        }

        return res.json({message: "Friend removed!"})


    }catch(err){
        console.error(err);
        return res.status(500).json({error: "Server error!"})
    }
})

friendsRoutes.get("/suggestions", authMiddleware, async(req: RequestWithUser, res: express.Response) => {

    try{
        const userId = req.user?.id;
        if(!userId){
            return res.status(401).json({error: "Not authorized!"})
        }

          // Finding BOTH accepted and pending relationships involving this user
        const related = await FriendRequest.find({
            $or: [{requester: userId}, {recipient: userId}],
            status: {$in: ["accepted", "pending"]}
        })

          // Find BOTH accepted and pending relationships involving this user
        const excludedIds = new Set<string>([userId]);
        for (const request of related){
            excludedIds.add(request.requester.toString())
            excludedIds.add(request.recipient.toString())
        }

        //Look for collections is user that do not have id's from our list and limit the document to id username and email and 20   
        const suggestions = await User.find({
            _id: {$nin: Array.from(excludedIds)}
            
        }).select("_id username email")
        .limit(20)

        return res.json({ suggestions })

    }catch(err){
        console.error(err);
        return res.status(500).json({error: "Server error!"})
    }
})

friendsRoutes.delete("/decline/:requestId", authMiddleware, async (req: RequestWithUser, res) => {
    const userId = req.user?.id;
    const { requestId } = req.params;
  
    if (!userId) return res.status(401).json({ error: "Not authorized!" });
  
    const requestDocument = await FriendRequest.findById(requestId);
  
    if (!requestDocument || requestDocument.status !== "pending") {
      return res.status(404).json({ error: "Pending request not found" });
    }
  
    if (requestDocument.recipient.toString() !== userId) {
      return res.status(401).json({ error: "Not authorized to decline this request" });
    }
  
    await requestDocument.deleteOne();
    return res.json({ message: "Request declined!" });
  });

export default friendsRoutes;

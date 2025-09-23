import mongoose, { Schema } from "mongoose";

const friendRequestsSchema = new Schema({

    requester: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    recipient: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    status: {
        type: String,
        enum: ["pending", "accepted"],
        default: "pending"
    }
}, {timestamps: true})

export const FriendRequest = mongoose.model("FriendRequest", friendRequestsSchema);
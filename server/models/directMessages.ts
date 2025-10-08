import mongoose from "mongoose";

const directMessages = new mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    recipientId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    content: {type: String, required: true}
},{timestamps: true});

export const DirectMessages = mongoose.model("DirectMessages", directMessages);
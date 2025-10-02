import mongoose from "mongoose";
import { Schema } from "mongoose";

 const groupMessagesSchema = new Schema({
    group: {type: Schema.Types.ObjectId, ref: "Group", required: true},
    sender: {type: Schema.Types.ObjectId, ref: "User", required: true},
    text: String,
    createdAt: {type: Date, default: Date.now}
},{timestamps: true})

export const GroupMessages = mongoose.model("GroupMessages", groupMessagesSchema)

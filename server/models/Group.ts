import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema({

    name: {type: String, required: true, minLength: 3},
    description: {type: String, required: true, minLength: 10},
    type: {type: String, enum: ["public", "private"], default: "public"},
    owner: {type: Schema.Types.ObjectId, ref: "User", required: true},
    members: [{type: Schema.Types.ObjectId, ref: "User"}]
}, {timestamps: true});

export const Group = mongoose.model("Group", groupSchema);
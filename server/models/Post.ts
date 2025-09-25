import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    authorId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    authorName: { type: String, required: true },
    content: { type: String, required: true, maxLength: 300 },
    createdAt: { type: Date, default: Date.now }
})

const postSchema = new Schema({
    authorId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    authorName: { type: String, required: true },
    content: {type: String, required: true, maxLength: 500},
    image: {type: String},
    likes: [{type: Schema.Types.ObjectId, ref: "User"}],
    comments: [commentSchema]
}, {timestamps: true})

export default mongoose.model("Post", postSchema)
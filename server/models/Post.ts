import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    authorId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    content: {type: String, required: true, maxLength: 500},
    likes: [{type: Schema.Types.ObjectId, ref: "User"}]
})

export default mongoose.model("Post", postSchema)
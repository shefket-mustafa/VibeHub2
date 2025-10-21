import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    bio: {type: String, default: ""},
    age: {type: String, default: ""},
    city: {type: String, default: ""},
    profilePicture: {type: String, default: ""} //for Cloudinary
}, {timestamps: true})

export default mongoose.model("User", userSchema)
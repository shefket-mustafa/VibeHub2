import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";
const loginRoute = Router();
loginRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: "Invalid credentials!" });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch)
            return res.status(401).json({ error: "Invalid credentials!" });
        const token = jwt.sign({ id: existingUser._id, email: existingUser.email, username: existingUser.username }, process.env.JWT_SECRET, { expiresIn: "2d" });
        return res.json({ token, user: { id: existingUser._id, username: existingUser.username, email: existingUser.email } });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Login failed!" });
    }
});
export default loginRoute;

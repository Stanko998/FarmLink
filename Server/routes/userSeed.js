import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const router = Router();

router.get("/", async (req, res) => {
    try {
        const results = await User.find({});
        res.send(results).status(200);
    } catch (err) {
        res.status(500).send(err);
    }
});



router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username })
        if (!user) {
            res.status(404).json({ success: false, error: "User not found" });
            return
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(404).json({ success: false, error: "Wrong Password" });
            return
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_TOKEN, { expiresIn: '10d' });
        res.status(200).json({ success: true, token: token, user: { id: user._id, role: user.role, username: user.username } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username })
        if (user) {
            res.status(404).json({ success: false, error: "User alredi exist" });
            return
        }
        const newUSer = await userRegister(username, password);

        const token = jwt.sign({ _id: newUSer._id, role: newUSer.role }, process.env.JWT_TOKEN, { expiresIn: '10d' });
        res.status(200).json({ success: true, token: token, user: { id: newUSer._id, role: newUSer.role, username: newUSer.username } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const userRegister = async (username, password) => {
    try {
        const hastPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            password: hastPassword,
            role: "admin",
        })
        await newUser.save();
        console.log("Korisnik unesen u bazu ")
        return newUser;
    } catch (err) {
        console.log(err);
    }
}

export default router;
import { Router } from "express";
// import { ObjectId } from "mongodb";
import mongoose from "../db/connection.js";

const router = Router();
const collectionName = "users";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const User = mongoose.model(collectionName, userSchema);

router.get("/", async (req, res) => {
    try {
        const results = await User.find({});
        res.send(results).status(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };
        const newUser = new User(user);
        const result = await newUser.save();
        console.log(`New user inserted with the following id: ${result._id}`);
        res.send(result).status(204);
    } catch (err) {
        console.error(`Failed to insert user: ${err}`);
        res.status(500).send("error");
    }
});

export default router;

// const newUser = {
//     name: "admin",
//     email: "123",
//     password: "123"
// };
// insertUser(newUser);

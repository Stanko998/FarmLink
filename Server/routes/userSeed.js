import { Router } from "express";
import User from "../models/User.js";
import HandleUser from "./HandleUser.js"

const router = Router();

router.use("/", HandleUser)

router.get("/", async (req, res) => {
    try {
        const results = await User.find({});
        res.send(results).status(200);
    } catch (err) {
        res.status(500).send(err);
    }
});



export default router;
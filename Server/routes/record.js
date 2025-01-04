import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = Router();
let collectionName = "Movies";

router.get("/", async (req, res) => {
    let collection = await db.collection(collectionName);
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
    let collection = await db.collection(collectionName);
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

router.post("/", async (req, res) => {
    try {
        let newDocument = {
            title: req.body.title,
            ocena: req.body.ocena,
        };
        let collection = await db.collection(collectionName);
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("error");
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) }
        let update = {
            title: req.body.title,
            ocena: req.body.ocena,
        };
        let collection = await db.collection(collectionName);
        let result = await collection.updateOne(query, update);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("error");
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) }

        let collection = await db.collection(collectionName);
        let result = await collection.deleteOne(query);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("error");
    }
});

export default router;
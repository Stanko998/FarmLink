import { Router } from "express";
// import { ObjectId } from "mongodb";
import mongoose from "../db/connection.js";

const router = Router();
const collectionName = "farmer";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: false },
    unit: { type: String, required: false },
    price: { type: String, required: false },
    category: { type: String, required: false }
});

const farmerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
    municipality: { type: String, required: false },
    place: { type: String, required: false },
    products: {
        type: [productSchema], required: false
    }
});



const Farmer = mongoose.model(collectionName, farmerSchema);

const farmer = {
    username: "MIlovan",
    latitude: 45.2671,
    longitude: 19.8335,
    municipality: "Beograd",
    place: "Majdanpek",
    email: "admin@admin.com",
    password: "mile123@",
    products: [
        {
            title: "Odlican med",
            image: "/images/Slikameda.jpg",
            unit: "250g Tegla",
            price: "$3 po tegli",
            category: "processed"
        },
        {
            title: "Riba",
            image: "/images/Slika ribe.jpg",
            unit: "500g Jar",
            price: "$4 per jar",
            category: "processed"
        },
        {
            title: "Fresh Organic Honey",
            image: "/images/med.jpg",
            unit: "500g Jar",
            price: "$10 per jar",
            category: "processed"
        },
        {
            title: "Beeswax Candles",
            image: "/images/candles1.jpg",
            unit: "Set of 3",
            price: "$15 per set",
            category: "processed"
        },
        {
            title: "Pollen Granules",
            image: "/images/pollen1.jpg",
            unit: "200g Pack",
            price: "$12 per pack",
            category: "processed"
        }
    ]
}

async function insertFarmer(farmer) {
    let newfarmer = new Farmer(farmer);
    newfarmer.save();
}

router.get("/", async (req, res) => {
    try {
        const results = await Farmer.find({});
        res.send(results).status(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.route("/:id").get(async (req, res) => {
    try {
        const results = await Farmer.findById(req.params.id);
        if (results.length === 0) {
            return res.status(404).send("No farmers found with the specified product");
        }

        res.send(results).status(200);
    } catch (err) {
        res.status(500).send(err);
    };
}).put(async (req, res) => {
    res.send("Farmer updated").status(200);
}).delete(async (req, res) => {
    res.send("Farmer deleted").status(200);
});

// router.get("/:productName", async (req, res) => {
//     try {
//         const query = { "products.title": req.params.productName };
//         const results = await Farmer.find(query);
//         if (results.length === 0) {
//             return res.status(404).send("No farmers found with the specified product");
//         }
//         res.send(results).status(200);
//     } catch (err) {
//         res.status(500).send(err);
//     };
// });


export default router;
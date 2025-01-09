import express from "express";
import cors from "cors";
import { config } from "dotenv";

import users from "./routes/userSeed.js"
import farmers from "./routes/farmer.js"

config({ path: "./Server.env" });

const PORT = process.env.PORT || 5050;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", users)

app.use("/farmer", farmers)

app.listen(PORT, () => {
    console.log("Server listeing on port: " + PORT);
})
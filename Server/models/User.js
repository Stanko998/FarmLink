import mongoose from "../db/connection.js";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], required: true },
    createrAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
export default User;
import { ServerApiVersion } from "mongodb";
import { config } from "dotenv";
import mongoose from "mongoose";

const serverEnv = config({ path: "./server.env" }).parsed;
const clientEnv = config({ path: "./client.env" }).parsed;

const USERNAME = clientEnv.USERNAME || "admin";
const PASSWORD = clientEnv.PASSWORD || "admin";

const URI = serverEnv.URI || "wwaem.mongodb.net";
const CLUSTER = serverEnv.CLUSTER || "clusterPrvi";
const DB = serverEnv.DB || "Biblioteka";

const FULLURI = clientEnv.FULLURI || `mongodb+srv://${USERNAME}:${PASSWORD}@${serverEnv.CLUSTER}.${URI}/?retryWrites=true&w=majority&appName=${CLUSTER}`

console.log(FULLURI);

async function connectDB() {
    try {
        await mongoose.connect(FULLURI, {
            dbName: DB,
            serverApi: ServerApiVersion.v1,
            autoSelectFamily: false,
        })
        console.log(`Connected to MongoDB database: ${DB} using Mongoose`);
    } catch (error) {
        if (error.name == "MongooseServerSelectionError") {
            console.error("Greska je sa IP adresom ili portom");
        } else {
            console.error("Failed to connect to MongoDB using Mongoose", error);
        }
    }
}

connectDB();

export default mongoose;

//--------------------------------------------------------------------------------------------
// async function insertUser(user) {
//     try {
//         const newUser = new User(user);
//         const result = await newUser.save();
//         console.log(`New user inserted with the following id: ${result._id}`);
//     } catch (err) {
//         console.error(`Failed to insert user: ${err}`);
//     }
// }
// const newUser = {
//     name: "admin",
//     email: "123",
//     password: "123"
// };
// insertUser(newUser);



















// const client = new MongoClient(URI, {
//     autoSelectFamily: false,
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     },
// });

// let db;

// try {
//     await client.connect();
//     db = await client.db(DB);
//     const collections = await db.listCollections({ name: "books" }).toArray();
//     console.log("connected to database: " + DB);
//     if (collections.length === 0) {
//         // await db.createCollection("books", schema);
//         console.log("Collection created");
//     }
// } catch (err) {
//     console.error(err);
// }

// async function insertBook(book) {
//     try {
//         const result = await db.collection("books").insertOne(book);
//         console.log(`New book inserted with the following id: ${result.insertedId}`);
//     } catch (err) {
//         console.error(`Failed to insert book: ${err}`);
//     }
// }

// // Example usage
// const newBook = {
//     name: "Example Book",
//     author: "John Doe",
//     year: 2021
// };


// export default db;
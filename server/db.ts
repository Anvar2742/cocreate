import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
const dbUrl: string = process.env.MONGO_DB_URI || "";

export const connect = async () => {
    mongoose.connect(dbUrl);
    const db = mongoose.connection;
    db.on("error", () => {
        console.log("could not connect");
    });
    db.once("open", () => {
        console.log("> Successfully connected to database");
    });
};

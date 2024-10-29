import config from "./config.js";
import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const uri = config.mongo.uri
        if (!uri) {
            throw new Error("MongoDB URI is missing in the config")
        }
        await mongoose.connect(uri);
        console.log("Connected to mongodb")
    } catch (error) {
        console.error("error connecting to mongoDB database:", error.message);
        process.exit(1)
    }
}

export default connectDB;
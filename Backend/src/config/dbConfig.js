import mongoose from "mongoose";
import { appConfig } from "./appConfig.js";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(appConfig.db.uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB', error);
    }
}

export default connectMongoDB;
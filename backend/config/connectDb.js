import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Successfully Connected to Database")
    } catch (error) {
        console.log(error)
    }
}
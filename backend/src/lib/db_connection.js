import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected Successfully`);
    } catch (error) {
        console.log(`Error on MongoDB connection: ${error}`);
    }  
};
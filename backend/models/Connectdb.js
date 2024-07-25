import mongoose from "mongoose";
import { Apierror } from "../utils/Apierror.js";

export const Connectdb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/project_mlops")
        console.log("connected"
        )
    } catch (error) {
        throw new Apierror(402, error.error)
    }
}
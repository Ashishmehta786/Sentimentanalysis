import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"

configDotenv()

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter valid username"],
        unique: [true, "This username has already been taken enter other"]
    },
    email: {
        type: String,
        required: true,
       
    },
    password: {
        type: String,
        required: true,
        minLength: 9
    },
    refreshtoken: {
        type: String,
        required: false
    }
})
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccesstoken = async function () {
    return jwt.sign({ id: this._id }
        , process.env.SECRET_ACCESS_TOKEN, {
        expiresIn: 86400
    }
    )
}
userSchema.methods.generateRefreshtoken = async function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_REFRESH_TOKEN, {
        expiresIn: 100000
    })
}

export const User = mongoose.model("User", userSchema)

import express from "express"
import axios from "axios"
import cors from "cors"
import cookieParser from "cookie-parser"
import { configDotenv } from "dotenv"
import { userrouter } from "./routes/users.route.js"
import { Connectdb } from "./models/Connectdb.js"
import crypto from "node:crypto"
configDotenv()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:8000"],
    credentials: true
}))
Connectdb()
const reqfromflask = async (s) => {
    try {
        const res = await axios.post("http://127.0.0.1:8000/api/v1/postsentence", {
            sentence: s
        })
        return { message: res.data }
    } catch (error) {
        return { error }
    }
}
app.listen(8080, () => {
    console.log("server is running on port 8080")
})
app.get('/getflask', async (req, res) => {
    const sentence = req.body.sentence
    const resp = await reqfromflask(sentence)

    return res.status(200).json({ data: resp })
})



app.use("/api/users", userrouter)

import { asynchandler } from "../utils/asynchandler.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const authenticate = asynchandler(async (req, res, next) => {
    // console.log(req.headers.authorization.split(' ')[1])
    const token = req.cookies.accesstoken
    console.log(req.cookies.accesstoken) 
    if (!token) throw new Apierror(403, "unauthorizated user")
    const decodetoken = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN)
    if (!decodetoken) throw new Apierror(404, "token is invalid")
    const user = await User.findById(decodetoken.id)
    if (!user) throw new Apierror(402, "couldn't find user")
    req.user = user
    next()

})


export { authenticate }
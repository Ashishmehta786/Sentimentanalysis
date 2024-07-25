import { Router } from "express"
import { ChangeInfo, ForgotPassword, islogged, Login, Register, sendprediction } from "../controller/users.controller.js"
import { authenticate } from "../middleware/users.authenticate.js"
import { predicts, sentimentupload } from "../controller/dataset.controller.js"


const userrouter = Router()

userrouter.route("/register").post(Register)
userrouter.route("/login").post(Login)
userrouter.route("/changeuserinfo").post(authenticate, ChangeInfo)
userrouter.route("/uploadsentencedata").post(authenticate, sentimentupload)
userrouter.route("/forgotpassword").post(ForgotPassword)
userrouter.route("/predictsentence").post(predicts, sendprediction)
userrouter.route("/logged").get(authenticate, islogged)


export { userrouter }
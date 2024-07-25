import { User } from "../models/user.model.js";
import { asynchandler } from "../utils/asynchandler.js";
import { Apierror } from "../utils/Apierror.js"
import { Apiresponse } from "../utils/Apiresponse.js";


const generateAccessRefreshToken = async (id) => {
    const user = await User.findById(id)
    if (!user) throw new Apierror(403, "no user with this id")
    const accesstoken = await user.generateAccesstoken()
    const refreshtoken = await user.generateRefreshtoken()
    user.refreshtoken = refreshtoken
    return { accesstoken, refreshtoken }
}

const Register = asynchandler(async (req, res, _) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ username, email, password })
        if (!user) throw new Apierror(401, "couldn't create account")
        user.save()
        return res.status(200).json(new Apiresponse(200, {}, "registered successfully"))
    } catch (error) {
        throw new Apierror(402, error.error)
    }
})

const Login = asynchandler(async (req, res, _) => {

    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if (!user) throw new Apierror(403, "no user found")
    if (!user.isPasswordCorrect(password)) throw new Apierror(403, "invalid crendentials")
    const { accesstoken, refreshtoken } = await generateAccessRefreshToken(user._id)
    const Options = {
        httpOnly: true,
        secure: true
    }
    return res.cookie("accesstoken", accesstoken, Options)
        .cookie("refreshtoken", refreshtoken, Options)
        .status(200)
        .json(new Apiresponse(200, {}, "user logged in successfully"))
})



const Logout = asynchandler(async (req, res, _) => {
    const user = req.user
    await User.findByIdAndUpdate(user._id, {
        $set: {
            refreshtoken: undefined
        }
    }, {
        new: true
    })
    const Options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).clearCookie("accesstoken", accesstoken, Options).clearCookie("refreshtoken", refreshtoken, Options).json(new Apiresponse(200, {}, "logged out successfully"))
})
const ForgotPassword = asynchandler(async (req, res, next) => {
    const { username, oldpassword, newpassword } = req.body
    const user = await User.findOne({ username: username })
    if (!user.isPasswordCorrect()) throw new Apierror(403, "wrong credentials")
    await User.findByIdAndUpdate(user.id, {
        $set: {
            username: username || user.username,
            password: password || user.password,

        }
    }, {
        new: true
    })
    return res.status(200).json(new Apiresponse(200, {}, "password changed successfully"))
})

const ChangeInfo = asynchandler(async (req, res, next) => {
    const user = req.user
    const { username, password, email } = req.body
    console.log({ username, password, email })
    await User.findByIdAndUpdate(user.id, {
        $set: {
            username: username || user.username,
            password: password || user.password,
            email: email || user.email
        }
    }, {
        new: true
    })
    return res.status(200).json(new Apiresponse(200, {}, "password changed successfully"))
})
const sendprediction = asynchandler(async (req, res, next) => {
    const pred = req.pred
    if (!pred) throw new Apierror(405, "no prediction")
    return res.status(200).json(new Apiresponse(200, {
        prediction: pred
    }, "prediction done successfully"))
})

const islogged = asynchandler(async (req, res, _) => {
    const user = req.user

    return res.status(200).json(new Apiresponse(200, {
        msg: "logged",
        user_: {
            user
        }
    }, ""))
})

export { Register, Login, ChangeInfo, ForgotPassword, sendprediction, islogged }
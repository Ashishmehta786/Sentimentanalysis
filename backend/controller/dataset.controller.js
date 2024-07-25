import { asynchandler } from "../utils/asynchandler.js";
import { Apierror } from "../utils/Apierror.js"
import { Apiresponse } from "../utils/Apiresponse.js";
import axios from "axios"

const sentimentupload = asynchandler(async (req, res, next) => {
    const { sentence, sentiment } = req.body
    const sendData = await axios.post("http://localhost:8000/api/v1/postsentence", {
        sentence: sentence,
        sentiment: sentiment
    })
    const response = sendData.data.dta
    if (response == "") throw new Apierror(404, "couldnt upload sentence")
        console.log(response)
    return res.status(200).json(new Apiresponse(200, { msg: response }, "upload successful"))
})

const predicts = async (req, res, next) => {
    const { sentence } = req.body
    const getpred = await axios.post("http://localhost:8000/api/v1/predictsentence", {
        sentence: sentence
    })
    const pred = getpred.data
    req.pred = pred
    next()
}

export { predicts, sentimentupload }

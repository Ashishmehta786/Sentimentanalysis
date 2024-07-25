import axios from "axios"
import { useEffect, useRef, useState } from "react";


const PredictSentence = () => {
    const [prediction, setprediction] = useState('')
    const [showsentiment, setshowsentiment] = useState(false)
    const [accuracy, setaccuracy] = useState(0.0)
    const sentence = useRef()
    useEffect(() => {

        if (!prediction) { setshowsentiment(false) }
    }, [prediction])
    const handleformsubmit = async (e) => {
        e.preventDefault()
        const uploadsentence = await axios.post("http://localhost:8080/api/users/predictsentence", {
            sentence: sentence.current.value
        }, { withCredentials: true })
        setshowsentiment(true)
        setaccuracy(uploadsentence.data.data.prediction.score)
        if (uploadsentence.data.data.prediction.prediction.replace(".", "") === "0") { setprediction('negative') }
        else {
            setprediction('positive')
        }
        console.log(uploadsentence
        )
    }
    return (
        <form className="" onSubmit={handleformsubmit}>
            <div className="flex flex-col justify-center items-center gap-3 mt-20 max-w-lg m-auto">
                <label className="text-2xl font-medium">
                    Predict Sentence
                </label>
                <input placeholder="Enter sentence for prediction" className="bg-neutral-200 px-4  rounded placeholder:text-neutral-700 p-1 w-[260px] items-center placeholder:text-center outline-none" ref={sentence} />
                <span className={showsentiment ? "block" : "hidden"}>
                    The sentence's sentiment is  {prediction}.
                </span>
                <span className={showsentiment ? "block" : "hidden"}
                >
                    The accuracy of the model is {accuracy}
                </span>
            </div>

        </form>)
}

export default PredictSentence;
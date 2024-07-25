import axios from "axios";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AddSentence = () => {
    const [selectedsentiment, setselectedsentiment] = useState('')
    const s = useRef()
    const sucess = () => toast.success("sentence uploaded successfully")
    const error = () => toast.error("sentence couldnt be uploaded")
    const submitform = async (e) => {
        e.preventDefault()
        console.log({ sentence: s.current.value, sentiment: selectedsentiment })
        const submit = await axios.post("http://localhost:8080/api/users/uploadsentencedata", { sentence: s.current.value, sentiment: selectedsentiment }, { withCredentials: true })
        console.log(submit)
        if (submit.data.data.msg.trim() !== "") {
            sucess()
            setselectedsentiment('')
            s.current.value=''
        }
        else {
            error()
        }
    }
    const changeoptions = async (e) => {
        e.preventDefault()
        setselectedsentiment(e.target.value)
    }
    return (
        <form onSubmit={submitform}><div className="flex justify-center flex-col gap-5 max-w-xs m-auto mt-10">
            <ToastContainer />
            <div className="items-center flex  mb-10 justify-center text-2xl leading-1 tracking-tight font-medium text-neutral-700">
                Enter new sentence value
            </div>
            <label>
                Sentence
            </label>
            <input placeholder="Enter sentence here  " className="rounded bg-neutral-50 p-2 placeholder:text-neutral-900 text-neutral-900 outline-none border-b-2 shadow-md " ref={s} />
            <label className="">
                Sentiment of the sentence
            </label>
            <select className="justify-end flex items-center jutsify-center  bg-neutral-50  rounded p-1" value={selectedsentiment} onChange={changeoptions}>
                <option className="flex jutsify-end">
                    0
                </option>
                <option>1</option>
            </select>
            <button type="submit" className="bg-indigo-600 text-neutral-50 rounded p-1  hover:bg-indigo-400 "> Submit
            </button>
        </div>
        </form>
    )
}

export default AddSentence;
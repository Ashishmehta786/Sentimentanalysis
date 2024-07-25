import axios from "axios"
import { useNavigate } from "react-router-dom"
import { uselogin } from "../context/Logincontext"
import { useEffect } from "react"
const Forgotpassword = () => {
    const login = uselogin()
    console.log(login);
    const navigate = useNavigate()
    useEffect(() => {
        if(!login.logged) {
            navigate("/Login")
        }
     }, [])

    return (
    <div>

    </div>)
}

export default Forgotpassword
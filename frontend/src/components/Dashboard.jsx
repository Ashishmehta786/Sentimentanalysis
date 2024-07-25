import { Outlet } from "react-router-dom"
import { uselogin } from "../context/Logincontext"
import { useNavigate } from "react-router-dom"
import { useEffect, useLayoutEffect } from "react"
import Login from "../components/Login.jsx"
export const Dashboard = () => {
    const navigate=useNavigate()
    const loginuse = uselogin()
        
    return (<div>

       {
       loginuse?    <Outlet />:<Login/>

       }
    </div>)
}
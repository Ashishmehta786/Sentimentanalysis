import { Outlet } from "react-router-dom";
import "./App.css"
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./components/Navbar";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"

function App() {



  useEffect(() => {
    const login = async () => {
      const res = await axios.post()
    }
  }, [])
  return (
    <div className="flex flex-col bg-white">
      <Navbar />
      <div className="m-auto">
        <Outlet />

      </div>
    </div>)
}

export default App;
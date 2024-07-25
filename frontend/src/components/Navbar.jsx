import React, { useState } from 'react';
import "../index.css"
import { Link } from "react-router-dom"
import { uselogin } from '../context/Logincontext';

const Navbar = () => {
  const loginuse = uselogin()
  const [menu, setmenu] = useState(false)
  const toggleMenu = () => {
    setmenu(!menu)
  }

  return (
    <nav className="bg-white text-neutral-700 shadow-md border border-b z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-lg font-semibold">Sentiment Analysis</span>
          </div>
          <div className="flex items-center">
            <Link to="/"
              className="hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Add Dataset</Link>
            <Link to="/predictsentence" className="ml-4 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium ">Predict</Link>
            {!loginuse && <Link to="/Login" className="ml-4 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium "> Login
            </Link>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

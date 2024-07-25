import React, { useEffect, useLayoutEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';
import { uselogin } from '../context/Logincontext';
const Login = () => {
  const loginuse = uselogin()

  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const notify = () => toast.success("Account logged in !");
  const errortoast = () => toast.error("Fill crendentails properly")
  const handleerror = () => {
    errortoast()
  }
  console.log("value of loginuse is", loginuse)

  console.log("value is ", loginuse)
  // if (loginuse) {
  //   navigate("/Dashboard")

  // }
  // else {
  //   navigate("/Login")
  // }
  useEffect(() => {
    if (loginuse) {
      navigate("/Signup")
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!username && !password) {
        return;
      } console.log(loginuse)
      console.log('Username:', username);
      console.log('Password:', password);
      const login = await axios.post("http://localhost:8080/api/users/login", { username, password }, { withCredentials: true })
      if (login) {
        navigate("/")
      }
      setUsername('');
      setPassword('');
      setError('');
      notify()

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div>
        <ToastContainer position='bottom-right' />
      </div>
      <div className="max-w-md  w-full bg-white rounded-lg shadow-lg p-8 space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Log in to your account</h2>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit} >
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <span className="material-symbols-outlined text-gray-500">person</span>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="flex-1 ml-2 appearance-none bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <span className="material-symbols-outlined text-gray-500">vpn_key</span>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="flex-1 ml-2 appearance-none bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex justify-center items-center"
            onClick={handleerror}>
            <span className="material-symbols-outlined mr-2">lock_open</span>
            Sign in
          </button>
        </form>
        <div className="text-md text-center flex flex-col gap-2">
          <Link to="/Forgotpassword" className="text-indigo-600 hover:text-indigo-800">Forgot password?</Link>
          <span>
            Don't have an account? <span className='text-neutral-600 text-md cursor-pointer hover:text-indigo-700 font-[500]'><Link to="/Signup">Sign up
            </Link></span>
          </span>
        </div>

      </div>
    </div>
  );
};

export default Login;

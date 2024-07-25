import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from"axios"


const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
const navigate= useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('Please enter username, email, and password');
      return;
    }
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    const signup = await axios.post("http://localhost:8080/api/users/register", { username, password, email })
    if(signup){
      navigate("/Login")
    }
    setUsername('');
    setEmail('');
    setPassword('');
    setError('');

  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md h-full w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
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
            <span className="material-symbols-outlined text-gray-500">email</span>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="flex-1 ml-2 appearance-none bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          >
            <span className="material-symbols-outlined mr-2">lock_open</span>
            Sign in
          </button>
        </form>
        <div className="text-md font-[470] text-center">
          <a href="#" className="text-neutral-900 hover:text-neutral-500">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, UseDispatch } from "react-redux";
import { loginUser } from "../app/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch= useDispatch<any>();
    const navigate= useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault();

     if (!email || !password) {
      setMessage("Please fill in all fields");
      return;
    }
    
    const response= await dispatch(loginUser({email, password})).unwrap(); 

      console.log("Success data:", response);

      navigate("/dashboard");
    // console.log("Logging in with:", { email, password });
    console.log('login response: ', response);
  }
  return (
    <div className="flex min-h-screen bg-gray-100">
        <div className="w-[60%] flex items-center justify-center bg-gray-200">
        <img
          src="cct.jpg"
          alt="cct photo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-[70%] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin}>
            <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-4 px-6 mb-6 font-bold text-black w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-4 px-6 font-bold text-black w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <p className="mb-8">Don't have an account, <Link className="text-blue-800 hover:cursor-pointer hover:underline" to={'/register'}>Register</Link> as User.</p>

        {message && <span className="text-red-700 font-bold">{message}</span>}
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            Login
        </button>
        </form>
        
      </div>
      </div>
    </div>
  );
};

export default Login;

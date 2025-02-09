import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { useSelector } from 'react-redux';

const Signup = () => {
  const history = useNavigate()
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  if(isLoggedIn==true){
    history("/");

  }
  const [Data, setData] = useState({username:"",  email:"",password:""})
  
  const change = (e) => {
   const {name,value}= e.target;
   setData({...Data,[name]:value})
  };


  const submit = async()=>{
   try {
    if(Data.username===""|| Data.email===""||Data.password===""){
      alert("All flieds are require")
    }else {
      const response = await axios.post("http://localhost:1000/api/v1/sign-in", Data); 
     setData({username:"",  email:"",password:""})
     alert("response.data.message")
      console.log(response);
      history("/login")
    }
   } catch (error) {
    console.log(error)
   }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-purple-500 to-blue-500">
            <h2 className="text-3xl font-bold text-white text-center">Join Us</h2>
            <p className="text-blue-100 text-center mt-2">Create your account today</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Username Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={Data.username}
                  placeholder="Username"
                  onChange={change}
                  className="block text-gray-700 w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={Data.email}
                  placeholder="Email"
                  onChange={change}
                  className="block text-gray-700 w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={Data.password}
                  placeholder="Password"
                  onChange={change}
                  className="block text-gray-700 w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              {/* Signup Button */}
              <button onClick={submit} className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center space-x-2 group">
                <span>Sign Up</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Additional Options */}
              <div className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-500 hover:text-purple-600 font-medium">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const history = useNavigate()
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  if(isLoggedIn==true){
    history("/");

  }
  const [Data, setData] = useState({ username: "", email: "", password: "" });

  // const history = useNavigate();
  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All flieds are require");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/log-in",
          Data
        );
        setData({ username: "", password: "" });
        //  alert("response.data.message")
        // console.log(response);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());

        history("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-purple-500 to-blue-500">
            <h2 className="text-3xl font-bold text-white text-center">
              Welcome Back
            </h2>
            <p className="text-blue-100 text-center mt-2">
              Log in to your account
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="username"
                  name="username"
                  placeholder="username"
                  value={Data.username}
                  onChange={change}
                  className="block w-full pl-10 text-gray-700  pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={Data.password}
                  onChange={change}
                  name="password"
                  placeholder="Password"
                  className="block w-full text-gray-700 pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-purple-500 hover:text-purple-600 font-medium">
                  Forgot your password?
                </a>
              </div>

              {/* Login Button */}
              <button
                onClick={submit}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center space-x-2 group">
                <span>Log In</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
              </div>

              {/* Additional Options */}
              <div className="mt-6 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-purple-500 hover:text-purple-600 font-medium">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

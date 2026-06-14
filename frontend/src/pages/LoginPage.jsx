import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import "../theme.css";
import "./LoginPage.css";

function LoginPage() {

  const navigate = useNavigate();

  const [loginData,setLoginData] = useState({
    email:"",
    password:"",
  });

  const handleChange=(e)=>{
    setLoginData({
      ...loginData,
      [e.target.name]:e.target.value,
    });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{

      const response=
      await axios.post(
        "http://127.0.0.1:8000/login",
        loginData
      );

      if (response.data.message === "Login successful") {

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: response.data.name,
            email: response.data.email,
            college: response.data.college,
            graduation_year: response.data.graduation_year
          })
        );

        navigate("/dashboard");
      }
    }catch(error){
      alert("Login Failed");
    }
  };

  return(

    <div className="login-page">

      <div className="glow1"></div>
      <div className="glow2"></div>

      <div className="login-card">

        <h1 className="login-title">
          Welcome Back
        </h1>

        <p className="login-subtitle">
          Login to continue your AI Career Journey
        </p>

        <form onSubmit={handleSubmit}>

          <input
            className="input-box"
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />

          <input
            className="input-box"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button
            className="login-btn"
            type="submit"
          >
            Login
          </button>

        </form>

        <br />

        <Link
          style={{
            color:"#00F5FF"
          }}
          to="/forgot-password"
        >
          Forgot Password?
        </Link>

      </div>

    </div>
  );
}

export default LoginPage;
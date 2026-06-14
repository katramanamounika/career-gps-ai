import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUniversity,
  FaGraduationCap
} from "react-icons/fa";

import "./SignupPage.css";

function SignupPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    graduation_year: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
      await axios.post(
        "http://127.0.0.1:8000/signup",
        formData
      );

      alert(
        response.data.message
      );

      if(
      response.data.message
      ===
      "Signup successful"
      ){

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          college: formData.college,
          graduation_year:
            formData.graduation_year
        })
      );

      navigate(
      "/login"
      );

      } {
        navigate("/login");
      }

    } catch (error) {

      console.error(error);

      alert("Signup Failed");
    }
  };

  return (
    <div className="signup-container">

      <div className="signup-card">

        <h1 className="signup-title">
          Career GPS AI
        </h1>

        <p className="signup-subtitle">
          Your AI Powered Career Coach
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="college"
              placeholder="College Name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="graduation_year"
              placeholder="Graduation Year"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="signup-btn"
          >
            Create Account
          </button>

        </form>

        <div className="login-link">

          Already have an account?

          <br />

          <button
            onClick={() =>
              navigate("/login")
            }
          >
            Login Here
          </button>

        </div>

      </div>

    </div>
  );
}

export default SignupPage;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../theme.css";
import "./ForgotPassword.css";

function ForgotPassword() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleReset = async () => {

    try {

      const response =
      await axios.post(
        "http://127.0.0.1:8000/forgot-password",
        {
          email,
          new_password: password,
        }
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert(
        "Password reset failed"
      );
    }
  };

  return (

    <div className="forgot-page">

      <div className="glow1"></div>
      <div className="glow2"></div>

      <div className="forgot-card">

        <h1 className="forgot-title">
          Reset Password
        </h1>

        <p className="forgot-subtitle">
          Enter your email and create
          a new password to continue.
        </p>

        <input
          className="input-box"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e)=>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          className="input-box"
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          className="reset-btn"
          onClick={handleReset}
        >
          Reset Password
        </button>

      </div>

    </div>
  );
}

export default ForgotPassword;
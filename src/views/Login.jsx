import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css'
import imgURL from '../assets/logo.png';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.token) {
      navigate("/homepage");
    }
  }, [navigate]);

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    if (emailValue.trim() === "") {
      setEmailError("Email cannot be empty");
    } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
      setEmailError("Email format error");
    } else {
      setEmailError("");
      setEmail(emailValue);
    }
  };

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;

    if (passwordValue.trim() === "") {
      setPasswordError("Password cannot be empty");
    } else {
      setPasswordError("");
      setPassword(passwordValue);
    }
  };

  const verifyUser = async () => {
    try {
      return await axios.post("http://localhost:8080/api/v1/users/login", {
        email: email,
        password: password,
      });
    } catch (e) {
      return e.response;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    verifyUser().then((res) => {
      if (res.status === 401) {
        setLoginError("Invalid email or password");
        setPassword("");
        return;
      }
      if (res.status === 201) {
        localStorage.setItem("userData", JSON.stringify(res.data));
        navigate("/homepage");
      }
    });
  };
  return (
    <div className="loginBox">
      
      <div className="logoContainer">
        <img src={imgURL} alt="" />
      </div>
      <h2 className="welcomeTitle">Welcome to Pet Lover</h2>
      <form className="inputContainer" onSubmit={handleSubmit}>
      {emailError && <p>{emailError}</p>}
        <input
          type="email"
          name="emailInput"
          defaultValue={email}
          placeholder="email"
          onChange={handleEmailChange}
          
        />
        {passwordError && <p>{passwordError}</p>}
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />
        
        {loginError && <p>{loginError}</p>}
        <button type="submit">Log into your account</button>
      </form>
    </div>
  );
};

export default Login;

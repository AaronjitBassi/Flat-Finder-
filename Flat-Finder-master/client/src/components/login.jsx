import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import "./css/login.css";
import { useAuth } from "../App.js";

function LoginForm() {

  const navigate = useNavigate();
  const auth = useAuth();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic input validation
    const newErrors = {
      email: !data.email,
      password: !data.password,
    };
    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
       alert("Please fill in the missing fields highlighted in red");
       return;
    }

    fetch('http://localhost:3500/users?email='+data.email)
    .then(response => response.json())
    .then(userData => {
      console.log(userData)
      const theUser = userData.find(u => u.email === data.email && u.password === data.password);
      if (theUser) {
        Cookies.set("user", JSON.stringify({
          "userID": theUser.id,
          "name": theUser.name,
          "email": theUser.email,
          "password": theUser.password,
          "isAdmin": theUser.isAdmin,
          "isLoggedIn": true,
        }));
        auth.handleLogin();
        navigate('/listing');
        // window.location.reload();
      } else {
        console.log("Incorrect details.")
        console.log(data.email + " " + data.password)
        alert("Incorrect email or password!");
      }
    });
  };

  const getInputClass = (field) => {
    return errors[field] ? "text-input error" : "text-input";
  };

  return (
    <div className="page">
      <div className="cover">
        <h1 className="title">FDM Flat Finder</h1>
        <h1 className="login-header">User Login</h1>

        <form className="form" onSubmit={handleSubmit}>
          <input
            className={getInputClass("email")}
            name="email"
            type="text"
            placeholder="email"
            value={data.email}
            onChange={changeHandler}
          />

          <input
            className={getInputClass("password")}
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={changeHandler}
          />

          <button className="login-btn" type="submit">
            Login!
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

import { useState,useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  },[]);

  const [Email, setEmail] = useState("");
  const [password, setPassword] = React.useState("");

  const handlelogin = async () => {
    // console.warn(Email, password);
    let result = await fetch("http://192.168.0.196:5000/login", {
      body: JSON.stringify({ Email, password }),
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result.auth) {
      // alert("credentials accepted");
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("please enter correct details");
    }
    
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        className="inputbox"
        value={Email}
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="inputbox"
        value={password}
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="Appbutton" type="button" onClick={handlelogin}>
        Login
      </button>
    </div>
  );
};

export default Login;

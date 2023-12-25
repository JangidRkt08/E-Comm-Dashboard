import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();

  // ######### SETTINGUP PRIVATE COMPONENET ROUTE #########

  useEffect(()=>{
      const auth=localStorage.getItem('user')
      if(auth){
          navigate("/")
      }
  },[])

  //  ########## COLLECTING DATA ##########

  const Collectdata = async () => {
    // console.warn(name, Email, password);

    // ######### API #########

    let result = await fetch("http://192.168.0.196:5000/register", {
      method: "post",
      body: JSON.stringify({ name, Email, password }),
      headers: {
        "content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
   navigate("/")
  };
  return (


    // ########## USER INPUT ###########

    <div className="register">
      <h1>Register</h1>
      <input
        className="inputbox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
      <input
        className="inputbox"
        type="text"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        className="inputbox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button onClick={Collectdata} className="Appbutton" type="button">
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;

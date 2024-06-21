import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

function RegisterPage() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setRedirect] = useState(false)
  const {setUser} = useContext(UserContext)


  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("/register", {
        name,
        email,
        password,
      });
      handleReset();
      setUser(data)
      setRedirect(true)
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };


  const handleReset = () => {
    setname("");
    setemail("");
    setpassword("");
  };

  
  if(redirect) return <Navigate to={'/'}/>

  return (
    <div className=" mt-6 grow flex items-center justify-center ">
      <div className="mb-60">
        <h1 className="text-4xl mb-4 text-center">Register</h1>
        <form
          action="/register"
          method="post"
          className=" max-w-md mx-auto"
          onSubmit={registerUser}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center mt-2 text-gray-500">
            Already have an account?{" "}
            <Link to={"/login"} className="underline text-primary">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

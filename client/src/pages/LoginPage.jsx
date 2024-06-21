import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

function LoginPage() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setRedirect] = useState(false)
  const {setUser} = useContext(UserContext)

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("/login", {email,password}); 
      setUser(data)
      setRedirect(true)
    } catch (error) {
      console.log(error);
    }
  };

  if(redirect)return <Navigate to={'/'}></Navigate>

  return (
    <div className=" mt-6 grow flex items-center justify-center ">
      <div className="mb-60">
        <h1 className="text-4xl mb-4 text-center">Login</h1>
        <form
          action=""
          className=" max-w-md mx-auto"
          onSubmit={handleLoginSubmit}
        >
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
          <button className="primary">
            Login
          </button>
          <div className="text-center mt-2 text-gray-500">
            Don't have a account?{" "}
            <Link to={"/register"} className="underline text-primary">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

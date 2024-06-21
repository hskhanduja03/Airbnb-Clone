import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

function Account() {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect(true);
  }

  if (!ready) {
    return <div>Loading...</div>;
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }
  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <AccountNav />
      {/* {subpage === "profile" && ( */}
        <div className="text-center max-w-md mx-auto">
          Logged in as {user.name} and email: {user.email}
          <br />
          <button onClick={logout} className="primary mt-2">
            Logout
          </button>
        </div>
      {/* )} */}
      {/* {subpage === "places" && <PlacesPage />} */}
    </div>
  );
}

export default Account;

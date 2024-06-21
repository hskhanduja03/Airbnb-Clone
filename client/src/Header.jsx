import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

function Header() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <header className="flex justify-between items-center">
        <Link to={"/"} className="flex items-center">
          <img
            className="w-12 "
            src="https://i.pinimg.com/564x/56/5c/2a/565c2a824c7c184e326c751a0fb7e73e.jpg"
            alt=""
          />
          <span className="font-bold text-primary">airbnb</span>
        </Link>
        <div className="flex gap-3 border border-gray-300 rounded-full h-11 py-2 px-4 items-center shadow shadow-gray-300">
          <div className="">Anywhere</div>
          <div className="w-[0.5px] h-full bg-gray-300"></div>
          <div className="">Any week</div>
          <div className="w-[0.5px] h-full bg-gray-300"></div>
          <div className="text-gray-400">Add guests</div>
          <button className="ml-2 text-white rounded-full bg-primary p-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <Link
          to={user?'/account':"/login"}
          className="flex gap-2 items-center border border-gray-300 rounded-full px-4 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="gray"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
            <div className="absolute top-0 right-0 bg-primary w-2 h-2 rounded-full"></div>
          </div>
          {!!user && (<div>{user.name}</div>)}
        </Link>
      </header>
    </div>
  );
}

export default Header;

import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";
import AccountNav from "../AccountNav";

function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => setPlaces(data));
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          to={"/account/places/new"}
          className="bg-primary inline-flex px-6 py-2 rounded-full  text-white gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          Add new Place
        </Link>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={`/account/places/${place._id}`}>
            <div className="w-full bg-gray-200 rounded-xl h-content flex gap-5 p-3 cursor-pointer lg:w-[80%] mx-auto">
              <div className="bg-red-400 w-[25%] object-cover overflow-hidden rounded-xl hover:opacity-80 max-h-40 lg:max-h-60">
                <img
                  src={place.photos[0].includes('http')?place.photos[0]:"http://localhost:4000/uploads/" + place.photos[0]}
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <div className="w-[70%] h-content p-1 flex gap-2 flex-col justify-between ">
                <div className="w-full">
                  <div className="mb-2">
                    <h2 className="font-semibold text-lg lg:mb-1">
                      {place.title}
                    </h2>
                    <p className="text-gray-600 text-xs font-semibold">
                      {place.address}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {place.description.substring(0, 200)} ...
                  </p>
                </div>
                <div className="w-full flex justify-between">
                  <div className=" w-full flex gap-4">
                    <h3 className="text-xs text-gray-500 font-semibold ">
                      Max Guests : {place.maxGuests}
                    </h3>
                    <h3 className="text-xs text-gray-500 font-semibold ">
                      Check-in : {place.checkIn}
                    </h3>
                    <h3 className="text-xs text-gray-500 font-semibold ">
                      Check-out : {place.checkOut}
                    </h3>
                  </div>
                  <div>
                    <h3 className="text-xs text-gray-500 " style={{ whiteSpace: 'nowrap' }}>
                      <span className="text-gray-900 font-semibold">Features:</span>
                      {place.perks.map((perk, index) => (
                        <span key={index}>
                          {index > 0 && ", "}{" "}
                          {/* Add comma and space for all items except the first one */}
                          {perk}
                        </span>
                      ))}
                    </h3>
                  </div>
                </div>
              </div>
            </div></Link>
          ))}
      </div>
    </div>
  );
}

export default PlacesPage;

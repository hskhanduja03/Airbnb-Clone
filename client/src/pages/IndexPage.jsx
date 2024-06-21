import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function IndexPage() {
  const [displayPlaces, setdisplayPlaces] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setdisplayPlaces(data);
      setReady(true);
    });
  }, []);
  if (!ready)
    return (
      <div>
        <img className="w-40 h-40 absolute top-1/2 left-1/2" src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="" />
      </div>
    );
  return (
    <div className="grid grid-cols-2 mt-12  md:grid-cols-3  lg:grid-cols-4 gap-6 ">
      {displayPlaces.length > 0 &&
        displayPlaces.map((place) => (
          <Link to={"/place/" + place._id}>
            <div className="bg-gray-200 rounded-2xl overflow-hidden aspect-square">
              {place.photos && (
                <img
                  src={place.photos[0].includes('http')?place.photos[0]:"http://localhost:4000/uploads/" + place.photos[0]}
                  className="object-cover w-full h-full"
                  alt=""
                />
              )}
            </div>
            <h2 className="font-semibold mt-2 mx-2">{place.title}</h2>
            <div className="mx-2 flex justify-between items-center">
              <h3 className="text-gray-500 text-xs font-semibold">
                {place.address}
              </h3>
              <span className="flex items-center text-gray-500 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-3"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clip-rule="evenodd"
                  />
                </svg>
                {place.maxGuests}
              </span>
            </div>
            <div className="mx-2 mt-3 flex items-center justify-between">
              <div className="text-gray-500 text-sm flex items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  className="size-5 mr-1"
                >
                  <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
                </svg>

                {place.perks.map((perk, index) => (
                  <span>
                    {index > 2 ? "" : perk}
                    {index > 1 ? "" : ","} &nbsp;
                  </span>
                ))}
              </div>
              <div>
                <span className="text-gray-500 text-sm">
                  {place.checkIn}:00-{place.checkOut}:00
                </span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default IndexPage;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "../UserContext";

function SinglePlacePage() {
  const { id } = useParams();
  const [showPhotos, setShowPhotos] = useState(false);
  const [place, setPlace] = useState(null);
  const [checkIn, setcheckIn] = useState(null);
  const [checkOut, setcheckOut] = useState(null);
  const [guests, setGuests] = useState(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState('');
  const stayNights = differenceInCalendarDays(checkOut, checkIn);

  const { user } = useContext(UserContext);

  function createBooking(ev) {
    if(!user)return setRedirect('/login')
    ev.preventDefault();
    axios
      .post("/booking", { id, checkIn, checkOut, name, mobile, guests, stayNights })
      .then(({ data }) => {
        setcheckIn("");
        setcheckOut("");
        setGuests("");
        setName("");
        setMobile("");
        const bookingId = data._id;
        console.log(bookingId);
        setRedirect(`/account/bookings/${bookingId}`);
      });
  }

  useEffect(()=>{
    if(user){
      setName(user.name)
    }
  }, [user])

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(({ data }) => {
      setPlace(data);
    });
  }, [id]);

  if (!place) return "";

  if(redirect){
    return <Navigate to={redirect}/>
  }

  if (showPhotos) {
    return (
      <div className=" min-h-screen inset-0 absolute bg-white  p-4">
        <button
          className="bg-black text-white fixed  rounded-lg py-2 px-4"
          onClick={() => setShowPhotos(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div className="grid gap-3 w-full mt-12 grid-cols-3">
          {place.photos.map((photo, index) => (
            <div className="rounded-xl overflow-hidden max-h-[550px]" key={index}>
              <img
                className="object-fill w-full h-full"
                src={photo.includes('http')?photo:"http://localhost:4000/uploads/" + photo}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 h-content mt-4 p-4 rounded-3xl flex flex-col gap-2 md: lg:max-w-5xl mx-auto ">
      <div>
        <h2 className="text-2xl font-semibold">{place.title}</h2>
        <div className="flex text-md text-gray-600 items-center gap-1 font-semibold my-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>

          <a
            target="_blank"
            href={`https://www.google.com/maps/place/` + place.address}
          >
            <span className="underline ">{place.address}</span>
          </a>
        </div>
      </div>
      {place.photos && (
        <div
          className={`grid grid-cols-[2fr_1fr] rounded-3xl relative overflow-hidden min-h-[400px] gap-2 md:max-w-2xl  lg:max-w-3xl `}
        >
          <button
            onClick={() => setShowPhotos(true)}
            className="absolute bottom-1 right-2 z-20 rounded-xl p-2 bg-white h-content w-content text-center items-center flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                clip-rule="evenodd"
              />
            </svg>
            <p>Show more Photos</p>
          </button>
          <div className="overflow-hidden w-full h-full">
            <img
              onClick={() => setShowPhotos(true)}
              src={"http://localhost:4000/uploads/" + place.photos[0]}
              alt=""
              className="aspect-square object-cover"
            />
          </div>
          <div className="grid grid-rows-[1fr_1fr]">
            <div className="overflow-hidden">
              <img
                onClick={() => setShowPhotos(true)}
                src={"http://localhost:4000/uploads/" + place.photos[1]}
                alt=""
                className="aspect-square object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <img
                onClick={() => setShowPhotos(true)}
                src={"http://localhost:4000/uploads/" + place.photos[2]}
                alt=""
                className="aspect-square object-cover relative top-2"
              />
            </div>
          </div>
        </div>
      )}
      <div className="mt-2">
        <h2 className="font-semibold text-xl">Description</h2>
        <p className="text-sm">{place.description}</p>
      </div>
      <div className="grid grid-cols-2 mt-4">
        <div className="text-sm font-semibold flex flex-col">
          <span>Check-in Time : {place.checkIn}:00</span>
          <span>Check-out Time : {place.checkOut}:00</span>
          <span>Max Guests Allowed : {place.maxGuests}</span>
        </div>
        <div className="bg-white rounded-xl text-center gap-2 p-2 flex flex-col">
          <span className="text-lg font-semibold">Price : 250$ per night</span>
          <div className="flex justify-between">
            <div className="flex flex-col justify-center items-start lg:flex-row gap-2 lg:items-center">
              <p className="text-sm font-semibold">Check-in: </p>
              <input
                onChange={(ev) => setcheckIn(ev.target.value)}
                type="date"
                value={checkIn}
                className="cursor-pointer bg-gray-200 rounded-md p-2"
                name=""
                id=""
              />
            </div>
            <div className="flex flex-col justify-center items-start lg:flex-row gap-2 lg:items-center">
              <p className="text-sm font-semibold">Check-out: </p>
              <input
                onChange={(ev) => setcheckOut(ev.target.value)}
                value={checkOut}
                type="date"
                className="cursor-pointer bg-gray-200 rounded-md p-2"
                name=""
                id=""
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-start mt-2">
            <p className="text-sm font-semibold">Number of Guests: </p>
            <input
              onChange={(ev) => setGuests(ev.target.value)}
              value={guests}
              type="number"
              className=" rounded-md p-2"
              min={1}
            />
          </div>
          {stayNights > 0 && (
            <>
              <div className="flex flex-col justify-center items-start">
                <p className="text-sm font-semibold">Full Name: </p>
                <input
                  type="text"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
              </div>
              <div className="flex flex-col justify-center items-start">
                <p className="text-sm font-semibold">Mobile Number : </p>
                <input
                  type="number"
                  value={mobile}
                  onChange={(ev) => setMobile(ev.target.value)}
                />
              </div>
            </>
          )}
          <button onClick={(ev) => createBooking(ev)} className="primary">
            Book now {stayNights > 0 ? ` @ ${stayNights * 250}$ only` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SinglePlacePage;

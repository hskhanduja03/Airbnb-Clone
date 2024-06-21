import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleBooking() {
  const [booking, setBooking] = useState(null);
  const { bookingId } = useParams();
  const [showPhotos, setShowPhotos] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  useEffect(() => {
    if (bookingId) {
      axios.get(`/bookings/${bookingId}`).then(({ data }) => {
        const incomingId = data._id;
        if (incomingId === bookingId) setBooking(data);
      });
    }
  }, [bookingId]);

  if (showPhotos) {
    return (
      <div className=" min-h-screen inset-0 absolute bg-white  p-4 ">
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
        <div className="grid gap-3 w-full mt-12 grid-cols-2">
          {booking.placeId.photos.map((photo, index) => (
            <div className="rounded-xl overflow-hidden" key={index}>
              <img
                className="object-fill w-full h-full"
                src={photo.includes('https') ? photo:"http://localhost:4000/uploads/" + photo}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {booking ? (
        <div>
          <div className="bg-gray-100 h-content mt-4 p-4 rounded-3xl flex flex-col gap-2 md: lg:max-w-4xl mx-auto ">
            <div>
              <h2 className="text-2xl font-semibold">
                {booking.placeId.title}
              </h2>
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
                  href={
                    `https://www.google.com/maps/place/` +
                    booking.placeId.address
                  }
                >
                  <span className="underline ">{booking.placeId.address}</span>
                </a>
              </div>
              <div className="bg-green-600 rounded-2xl p-3 text-white mx-1 my-5 grid grid-cols-[5fr_1fr]">
                <div>
                  <h2 className="font-semibold">Your booking information :</h2>
                  <div className="text-sm mt-2 flex gap-4 items-center">
                    <div className="flex items-center gap-1">
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
                          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                        />
                      </svg>
                      <span>{booking.stayNights} Nights</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                        />
                      </svg>
                      <span>{formatDate(booking.checkIn)} </span>
                    </div>
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
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>

                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                        />
                      </svg>
                      <span>{formatDate(booking.checkOut)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-semibold">Total Price:</h2>
                  <h2 className="mt-1 font-semibold text-xl">1200$</h2>
                </div>
              </div>
            </div>
            {booking.placeId.photos && (
              <div
                className={`grid grid-cols-[2fr_1fr] rounded-3xl relative overflow-hidden min-h-[400px] gap-2 mx-auto md:max-w-2xl  lg:max-w-3xl `}
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
                    src={
                      booking.placeId.photos[0].includes('https') ? booking.placeId.photos[0]:"http://localhost:4000/uploads/" + booking.placeId.photos[0]
                    }
                    alt=""
                    className="aspect-square object-cover"
                  />
                </div>
                <div className="grid grid-rows-[1fr_1fr]">
                  <div className="overflow-hidden">
                    <img
                      onClick={() => setShowPhotos(true)}
                      src={
                        booking.placeId.photos[1].includes('https') ? booking.placeId.photos[1]:"http://localhost:4000/uploads/" + booking.placeId.photos[1]
                      }
                      alt=""
                      className="aspect-square object-cover"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <img
                      onClick={() => setShowPhotos(true)}
                      src={
                        booking.placeId.photos[2].includes('https') ? booking.placeId.photos[2]:"http://localhost:4000/uploads/" + booking.placeId.photos[2]
                      }
                      alt=""
                      className="aspect-square object-cover relative top-2"
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="mt-2">
              <h2 className="font-semibold text-xl">Description</h2>
              <p className="text-sm">{booking.placeId.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Booking Not Found</p>
      )}
    </div>
  );
}

export default SingleBooking;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountNav from '../AccountNav';
import axios from 'axios';

function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/bookings')
      .then(({ data }) => setBookings(data))
      .catch(err => console.error(err));
  }, []); // Empty dependency array to run effect only once

  return (
    <div>
      <AccountNav />
      <div className=" mx-auto flex flex-col gap-3">
        {bookings.length > 0 &&
          bookings.map((booking) => {
            return (
              <Link to={`/account/bookings/${booking._id}`} key={booking._id}>
                <div className="w-full bg-gray-200 rounded-xl h-content flex gap-5 p-3 cursor-pointer lg:w-[80%] mx-auto">
                  <div className="bg-red-400 w-[25%] object-cover overflow-hidden rounded-xl hover:opacity-80 max-h-40 lg:max-h-60">
                    <img
                      src={"http://localhost:4000/uploads/" + booking.placeId.photos[0]}
                      className="w-full h-full"
                      alt=""
                    />
                  </div>
                  <div className="w-[70%] h-content p-1 flex gap-2 flex-col justify-between">
                    <div className="w-full">
                      <div className="mb-2">
                        <h2 className="font-semibold text-lg lg:mb-1">
                          {booking.placeId.title}
                        </h2>
                        <p className="text-gray-600 text-xs font-semibold">
                          {booking.placeId.address}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {booking.placeId.description.substring(0, 200)} ...
                      </p>
                    </div>
                    <div className="w-full flex justify-between">
                      <div className=" w-full flex gap-4">
                        <h3 className="text-xs text-gray-500 font-semibold">
                          Max Guests : {booking.placeId.maxGuests}
                        </h3>
                        <h3 className="text-xs text-gray-500 font-semibold">
                          Check-in : {new Date(booking.checkIn).toLocaleDateString()}
                        </h3>
                        <h3 className="text-xs text-gray-500 font-semibold">
                          Check-out : {new Date(booking.checkOut).toLocaleDateString()}
                        </h3>
                      </div>
                      <div>
                        <h3 className="text-xs text-gray-500" style={{ whiteSpace: "nowrap" }}>
                          <span className="text-gray-900 font-semibold">
                            Features:
                          </span>
                          {booking.placeId.perks.map((perk, index) => (
                            <span key={index}>
                              {index > 0 && ", "}
                              {perk}
                            </span>
                          ))}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default BookingsPage;

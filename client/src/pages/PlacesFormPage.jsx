import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import AccountNav from "../AccountNav";

function PlacesFormPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setcheckIn] = useState("");
  const [checkOut, setcheckOut] = useState("");
  const [maxGuests, setmaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const { placeId } = useParams();

  useEffect(() => {
    if (!placeId) return;
    axios.get("/places/" + placeId).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setDescription(data.description);
      setAddress(data.address);
      setPerks(data.perks);
      setcheckIn(data.checkIn);
      setcheckOut(data.checkOut);
      setmaxGuests(data.maxGuests);
      setExtraInfo(data.extraInfo);
      setAddedPhotos(data.photos);
    });
  }, []);

  async function savePlace(ev) {
    const details = {
      title,
      address,
      description,
      extraInfo,
      checkIn,
      checkOut,
      addedPhotos, // Ensure addedPhotos is populated
      perks,
      maxGuests,
    };
    ev.preventDefault();
    try {
      // Check if addedPhotos is populated
      if (!details.addedPhotos) {
        console.error("Error saving place: addedPhotos is not populated");
        return;
      }

      if (placeId) {
        await axios.put("/places", { placeId, ...details });
        setRedirect(true);
      } else {
        await axios.post("/places", details);
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error saving place:", error);
    }
  }

  if (redirect) return <Navigate to={"/account/places"} />;

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    try {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      setAddedPhotos((prev) => {
        return [...prev, filename];
      });
      setPhotoLink("");
    } catch (error) {
      console.error("Error uploading photo:", error.message);
    }
  }

  function removePhoto(ev, link) {
    ev.preventDefault();
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== link)]);
  }

  function makeMainPhoto(ev, link) {
    ev.preventDefault()
    setAddedPhotos([link, ...addedPhotos.filter(photo=>photo!==link)])
  }

  const uploadPhoto = async (event) => {
    const files = event.target.files;
    const formData = new FormData();

    // Append each selected file to the FormData object
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }

    try {
      // Send a POST request to the backend endpoint
      const response = await axios.post("/upload-photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // setAddedPhotos((prev) => {
      //   return [...prev, ...response.data];
      // });
      const resp = response.data;
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];
        console.log(element);
        setAddedPhotos((prev) => {
          return [...prev, element];
        });
      }

      // console.log("Photos uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading photos:", error);
    }
  };
  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        <h2 className="text-xl mt-3 -mb-1">Title</h2>
        <input
          type="text"
          placeholder="eg: Hotel Ambrosia Inn"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2 className="text-xl mt-3 -mb-1">Address</h2>
        <input
          type="text"
          placeholder="eg: Street 9, Santa Monica, USA"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <h2 className="text-xl mt-3 -mb-1">Description</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="add some details about your place for people to know more"
        ></textarea>

        <h2 className="text-xl mt-3 -mb-1">Photos</h2>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Add using a link.."
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
          />
          <button
            className="px-4 py-2.5 rounded-2xl whitespace-nowrap bg-gray-200"
            onClick={addPhotoByLink}
          >
            Add photo
          </button>
        </div>

        <div className="mt-2 grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 gap-2">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div className="relative h-40 overflow-hidden flex items-center justify-center rounded-2xl hover:opacity-95">
                <img
                  className="min-h-40"
                  src={link.includes('https')?link:"http://localhost:4000/uploads/" + link}
                  alt=""
                />
                <button
                  onClick={(ev) => makeMainPhoto(ev, link)}
                  className="absolute cursor-pointer bottom-0 left-0 p-2  bg-transparent text-white bg-black bg-opacity-50 rounded-2xl hover:bg-black"
                >
                  {link === addedPhotos[0] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="size-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  ) : (
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
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  )}
                </button>
                <button
                  onClick={(ev) => removePhoto(ev, link)}
                  className="absolute cursor-pointer right-0 bottom-0 p-2  bg-transparent text-white bg-black bg-opacity-50 rounded-2xl hover:bg-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          <label className="bg-transparent border  h-40 rounded-2xl  text-2xl text-gray-500 cursor-pointer flex justify-center items-center gap-2 ">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={uploadPhoto}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                clipRule="evenodd"
              />
            </svg>
            Upload
          </label>
        </div>

        <h2 className="text-xl mt-4 -mb-1">Features</h2>
        <Perks selected={perks} onChange={setPerks} />

        <h2 className="text-xl mt-4 -mb-1">Extra Info</h2>
        <textarea
          name=""
          id=""
          placeholder="rules etc.."
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        ></textarea>

        <h2 className="text-xl mt-3 -mb-1">Timings</h2>
        <div className="mt-2 flex gap-2 w-full justify-between">
          <div>
            <h3 className="text-gray-500 -mb-1">Check-in Time</h3>
            <input
              type="text"
              placeholder="eg - 11:00"
              value={checkIn}
              onChange={(e) => setcheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="text-gray-500 -mb-1">Check-out Time</h3>
            <input
              type="text"
              placeholder="eg - 10:00"
              value={checkOut}
              onChange={(e) => setcheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="text-gray-500 -mb-1">Max guests</h3>
            <input
              type="number"
              placeholder="eg - 2"
              min={1}
              value={maxGuests}
              onChange={(e) => setmaxGuests(e.target.value)}
            />
          </div>
        </div>

        <button className="primary my-4 max-w-xl mx-auto block" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default PlacesFormPage;

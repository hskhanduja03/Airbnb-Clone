import React from "react";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Account from "./pages/Account";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlaceComponent from "./pages/PlaceComponent";
import SinglePlacePage from "./pages/SinglePlacePage";
import BookingsPage from "./pages/BookingsPage";
import SingleBooking from "./pages/SingleBooking";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/account?" element={<Account/>}/>
          <Route path="/account/places?" element={<PlacesPage/>}/>
          <Route path="/account/bookings" element={<BookingsPage/>}/>
          <Route path="/account/bookings/:bookingId" element={<SingleBooking/>}/>
          <Route path="/account/places/new" element={<PlacesFormPage/>}/>
          <Route path="/account/places/:placeId" element={<PlacesFormPage/>}/>
          <Route path="/place/:id" element={<SinglePlacePage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;

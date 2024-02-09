
import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./components/IndexPage";
import LoginPage from "./components/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./components/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./components/ProfilePage";
import PlacesPage from "./components/PlacesPage";
import PlacesFormPage from "./components/PlacesFormPage";
import SinglePlacePage from "./components/SinglePlacePage";
import BookingPage from "./components/BookingPage";
import SingleBookingPage from "./components/SingleBookingPage";

axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/account/:subpage?' element={<ProfilePage />} />
          <Route path='/account/places' element={<PlacesPage />} />
          <Route path='/account/places/new' element={<PlacesFormPage />} />
          <Route path='/account/places/:id' element={<PlacesFormPage />} />
          <Route path='/place/:id' element={<SinglePlacePage />} />
          <Route path='/account/bookings' element={<BookingPage />} />
          <Route path='/account/bookings/:id' element={<SingleBookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>

  );
}

export default App;

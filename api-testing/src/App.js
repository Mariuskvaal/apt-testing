import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import VenueDetails from "./pages/Venue/VenueDetails"; // Import the new VenueDetails page
import CreateVenuePage from "./components/CreateVenuePopup/CreateVenuePage";
import UpdateVenuePage from "./components/UpdateVenuePage/UpdateVenuePage";
import MyVenuesPage from "./components/MyVenuesPage/MyVenuesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
        <Route path="/profile/:name" element={<Profile />} />
        <Route path="/venues/:id" element={<VenueDetails />} /> {/* Dynamic route */}
        <Route path="/create-venue" element={<CreateVenuePage />} />
        <Route path="/update-venue/:venueId" element={<UpdateVenuePage />} />
        <Route path="/my-venues" element={<MyVenuesPage />} />
      </Routes>
    </Router>
  );
}

export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register"
import Profile from "./pages/Profile/Profile"


function App() {
  return (
    <Router> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Register" element={<Register />} />
      <Route path="Profile" element={<Profile />} />
    </Routes>
    </Router>
  );
}

export default App;

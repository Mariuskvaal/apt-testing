import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register"
import Profile from "./pages/Profile/Profile"
import Login from './pages/Login/Login';


function App() {
  return (
    <Router> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Register" element={<Register />} />
      <Route path="Login" element={<Login />} />
      <Route path="/profile/:name" element={<Profile />} /> {/* Dynamic route */}
    </Routes>
    </Router>
  );
}

export default App;

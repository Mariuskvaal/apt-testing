import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {

const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
};
return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">MyLogo</div>
        <button className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? "X" : "☰"}
        </button>
        <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Register">Register</Link></li>
          <li><Link to="/Profile">Profile</Link></li>
        </ul>
      </nav>

      <div className="h1">
        <h1>Homepage </h1>
      </div>
    </div>
  );
};

export default Home;

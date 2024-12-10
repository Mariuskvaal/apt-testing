import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import { faUser } from "@fortawesome/free-solid-svg-icons"; // Import the user icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username"); // Retrieve the username from localStorage

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    if (username) {
      navigate(`/profile/${username}`); // Redirect to the logged-in user's profile
    } else {
      navigate("/login"); // Redirect to login if no user is logged in
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">MyLogo</div>
      <button className="navbar-toggle" onClick={toggleMenu}>
        {isMenuOpen ? "X" : "☰"}
      </button>
      <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Register">Register</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li>
        <li>
          <button onClick={handleProfileClick} className="profile-link">
            <FontAwesomeIcon icon={faUser} size="lg" /> {/* Add the user icon */}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;




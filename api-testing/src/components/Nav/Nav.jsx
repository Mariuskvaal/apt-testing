import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import "./Nav.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const username = localStorage.getItem("username");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const BackToHomeWhenClickingLogo = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    if (username) {
      navigate(`/profile/${username}`);
    } else {
      navigate("/login");
    }
  };

  // Define routes that should have position absolute
  const absolutePositionRoutes = ["/", "/login", "/register"];

  // Check if the current route should have position absolute
  const isAbsolute = absolutePositionRoutes.includes(location.pathname);

  return (
    <nav className={`navbar ${isAbsolute ? "absolute-navbar" : "unset-navbar"}`}>
      <div onClick={BackToHomeWhenClickingLogo} className="navbar-logo">Holidaze</div>
      <button className="navbar-toggle" onClick={toggleMenu}>
        {isMenuOpen ? "X" : "☰"}
      </button>
      <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <button onClick={handleProfileClick} className="icon-button">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;










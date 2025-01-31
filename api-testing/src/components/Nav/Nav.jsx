import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Nav.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const username = localStorage.getItem("username");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const BackToHomeWhenClickingLogo = () => {
    navigate("/");
    closeMenu();
  };

  const handleProfileClick = () => {
    if (username) {
      navigate(`/profile/${username}`);
    } else {
      navigate("/login");
    }
    closeMenu();
  };

  const absolutePositionRoutes = ["/", "/login", "/register"];
  const isAbsolute = absolutePositionRoutes.includes(location.pathname);

  return (
    <nav className={`navbar ${isAbsolute ? "absolute-navbar" : "unset-navbar"}`}>
      <div onClick={BackToHomeWhenClickingLogo} className="navbar-logo">Holidaze</div>
      
      {/* Toggle Button */}
      <button className="navbar-toggle" onClick={toggleMenu}>
        {isMenuOpen ? "X" : "☰"}
      </button>

      {/* Overlay Navigation */}
      <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
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











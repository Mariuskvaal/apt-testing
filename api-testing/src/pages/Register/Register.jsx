import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {

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
        </ul>
      </nav>
    <div className="h1">
        <h1> This is Register Page </h1>
    </div>
    </div>
  );
};

export default Register;
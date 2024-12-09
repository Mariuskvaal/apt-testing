import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "" });
  const [message, setMessage] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "https://v2.api.noroff.dev/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Login successful!");
      console.log("Response:", response.data);
    } catch (error) {
      setMessage("Login failed. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      {/* Navigation Bar */}
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
            <Link to="/Profile">Profile</Link>
          </li>
        </ul>
      </nav>

      {/* Login Form */}
      <div className="login-page">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
                    <label htmlFor="email">Email</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>

        {/* Message */}
        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  // State for navigation menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State for form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // State for success/error messages
  const [message, setMessage] = useState("");

  // Toggle navigation menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update specific form input
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setMessage(""); // Clear previous messages

    try {
      const response = await axios.post(
        "https://v2.api.noroff.dev/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Handle success
      setMessage("Registration successful!");
      console.log("Response:", response.data);
    } catch (error) {
      // Handle error
      setMessage("Registration failed. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
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
            <Link to="/Profile">Profile</Link>
          </li>
        </ul>
      </nav>

      {/* Form Section */}
      <div className="register-page">
        <h1>Register</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          {/* Username Input */}
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />

          {/* Email Input */}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          {/* Password Input */}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          {/* Submit Button */}
          <button type="submit">Register</button>
        </form>

        {/* Success/Error Message */}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;

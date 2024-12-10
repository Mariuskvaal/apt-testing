import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";
import "./Login.css";
import Navbar from "../../components/Nav/Nav"

const Login = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

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
  
      const { accessToken, name } = response.data.data; // Correctly extract name and accessToken
  
      // Save accessToken and name in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", name);
  
      // Redirect to the user's profile
      navigate(`/profile/${name}`);
    } catch (error) {
      setMessage("Login failed. Please try again.");
      console.error("Error during login:", error.response?.data || error);
    }
  };
  

  return (
    <>
      {/* Navigation Bar */}
      <Navbar />

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
          <label htmlFor="password">Password</label>
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


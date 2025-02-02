import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import Navbar from "../../components/Nav/Nav";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    venueManager: false,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, venueManager: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "https://v2.api.noroff.dev/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          venueManager: formData.venueManager,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Registration successful!");
      localStorage.setItem("venueManager", formData.venueManager);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setMessage(error.response.data.errors[0].message);
      } else {
        setMessage("Registration failed. Please try again.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-page-wrapper">
        <div className="register-page">
          <h1>Register</h1>
          <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

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

            <div className="checkbox-container">
              <label htmlFor="venueManager">
                <input
                  type="checkbox"
                  id="venueManager"
                  name="venueManager"
                  checked={formData.venueManager}
                  onChange={handleCheckboxChange}
                />
                Register as a Venue Manager
              </label>
            </div>

            <button type="submit">Register</button>
          </form>

          {message && <p className="message">{message}</p>}

          {/* ✅ Corrected Login Link */}
          <p className="register-page-footer">
            Already have an account? <Link to="/login">Login here</Link>.
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;





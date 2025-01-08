import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import Navbar from "../../components/Nav/Nav";

const Register = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    venueManager: false, // Add venueManager flag
  });

  // State for success/error messages
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, venueManager: e.target.checked });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message
  
    try {
      const response = await axios.post(
        "https://v2.api.noroff.dev/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          venueManager: formData.venueManager, // Include venueManager flag
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Registration Response:", response.data);
      setMessage("Registration successful!");
  
      // Save the venueManager flag to localStorage
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
      {/* Navigation Bar */}
      <Navbar />

      {/* Form Section */}
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

          {/* Venue Manager Checkbox */}
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

        {/* Display Message */}
        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
};

export default Register;




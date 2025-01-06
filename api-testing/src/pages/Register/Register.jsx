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
  });

  // State for success/error messages
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

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
      setMessage("Registration successful!");
      console.log("Response:", response.data);
    } catch (error) {
      // Check if the error response contains a specific message
      if (error.response && error.response.data && error.response.data.errors) {
        setMessage(error.response.data.errors[0].message); // Set the server error message
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

          <button type="submit">Register</button>
        </form>

        {/* Display Message */}
        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
};

export default Register;



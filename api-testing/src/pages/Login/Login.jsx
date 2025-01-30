import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Register/Register.css";
import Navbar from "../../components/Nav/Nav";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

      console.log("Login Response:", response.data);
      const { accessToken, name } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", name);

      const apiKeyResponse = await axios.post(
        "https://v2.api.noroff.dev/auth/create-api-key",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const apiKey = apiKeyResponse.data.data.key;
      localStorage.setItem("apiKey", apiKey);

      navigate(`/profile/${name}`);
    } catch (error) {
      setMessage("Login failed. Please try again.");
      console.error("Error during login:", error.response?.data || error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-page-wrapper">
        <div className="register-page">
          <h1>Login</h1>
          <form className="register-form" onSubmit={handleSubmit}>
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

          {message && <p className="message">{message}</p>}

          {/* ✅ Corrected Register Link */}
          <p className="register-page-footer">
            Don't have an account? <Link to="/register">Register here</Link>.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;







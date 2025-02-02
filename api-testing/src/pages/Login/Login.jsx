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


      const { accessToken, name } = response.data.data;
      
      // Store token and username
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", name);


      // Create API Key Request
      try {
        const apiKeyResponse = await axios.post(
          "https://v2.api.noroff.dev/auth/create-api-key",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (apiKeyResponse.data?.data?.key) {
          const apiKey = apiKeyResponse.data.data.key;
          localStorage.setItem("apiKey", apiKey);
        } else {
          console.error("⚠️ API Key request failed:", apiKeyResponse);
        }
      } catch (apiKeyError) {
        console.error("❌ Error creating API Key:", apiKeyError.response?.data || apiKeyError);
      }

      // Redirect to profile
      navigate(`/profile/${name}`);
      
    } catch (error) {
      setMessage("Login failed. Please try again.");
      console.error("❌ Error during login:", error.response?.data || error);
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

          <p className="register-page-footer">
            Don't have an account? <Link to="/register">Register here</Link>.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;








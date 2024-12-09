import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { name } = useParams(); // Retrieve the username from the URL
  const navigate = useNavigate(); // For redirecting if token is invalid
  const [profileData, setProfileData] = useState(null);
  const accessToken = localStorage.getItem("accessToken"); // Get accessToken from localStorage
  const apiKey = process.env.REACT_APP_API_KEY; // Retrieve the API key from .env

  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) {
        console.error("No access token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `https://v2.api.noroff.dev/holidaze/profiles/${name}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Add the correct Authorization header
              "X-Noroff-API-Key": apiKey, // Add the API key
            },
          }
        );
        setProfileData(response.data.data); // Update state with profile data
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error);
        if (error.response?.status === 401) {
          // Redirect to login on invalid token
          localStorage.removeItem("accessToken"); // Clear invalid token
          navigate("/login");
        }
      }
    };

    fetchProfile();
  }, [name, accessToken, apiKey, navigate]);

  return (
    <div>
      <h1>My Profile</h1>
      {profileData ? (
        <div>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          <p>Bio: {profileData.bio}</p>
          {profileData.avatar && (
            <img src={profileData.avatar.url} alt={profileData.avatar.alt} />
          )}
          {profileData.banner && (
            <img src={profileData.banner.url} alt={profileData.banner.alt} />
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;

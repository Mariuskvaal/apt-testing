import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import Navbar from "../../components/Nav/Nav";

const Profile = () => {
  const { name } = useParams(); // Retrieve the username from the URL
  const navigate = useNavigate(); // For redirecting if token is invalid
  const [profileData, setProfileData] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility
  const [avatarUrl, setAvatarUrl] = useState(""); // State for avatar URL input
  const [avatarAlt, setAvatarAlt] = useState(""); // State for avatar alt input
  const [updateMessage, setUpdateMessage] = useState(""); // Message for update feedback
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

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Clear accessToken from localStorage
    localStorage.removeItem("username"); // Clear username from localStorage
    navigate("/login"); // Redirect to the login page
  };

  // Update avatar handler
  const handleUpdateAvatar = async () => {
    if (!avatarUrl.trim()) {
      setUpdateMessage("Avatar URL cannot be empty.");
      return;
    }

    try {
      const response = await axios.put(
        `https://v2.api.noroff.dev/holidaze/profiles/${name}`,
        {
          avatar: {
            url: avatarUrl,
            alt: avatarAlt || "User Avatar", // Default alt text if none provided
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      setProfileData(response.data.data); // Update profile data with the new avatar
      setUpdateMessage("Avatar updated successfully!");
      setShowPopup(false); // Close the popup after successful update
    } catch (error) {
      console.error("Error updating avatar:", error.response?.data || error);
      setUpdateMessage("Failed to update avatar. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <h1>My Profile</h1>
        {profileData ? (
          <div className="profile-details">
            <p>Name: {profileData.name}</p>
            <p>Email: {profileData.email}</p>
            <p>Bio: {profileData.bio}</p>
            {profileData.avatar && (
              <div>
                <p>Avatar:</p>
                <img src={profileData.avatar.url} alt={profileData.avatar.alt} />
              </div>
            )}
            {profileData.banner && (
              <div>
                <p>Banner:</p>
                <img src={profileData.banner.url} alt={profileData.banner.alt} />
              </div>
            )}

            {/* Logout Button */}
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>

            {/* Update Avatar Button */}
            <button
              className="update-avatar-button"
              onClick={() => setShowPopup(true)}
            >
              Update Avatar
            </button>
          </div>
        ) : (
          <p className="loading-message">Loading profile...</p>
        )}
      </div>

      {/* Popup Window */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Update Avatar</h3>
            <input
              type="text"
              placeholder="Enter new avatar URL"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="avatar-input"
            />
            <input
              type="text"
              placeholder="Enter alt text (optional)"
              value={avatarAlt}
              onChange={(e) => setAvatarAlt(e.target.value)}
              className="avatar-input"
            />
            <button onClick={handleUpdateAvatar} className="confirm-update-button">
              Update Avatar
            </button>
            <button onClick={() => setShowPopup(false)} className="close-popup-button">
              Cancel
            </button>
            {updateMessage && <p className="update-message">{updateMessage}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;




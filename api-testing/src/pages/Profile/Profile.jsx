import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Nav/Nav";
import BookingsPopup from "../../components/Profile/BookingsPopup"; // Use combined file
import "./Profile.css";

const Profile = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for controlling the bookings popup
  const [avatarPopup, setAvatarPopup] = useState(false); // State for avatar update popup
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarAlt, setAvatarAlt] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `https://v2.api.noroff.dev/holidaze/profiles/${name}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "X-Noroff-API-Key": apiKey,
            },
          }
        );
        setProfileData(response.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error);
        if (error.response?.status === 401) {
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      }
    };

    fetchProfile();
  }, [name, accessToken, apiKey, navigate]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    navigate("/login");
  };

  // Avatar update handler
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
            alt: avatarAlt || "User Avatar",
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
      setProfileData(response.data.data);
      setUpdateMessage("Avatar updated successfully!");
      setAvatarPopup(false);
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
            <p>Bio: {profileData.bio || "No bio available."}</p>
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

            {/* Buttons */}
            <button className="view-bookings-button" onClick={() => setShowPopup(true)}>View Bookings</button>

            <button className="update-avatar-button" onClick={() => setAvatarPopup(true)}>Update Avatar</button>
            
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>

      {/* Bookings Popup */}
      {showPopup && (
        <BookingsPopup
          username={name}
          accessToken={accessToken}
          apiKey={apiKey}
          onClose={() => setShowPopup(false)}
        />
      )}

      {/* Avatar Popup */}
      {avatarPopup && (
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
            <button onClick={() => setAvatarPopup(false)} className="close-popup-button">
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





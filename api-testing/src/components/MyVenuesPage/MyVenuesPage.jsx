import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Nav/Nav";
import "./MyVenuesPage.css";

const MyVenuesPage = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Message state for success/failure
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");
  const username = localStorage.getItem("username"); // Get the profile name from local storage

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          `https://v2.api.noroff.dev/holidaze/profiles/${username}/venues`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "X-Noroff-API-Key": apiKey,
            },
          }
        );
        setVenues(response.data.data);
      } catch (error) {
        console.error("Error fetching venues:", error.response?.data || error);
        setError("Failed to load venues. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [username, accessToken, apiKey]);

  const handleDelete = async (venueId) => {
    try {
      await axios.delete(`https://v2.api.noroff.dev/holidaze/venues/${venueId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
      });
      // Remove the deleted venue from the state
      setVenues(venues.filter((venue) => venue.id !== venueId));
      setMessage("Venue deleted successfully.");
    } catch (error) {
      console.error("Error deleting venue:", error.response?.data || error);
      setMessage("Failed to delete venue. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="my-venues-container">
        <h1>My Venues</h1>
        {loading && <p>Loading venues...</p>}
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        {!loading && !error && venues.length === 0 && (
          <p>You have not created any venues yet.</p>
        )}
        <div className="venues-list">
          {venues.map((venue) => (
            <div key={venue.id} className="venue-card">
              <h3>{venue.name}</h3>
              <p>{venue.description}</p>
              <p>
                Price: {venue.price} | Max Guests: {venue.maxGuests}
              </p>
              <button
                onClick={() => navigate(`/update-venue/${venue.id}`)}
                className="update-venue-button"
              >
                Update Venue
              </button>
              <button
                onClick={() => handleDelete(venue.id)}
                className="delete-venue-button"
              >
                Delete Venue
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyVenuesPage;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookingsPopup.css";

const BookingsPopup = ({ username, accessToken, apiKey, onClose }) => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch bookings API call
  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `https://v2.api.noroff.dev/holidaze/profiles/${username}/bookings`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        }
      );
      setBookings(response.data.data);
    } catch (err) {
      console.error("Error fetching bookings:", err.response?.data || err);
      setError("Failed to fetch bookings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [username, accessToken, apiKey]);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-popup-button" onClick={onClose}>
          &times;
        </button>
        <h2>My Bookings</h2>
        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : bookings.length > 0 ? (
          <ul className="bookings-list">
            {bookings.map((booking) => (
              <li key={booking.id}>
                <p>
                  Booking ID: {booking.id} <br />
                  Check-In: {new Date(booking.dateFrom).toLocaleDateString()} <br />
                  Check-Out: {new Date(booking.dateTo).toLocaleDateString()} <br />
                  Guests: {booking.guests}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default BookingsPopup;



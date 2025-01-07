import React, { useState } from "react";
import axios from "axios";
import "./BookingForm.css"; // Optional CSS for styling

const BookingForm = ({ venueId, maxGuests }) => {
  const [bookingDetails, setBookingDetails] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 1,
  });
  const [bookingResponse, setBookingResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");

    if (!accessToken || !apiKey) {
      setError("Missing access token or API key. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "https://v2.api.noroff.dev/holidaze/bookings",
        {
          venueId,
          dateFrom: bookingDetails.dateFrom,
          dateTo: bookingDetails.dateTo,
          guests: bookingDetails.guests,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      setBookingResponse(response.data); // Store booking response
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Could not create booking. Please try again.");
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Create a Booking</h2>
      {bookingResponse ? (
        <p>Your booking was successfully created! Booking ID: {bookingResponse.data.id}</p>
      ) : (
        <form onSubmit={handleBookingSubmit}>
          <div>
            <label htmlFor="dateFrom">Check-In:</label>
            <input
              type="date"
              id="dateFrom"
              value={bookingDetails.dateFrom}
              onChange={(e) => setBookingDetails({ ...bookingDetails, dateFrom: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="dateTo">Check-Out:</label>
            <input
              type="date"
              id="dateTo"
              value={bookingDetails.dateTo}
              onChange={(e) => setBookingDetails({ ...bookingDetails, dateTo: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="guests">Guests:</label>
            <input
              type="number"
              id="guests"
              min="1"
              max={maxGuests || 1}
              value={bookingDetails.guests}
              onChange={(e) => setBookingDetails({ ...bookingDetails, guests: parseInt(e.target.value) })}
              required
            />
          </div>
          <button type="submit" className="booking-button">Book Now</button>
        </form>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default BookingForm;


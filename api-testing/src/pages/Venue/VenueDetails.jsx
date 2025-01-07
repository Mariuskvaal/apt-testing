import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Nav/Nav";
import "./VenueDetails.css"; // Import the new CSS file
import BookingForm from "../../components/BookingForm/BookingForm";
import BookingCalendar from "../../components/BookingCalendar/BookingCalendar"; //

const VenueDetails = () => {
  const { id } = useParams(); // Get the venue ID from the URL
  const [venue, setVenue] = useState(null); // State to store venue data
  const [error, setError] = useState(null); // State for error handling
  const [showGallery, setShowGallery] = useState(false); // State to handle modal visibility

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get(
          `https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`
        );
        setVenue(response.data); // Store the venue data, including bookings
      } catch (error) {
        setError("Could not fetch venue details. Please try again later.");
        console.error("Error fetching venue details:", error);
      }
    };

    fetchVenue();
  }, [id]);

  if (error) {
    return <p>{error}</p>; // Display error message if the API call fails
  }

  if (!venue) {
    return <p>Loading...</p>; // Display loading message while data is being fetched
  }

  const Info = venue.data; // Correctly access the data property of the venue

  return (
    <>
      <Navbar />

      {console.log(Info)}

      {/* Main image with "View All Images" button */}
      {Info.media && Info.media.length > 0 && (
        <div className="main-image-container">
          <img
            src={Info.media[0].url}
            alt={Info.media[0].alt || "Main Venue Image"}
            className="main-image"
          />
          {Info.media.length > 1 && (
            <button className="view-all-button" onClick={() => setShowGallery(true)}>
              View All Images
            </button>
          )}
        </div>
      )}

      {/* Modal for all images */}
      {showGallery && (
        <div className="image-modal">
          <div className="modal-overlay" onClick={() => setShowGallery(false)}></div>
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowGallery(false)}>
              &times;
            </button>
            <div className="modal-images">
              {Info.media.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.alt || `Venue Image ${index + 1}`}
                  className="modal-image"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="venue-details">
        <div className="venue-header">
          <h1>{Info.name || "Unnamed Venue"}</h1>
          <p className="venue-description">{Info.description || "No description available."}</p>
        </div>

        <div className="venue-details-grid">
          <div className="venue-info">
            <h2>Details</h2>
            <p><strong>Price:</strong> {Info.price ? `${Info.price} NOK` : "Not available"}</p>
            <p><strong>Max Guests:</strong> {Info.maxGuests || "N/A"}</p>
            <p><strong>Rating:</strong> {Info.rating || "No rating available"}</p>
            <p><strong>Bookings:</strong> {Info._count.bookings || 0}</p>
          </div>

          <div className="venue-location">
            <h2>Location</h2>
            <p><strong>Address:</strong> {Info.location?.address || "Not available"}</p>
            <p><strong>City:</strong> {Info.location?.city || "Not available"}</p>
            <p><strong>Zip Code:</strong> {Info.location?.zip || "Not available"}</p>
            <p><strong>Country:</strong> {Info.location?.country || "Not available"}</p>
          </div>

          <div className="venue-amenities">
            <h2>Amenities</h2>
            <p><strong>WiFi:</strong> {Info.meta.wifi ? "Yes" : "No"}</p>
            <p><strong>Parking:</strong> {Info.meta.parking ? "Yes" : "No"}</p>
            <p><strong>Breakfast:</strong> {Info.meta.breakfast ? "Yes" : "No"}</p>
            <p><strong>Pets Allowed:</strong> {Info.meta.pets ? "Yes" : "No"}</p>
          </div>
        </div>

        <BookingCalendar bookings={Info.bookings || []} />


        {/* Booking Form */}
        <BookingForm venueId={id} maxGuests={Info.maxGuests} />
      </div>
    </>
  );
};

export default VenueDetails;




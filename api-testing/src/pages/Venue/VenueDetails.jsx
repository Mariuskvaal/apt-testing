import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Nav/Nav";
import "./VenueDetails.css";
import BookingForm from "../../components/BookingForm/BookingForm";
import BookingCalendar from "../../components/BookingCalendar/BookingCalendar";

const VenueDetails = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image in carousel

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get(
          `https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`
        );
        setVenue(response.data);
      } catch (error) {
        setError("Could not fetch venue details. Please try again later.");
        console.error("Error fetching venue details:", error);
      }
    };

    fetchVenue();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!venue) {
    return <p>Loading...</p>;
  }

  const Info = venue.data;
  const media = Info.media || [];

  // Function to move to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  // Function to move to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Navbar />

      {/* Display Image Carousel */}
      {media.length > 0 && (
        <div className="carousel-container">
          {/* Carousel Arrows */}
          {media.length > 1 && (
            <>
              <button className="carousel-arrow left-arrow" onClick={prevImage}>
                &#9664;
              </button>
              <button className="carousel-arrow right-arrow" onClick={nextImage}>
                &#9654;
              </button>
            </>
          )}

          {/* Display Current Image */}
          <img
            src={media[currentImageIndex].url}
            alt={media[currentImageIndex].alt || `Venue Image ${currentImageIndex + 1}`}
            className="carousel-image"
          />

          {/* Image Counter */}
          {media.length > 1 && (
            <div className="image-counter">
              {currentImageIndex + 1} / {media.length}
            </div>
          )}
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
        <BookingForm venueId={id} maxGuests={Info.maxGuests} />
      </div>
    </>
  );
};

export default VenueDetails;







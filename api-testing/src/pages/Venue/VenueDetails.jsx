import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Nav/Nav";
import "./VenueDetails.css"; // Import the new CSS file

const VenueDetails = () => {
  const { id } = useParams(); // Get the venue ID from the URL
  const [venue, setVenue] = useState(null); // State to store venue data
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get(`https://v2.api.noroff.dev/holidaze/venues/${id}`);
        setVenue(response.data); // Store the venue data
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

  const { name, description, media, price, maxGuests, rating, meta, location, _count } = venue;

  const Info = venue.data;

  return (
    <>
      <Navbar />

      {console.log(Info)}

        {Info.media && Info.media.length > 0 && (
  <div className="venue-images">
    {Info.media.map((image, index) => (
      <img
        key={index} // Assign a unique key to each image
        src={image.url} // Correctly access the URL of the image
        alt={image.alt || "Venue Image"} // Correctly access the alt text of the image
        className="venue-image"
      />
    ))}
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
      </div>
    </>
  );
};

export default VenueDetails;


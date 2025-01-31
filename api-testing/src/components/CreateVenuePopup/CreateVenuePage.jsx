import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Nav/Nav";
import "./CreateVenuePage.css";
import { useNavigate } from "react-router-dom"; 



const CreateVenuePage = () => {

  const navigate = useNavigate(); 
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    maxGuests: 1,
    rating: 0,
    media: [{ url: "", alt: "" }],
    meta: { wifi: false, parking: false, breakfast: false, pets: false },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  });
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(null); // ✅ State for countdown timer
  const accessToken = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle media changes
  const handleMediaChange = (index, field, value) => {
    const updatedMedia = [...formData.media];
    updatedMedia[index][field] = value;
    setFormData({ ...formData, media: updatedMedia });
  };

  // Handle meta changes (checkboxes)
  const handleMetaChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      meta: { ...formData.meta, [name]: checked },
    });
  };

  // Handle location changes
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
  
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [name]: name === "lat" || name === "lng" ? parseFloat(value) || 0 : value,
      },
    });
  };
  

  // Add a new media input
  const addMediaInput = () => {
    setFormData({
      ...formData,
      media: [...formData.media, { url: "", alt: "" }],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://v2.api.noroff.dev/holidaze/venues",
        {
          ...formData,
          price: Number(formData.price),
          maxGuests: Number(formData.maxGuests),
          rating: Number(formData.rating),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );
  
      setMessage("Venue created successfully!");
      setCountdown(3); // ✅ Start countdown from 3 seconds
      console.log("Venue Created:", response.data);

      // Start countdown effect
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(countdownInterval); // Stop the countdown
            navigate(`/profile/${localStorage.getItem("username")}`); // Redirect after countdown ends
          }
          return prevCountdown - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error creating venue:", error.response?.data || error);
      setMessage("Failed to create venue. Please try again.");
    }
  };


  return (
    <>
      <Navbar />
      <div className="create-venue-container">
        <h1>Create a New Venue</h1>
        <form className="create-venue-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Venue Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter venue name"
            required
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter venue description"
            required
          ></textarea>

          <label htmlFor="price">Price (per night):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
          />

          <label htmlFor="maxGuests">Max Guests:</label>
          <input
            type="number"
            id="maxGuests"
            name="maxGuests"
            value={formData.maxGuests}
            onChange={handleChange}
            min="1"
            required
          />

          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            required
          />

          <h3>Media</h3>
          {formData.media.map((media, index) => (
            <div key={index}>
              <label htmlFor={`media-url-${index}`}>Media URL:</label>
              <input
                type="url"
                id={`media-url-${index}`}
                value={media.url}
                onChange={(e) =>
                  handleMediaChange(index, "url", e.target.value)
                }
                placeholder="Enter media URL"
              />
              <label htmlFor={`media-alt-${index}`}>Alt Text:</label>
              <input
                type="text"
                id={`media-alt-${index}`}
                value={media.alt}
                onChange={(e) =>
                  handleMediaChange(index, "alt", e.target.value)
                }
                placeholder="Enter alt text"
              />
            </div>
          ))}
          <button type="button" onClick={addMediaInput}>
            Add Another Media
          </button>

          <h3>Meta Options</h3>
          <label>
            <input
              type="checkbox"
              name="wifi"
              checked={formData.meta.wifi}
              onChange={handleMetaChange}
            />
            WiFi
          </label>
          <label>
            <input
              type="checkbox"
              name="parking"
              checked={formData.meta.parking}
              onChange={handleMetaChange}
            />
            Parking
          </label>
          <label>
            <input
              type="checkbox"
              name="breakfast"
              checked={formData.meta.breakfast}
              onChange={handleMetaChange}
            />
            Breakfast
          </label>
          <label>
            <input
              type="checkbox"
              name="pets"
              checked={formData.meta.pets}
              onChange={handleMetaChange}
            />
            Pets Allowed
          </label>

          <h3>Location</h3>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.location.address}
            onChange={handleLocationChange}
            placeholder="Enter address"
          />
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.location.city}
            onChange={handleLocationChange}
            placeholder="Enter city"
          />
          <label htmlFor="zip">Zip:</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={formData.location.zip}
            onChange={handleLocationChange}
            placeholder="Enter zip code"
          />
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.location.country}
            onChange={handleLocationChange}
            placeholder="Enter country"
          />
          <label htmlFor="continent">Continent:</label>
          <input
            type="text"
            id="continent"
            name="continent"
            value={formData.location.continent}
            onChange={handleLocationChange}
            placeholder="Enter continent"
          />
          <label htmlFor="lat">Latitude:</label>
          <input
            type="number"
            id="lat"
            name="lat"
            value={formData.location.lat}
            onChange={handleLocationChange}
            step="0.0001"
          />
          <label htmlFor="lng">Longitude:</label>
          <input
            type="number"
            id="lng"
            name="lng"
            value={formData.location.lng}
            onChange={handleLocationChange}
            step="0.0001"
          />

{message && <p className="message">{message} {countdown !== null && <span> Redirecting in {countdown}...</span>}</p>} {/* ✅ Show countdown */}

          <button type="submit">Create Venue</button>
        </form>
      </div>
    </>
  );
};

export default CreateVenuePage;


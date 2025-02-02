import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Nav/Nav";
import axios from "axios";
import "./Home.css";
import HeroSection from "../../components/HeroSection/HeroSection";

const Home = () => {
  const [venues, setVenues] = useState([]); // State for venue data
  const [sortedVenues, setSortedVenues] = useState([]); // State for sorted venues
  const [sortCriteria, setSortCriteria] = useState(""); // No default sorting criteria
  const [sortOrder, setSortOrder] = useState("asc"); // Default to ascending if chosen

  // Fetch data from the API
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get("https://v2.api.noroff.dev/holidaze/venues");
        setVenues(response.data.data); 


        setSortedVenues(response.data.data); 
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, []);

  // Handle sorting
  useEffect(() => {
    if (sortCriteria) {
      const sorted = [...venues].sort((a, b) => {
        if (sortCriteria === "price") {
          return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
        } else if (sortCriteria === "rating") {
          return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
        } else if (sortCriteria === "date") {
          return sortOrder === "asc"
            ? new Date(a.created) - new Date(b.created)
            : new Date(b.created) - new Date(a.created);
        }
        return 0;
      });

      setSortedVenues(sorted);
    } else {

      setSortedVenues(venues);
    }
  }, [sortCriteria, sortOrder, venues]);

  return (
    <>
      <HeroSection />
<h1>Explore Venues</h1>
      <div className="home-home-page">
        

        {/* Sorting Controls */}
        <div className="home-sorting-container">
          <label htmlFor="sort">Sort by: </label>
          <select
            id="sort"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="date">Date</option>
          </select>

          {sortCriteria && (
            <>
              <label htmlFor="order">Order: </label>
              <select
                id="order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </>
          )}
        </div>

        {/* Venue Cards */}
        <div className="home-venue-grid">
  {sortedVenues.map((venue) => (
    <div key={venue.id} className="home-venue-card">
      <Link to={`/venues/${venue.id}`}>
        <div className="home-venue-image-container">
          <img
            src={venue.media[0]?.url || "https://via.placeholder.com/150"}
            alt={venue.media[0]?.alt || "Venue Image"}
            className="home-venue-image"
          />
        </div>


{/*  */}
        <div className="home-venue-card-details">
  <div className="home-venue-title-and-rating">
    <h3 className="home-h3">{venue.name}</h3>

    <div className="home-venue-star-and-venue-rating">
    <p className="home-rock"><i className="fas fa-star"></i>{venue.rating}</p>
  </div>
  </div>
  


  <div className="home-venue-amenities">

{venue.maxGuests && (
  <div className="venue-max-guests" title="Maximum Guests">
    <i className="fa-solid fa-user"></i>
    <p className="maxguestsnumber">{venue.maxGuests}</p>
  </div>
)}

{venue.meta?.parking && (
  <div className="venue-parking" title="Parking Available">
    <i className="fa-solid fa-square-parking"></i>
    <p>Parking</p>
  </div>
)}

{venue.meta?.breakfast && (
  <div className="venue-breakfast" title="Breakfast Included">
    <i className="fa-solid fa-utensils"></i>
    <p>Breakfast</p>
  </div>
)}

{venue.meta?.pets && (
  <div className="venue-pets" title="Pets Allowed">
    <i className="fa-solid fa-paw"></i>
    <p>Pets Allowed</p>
  </div>
)}

</div>

  
  <div className="home-venue-price-wrapper">

    <p className="home-venue-price">{venue.price} NOK/night</p>
    
</div>
</div>


      </Link>
    </div>
  ))}
</div>
</div>
    </>
  );
};

export default Home;








import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Nav/Nav";
import axios from "axios";
import "./Home.css";
import HeroSection from "../../components/HeroSection/HeroSection";
import SearchBar from "../../components/SearchBar.jsx/SearchBar";

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
        setVenues(response.data.data); // Store the venue data
        setSortedVenues(response.data.data); // Display the default order from the server
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
      // If no sorting criteria is selected, show venues as they came from the server
      setSortedVenues(venues);
    }
  }, [sortCriteria, sortOrder, venues]);

  return (
    <>
      <HeroSection />
<h1>Explore Venues</h1>
      <div className="home-page">
        

        {/* Sorting Controls */}
        <div className="sorting-container">
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
        <div className="venue-grid">
          {sortedVenues.map((venue) => (
            <div key={venue.id} className="venue-card">
              <Link to={`/venues/${venue.id}`}>
                <div className="venue-image-container">
                  <img
                    src={venue.media[0]?.url || "https://via.placeholder.com/150"}
                    alt={venue.media[0]?.alt || "Venue Image"}
                    className="venue-image"
                  />
                </div>
                <div className="venue-card-details">
                  <h3>{venue.name}</h3>
                  <p className="venue-price">From {venue.price} NOK/night</p>
                  <p className="venue-rating">⭐ {venue.rating}</p>
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








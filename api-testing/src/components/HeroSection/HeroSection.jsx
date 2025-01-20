import React, { useState } from "react";
import "./HeroSection.css";
import Navbar from "../Nav/Nav";
import { searchVenues } from "../../components/SearchVenues/SearchVenues";
import SearchBar from "../SearchBar.jsx/SearchBar";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]); // Clear results if query is empty
      return;
    }

    try {
      const response = await searchVenues(query);
      setSearchResults(response); // No `.data` since `searchVenues` already returns `response.data`
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleSearchResultClick = (venueId) => {
    console.log("Navigate to venue:", venueId); // Replace with navigation logic if needed
  };

  return (
    <>
      <div className="Home-Page-Hero">
        <Navbar />
        <div className="hero-section">
          <div className="hero-overlay">
            <h1>Welcome to Holidaze</h1>
            <p>Find the perfect venue for your next adventure.</p>
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;

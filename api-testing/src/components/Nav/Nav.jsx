import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { searchVenues } from "../../components/SearchVenues/SearchVenues";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery(""); // Clear the search query when opening/closing the search bar
    setSearchResults([]); // Clear previous search results
  };

  const handleProfileClick = () => {
    if (username) {
      navigate(`/profile/${username}`);
    } else {
      navigate("/login");
    }
  };

  // Fetch venues as the user types
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  
    if (query.trim() === "") {
      setSearchResults([]); // Clear results if query is empty
      return;
    }
  
    try {
      const response = await searchVenues(query); // Call the searchVenues function
      console.log("API Response:", response); // Log the full API response
      setSearchResults(response.data); // Update the results dynamically with the 'data' property
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleSearchResultClick = (venueId) => {
    navigate(`/venues/${venueId}`); // Navigate to the venue details page
    setIsSearchOpen(false); // Close the search bar
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Holidaze</div>
      <button className="navbar-toggle" onClick={toggleMenu}>
        {isMenuOpen ? "X" : "☰"}
      </button>
      <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Register">Register</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li>
        <li>
          <button onClick={toggleSearch} className="icon-button">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </button>
        </li>
        <li>
          <button onClick={handleProfileClick} className="icon-button">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </button>
        </li>
      </ul>
      {isSearchOpen && (
        <div className="search-container">
          <form className="search-bar">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange} // Call the search function on input change
              placeholder="Search venues"
              className="search-input"
            />
          </form>
          {/* Display live search results */}
          {searchResults.length > 0 && (
            <ul className="search-results">
              {searchResults.map((venue) => (
                <li
                  key={venue.id}
                  onClick={() => handleSearchResultClick(venue.id)} // Navigate on click
                  className="search-result-item"
                >
                  {venue.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;








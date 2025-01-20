import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate
import { searchVenues } from "../SearchVenues/SearchVenues";

const SearchBar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const navigate = useNavigate(); // Define navigate

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        setSearchQuery("");
        setSearchResults([]);
    };

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === "") {
            setSearchResults([]);
            return;
        }

        try {
            const response = await searchVenues(query);
            console.log("HM-API-Resp:", response);
            setSearchResults(response.data); // Ensure this works with the correct data structure
        } catch (error) {
            console.error("Error during search:", error);
        }
    };

    const handleSearchResultClick = (venueId) => {
        navigate(`/venues/${venueId}`); // Fix template literal
        setIsSearchOpen(false);
    };

    return (
        <div className="search-container-m">
            <form className="search-bar">
                <input 
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange} // Fixed attribute case
                    placeholder="Search Venues-M"
                    className="search-input-m"
                />
            </form>

            {searchResults.length > 0 && (
                <ul className="search-results-m">
                    {searchResults.map((venue) => (
                        <li
                            key={venue.id}
                            onClick={() => handleSearchResultClick(venue.id)}
                            className="search-result-item"
                        >
                            {venue.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;


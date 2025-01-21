import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    const handleSearchSubmit = () => {
        if (!searchQuery.trim()) {
            alert("Please enter a search query.");
            return;
        }

        // Redirect to /search-results with the query parameter
        navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <div className="search-container">
            <form
                className="search-bar"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearchSubmit();
                }}
            >
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Venues"
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;




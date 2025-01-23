import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SearchResultsPage = () => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVenues = async () => {
            setLoading(true);

            const query = searchParams.get("query");

            if (!query) {
                setVenues([]);
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    `https://v2.api.noroff.dev/holidaze/venues/search?q=${encodeURIComponent(query)}`
                );

                setVenues(response.data.data || response.data); // Adjust based on response structure
            } catch (error) {
                console.error("Error fetching venues:", error);
                setVenues([]); // Clear results on error
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, [searchParams]);

    const handleVenueClick = (venueId) => {
        navigate(`/venues/${venueId}`); // Redirect to the specific venue page
    };

    if (loading) {
        return <div>Loading search results...</div>;
    }

    return (
        <div>
            <h1>Search Results</h1>
            <div>
                {venues.length > 0 ? (
                    venues.map((venue) => (
                        <div
                            key={venue.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                margin: "10px 0",
                                cursor: "pointer",
                            }}
                            onClick={() => handleVenueClick(venue.id)} // Card is clickable
                        >
                            <h2>{venue.name}</h2>
                            <p>{venue.description}</p>
                            {venue.media?.[0] && (
                                <img src={venue.media[0].url} alt={venue.media[0].alt} style={{ width: "200px" }} />
                            )}
                            <p>Max Guests: {venue.maxGuests}</p>
                            <p>Price: ${venue.price}</p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering the card click
                                    handleVenueClick(venue.id); // Button click
                                }}
                                style={{
                                    padding: "10px 15px",
                                    marginTop: "10px",
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                View Details
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No venues match your search criteria.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResultsPage;








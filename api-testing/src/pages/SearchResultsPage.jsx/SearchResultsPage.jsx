import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SearchResultsPage.css";
import Navbar from "../../components/Nav/Nav";

const SearchResultsPage = () => {
    const [venues, setVenues] = useState([]);
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [uniqueCountries, setUniqueCountries] = useState([]); // Store unique countries
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Filter state
    const [filters, setFilters] = useState({
        maxPrice: "",
        minRating: "",
        maxGuests: "",
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
        startDate: "",
        endDate: "",
        country: "", // Add country filter
    });

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
                    `https://v2.api.noroff.dev/holidaze/venues/search?q=${encodeURIComponent(query)}&_bookings=true`
                );

                const data = response.data.data || response.data;
                setVenues(data);
                setFilteredVenues(data);

                // Extract unique countries
                const countries = [...new Set(data.map((venue) => venue.location?.country || "Unknown"))];
                setUniqueCountries(countries);
            } catch (error) {
                console.error("Error fetching venues:", error);
                setVenues([]);
                setFilteredVenues([]);
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, [searchParams]);

    // Filter handler
    useEffect(() => {
        const applyFilters = () => {
            const filtered = venues.filter((venue) => {
                // Check date availability
                const isDateAvailable = (startDate, endDate, bookings) => {
                    if (!startDate || !endDate) return true;
                    const start = new Date(startDate);
                    const end = new Date(endDate);

                    return !bookings.some((booking) => {
                        const bookingStart = new Date(booking.dateFrom);
                        const bookingEnd = new Date(booking.dateTo);
                        return start <= bookingEnd && end >= bookingStart;
                    });
                };

                return (
                    (!filters.maxPrice || venue.price <= filters.maxPrice) &&
                    (!filters.minRating || venue.rating >= filters.minRating) &&
                    (!filters.maxGuests || venue.maxGuests >= filters.maxGuests) &&
                    (!filters.wifi || venue.meta?.wifi) &&
                    (!filters.parking || venue.meta?.parking) &&
                    (!filters.breakfast || venue.meta?.breakfast) &&
                    (!filters.pets || venue.meta?.pets) &&
                    (!filters.country || venue.location?.country === filters.country) && // Country filter
                    isDateAvailable(filters.startDate, filters.endDate, venue.bookings || [])
                );
            });
            setFilteredVenues(filtered);
        };

        applyFilters();
    }, [filters, venues]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleVenueClick = (venueId) => {
        navigate(`/venues/${venueId}`);
    };

    if (loading) {
        return <div>Loading search results...</div>;
    }

    return (
        <>
        <Navbar/>
        <div className="search-results-page">
            <h1>Search Results</h1>

            {/* Filter Section */}
            <div className="filter-section">
                <h2>Filters</h2>
                <div className="filter-container">
                    <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        placeholder="Max Price"
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="minRating"
                        value={filters.minRating}
                        placeholder="Min Rating"
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="maxGuests"
                        value={filters.maxGuests}
                        placeholder="Min Guests"
                        onChange={handleInputChange}
                    />
                    <label>
                        <input
                            type="checkbox"
                            name="wifi"
                            checked={filters.wifi}
                            onChange={handleInputChange}
                        />
                        WiFi
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="parking"
                            checked={filters.parking}
                            onChange={handleInputChange}
                        />
                        Parking
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="breakfast"
                            checked={filters.breakfast}
                            onChange={handleInputChange}
                        />
                        Breakfast
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="pets"
                            checked={filters.pets}
                            onChange={handleInputChange}
                        />
                        Pets Allowed
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleInputChange}
                        placeholder="Start Date"
                    />
                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleInputChange}
                        placeholder="End Date"
                    />
                    <select
                        name="country"
                        value={filters.country}
                        onChange={handleInputChange}
                    >
                        <option value="">All Countries</option>
                        {uniqueCountries.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Venue Grid */}
            <div className="home-venue-grid">
                {filteredVenues.length > 0 ? (
                    filteredVenues.map((venue) => (
                        <div
                            key={venue.id}
                            className="home-venue-card"
                            onClick={() => handleVenueClick(venue.id)}
                        >
                            <div className="home-venue-image-container">
                                {venue.media?.[0] && (
                                    <img
                                        src={venue.media[0].url}
                                        alt={venue.media[0].alt || "Venue"}
                                        className="home-venue-image"
                                    />
                                )}
                            </div>
                            <div className="home-venue-card-details">
                                <div className="home-venue-title-and-rating">
                                    <h3>{venue.name}</h3>
                                    <p className="venue-rating">
                                        <i className="fas fa-star"></i> {venue.rating || "No Rating"}
                                    </p>
                                </div>
                                <p className="home-venue-price">Price: {venue.price} NOK</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No venues match your search criteria.</p>
                )}
            </div>
        </div>
        </>
    );
};

export default SearchResultsPage;











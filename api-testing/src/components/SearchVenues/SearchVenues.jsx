import axios from "axios";

/**
 * Fetch venues from the API based on a search query.
 * @param {string} query - The search query (name or description).
 * @returns {Promise<Array>} - A promise that resolves to an array of venues.
 */
export const searchVenues = async (query) => {
  try {
    const response = await axios.get(
      `https://v2.api.noroff.dev/holidaze/venues/search?q=${query}`
    );
    return response.data; // Return the array of venues
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw error; // Rethrow the error for the calling function to handle
  }
};

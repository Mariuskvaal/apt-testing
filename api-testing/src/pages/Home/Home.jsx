import React from "react";
import Navbar from "../../components/Nav/Nav"; // Adjust the path based on your file structure
import "./Home.css";

const Home = () => {
  return (
    <>
      {/* Include the Navbar */}
      <Navbar />

      {/* Home Page Content */}
      <div className="home-page">
        <h1>Homepage</h1>
        <p>Welcome to Holidaze, your go-to accommodation booking site!</p>
      </div>
    </>
  );
};

export default Home;

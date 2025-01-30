import React, { useState } from "react";
import "./HeroSection.css";
import Navbar from "../Nav/Nav";
import { searchVenues } from "../../components/SearchVenues/SearchVenues";
import SearchBar from "../SearchBar.jsx/SearchBar";

const HeroSection = () => {

  

  return (
    <>
      <div className="Home-Page-Hero">
        <Navbar />
        <div className="hero-section">            
          <SearchBar />
        </div>
      </div>
    </>
  );
};

export default HeroSection;

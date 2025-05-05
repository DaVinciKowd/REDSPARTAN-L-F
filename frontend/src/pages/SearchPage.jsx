import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Search from "../components/Search"; 
import "../styles/SearchPage.css";

function SearchPage() {
  return (
    <>
      <Navbar />
      <main className="search-main">
        <div className="search-page-header">
          <div className="search-page-container">
            <h1 className="search-page-title">Search Items</h1>
            <p className="search-page-subtitle">
              Find what you're looking for in our comprehensive database. Use keywords, categories, or specific details to narrow down your results.
            </p>
          </div>
        </div>
        
        <div className="search-page-container">
          <div className="search-content">
            <Search />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SearchPage;
import React, { useState } from "react";
import "../styles/SearchBar.css";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form className="searchbar-form" onSubmit={handleSubmit}>
            <div className="searchbar-container">
                <FaSearch className="searchbar-icon" />
                <input
                    type="text"
                    className="searchbar-input"
                    placeholder="Search items..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="searchbar-button">
                    Search
                </button>
            </div>
        </form>
    );
}

export default SearchBar;

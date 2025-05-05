import React, { useState } from "react";
import { Filter, SlidersHorizontal, Check, ArrowDownAZ, ArrowUpZA } from "lucide-react";
import "../styles/SearchFilter.css";

function SearchFilter({ onApply }) {
  const [localCategory, setLocalCategory] = useState("");
  const [localStatus, setLocalStatus] = useState("");
  const [localSort, setLocalSort] = useState("newest");

  const handleApply = () => {
    onApply({
      category: localCategory,
      status: localStatus,
      sort: localSort,
    });
  };

  return (
    <div className="search-filter-sidebar">
      <div className="filter-header">
        <Filter className="filter-icon" />
        <h2 className="filter-title">Filters</h2>
      </div>

      {/* Category Filter */}
      <div className="filter-group">
        <label className="filter-label">
          Category
        </label>
        <div className="select-container">
          <select
            value={localCategory}
            onChange={(e) => setLocalCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="hygiene">Hygiene</option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
            <option value="documents">Documents</option>
            <option value="stationery">Stationery</option>
            <option value="sports">Sports Equipment</option>
            <option value="toys">Toys</option>
            <option value="food">Food/Drink</option>
            <option value="tools">Tools</option>
            <option value="pet_items">Pet Items</option>
            <option value="medical">Medical Items</option>
            <option value="musical">Musical Instruments</option>
            <option value="others">Others</option>
          </select>
          <div className="select-arrow">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="filter-group">
        <label className="filter-label">
          Status
        </label>
        <div className="select-container">
          <select
            value={localStatus}
            onChange={(e) => setLocalStatus(e.target.value)}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="pending">Pending Review</option>
            <option value="claimed">Claimed</option>
          </select>
          <div className="select-arrow">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Sort Order */}
      <div className="filter-group">
        <label className="filter-label">
          Sort Order
        </label>
        <div className="sort-buttons">
          <button
            type="button"
            onClick={() => setLocalSort("newest")}
            className={`sort-button ${localSort === "newest" ? "sort-button-active" : ""}`}
          >
            <ArrowDownAZ className="button-icon" />
            Newest
          </button>
          <button
            type="button"
            onClick={() => setLocalSort("oldest")}
            className={`sort-button ${localSort === "oldest" ? "sort-button-active" : ""}`}
          >
            <ArrowUpZA className="button-icon" />
            Oldest
          </button>
        </div>
      </div>

      {/* Apply Button */}
      <div className="apply-container">
        <button
          onClick={handleApply}
          className="apply-button"
        >
          <Check className="button-icon" />
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default SearchFilter;
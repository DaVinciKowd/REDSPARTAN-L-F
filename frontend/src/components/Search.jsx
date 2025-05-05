import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import SearchFilter from "./SearchFilter";
import api from "../api";
import "../styles/Search.css";

function Search() {
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("newest");

  const handleSearch = async (inputQuery = query, inputCategory = category, inputStatus = status, inputSort = sort) => {
    setQuery(inputQuery);
    setCategory(inputCategory);
    setStatus(inputStatus);
    setSort(inputSort);
    setSearching(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (inputQuery) params.append("search", inputQuery);
      if (inputCategory) params.append("category", inputCategory);
      if (inputStatus) params.append("status", inputStatus);

      // Apply sorting
      switch (inputSort) {
        case "oldest":
          params.append("ordering", "date_reported");
          break;
        case "newest":
          params.append("ordering", "-date_reported");
          break;
        default:
          break;
      }

      const response = await api.get(`/api/items/?${params.toString()}`);
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch search results.");
    } finally {
      setSearching(false);
    }
  };

  const handleApplyFilters = ({ category, status, sort }) => {
    handleSearch(query, category, status, sort);
  };

  return (
    <div className="search-wrapper">
      <div className="search-controls">
        <SearchBar onSearch={(inputQuery) => handleSearch(inputQuery, category, status, sort)} />
      </div>

      {searching && <div className="search-loading">Searching items...</div>}
      {error && <div className="search-error">{error}</div>}

      <div className="search-results">
        <SearchFilter onApply={handleApplyFilters} />
        {results.length > 0 ? (
          <div className="results-grid">
            {results.map((item) => (
              <Link to={`/claim-item/${item.id}`} className="search-card" key={item.id}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="search-item-image"
                  />
                )}
                <div className="search-card-content">
                  <h3>{item.name}</h3>
                  <p><strong>Category:</strong> {item.category}</p>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Location:</strong> {item.location}</p>
                  <p><strong>Date Reported:</strong> {new Date(item.date_reported).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          !searching && <div className="no-results">No results found. Try a different search term.</div>
        )}
      </div>
    </div>
  );
}

export default Search;

import React, { useState } from "react";
import "./Search.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = ["Accounts", "Posts", "Tags"];

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      setShowCategories(true);
    }
  };

  const handleCategoryClick = async (category) => {
    setLoading(true);
    setError(null);

    let endpoint = "";
    switch (category) {
      case "Accounts":
        endpoint = `http://localhost:8080/search/user?query=${searchQuery}`;
        break;
      case "Posts":
        endpoint = `http://localhost:8080/search/post?query=${searchQuery}`;
        break;
      case "Tags":
        endpoint = `http://localhost:8080/search/tag?query=${searchQuery}`;
        break;
      default:
        setError("Invalid category selected");
        setLoading(false);
        return;
    }

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="search-box">
        <h1 className="title">Search Anything</h1>
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter your search query..."
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
        {showCategories && (
          <div className="categories">
            <h2 className="subtitle">Choose a category:</h2>
            <div className="category-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="category-button"
                >
                  Search in {category}
                </button>
              ))}
            </div>
          </div>
        )}
        {loading && <p className="loading-text">Loading...</p>}
        {error && <p className="error-text">{error}</p>}
        {searchResults.length > 0 && (
          <div className="results">
            <h3 className="results-title">Search Results:</h3>
            <ul className="results-list">
              {searchResults.map((result, index) => (
                <li key={index} className="result-item">
                  {JSON.stringify(result)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

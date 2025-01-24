import React, { useState } from "react";
import "./Search.css"; // Importing the CSS file

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const categories = ["Accounts", "Posts", "Tags"];

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      setShowCategories(true);
    }
  };

  const handleCategoryClick = (category) => {
    console.log(`Searching for ${searchQuery} in ${category}`);
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
      </div>
    </div>
  );
};

export default SearchComponent;

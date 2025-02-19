import React from 'react';
import { FaFilter } from 'react-icons/fa';
import './filter.css';

const Filter = ({ selectedCategory, setSelectedCategory }) => {
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <FaFilter className="filter-icon" />
        <span className="filter-text">Filter by Category</span>
      </div>

      <div className="dropdown">
        <button className="dropdown-button">
          {selectedCategory}
          <span className="arrow">▼</span>
        </button>
        <div className="dropdown-content">
          {["All Notes", "Work", "College", "Personal", "Important"].map((category) => (
            <div
              key={category}
              className="dropdown-item"
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;

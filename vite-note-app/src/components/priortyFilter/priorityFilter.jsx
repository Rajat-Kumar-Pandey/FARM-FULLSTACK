import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import "./priorityFilter.css"; // Import the CSS for styling

const PriorityFilter = ({ onFilterChange }) => {
  const [selectedPriority, setSelectedPriority] = useState("All");

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedPriority(value);
    onFilterChange(value === "All" ? null : value); // ✅ Send null for "All"
  };

  return (
    <div className="priority-filter">
      <div className="filter-header">
        <FaFilter className="filter-icon" />
        <span className="filter-label">Filter by Priority</span>
      </div>
      <select
        value={selectedPriority}
        onChange={handleFilterChange}
        className="priority-dropdown"
      >
        <option value="All">All</option> {/* ✅ Send "All" instead of empty string */}
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

export default PriorityFilter;

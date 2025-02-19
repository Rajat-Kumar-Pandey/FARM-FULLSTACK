import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { Link } from "react-router-dom";
import './navbar.css';

const Navbar = ({ onSearch }) => {  // ✅ Accept onSearch callback
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // ✅ Call parent function to update search results
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className="logo">NotePad</h1>
        </Link>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search tasks..."
        />
        <button className="search-btn">
          <FaSearch />
        </button>
      </div>

      <Link to="/add-note" style={{ textDecoration: "none" }}>
        <button className="add-task-btn">
          <FaPlus />
          <span>Add Task</span>
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;

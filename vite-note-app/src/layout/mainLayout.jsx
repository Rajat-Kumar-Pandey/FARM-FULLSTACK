import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/nav/navbar";

const API_BASE_URL = import.meta.env.VITE_API_URL; // Load API URL from .env

const MainLayout = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Notes");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Search state here

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        let queryParams = new URLSearchParams();

        if (selectedCategory !== "All Notes") queryParams.append("category", selectedCategory);
        if (selectedPriority !== "All") queryParams.append("priority", selectedPriority);

        const response = await axios.get(`${API_BASE_URL}/todo/filter?${queryParams}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
      setLoading(false);
    };

    fetchTasks();
  }, [selectedCategory, selectedPriority]);

  return (
    <>
      <Navbar onSearch={setSearchTerm} /> {/* ✅ Pass search handler */}
      <Outlet context={{ tasks, loading, searchTerm, selectedCategory, setSelectedCategory, selectedPriority, setSelectedPriority }} />
    </>
  );
};

export default MainLayout;

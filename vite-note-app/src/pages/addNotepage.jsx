import React, { useState } from "react";
import { FaTimes, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddNotePage.css";

const API_BASE_URL = import.meta.env.VITE_API_URL; // ✅ Use environment variable

const AddNotePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("low");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category) {
      alert("Please fill all required fields!");
      return;
    }

    const newTask = { title, description, category, priority, completed };

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/todo`, newTask);
      alert("Task added successfully!");
      navigate("/"); // ✅ Redirect on success
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
      alert(error.response?.data?.detail || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-note-container">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Note</h2>
          <FaTimes className="close-btn" onClick={() => navigate("/")} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task Description"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Work">Work</option>
              <option value="College">College</option>
              <option value="Personal">Personal</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={completed}
                onChange={() => setCompleted(!completed)}
              />
              Mark as Completed
            </label>
          </div>
          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={() => navigate("/")}>
              <FaTimes /> Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              <FaCheckCircle /> {loading ? "Adding..." : "Add Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotePage;

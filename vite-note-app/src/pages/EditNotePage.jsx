import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiSave, FiXCircle, FiCheck } from "react-icons/fi";
import axios from "axios";
import "./EditNotePage.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api"; // ✅ Fallback to local API

const EditNotePage = () => {
  const { task_id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    description: "",
    category: "",
    priority: "low", // ✅ Ensure lowercase default
    completed: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/todo/${task_id}`);
        setNote({
          ...response.data,
          priority: response.data.priority.toLowerCase(), // ✅ Ensure lowercase priority
          category: response.data.category.toLowerCase(), // ✅ Ensure lowercase category if required
        });
      } catch (error) {
        console.error("Error fetching note:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [task_id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.description.trim()) {
      alert("Title and description are required!");
      return;
    }

    const updatedNote = {
      title: note.title.trim(),
      description: note.description.trim(),
      category: note.category.trim().toLowerCase(), // ✅ Convert to lowercase
      priority: note.priority.trim().toLowerCase(), // ✅ Convert to lowercase
      completed: Boolean(note.completed),
    };

    try {
      const response = await axios.put(`${API_BASE_URL}/todo/${task_id}`, updatedNote, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Note updated successfully!");
      navigate(`/note/${task_id}`);
    } catch (error) {
      console.error("Error updating note:", error.response?.data || error.message);
      alert(`Failed to update note: ${error.response?.data?.detail || "Unknown error"}`);
    }
  };

  const markCompleted = async () => {
    try {
      await axios.put(`${API_BASE_URL}/todo/complete/${task_id}`);
      setNote((prev) => ({ ...prev, completed: true }));
      alert("Note marked as completed!");
    } catch (error) {
      console.error("Error marking note as completed:", error.response?.data || error.message);
      alert("Failed to mark note as completed");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!note) return <div className="not-found">Note not found!</div>;

  return (
    <div className="edit-note-container">
      <h2>Edit Note</h2>
      <form onSubmit={handleSubmit} className="edit-note-form">
        <label>Title</label>
        <input type="text" name="title" value={note.title} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={note.description} onChange={handleChange} required />

        <label>Category</label>
        <input type="text" name="category" value={note.category} onChange={handleChange} />

        <label>Priority</label>
        <select name="priority" value={note.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label className="checkbox-container">
          <input type="checkbox" name="completed" checked={note.completed} onChange={handleChange} />
          Mark as Completed
        </label>

        <div className="edit-actions">
          <button type="submit" className="save-btn">
            <FiSave /> Save Changes
          </button>
          {!note.completed && (
            <button type="button" className="complete-btn" onClick={markCompleted}>
              <FiCheck /> Mark as Completed
            </button>
          )}
          <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
            <FiXCircle /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNotePage;

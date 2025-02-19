import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import "./NoteDetailPage.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api"; // ✅ Use environment variable

const NoteDetailPage = () => {
  const { task_id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (!task_id) return;
        const response = await fetch(`${API_BASE_URL}/todo/${parseInt(task_id, 10)}`);

        if (!response.ok) throw new Error("Failed to fetch note");

        const data = await response.json();
        setNote(data);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [task_id]);

  const handleDelete = async () => {
    if (!note) return;

    const confirmDelete = window.confirm(`Are you sure you want to delete the note: "${note.title}"?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/todo/${parseInt(task_id, 10)}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete note");

      alert("Note deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note.");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!note) return <div className="not-found">Note not found!</div>;

  return (
    <div className="note-detail-container">
      <button className="back-btn" onClick={() => navigate("/")}>
        <FaArrowLeft /> Back
      </button>

      <div className="note-content">
        <h2>{note.title}</h2>
        <p><strong>Description:</strong> {note.description}</p>
        <p><strong>Category:</strong> {note.category}</p>
        <p>
          <strong>Priority:</strong>
          <span className={`priority-${note.priority.toLowerCase()}`}>{note.priority}</span>
        </p>
        <p><strong>Status:</strong> {note.completed ? "✅ Completed" : "⏳ Pending"}</p>
        <p><strong>Created At:</strong> {new Date(note.created_at).toLocaleString()}</p>
      </div>

      <div className="actions">
        <Link to={`/edit/${task_id}`} style={{ textDecoration: "none" }}>
          <button className="edit-btn">
            <FaEdit /> Edit
          </button>
        </Link>

        <button className="delete-btn" onClick={handleDelete}>
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default NoteDetailPage;

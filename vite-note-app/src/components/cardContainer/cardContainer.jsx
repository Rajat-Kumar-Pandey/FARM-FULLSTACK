import React from 'react';
import { Link } from 'react-router-dom';  // ✅ Import Link
import { FaCheckCircle, FaExclamationCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';
import './cardContainer.css';

const formatDate = (dateString) => {
  const date = new Date(dateString.replace(" ", "T"));
  return date.toLocaleString();
};

const CardContainer = ({ tasks = [], onDelete }) => {
  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/todo/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      alert("Task deleted successfully!");
      if (onDelete) onDelete(taskId); // Callback to update UI
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="card-container">
      {tasks.length === 0 ? (
        <div className="no-tasks">No tasks available</div>  
      ) : (
        tasks.map((task) => (
          <div className="task-card" key={task.task_id}>
            <Link to={`/note/${task.task_id}`} className="task-header-link">  {/* ✅ Full header clickable */}
              <div className={`task-header ${task.priority}`}>
                <div className="task-header-content">
                  <h3 className="task-title">{task.title}</h3>
                  <p className="task-date">{formatDate(task.created_at)}</p>
                </div>
              </div>
            </Link>

            <div className="task-actions">
              <Link to={`/edit/${task.task_id}`} style={{ textDecoration: "none" }}>
                <FaEdit className="action-icon edit-icon" />
              </Link>
              <FaTrashAlt
                className="action-icon delete-icon"
                onClick={() => handleDelete(task.task_id)}
              />
            </div>

            <p className="task-category">{task.category}</p>
            <p className="task-description">{task.description}</p>
            
            <div className="task-footer">
              <div className="priority">
                <span className="priority-label">Priority:</span>
                <span className={`priority-value ${task.priority}`}>{task.priority}</span>
              </div>
              <div className="task-status">
                {task.completed ? (
                  <FaCheckCircle className="status-icon completed" />
                ) : (
                  <FaExclamationCircle className="status-icon pending" />
                )}
                <span className="status-text">{task.completed ? 'Completed' : 'Pending'}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CardContainer;

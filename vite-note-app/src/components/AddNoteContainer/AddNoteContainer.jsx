import React, { useState } from 'react';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';
import './AddNoteContainer.css';

const AddNoteContainer = ({ onAddTask, categories }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('low');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && category) {
      const newTask = {
        task_id: Date.now(),
        title,
        description,
        category,
        priority,
        completed,
      };
      onAddTask(newTask);
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setPriority('low');
    setCompleted(false);
  };

  return (
    <div className="add-note-container">
      <div className="modal-overlay"></div>
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Note</h2>
          <FaTimes className="close-btn" onClick={resetForm} />
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
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
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
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={completed}
                onChange={() => setCompleted(!completed)}
              />
              Completed
            </label>
          </div>
          <div className="modal-footer">
            <button type="submit" className="submit-btn">
              <FaCheckCircle /> Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNoteContainer;

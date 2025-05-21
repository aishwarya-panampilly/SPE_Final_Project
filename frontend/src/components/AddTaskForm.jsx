import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../presentation/AddTaskForm.css';

function AddTaskForm() {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;

    const newTask = {
      text,
      dueDate,
    };

    try {
      const response = await fetch('http://localhost:8083/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="container add-task-container">
      <h3 className="mb-4">Add a New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Task</label>
          <input
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            placeholder="Enter your task"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Due Date (optional)</label>
          <input
            className="form-control"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Task</button>
      </form>
    </div>
  );
}

export default AddTaskForm;

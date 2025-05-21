import React, { useEffect, useState } from 'react';
import '../presentation/TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);

  // Fetch incomplete tasks on component mount
  useEffect(() => {
    fetch('http://localhost:8083/api/tasks/incomplete')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error fetching tasks:', err));
  }, []);

  // Toggle completion of task
  const handleToggle = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8083/api/tasks/${taskId}/toggle`, {
        method: 'PUT',
      });
      if (response.ok) {
        // Remove toggled task from the current list (as it's now completed)
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
      } else {
        console.error('Failed to toggle task');
      }
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  return (
    <div className="container todo-list-container">
      <h3>To-Do List</h3>
      {tasks.length === 0 ? (
        <div className="alert alert-info">No tasks yet!</div>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task.id)}
                />
                {task.text}
                {task.dueDate && (
                  <span className="text-muted ms-2">(Due: {task.dueDate})</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;

import React from 'react';
import '../presentation/TodoList.css';

function TodoList({ tasks, onToggle }) {
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
                  onChange={() => onToggle(task.id)}
                />
                {task.text}
                {task.dueDate && <span className="text-muted ms-2">(Due: {task.dueDate})</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;

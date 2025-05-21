import React, { useEffect, useState } from 'react';
import '../presentation/ArchiveList.css';

function ArchiveList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8083/api/tasks/completed')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error fetching completed tasks:', err));
  }, []);

  return (
    <div className="container archive-list-container">
      <h3>Archives</h3>
      {tasks.length === 0 ? (
        <div className="alert alert-secondary">No archived tasks.</div>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.id} className="list-group-item">
              {task.text}
              {task.dueDate && (
                <span className="text-muted ms-2">(Due: {task.dueDate})</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArchiveList;

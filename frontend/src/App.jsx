import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import ArchiveList from './components/ArchiveList';
import AddTaskForm from './components/AddTaskForm';
import Calendar from './components/Calendar';

function App() {
  const [tasks, setTasks] = useState([]);

  // ✅ When adding a task, mark it as not completed
  const addTask = (task) => {
    setTasks([{ ...task, completed: false }, ...tasks]);
  };

  // ✅ Toggle completed state
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<TodoList tasks={tasks.filter(t => !t.completed)} onToggle={toggleTask} />}
        />
        <Route
          path="/archive"
          element={<ArchiveList tasks={tasks.filter(t => t.completed)} />}
        />
        <Route
          path="/add"
          element={<AddTaskForm addTask={addTask} />}
        />
        <Route
          path="/calendar"
          element={<Calendar tasks={tasks.filter(task => !task.completed)} />}
        />
      </Routes>
    </div>
  );
}

export default App;

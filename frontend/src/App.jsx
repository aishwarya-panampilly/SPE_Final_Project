import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import ArchiveList from './components/ArchiveList';
import AddTaskForm from './components/AddTaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, archived: !task.archived } : task
    ));
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<TodoList tasks={tasks.filter(t => !t.archived)} onToggle={toggleTask} />} />
        <Route path="/archive" element={<ArchiveList tasks={tasks.filter(t => t.archived)} />} />
        <Route path="/add" element={<AddTaskForm addTask={addTask} />} />
      </Routes>
    </div>
  );
}

export default App;
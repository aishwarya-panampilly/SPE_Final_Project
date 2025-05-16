import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import ArchiveList from './components/ArchiveList';
import AddTaskForm from './components/AddTaskForm';
import Calendar from './components/Calendar';
import Journal from './components/Journal';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const addTask = (task) => {
    setTasks([{ ...task, completed: false }, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleLogin = (username) => {
    localStorage.setItem('authUser', username);
    setUser(username);
    navigate('/todo');
  };

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    setUser(null);
    navigate('/');
  };

  const showNavbar = user && !['/', '/login', '/signup'].includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        {user && (
          <>
            <Route
              path="/todo"
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
            <Route path="/journal" element={<Journal />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;

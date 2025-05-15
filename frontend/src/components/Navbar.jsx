import React from 'react';
import { Link } from 'react-router-dom';
import '../presentation/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Todo App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Todo List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/archive">Archives</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">Add Task</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/calendar">Calendar</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

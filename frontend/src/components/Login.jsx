import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../presentation/Auth.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For demo, you can store a token or simulate login logic
    localStorage.setItem('authUser', username);
    onLogin(username);
    navigate('/todo');
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    </div>
  );
}

export default Login;

import React from 'react';
import './App.css';
import { useLocation,Link } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const { username } = location.state || {};

  return (
    <div className="Dashboard">
      <h1>Welcome, {username}!</h1>
      <p>
      <nav>
        <ul>
                <li><Link to="/">Home</Link></li>
        </ul>
        </nav>
      </p>
    </div>
  );
}

export default Dashboard;

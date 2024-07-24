import React, { useState } from 'react';
import './App.css';
import { useLocation,Link } from 'react-router-dom';
import Iteminsert from './Iteminsert.js';

function Dashboard() {
  const location = useLocation();
  const { username } = location.state || {};
  const [isIteminsertOpen, setIteminsertOpen] = useState(false);

  const openIteminsert = () => setIteminsertOpen(true);
  const closeIteminsert = () => setIteminsertOpen(false);

  return (
    <div className="Dashboard">
      <h1>Welcome, {username}!</h1>
      <p>
      <nav>
        <ul>
                <li><Link to="/">Home</Link></li>
                <li><button onClick={openIteminsert}>Insert an Item here</button></li>

        </ul>
        </nav>
      </p>
      {isIteminsertOpen && <Iteminsert onClose={closeIteminsert} />}

    </div>
  );
}

export default Dashboard;

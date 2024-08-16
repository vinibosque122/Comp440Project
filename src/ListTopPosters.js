import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function ListTopPosters({ date, onClose }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5001/top-posters?date=${date}`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching top posters:', error));
  }, [date]);

  return (
    <div>
      <button onClick={onClose} style={{ float: 'right' }}>Close</button>
      <h2>Top Posters on {date}</h2>
      <ul>
        {users.map(user => (
          <li key={user.username}>
            {user.firstName} {user.lastName} ({user.username})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListTopPosters;

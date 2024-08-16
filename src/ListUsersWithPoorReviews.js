import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function ListUsersWithPoorReviews({ onClose }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/users-with-poor-reviews')
      .then(response => {
        console.log('API Response:', response.data); 
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <button onClick={onClose} style={{ float: 'right' }}>Close</button>
      <h2>Users with Poor Reviews</h2>
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

export default ListUsersWithPoorReviews;

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function ListUsersWithTwoItemsSameDay({ onClose }) {
  const [users, setUsers] = useState([]);
  const [categoryX, setCategoryX] = useState('');
  const [categoryY, setCategoryY] = useState('');

  const handleSearch = () => {
    if (categoryX && categoryY) {
      axios.get(`http://localhost:5001/users-with-multiple-categories?categoryX=${categoryX}&categoryY=${categoryY}`)
        .then(response => setUsers(response.data))
        .catch(error => console.error('Error fetching users:', error));
    } else {
      console.error('Both categories must be provided.');
    }
  };

  return (
    <div>
      <button onClick={onClose} style={{ float: 'right' }}>Close</button>
      <h2>Users with Two Items on the Same Day with Different Categories</h2>
      <div>
        <input 
          type="text" 
          placeholder="Enter Category X" 
          value={categoryX} 
          onChange={(e) => setCategoryX(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Enter Category Y" 
          value={categoryY} 
          onChange={(e) => setCategoryY(e.target.value)} 
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {users.map(user => (
          <li key={user.username}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListUsersWithTwoItemsSameDay;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListTopPosters({ date }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5001/top-posters?date=${date}`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching top posters:', error));
  }, [date]);

  return (
    <div>
      <h2>Top Posters on {date}</h2>
      <ul>
        {users.map(user => (
          <li key={user.username}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListTopPosters;

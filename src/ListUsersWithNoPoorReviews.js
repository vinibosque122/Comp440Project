import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListUsersWithNoPoorReviews() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/users-with-no-poor-reviews')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h2>Users with No Poor Reviews</h2>
      <ul>
        {users.map(user => (
          <li key={user.username}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListUsersWithNoPoorReviews;

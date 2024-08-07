import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListUsersWithTwoItemsSameDay() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/users-with-two-items-same-day')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h2>Users with Two Items on the Same Day with Different Categories</h2>
      <ul>
        {users.map(user => (
          <li key={user.username}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListUsersWithTwoItemsSameDay;

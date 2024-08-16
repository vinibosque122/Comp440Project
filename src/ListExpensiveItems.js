import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListExpensiveItems({ onClose }) { 
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/most-expensive-items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching expensive items:', error));
  }, []);

  return (
    <div>
      <button onClick={onClose} style={{ float: 'right' }}>Close</button> 
      <h2>Most Expensive Items by Category</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>Category:</strong> {item.category} <br />
            <strong>Title:</strong> {item.title} <br />
            <strong>Price:</strong> ${item.price} <br />
            <strong>Description:</strong> {item.description} <br />
            <strong>Posted by:</strong> {item.username} <br />
            <strong>Posted on:</strong> {new Date(item.postDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListExpensiveItems;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListExpensiveItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/expensive-items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching expensive items:', error));
  }, []);

  return (
    <div>
      <h2>Most Expensive Items by Category</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.category}: {item.title} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListExpensiveItems;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ListItemsWithGoodComments() {
  const { userX } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5001/items-with-good-comments?user=${userX}`)
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, [userX]);

  return (
    <div>
      <h2>Items by {userX} with Good or Excellent Comments</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListItemsWithGoodComments;

import React, { useState } from 'react';
import axios from 'axios';

function ListItemsWithGoodComments({ onClose }) {
  const [username, setUsername] = useState('');  
  const [items, setItems] = useState([]);
  const [isSearched, setIsSearched] = useState(false); 

  const handleSearch = () => {
    if (username) {
      axios.get(`http://localhost:5001/items-with-good-comments?user=${username}`)
        .then(response => {
          console.log('API Response:', response.data); 
          setItems(response.data);
          setIsSearched(true);
        })
        .catch(error => console.error('Error fetching items:', error));
    } else {
      console.error('Username is required');
      setIsSearched(true);
    }
  };

  return (    
    <div>
      <button onClick={onClose} style={{ float: 'right' }}>Close</button>
      <h2>Search Items with Good or Excellent Comments</h2>
      <div>
        <input 
          type="text" 
          placeholder="Enter username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {isSearched && (
        <div>
          {items.length > 0 ? (
            <ul>
              {items.map(item => (
                <li key={item.id}>
                  <strong>{item.title}</strong><br />
                  {item.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items found for this username with good or excellent comments.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ListItemsWithGoodComments;

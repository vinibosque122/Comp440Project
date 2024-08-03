import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function SearchItems({ onOpenReviewForm }) {
  const [category, setCategory] = useState('');
  const [items, setItems] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:5001/searchitems', { params: { category } });
      setItems(response.data);
    } catch (error) {
      console.error('Error searching items:', error);
      alert('Failed to search items');
    }
  };

  return (
    <div>
      <h2>Search Items</h2>
      <form onSubmit={handleSearch}>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </label>
        <button type="submit">Search</button>
      </form>
      <div>
        <h3>Search Results</h3>
        <ul>
        {items.map(item => (
            <li key={item.id}>
              {item.title} - {item.description} - {item.category} - ${item.price}
              <button onClick={() => onOpenReviewForm(item.id)}>Review</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchItems;

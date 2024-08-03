// Iteminsert.js
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import './App.css'; // Ensure your styles are here

function Iteminsert({ onClose }) {
  const location = useLocation();
  const { username } = location.state || {};

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5001/iteminsert', { username, title, description, category, price });
      alert('Item inserted successfully');
      onClose();
    } catch (error) {
      console.error('Error inserting item:', error);
      alert('Failed to insert item');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Insert Item</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </label>
          <label>
            Category:
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </label>
          <label>
            Price:
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </label>
          <button type="submit">Add Item</button>
        </form>
      </div>
    </div>
  );
}

export default Iteminsert;

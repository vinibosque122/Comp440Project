import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function ReviewForm({ username, itemId, onClose }) {
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5001/addreview', { username, itemId, rating, description });
      alert('Review added successfully');
      onClose();
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Failed to add review');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Review</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Rating:
            <select value={rating} onChange={(e) => setRating(e.target.value)} required>
              <option value="">Select rating</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </label>
          <label>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </label>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;

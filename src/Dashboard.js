import React, { useState } from 'react';
import './App.css';
import { useLocation,Link } from 'react-router-dom';
import Iteminsert from './Iteminsert.js';
import ReviewForm from './reviewForm.js';
import SearchItems from './searchItems.js';

function Dashboard() {
  const location = useLocation();
  const { username } = location.state || {};
  const [isIteminsertOpen, setIteminsertOpen] = useState(false);
  const [isSearchItemsOpen, setSearchItemsOpen] = useState(false);
  const [isReviewFormOpen, setReviewFormOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  
  const openSearchItems = () => {
    setSearchItemsOpen(true);
  };

  const closeSearchItems = () => {
    setSearchItemsOpen(false);
  };

  const openReviewForm = (itemId) => {
    setSelectedItemId(itemId);
    setReviewFormOpen(true);
  };

  const closeReviewForm = () => {
    setReviewFormOpen(false);
    setSelectedItemId(null);
  };
  const openIteminsert = () => setIteminsertOpen(true);
  const closeIteminsert = () => setIteminsertOpen(false);

  return (
    <div className="Dashboard">
      <h1>Welcome, {username}!</h1>
      <p>
      <nav>
        <ul>
                <li><Link to="/">Home</Link></li>
                <li><button onClick={openIteminsert}>Insert an Item here</button></li>
                <li><button onClick={openSearchItems}>Search Items</button></li>
        </ul>
        </nav>
      </p>
      {isIteminsertOpen && <Iteminsert onClose={closeIteminsert} />}
      {isSearchItemsOpen && <SearchItems onOpenReviewForm={openReviewForm} />}
      {isReviewFormOpen && <ReviewForm username={username} itemId={selectedItemId} onClose={closeReviewForm} />}
    </div>
  );
}

export default Dashboard;

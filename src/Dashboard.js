import React, { useState } from 'react';
import './App.css';
import { useLocation, Link } from 'react-router-dom';
import Iteminsert from './Iteminsert.js';
import ReviewForm from './reviewForm.js';
import SearchItems from './searchItems.js';
import ListExpensiveItems from './ListExpensiveItems.js';
import ListUsersWithTwoItemsSameDay from './ListUsersWithTwoItemsSameDay.js';
import ListItemsWithGoodComments from './ListItemsWithGoodComments.js';
import ListTopPosters from './ListTopPosters.js';
import ListUsersWithPoorReviews from './ListUsersWithPoorReviews.js';
import ListUsersWithNoPoorReviews from './ListUsersWithNoPoorReviews.js';

function Dashboard() {
  const location = useLocation();
  const { username } = location.state || {};
  const [isIteminsertOpen, setIteminsertOpen] = useState(false);
  const [isSearchItemsOpen, setSearchItemsOpen] = useState(false);
  const [isReviewFormOpen, setReviewFormOpen] = useState(false);
  const [isExpensiveItemsOpen, setExpensiveItemsOpen] = useState(false);
  const [isUsersWithTwoItemsOpen, setUsersWithTwoItemsOpen] = useState(false);
  const [isItemsWithGoodCommentsOpen, setItemsWithGoodCommentsOpen] = useState(false); // For #3
  const [isTopPostersOpen, setTopPostersOpen] = useState(false); // For #4
  const [isUsersWithPoorReviewsOpen, setUsersWithPoorReviewsOpen] = useState(false); // For #5
  const [isUsersWithNoPoorReviewsOpen, setUsersWithNoPoorReviewsOpen] = useState(false); // For #6
  const [selectedItemId, setSelectedItemId] = useState(null);

  const openSearchItems = () => setSearchItemsOpen(true);
  const closeSearchItems = () => setSearchItemsOpen(false);

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

  const openExpensiveItems = () => setExpensiveItemsOpen(true);
  const closeExpensiveItems = () => setExpensiveItemsOpen(false);

  const openUsersWithTwoItems = () => setUsersWithTwoItemsOpen(true);
  const closeUsersWithTwoItems = () => setUsersWithTwoItemsOpen(false);

  const openItemsWithGoodComments = () => setItemsWithGoodCommentsOpen(true); // For #3
  const closeItemsWithGoodComments = () => setItemsWithGoodCommentsOpen(false); // For #3

  const openTopPosters = () => setTopPostersOpen(true); // For #4
  const closeTopPosters = () => setTopPostersOpen(false); // For #4

  const openUsersWithPoorReviews = () => setUsersWithPoorReviewsOpen(true); // For #5
  const closeUsersWithPoorReviews = () => setUsersWithPoorReviewsOpen(false); // For #5

  const openUsersWithNoPoorReviews = () => setUsersWithNoPoorReviewsOpen(true); // For #6
  const closeUsersWithNoPoorReviews = () => setUsersWithNoPoorReviewsOpen(false); // For #6

  return (
    <div className="Dashboard">
      <h1>Welcome, {username}!</h1>
      <p>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><button onClick={openIteminsert}>Insert an Item here</button></li>
            <li><button onClick={openSearchItems}>Search Items</button></li>
            <li><button onClick={openExpensiveItems}>List Most Expensive Item</button></li>
            <li><button onClick={openUsersWithTwoItems}>List Users with Two Items Same Day</button></li>
            <li><button onClick={openItemsWithGoodComments}>List Items with Good/Excellent Comments</button></li> 
            <li><button onClick={openTopPosters}>List Top Posters on a Specific Date</button></li> 
            <li><button onClick={openUsersWithPoorReviews}>List Users with Poor Reviews</button></li> 
            <li><button onClick={openUsersWithNoPoorReviews}>List Users with No Poor Reviews</button></li> 
          </ul>
        </nav>
      </p>
      {isIteminsertOpen && <Iteminsert onClose={closeIteminsert} />}
      {isSearchItemsOpen && <SearchItems onOpenReviewForm={openReviewForm} />}
      {isReviewFormOpen && <ReviewForm username={username} itemId={selectedItemId} onClose={closeReviewForm} />}
      {isExpensiveItemsOpen && <ListExpensiveItems onClose={closeExpensiveItems} />}

      {isUsersWithTwoItemsOpen && <ListUsersWithTwoItemsSameDay onClose={closeUsersWithTwoItems}/>}
      {isItemsWithGoodCommentsOpen && <ListItemsWithGoodComments onClose={closeItemsWithGoodComments}/>}
      {isTopPostersOpen && <ListTopPosters date="2024-07-04" onClose={closeTopPosters}/>} 
      {isUsersWithPoorReviewsOpen && <ListUsersWithPoorReviews onClose={closeUsersWithPoorReviews}/>} 
      {isUsersWithNoPoorReviewsOpen && <ListUsersWithNoPoorReviews onClose={closeUsersWithNoPoorReviews}/>} 
    </div>
  );
}

export default Dashboard;

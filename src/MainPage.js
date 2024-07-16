// MainLayout.js
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from './Argen.jpeg';
import './App.css';

function MainLayout() {
  return (
    <div className="mainPage">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className='mainText'>
          <p>
            Fede and Vini's 440 Project
            <nav>
        <ul>
                <li><Link to="/signin">Sign In</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>

        </ul>
        </nav>
          </p>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default MainLayout;

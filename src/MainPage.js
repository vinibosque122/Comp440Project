// MainLayout.js
import React, {useState} from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from './Argen.jpeg';
import './App.css';
import SigninForm from './SigninForm.js';
import SignupForm from './SignupForm.js';

function MainLayout() {
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isSigninOpen, setSigninOpen] = useState(false);

  const openSignup = () => setSignupOpen(true);
  const closeSignup = () => setSignupOpen(false);
  const openSignin = () => setSigninOpen(true);
  const closeSignin = () => setSigninOpen(false);
  return (
    <div className="mainPage">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className='mainText'>
          <p>
            Summer 2024 440 Project
            <nav>
        <ul>
        <li><button onClick={openSignin}>Sign In</button></li>
        <li><button onClick={openSignup}>Sign Up</button></li>

        </ul>
        </nav>
          </p>
        </div>
      </header>
      {isSignupOpen && <SignupForm onClose={closeSignup} />}
      {isSigninOpen && <SigninForm onClose={closeSignin} />}
      <Outlet />
    </div>
  );
}

export default MainLayout;



import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import SignupForm from './SignupForm.js';
import SigninForm from './SigninForm.js';
import Dashboard from './Dashboard.js';
import MainPage from './MainPage.js';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path='signup' element={<SignupForm />} />
          <Route path="signin" element={<SigninForm />} />
        </Route>
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;


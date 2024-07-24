import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
function SigninForm({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/signin', { username, password });
      console.log(response.data.message);
      // Redirect to dashboard on successful sign-in
      navigate('/dashboard', { state: { username } });
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Wrong Username or Password')
    }
    onClose();
  };

  return (
    <div className ='modal'>
      <div className = 'modal-content'>
        <span className = 'close' onClick={onClose} > &times;</span>
        <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Sign In</button>
    </form>
    </div>
    </div>
  );
}

export default SigninForm;

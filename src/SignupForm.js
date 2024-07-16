import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [password_confirm, setpassword_confirm] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setemail] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/signup', {
        username,
        password,
        password_confirm,
        firstName,
        lastName,
        email
        
      });
      console.log(response.data);
      // Optionally, redirect to login page or show success message
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error: show error message to user
      alert('Failed to register user');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="password_confirm"
          value={password_confirm}
          onChange={(e) => setpassword_confirm(e.target.value)}
          required
        />
        <br />
        <input
          type="firstName"
          placeholder="firstName"
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
          required
        />
        <br />
        <input
          type="lastName"
          placeholder="lastName"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;

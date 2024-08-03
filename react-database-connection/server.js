require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from localhost:3000
    methods: ['GET', 'POST'], // Allow only GET and POST requests
    allowedHeaders: ['Content-Type'], // Allow only Content-Type header
    credentials: true // Enable credentials (cookies, authorization headers)
  }));
  // CORS preflight handling middleware


  


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
   console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('MySQL connected...');
});

app.post('/signup',(req,res) => {

    

    const { username, password, password_confirm, firstName, lastName, email} = req.body;
    const sql = 'INSERT INTO user (username, password, password_confirm, firstName,lastName, email) VALUES (?,?,?,?,?,?)';
    db.query(sql, [username, password, password_confirm, firstName, lastName, email], (err,result) =>{
        if (err) {
            console.error('Error registering user:', err);
            return res.status(400).json({ error: 'Failed to register user.' });
          }
          res.status(200).json({ message: 'User registered successfully.' });
          
        });
      });
      app.post('/signin', (req, res) => {
        const { username, password } = req.body;
      
        if (!username || !password) {
          return res.status(400).json({ error: 'Username and password are required.' });
        }
      
        const sql = 'SELECT * FROM user WHERE username = ? AND password = ?';
        db.query(sql, [username, password], (err, results) => {
          if (err) {
            console.error('Error during sign-in:', err);
            return res.status(500).json({ error: 'Server error.' });
          }
      
          if (results.length > 0) {
            res.status(200).json({ message: 'User signed in successfully.' });
          } else {
            res.status(401).json({ error: 'Invalid username or password.' });
          }
        });
      });
      app.post('/iteminsert', (req, res) => {
        const { username, title, description, category, price } = req.body;
      
        // Check user's daily post limit
        db.query('SELECT items_posted_today, last_activity FROM user WHERE username = ?', [username], (err, result) => {
          if (err) {
            console.error('Error selecting user data:', err);
            return res.status(500).send({ error: 'Error selecting user data' });
          }
      
          if (result.length === 0) {
            console.error('User not found');
            return res.status(404).send({ error: 'User not found' });
          }
      
          const user = result[0];
          const today = new Date().toISOString().split('T')[0];
      
          if (user.last_activity !== today) {
            user.items_posted_today = 0;
            user.last_activity = today;
          }
      
          if (user.items_posted_today >= 2) {
            console.error('Daily post limit reached');
            return res.status(403).send({ error: 'Daily post limit reached' });
          }
      
          db.query('INSERT INTO items (username, title, description, category, price) VALUES (?, ?, ?, ?, ?)', 
            [username, title, description, category, price], (err, result) => {
              if (err) {
                console.error('Error inserting item:', err);
                return res.status(500).send({ error: 'Error inserting item' });
              }
      
              db.query('UPDATE user SET items_posted_today = items_posted_today + 1, last_activity = ? WHERE username = ?', [today, username], (err, result) => {
                if (err) {
                  console.error('Error updating user data:', err);
                  return res.status(500).send({ error: 'Error updating user data' });
                }
                res.status(200).send('Item inserted successfully');
              });
          });
        });
      });
      app.get('/searchitems', (req, res) => {
        const { category } = req.query;
        
        db.query('SELECT * FROM items WHERE category LIKE ?', ['%' + category + '%'], (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(200).json(results);
        });
    });
    app.post('/addreview', (req, res) => {
      const { username, itemId, rating, description } = req.body;
      
      db.query('SELECT username FROM items WHERE id = ?', [itemId], (err, result) => {
          if (err) return res.status(500).send(err);
          const itemOwner = result[0].username;
          
          if (itemOwner === username) {
              return res.status(403).send('You cannot review your own item.');
          }
          
          db.query('SELECT reviews_given_today, last_activity FROM user WHERE username = ?', [username], (err, result) => {
              if (err) return res.status(500).send(err);
              const user = result[0];
              const today = new Date().toISOString().split('T')[0];
              
              if (user.last_activity !== today) {
                  user.items_posted_today = 0;
                  user.reviews_given_today = 0;
                  user.last_activity = today;
              }
              
              if (user.reviews_given_today >= 3) {
                  return res.status(403).send('You can only give 3 reviews a day.');
              }
              
              db.query('SELECT * FROM reviews WHERE username = ? AND item_id = ?', [username, itemId], (err, result) => {
                  if (err) return res.status(500).send(err);
                  
                  if (result.length > 0) {
                      return res.status(403).send('You have already reviewed this item.');
                  }
                  
                  db.query('INSERT INTO reviews (item_id, username, rating, description) VALUES (?, ?, ?, ?)', 
                      [itemId, username, rating, description], (err, result) => {
                      if (err) return res.status(500).send(err);
                      
                      db.query('UPDATE users SET reviews_given_today = reviews_given_today + 1, last_activity = ? WHERE username = ?', [today, username]);
                      res.status(200).send('Review added successfully');
                  });
              });
          });
      });
  });
  
    
      
app.listen(5001, () => {
  console.log('Server started on port 5000');
});

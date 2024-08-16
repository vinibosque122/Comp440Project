require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

// Create a MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise(); 

// Signup Route
app.post('/signup', async (req, res) => {
  const { username, password, password_confirm, firstName, lastName, email } = req.body;
  const sql = 'INSERT INTO user (username, password, password_confirm, firstName, lastName, email) VALUES (?, ?, ?, ?, ?, ?)';

  try {
    const [result] = await db.query(sql, [username, password, password_confirm, firstName, lastName, email]);
    res.status(200).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(400).json({ error: 'Failed to register user.' });
  }
});

// Sign-in Route
app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const sql = 'SELECT * FROM user WHERE username = ? AND password = ?';

  try {
    const [results] = await db.query(sql, [username, password]);
    if (results.length > 0) {
      res.status(200).json({ message: 'User signed in successfully.' });
    } else {
      res.status(401).json({ error: 'Invalid username or password.' });
    }
  } catch (err) {
    console.error('Error during sign-in:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});


function formatDateForMySQL(date) {
  const offset = date.getTimezoneOffset() * 60000; // Get the offset in milliseconds
  const localTime = new Date(date.getTime() - offset); // Adjust for local time
  return localTime.toISOString().slice(0, 19).replace('T', ' ');
}

app.post('/iteminsert', async (req, res) => {
  const { username, title, description, category, price } = req.body;
  const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
  const currentTimestamp = formatDateForMySQL(new Date()); // Current full timestamp in MySQL format

  try {
    const [userResult] = await db.query('SELECT items_posted_today, last_activity FROM user WHERE username = ?', [username]);

    if (userResult.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    let user = userResult[0];

    console.log('Initial items_posted_today:', user.items_posted_today);
    console.log('Last activity timestamp:', user.last_activity);
    console.log('Current timestamp:', currentTimestamp);

    // Check if the last activity was on a different day
    if (user.last_activity.toISOString().split('T')[0] !== today) {
      console.log('New day detected, resetting items_posted_today.');
      user.items_posted_today = 0;
    }

    console.log('Items posted today after reset (if applicable):', user.items_posted_today);

    // Check if the user has reached the daily limit
    if (user.items_posted_today >= 2) {
      console.log('User has reached daily post limit of 2.');
      return res.status(403).json({ error: 'Daily post limit reached' });
    }

    // Insert the new item
    await db.query('INSERT INTO items (username, title, description, category, price) VALUES (?, ?, ?, ?, ?)', [username, title, description, category, price]);

    // Increment the count of items posted today and update last_activity with the full current timestamp
    await db.query('UPDATE user SET items_posted_today = items_posted_today + 1, last_activity = ? WHERE username = ?', [currentTimestamp, username]);

    console.log('Item inserted successfully. Updated items_posted_today:', user.items_posted_today + 1);

    res.status(200).json({ message: 'Item inserted successfully' });
  } catch (err) {
    console.error('Error inserting item:', err);
    res.status(500).json({ error: 'Error inserting item' });
  }
});

// Search Items Route
app.get('/searchitems', async (req, res) => {
  const { category } = req.query;

  try {
    const [results] = await db.query('SELECT * FROM items WHERE category LIKE ?', ['%' + category + '%']);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});



// Updated Review Insertion Route
app.post('/addreview', async (req, res) => {
  const { username, itemId, rating, description } = req.body;
  const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
  const currentTimestamp = formatDateForMySQL(new Date()); 

  try {
    const [itemResult] = await db.query('SELECT username FROM items WHERE id = ?', [itemId]);
    const itemOwner = itemResult[0].username;

    if (itemOwner === username) {
      return res.status(403).send('You cannot review your own item.');
    }

    const [userResult] = await db.query('SELECT reviews_given_today, last_activity FROM user WHERE username = ?', [username]);
    let user = userResult[0];

    // Check if the last activity was on a different day
    if (user.last_activity.toISOString().split('T')[0] !== today) {
      console.log('New day detected, resetting reviews_given_today.');
      user.reviews_given_today = 0;
    }

    console.log('Reviews given today after reset (if applicable):', user.reviews_given_today);

    // Check if the user has reached the daily limit
    if (user.reviews_given_today >= 3) {
      console.log('User has reached daily review limit of 3.');
      return res.status(403).json({ error: 'Daily review limit reached' });
    }

    // Insert the new review
    await db.query('INSERT INTO reviews (item_id, username, rating, description) VALUES (?, ?, ?, ?)', [itemId, username, rating, description]);

   
    await db.query('UPDATE user SET reviews_given_today = reviews_given_today + 1, last_activity = ? WHERE username = ?', [currentTimestamp, username]);

    console.log('Review added successfully. Updated reviews_given_today:', user.reviews_given_today + 1);

    res.status(200).send('Review added successfully');
  } catch (err) {
    console.error('Error inserting review:', err);
    res.status(500).send(err);
  }
});

// Most Expensive Items Route
app.get('/most-expensive-items', async (req, res) => {
  const query = `
    SELECT i.*
    FROM items i
    JOIN (
        SELECT category, MAX(price) AS max_price
        FROM items
        GROUP BY category
    ) max_prices
    ON i.category = max_prices.category AND i.price = max_prices.max_price;
  `;

  try {
    const [result] = await db.query(query);
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Users with Multiple Categories Route
app.get('/users-with-multiple-categories', async (req, res) => {
  const { categoryX, categoryY } = req.query;

  const query = `
    SELECT DISTINCT i1.username
    FROM items i1
    JOIN items i2
      ON i1.username = i2.username
      AND DATE(i1.postDate) = DATE(i2.postDate)
      AND i1.category = ?
      AND i2.category = ?
    WHERE i1.id <> i2.id;
  `;

  try {
    const [result] = await db.query(query, [categoryX, categoryY]);
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Items with Good Comments Route
app.get('/items-with-good-comments', async (req, res) => {
  const username = req.query.user;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const query = `
    SELECT i.*
    FROM items i
    JOIN reviews r ON i.id = r.item_id
    WHERE i.username = ?
    GROUP BY i.id
    HAVING COUNT(CASE WHEN r.rating NOT IN ('excellent', 'good') THEN 1 END) = 0;
  `;

  try {
    const [result] = await db.query(query, [username]);
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: 'An error occurred while fetching items' });
  }
});

// Top Posters Route
app.get('/top-posters', async (req, res) => {
  const date = req.query.date;

  const query = `
    SELECT username
    FROM items
    WHERE DATE(postDate) = ?
    GROUP BY username
    HAVING COUNT(*) = (
        SELECT MAX(item_count)
        FROM (
            SELECT COUNT(*) AS item_count
            FROM items
            WHERE DATE(postDate) = ?
            GROUP BY username
        ) AS counts
    );
  `;

  try {
    const [result] = await db.query(query, [date, date]);
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Users with Poor Reviews Route
app.get('/users-with-poor-reviews', async (req, res) => {
  const query = `
    SELECT DISTINCT r.username, u.firstName, u.lastName
    FROM reviews r
    JOIN user u ON r.username = u.username
    WHERE r.rating = 'poor'
    AND NOT EXISTS (
        SELECT 1
        FROM reviews r2
        WHERE r2.username = r.username
        AND r2.rating <> 'poor'
    );
  `;

  try {
    const [result] = await db.query(query);
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Users with No Poor Reviews Route
app.get('/users-with-no-poor-reviews', async (req, res) => {
  const query = `
    SELECT DISTINCT i.username
    FROM items i
    LEFT JOIN reviews r ON i.id = r.item_id
    GROUP BY i.username, i.id
    HAVING COUNT(CASE WHEN r.rating = 'poor' THEN 1 END) = 0;
  `;

  try {
    const [result] = await db.query(query);
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server
app.listen(5001, () => {
  console.log('Server started on port 5001');
});
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

app.listen(5001, () => {
  console.log('Server started on port 5000');
});

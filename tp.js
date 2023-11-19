const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: "tp",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    throw err;
  }
  console.log('Connected to MySQL');
});

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML form for sign-up
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

// Handle sign-up form submission
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Insert user data into MySQL
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).send('Error signing up');
      return;
    }

    console.log('User signed up:', result);
    res.status(200).send('Sign-up successful');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

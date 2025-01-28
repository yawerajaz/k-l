const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes will be added here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Signup route
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, hashedPassword]
    );
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  if (user.rows.length === 0) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isValid = await bcrypt.compare(password, user.rows[0].password);
  if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET);
  res.json({ token });
});

// Get all guides
app.get('/api/guides', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM tourism_guides');
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const Listing = require('./models/Listing');

// Create listing
app.post('/api/listings', async (req, res) => {
  const listing = new Listing(req.body);
  await listing.save();
  res.status(201).json(listing);
});

// Get all listings
app.get('/api/listings', async (req, res) => {
  const listings = await Listing.find();
  res.json(listings);
});
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  condition: String,
  location: String,
});

module.exports = mongoose.model('Listing', listingSchema);
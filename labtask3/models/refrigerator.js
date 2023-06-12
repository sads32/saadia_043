// models/refrigerator.js

const mongoose = require('mongoose');

const refrigeratorSchema = new mongoose.Schema({

 picture: String,
  title: String,
  price: Number,
});

const Refrigerator = mongoose.model('Refrigerator', refrigeratorSchema);

module.exports = Refrigerator;

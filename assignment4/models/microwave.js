// models/microwave.js

const mongoose = require('mongoose');

const microwaveSchema = new mongoose.Schema({

 picture: String,
  title: String,
  price: Number,
});

const microwave = mongoose.model('microwave', microwaveSchema);

module.exports = microwave;

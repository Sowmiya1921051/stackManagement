// models/Dish.js

const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;

// models/StockItem.js

const mongoose = require('mongoose');

const stockItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String
}, { timestamps: true });

const StockItem = mongoose.model('StockItem', stockItemSchema);

module.exports = StockItem;

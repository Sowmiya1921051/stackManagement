// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/stock_management', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Define a schema and model for the stock items
const stockItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const StockItem = mongoose.model('StockItem', stockItemSchema);

// Routes
app.get('/api/stock', async (req, res) => {
  try {
    const stockItems = await StockItem.find();
    res.json(stockItems);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/stock', async (req, res) => {
  try {
    const newStockItem = new StockItem(req.body);
    await newStockItem.save();
    res.status(201).send(newStockItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put('/api/stock/:id', async (req, res) => {
  try {
    const updatedStockItem = await StockItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedStockItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/api/stock/:id', async (req, res) => {
  try {
    await StockItem.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

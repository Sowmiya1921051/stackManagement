// routes/stockItems.js

const express = require('express');
const StockItem = require('../models/StockItem');

const router = express.Router();

// Get all stock items
router.get('/', async (req, res) => {
  try {
    const stockItems = await StockItem.find();
    res.json(stockItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single stock item by ID
router.get('/:id', async (req, res) => {
  try {
    const stockItem = await StockItem.findById(req.params.id);
    if (!stockItem) return res.status(404).json({ message: 'Stock item not found' });
    res.json(stockItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new stock item
router.post('/', async (req, res) => {
  const stockItem = new StockItem({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description
  });

  try {
    const newStockItem = await stockItem.save();
    res.status(201).json(newStockItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a stock item by ID
router.put('/:id', async (req, res) => {
  try {
    const stockItem = await StockItem.findById(req.params.id);
    if (!stockItem) return res.status(404).json({ message: 'Stock item not found' });

    stockItem.name = req.body.name;
    stockItem.quantity = req.body.quantity;
    stockItem.price = req.body.price;
    stockItem.description = req.body.description;

    const updatedStockItem = await stockItem.save();
    res.json(updatedStockItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a stock item by ID
router.delete('/:id', async (req, res) => {
  try {
    const stockItem = await StockItem.findById(req.params.id);
    if (!stockItem) return res.status(404).json({ message: 'Stock item not found' });

    await stockItem.remove();
    res.json({ message: 'Stock item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

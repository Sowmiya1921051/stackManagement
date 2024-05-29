// routes/dishes.js

const express = require('express');
const multer = require('multer');
const Dish = require('../models/Dish');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Add a new dish
router.post('/', upload.single('image'), async (req, res) => {
  const { name, originalPrice } = req.body;
  const imageUrl = req.file.path;

  try {
    const dish = new Dish({ name, originalPrice, imageUrl });
    await dish.save();
    res.status(201).json(dish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all dishes
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

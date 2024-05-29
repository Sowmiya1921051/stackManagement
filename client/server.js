const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

// multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/stock_management', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Define models
const StockItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    gstRate: { type: Number, default: 0.05 },
    priceWithGST: { type: Number, required: true },
    imageUrl: { type: String },
    createdAt: { type: String, default: getCurrentDateTime },
});

const StockItem = mongoose.model('StockItem', StockItemSchema);

// Function to get current date and time in the desired format
function getCurrentDateTime() {
    let date_time = new Date();
    let date = ("0" + date_time.getDate()).slice(-2);
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    let year = date_time.getFullYear();
    let hours = ("0" + date_time.getHours()).slice(-2);
    let minutes = ("0" + date_time.getMinutes()).slice(-2);
    let seconds = ("0" + date_time.getSeconds()).slice(-2);

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}

// Routes
app.post('/api/stockitems', upload.single('image'), async (req, res) => {
    console.log('Request received:', req.body, req.file);
    try {
        const { name, originalPrice, gstRate = 0.05 } = req.body;

        const originalPriceNum = parseFloat(originalPrice);
        const gstRateNum = parseFloat(gstRate);

        if (!name || isNaN(originalPriceNum) || isNaN(gstRateNum)) {
            throw new Error('Invalid name, original price, or GST rate');
        }

        const priceWithGST = originalPriceNum * (1 + gstRateNum);
        const imageUrl = req.file ? req.file.path : null;

        const stockItem = new StockItem({ name, originalPrice: originalPriceNum, gstRate: gstRateNum, priceWithGST, imageUrl });
        await stockItem.save();
        console.log('Stock item added successfully:', stockItem);
        res.json({ success: true, message: 'Stock item added successfully' });
    } catch (error) {
        console.error('Error adding stock item:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/stockitems', async (req, res) => {
    try {
        const stockItems = await StockItem.find();
        res.json(stockItems);
    } catch (error) {
        console.error('Error fetching stock items:', error);
        res.status(500).json({ success: false, message: 'Error fetching stock items' });
    }
});

// Serve static files (images) from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

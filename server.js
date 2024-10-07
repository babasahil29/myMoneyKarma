Server.js

// Import required modules
const express = require('express');
const bodyParser = require('body-parser'); const mongoose = require('mongoose'); const cors = require('cors');

// Create an instance of express const app = express();

// Middleware
app.use(cors()); // Enable CORS app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB (async () => {
try {
await mongoose.connect('mongodb://localhost:27017/financial_dashboard', { useNewUrlParser: true,
useUnifiedTopology: true,
});
console.log('MongoDB connected successfully');
 
} catch (err) {
console.log('MongoDB connection error:', err);
}
})();

// Define a schema for financial data
const financialSchema = new mongoose.Schema({ income: Number,
expenses: Number, savings: Number,
});

// Create a model from the schema
const FinancialData = mongoose.model('FinancialData', financialSchema);

// Function for improved advice logic
const getAdvice = (income, expenses, savings) => { let advice = '';

if (savings < income * 0.1) {
advice += 'Consider saving more! ';
} else {
advice += 'Good job on saving at least 10% of your income! ';
}

if (expenses > income * 0.8) {
advice += 'Try cutting down on discretionary spending.';
} else {
advice += 'Your expenses are well within 80% of your income.';
}

return advice;
};

// Route to submit financial data and receive advice app.post('/api/financial-advice', async (req, res) => {
try {
const { income, expenses, savings } = req.body;
console.log('Received data:', { income, expenses, savings }); // Debugging

// Get advice
const advice = getAdvice(income, expenses, savings);

// Save data to database (optional)
const financialEntry = new FinancialData({ income, expenses, savings }); await financialEntry.save();

// Send response with advice res.json({ advice });
} catch (err) {
console.error('Error processing request:', err); res.status(500).json({ message: 'Server error' });
}
});

// Set the server to listen on a specific port const PORT = process.env.PORT || 5004;
 
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

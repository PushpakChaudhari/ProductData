// routes/transactions.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Price range statistics route
router.get('/price-range', async (req, res) => {
    const { month } = req.query;

    // Month to number mapping
    const monthMapping = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11
    };

    if (!month || !monthMapping[month]) {
        return res.status(400).json({ message: 'Invalid month provided' });
    }

    try {
        // Define price ranges
        const priceRanges = [
            { range: '0-100', min: 0, max: 100 },
            { range: '101-200', min: 101, max: 200 },
            { range: '201-300', min: 201, max: 300 },
            { range: '301-400', min: 301, max: 400 },
            { range: '401-500', min: 401, max: 500 },
            { range: '501-600', min: 501, max: 600 },
            { range: '601-700', min: 601, max: 700 },
            { range: '701-800', min: 701, max: 800 },
            { range: '801-900', min: 801, max: 900 },
            { range: '901-above', min: 901, max: Infinity }
        ];

        const results = await Promise.all(priceRanges.map(async (range) => {
            const count = await Transaction.countDocuments({
                $expr: {
                    $and: [
                        { $eq: [{ $month: "$dateOfSale" }, monthMapping[month]] },
                        { $gte: ["$price", range.min] },
                        { $lte: ["$price", range.max] }
                    ]
                }
            });
            return { range: range.range, count };
        }));

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

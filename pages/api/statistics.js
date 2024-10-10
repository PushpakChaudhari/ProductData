// pages/api/statistics.js

import { transactionsData } from '../../data/sample-data.json'; // Replace with your data source

export default function handler(req, res) {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month is required' });
    }

    const filteredTransactions = transactionsData.filter(transaction => {
        const transactionDate = new Date(transaction.dateOfSale);
        return transactionDate.toLocaleString('default', { month: 'long' }) === month;
    });

    const totalSales = filteredTransactions.reduce((acc, curr) => acc + curr.price, 0);
    const totalSold = filteredTransactions.filter(item => item.sold).length;
    const totalNotSold = filteredTransactions.length - totalSold;

    res.status(200).json({
        totalSales,
        totalSold,
        totalNotSold,
    });
}

// components/StatisticsBox.tsx
import React, { useState, useEffect } from 'react';
import sampleData from '../data/sample-data.json'; // Ensure the path is correct

// Define the interface for the statistics data
interface Statistics {
  totalSales: number;
  totalSold: number;
  totalNotSold: number;
}

// Define the interface for each transaction item in the sample data
interface Transaction {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sold: boolean;
  dateOfSale: string;
}

const StatisticsBox: React.FC<{ selectedMonth: string }> = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  useEffect(() => {
    const calculateStatistics = () => {
      // Filter transactions for the selected month
      const filteredTransactions = sampleData.filter((transaction: Transaction) => {
        const transactionMonth = new Date(transaction.dateOfSale).toLocaleString('default', { month: 'long' });
        return transactionMonth === selectedMonth;
      });

      // Calculate statistics
      const totalSales = filteredTransactions.reduce((acc, transaction) => acc + transaction.price, 0);
      const totalSold = filteredTransactions.filter(transaction => transaction.sold).length;
      const totalNotSold = filteredTransactions.filter(transaction => !transaction.sold).length;

      // Update the statistics state
      setStatistics({
        totalSales,
        totalSold,
        totalNotSold,
      });
    };

    calculateStatistics();
  }, [selectedMonth]);

  if (!statistics) {
    return <div>Loading statistics...</div>;
  }

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: '#333' }}>Statistics for {selectedMonth}</h2>
      <p>Total Sales Amount: <strong>${statistics.totalSales.toFixed(2)}</strong></p>
      <p>Total Sold Items: <strong>{statistics.totalSold}</strong></p>
      <p>Total Not Sold Items: <strong>{statistics.totalNotSold}</strong></p>
    </div>
  );
};
export default StatisticsBox;

import { NextApiRequest, NextApiResponse } from 'next';
import sampleData from '../../data/sample-data.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { month } = req.query;
  if (!month) {
    return res.status(400).json({ message: 'Month is required' });
  }

  const monthMapping: { [key: string]: number } = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
  };

  const selectedMonthIndex = monthMapping[month as string];
  if (selectedMonthIndex === undefined) {
    return res.status(400).json({ message: 'Invalid month provided' });
  }

  // Filter transactions based on the selected month
  const filteredData = sampleData.filter(transaction => {
    const transactionDate = new Date(transaction.dateOfSale);
    return transactionDate.getMonth() === selectedMonthIndex;
  });

  // Group by category and count items
  const categoryCounts: { [key: string]: number } = {};
  filteredData.forEach(transaction => {
    if (categoryCounts[transaction.category]) {
      categoryCounts[transaction.category]++;
    } else {
      categoryCounts[transaction.category] = 1;
    }
  });

  // Prepare response
  const result = Object.entries(categoryCounts).map(([category, count]) => ({
    _id: category,
    count
  }));

  res.status(200).json(result);
}

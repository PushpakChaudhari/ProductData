import type { NextApiRequest, NextApiResponse } from 'next';
import sampleData from '../../data/sample-data.json';

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
  { range: '901-above', min: 901, max: Infinity },
];

const getPriceRangeData = (month: string) => {
  const counts = priceRanges.map(range => {
    const count = sampleData.filter(item => {
      const itemDate = new Date(item.dateOfSale);
      return (
        item.price >= range.min &&
        item.price <= range.max &&
        itemDate.toLocaleString('default', { month: 'long' }) === month
      );
    }).length;
    return { range: range.range, count };
  });
  return counts;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: 'Month is required' });
  }

  const data = getPriceRangeData(month as string);
  res.status(200).json(data);
}

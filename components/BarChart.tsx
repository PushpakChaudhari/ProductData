"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import axios from "axios";

// Register the required chart.js components
ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Define the type for the response data
interface PriceRangeData {
  range: string;
  count: number;
}

const BarChart: React.FC<{ selectedMonth: string }> = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: "Number of Items",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PriceRangeData[]>('/api/price-range', {
          params: { month: selectedMonth },
        });

        const data = response.data.map((item) => item.count);
        const priceRanges = response.data.map((item) => item.range);

        setChartData({
          labels: priceRanges,
          datasets: [{
            label: "Number of Items",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          }],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  return (
    <div style={{ height: "400px", width: "80%", margin: "0 auto" }}>
      <h2>Price Distribution for {selectedMonth}</h2>
      <Bar 
        data={chartData} 
        options={{ 
          responsive: true, 
          maintainAspectRatio: false, // Allows chart to resize properly
        }} 
      />
    </div>
  );
};

export default BarChart;

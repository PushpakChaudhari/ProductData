
"use client";

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import axios from "axios";

// Register the required chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the type for the response data
interface CategoryData {
  _id: string; // Category name
  count: number; // Number of items in that category
}

const CategoryPieChart: React.FC<{ selectedMonth: string }> = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [{
      data: [] as number[],
      backgroundColor: [] as string[],
    }]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CategoryData[]>('/api/category-statistics', {
          params: { month: selectedMonth },
        });

        const data = response.data.map(item => item.count);
        const categories = response.data.map(item => item._id);

        const backgroundColors = categories.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

        setChartData({
          labels: categories,
          datasets: [{
            data: data,
            backgroundColor: backgroundColors,
          }],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  return (
    <div style={{ height: "400px", width: "30%", margin: "0 auto" }}>
      <h2>Category Distribution for {selectedMonth}</h2>
      <Pie data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default CategoryPieChart;

// app/ChartPage/page.tsx
"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import sampleData from "../data/sample-data.json"; // Adjust the path if necessary

// Register the required chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ChartPage = () => {
  const chartData = {
    labels: sampleData.map((item) => item.title),
    datasets: [
      {
        label: "Price",
        data: sampleData.map((item) => item.price),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default ChartPage;

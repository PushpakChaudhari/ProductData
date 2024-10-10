"use client";

import React, { useState } from "react";
import BarChart from "../components/BarChart"; // Adjust the import path if necessary
import CategoryPieChart from "../components/CategoryPieChart"; // Import the CategoryPieChart component
import { Button } from "@mui/material"; // Import Button from MUI for styling

const ChartPage = () => {
  const [selectedMonth, setSelectedMonth] = useState("March"); // Default month
  const [chartType, setChartType] = useState<"bar" | "pie">("bar"); // Default chart type

  // Function to handle month change
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  // Function to toggle chart type
  const handleChartTypeChange = (type: "bar" | "pie") => {
    setChartType(type);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9", color: "#333", minHeight: "100vh" }}>
      <h1>Chart Example</h1>
      <div style={{ marginBottom: "10px" }}>
        <select value={selectedMonth} onChange={handleMonthChange} style={dropdownStyle}>
          {/* Month options */}
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      
      {/* Chart Type Selection Buttons */}
      <div style={{ marginBottom: "10px" }}>
        <Button color="primary" onClick={() => handleChartTypeChange("bar")} style={buttonStyle}>
          Bar Chart
        </Button>
        <Button color="primary" onClick={() => handleChartTypeChange("pie")} style={buttonStyle}>
          Pie Chart
        </Button>
      </div>

      {/* Render the selected chart type */}
      {chartType === "bar" && <BarChart selectedMonth={selectedMonth} />}
      {chartType === "pie" && <CategoryPieChart selectedMonth={selectedMonth} />}
    </div>
  );
};

// Button styles
const buttonStyle = {
  backgroundColor: "#1976D2",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  padding: "10px 20px",
  margin: "0 10px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

// Dropdown styles
const dropdownStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  color: "#333",
  cursor: "pointer",
  marginRight: "10px",
  width: "200px",
};

export default ChartPage;

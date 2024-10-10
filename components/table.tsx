// components/TableComponent.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";
import Image from "next/image"; // Import Image from next/image
import sampleData from "../data/sample-data.json"; // Adjust path as needed

// Define the type for the sample data
interface Transaction {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sold: boolean;
  dateOfSale: string;
  createdAt?: string;
}

// Function to format the date for the "createdAt" field
const formatDate = (date: string): string => // Explicitly define the parameter type as string
  new Date(date).toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const TableComponent = () => {
  const router = useRouter(); // Initialize the router
  const [formattedData, setFormattedData] = useState<Transaction[]>([]); // Specify the type of formattedData
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for the search term
  const [selectedMonth, setSelectedMonth] = useState<string>("March"); // Set March as the default month
  const [currentPage, setCurrentPage] = useState<number>(1); // State for the current page
  const resultsPerPage = 10; // Number of results per page

  useEffect(() => {
    const newFormattedData = sampleData.map((item: Transaction) => ({
      ...item,
      createdAt: formatDate(item.dateOfSale),
    }));
    setFormattedData(newFormattedData);
  }, []);

  // Filter data based on search term and selected month
  const filteredData = formattedData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = selectedMonth
      ? new Date(item.dateOfSale).toLocaleString("default", { month: "long" }) === selectedMonth
      : true; // No month filter applied

    return matchesSearch && matchesMonth;
  });

  // Calculate the current transactions to display based on pagination
  const indexOfLastTransaction = currentPage * resultsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - resultsPerPage;
  const currentTransactions = filteredData.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(filteredData.length / resultsPerPage); // Calculate total pages

  return (
    <div style={{ backgroundColor: "#f9f9f9", color: "#333", minHeight: "100vh", padding: "1rem" }}>
      {/* Search and Filter Components */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <TextField
          label="Search by Title"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "1rem", width: "300px" }} // Make sure the width is set
        />
        <TextField
          select
          label="Filter by Month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          variant="outlined"
          style={{ width: "200px" }} // Make sure the width is set
        >
          <MenuItem value="">All Months</MenuItem> {/* Option for all months */}
          {months.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </TextField>
      </div>

      {/* Button for navigating to the chart page */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <Button variant="contained" color="primary" onClick={() => router.push('/ChartPage')}>
          View Chart
        </Button>
      </div>

      {/* Data Table */}
      <TableContainer
        component={Paper}
        style={{
          marginBottom: "1rem",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(currentTransactions[0] || {}).map((key) => (
                <TableCell key={key} style={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "#fff" }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTransactions.map((item) => (
              <TableRow key={item.id}>
                {Object.keys(item).map((key) => (
                  <TableCell key={key}>
                    {key === "image" ? (
                      <Image
                        src={item[key]} // Use the URL from your data
                        alt={item.title} // Provide an alt text for accessibility
                        width={50} // Specify the width
                        height={50} // Specify the height
                        style={{ borderRadius: "50%" }} // Optional: Add styles if needed
                      />
                    ) : (
                      item[key as keyof Transaction] // Type assertion for key
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Buttons */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span style={{ margin: "0 15px" }}>{currentPage} / {totalPages}</span>
        <Button
          variant="contained"
          onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TableComponent;

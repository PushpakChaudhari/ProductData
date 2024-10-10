// Import the Table component
import Table from "../components/table";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
        <h1 
          className="text-3xl font-extrabold text-center mb-4 transition duration-300 hover:text-blue-800"
          style={{ color: 'rgb(63, 81, 181)' }} // Set the color using inline style
        >
          Data Table
        </h1>
        <Table />
      </div>
    </div>
  );
}

import React, { useState } from "react";

const FindBook = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle form submission
  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Find a Book</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full max-w-md flex">
        <input
          type="text"
          placeholder="Search for a book..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          type="submit"
          className="px-4 py-3 bg-purple-600 text-white font-semibold rounded-r-md hover:bg-purple-700"
        >
          Search
        </button>
      </form>

      {/* Display entered text (for testing) */}
      {searchTerm && (
        <p className="mt-4 text-gray-600">Searching for: <strong>{searchTerm}</strong></p>
      )}
    </div>
  );
};

export default FindBook;

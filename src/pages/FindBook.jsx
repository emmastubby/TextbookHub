import React, { useState } from "react";
import FindBookCard from "../components/FindBookCard";
import algo from '../assets/algo.jpg';
import { Search } from '@mui/icons-material';

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
    <div className="flex flex-col min-h-screen p-6 pt-24">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full max-w-md flex">
        <input
          type="text"
          placeholder="Search for a textbook..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <button
          type="submit"
          className="px-4 py-3 bg-green-600 text-white font-semibold rounded-r-md hover:bg-green-700"
        >
          <div className="flex">
          Search
          <Search className="ml-3"></Search>
          </div>
        </button>
      </form>

      <p className="text-sm text-gray-500 mb-6">Search by title, author, keyword, or ISBN</p>

      <h1 className="text-2xl font-bold text-gray-600">My Favorites:</h1>

      {/* Display entered text (for testing)
      {searchTerm && (
        <p className="mt-4 text-gray-600">Searching for: <strong>{searchTerm}</strong></p>
      )} */}

      <FindBookCard picture={algo} title="Algorithm Analysis" edition="10" author="Qi Cheng" price="20" condition="Good"/>

      <h1 className="text-2xl font-bold text-gray-600 mt-8">Based on Your Major:</h1>

      <FindBookCard picture={algo} title="Algorithm Analysis" edition="10" author="Qi Cheng" price="20" condition="Good"/>
    </div>
  );
};

export default FindBook;

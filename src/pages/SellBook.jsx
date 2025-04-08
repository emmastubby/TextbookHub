import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SellBookCard from "../components/SellBookCard";
import SoldBookCard from "../components/SoldBookCard";
import algo from "../assets/algo.jpg";
import { Add } from '@mui/icons-material';

const SellBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    condition: "New",
    price: "",
    description: "",
    image: null,
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Book listed for sale!");
  };

  return (
    <div className="flex flex-col min-h-screen p-6 pt-24">
      <div className="mb-6 flex flex-row">
        <h1 className="text-3xl font-bold text-red-950 mr-10">
          Selling A New Book?
        </h1>
        <button
          className="w-200 bg-green-700 text-white font-semibold py-2 px-4 mr-1 rounded-lg hover:bg-green-800 transition"
          onClick={() => {
            navigate("/sell/new");
          }}
        >
          New Listing
          <Add className="ml-4 mb-1"></Add>
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray-600">My Active Listings:</h1>
      <SellBookCard
        picture={algo}
        title="Algorithm Analysis"
        edition="10"
        author="Qi Cheng"
        price="20"
        condition="Good"
      ></SellBookCard>

      <h1 className="text-2xl font-bold text-gray-600 mt-10">My Past Listings:</h1>
      <SoldBookCard
        picture={algo}
        title="Algorithm Analysis"
        edition="10"
        author="Qi Cheng"
        price="20"
        condition="Good"
      ></SoldBookCard>
    </div>
  );
};

export default SellBook;

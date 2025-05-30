/**
* @fileOverview Page for filling out information to list a new book for sale
*/

import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/atoms";
import { useNavigate } from "react-router-dom";

const ListBookForm = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);

  // data entered into form
  const [formData, setFormData] = React.useState({
    title: "",
    author: "",
    isbn: "",
    condition: "New",
    edition: 1,
    price: "",
    description: "",
    image: null,
  });

  // handle form submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    const booksRef = collection(db, "books");
    // Add the formdata to firestore database
    const dofRef = addDoc(booksRef, {
      title: formData.title,
      author: formData.author,
      isbn: formData.isbn,
      condition: formData.condition,
      edition: formData.edition,
      price: formData.price,
      description: formData.description,
      image: formData.image,
      userID: auth.userID,
    })
      .then(() => {
        console.log("Document written with ID: ", dofRef.id);
        // Show success message
        alert("Book listed for sale!");
        // navigate user to /sell
        navigate("/sell");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 pt-24">
      <h1 className="text-2xl font-bold mb-6">Sell a Book</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 shadow-md rounded-md"
      >
        {/* Title */}
        <label className="block mb-2 font-semibold">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full p-2 border rounded-md mb-4"
        />

        {/* Author */}
        <label className="block mb-2 font-semibold">Author:</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          required
          className="w-full p-2 border rounded-md mb-4"
        />

        {/* ISBN */}
        <label className="block mb-2 font-semibold">ISBN:</label>
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
          className="w-full p-2 border rounded-md mb-4"
        />
        {/* Edition */}
        <label className="block mb-2 font-semibold">Edition:</label>
        <input
          type="number"
          name="edition"
          required
          value={formData.edition}
          onChange={(e) =>
            setFormData({ ...formData, edition: parseInt(e.target.value) })
          }
          className="w-full p-2 border rounded-md mb-4"
        />

        {/* Condition */}
        <label className="block mb-2 font-semibold">Condition:</label>
        <select
          name="condition"
          value={formData.condition}
          onChange={(e) =>
            setFormData({ ...formData, condition: e.target.value })
          }
          className="w-full p-2 border rounded-md mb-4"
        >
          <option value="New">New</option>
          <option value="Like New">Like New</option>
          <option value="Good">Good</option>
          <option value="Acceptable">Acceptable</option>
          <option value="Poor">Poor</option>
        </select>

        {/* Price */}
        <label className="block mb-2 font-semibold">Price ($):</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: parseFloat(e.target.value) })
          }
          required
          className="w-full p-2 border rounded-md mb-4"
        />

        {/* Description */}
        <label className="block mb-2 font-semibold">
          Description (Optional):
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows="3"
          className="w-full p-2 border rounded-md mb-4"
        ></textarea>

        {/* Image Upload */}
        <label className="block mb-2 font-semibold">
          Upload Image (Optional):
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={() => {}}
          className="w-full mb-4"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white p-2 mb-2 font-semibold rounded-md"
        >
          List Book for Sale
        </button>

        {/* Cancel Button */}
        <button
          type="button"
          className="w-full bg-gray-400 hover:bg-gray-500 text-white p-2 font-semibold rounded-md"
          onClick={() => navigate("/sell/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ListBookForm;

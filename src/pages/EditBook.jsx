/**
* @fileOverview Page for editing book data in your own listing
*/

import React, { useEffect } from "react";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/atoms";
import { useNavigate } from "react-router-dom";

const EditBook = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);

  // data entered into form
  const [formData, setFormData] = React.useState({
    bookId: "",
    title: "",
    author: "",
    isbn: "",
    condition: "New",
    edition: 1,
    price: "",
    description: "",
    image: null,
  });

  // Get bookId from query params
  const queryParams = new URLSearchParams(window.location.search);
  const bookId = queryParams.get("bookId");

  // Fetch book data from Firestore
  useEffect(() => {
    const fetchBookData = async () => {
      const booksRef = collection(db, "books");
      const bookSnapshot = await getDocs(booksRef);
      const bookList = bookSnapshot.docs.map((doc) => ({
        bookId: doc.id,
        ...doc.data(),
      }));
      // Find the book with the given bookId
      const book = bookList.find((book) => book.bookId === bookId);
      if (book) {
        setFormData(book);
      }
    };
    fetchBookData();
  }, []);

  // handle edit form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const bookRef = doc(db, "books", bookId); // Reference to the document
      await updateDoc(bookRef, {
        title: formData.title,
        author: formData.author,
        isbn: formData.isbn,
        condition: formData.condition,
        edition: formData.edition,
        price: formData.price,
        description: formData.description,
        image: formData.image,
        userID: auth.userID,
      });
      alert("Book updated successfully!");
      navigate("/sell");
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Failed to update the book.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 pt-24">
      <h1 className="text-2xl font-bold mb-6">Edit book info</h1>

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
          Update Book
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

export default EditBook;

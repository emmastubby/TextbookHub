import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SellBookCard from "../components/SellBookCard";
import SoldBookCard from "../components/SoldBookCard";
import algo from '../assets/intro_to_algo.png';
import formal_lang from '../assets/formal_lang.png';
import prog_lang from '../assets/prog_lang.png';
import stats from '../assets/stats.png';
import data_structures from '../assets/data_structures.png';
import { Add } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/atoms";
import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";

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
  const [auth, setAuth] = useRecoilState(authState);
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      // pull user data from firebase
      const userID = auth.userID;
      const booksRef = collection(db, "books");
      const booksSnapshot = await getDocs(booksRef);
      const booksList = booksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(booksList);
      // filter books by userID
      const userBooks = booksList.filter((book) => book.userID === userID);

      // set books state
      setBooks(userBooks);
    };
    fetchBooks();
  }, []);

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

  const imageMap = {
      intro_to_algo: algo,
      formal_lang: formal_lang,
      prog_lang: prog_lang,
      stats: stats,
      data_structures: data_structures,
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
      <div className="flex gap-4 overflow-x-auto p-4">
        {books.map((book) => (
          <SellBookCard
            key={book.id}
            bookId={book.id}
            picture={imageMap[book.image]}
            title={book.title}
            edition={book.edition}
            author={book.author}
            price={book.price}
            condition={book.condition}
          ></SellBookCard>
        ))}
      </div>
      <h1 className="text-2xl font-bold text-gray-600 mt-10">
        My Past Listings:
      </h1>
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

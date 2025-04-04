import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBook, FaUserCircle } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/atoms";

const NavBar = () => {
  const [authAtom, setAuthAtom] = useRecoilState(authState);
  const location = useLocation(); // Get current path

  const handleLogout = () => {
    setAuthAtom({
      userID: "",
      userName: "",
      userEmail: "",
      isLoggedIn: false,
    });
  };

  // Function to determine active link styles
  const getLinkClass = (path) =>
    location.pathname === path
      ? "text-red-950 font-semibold border-b-2 border-red-950"
      : "text-gray-700 hover:text-brown-600";

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Left Section: Home Icon */}
      <div className="flex items-center">
        <Link to="/" className="text-red-950 text-xl flex items-center">
          <FaBook className="mr-2" />
          <span className="font-bold text-2xl text-red-950">Textbook Hub</span>
        </Link>
      </div>

      {/* Middle Section: Navigation Links */}
      <div className="flex space-x-8">
        <Link to="/find" className={getLinkClass("/find")}>
          Find a Book
        </Link>
        <Link to="/sell" className={getLinkClass("/sell")}>
          Sell a Book
        </Link>
        <Link
          to="/messages"
          className={`relative ${getLinkClass("/messages")}`}
        >
          Messages
          <span className="absolute -top-2 -right-3 bg-brown-600 text-white text-xs px-2 py-0.5 rounded-full">
            2
          </span>
        </Link>
      </div>

      {/* if user is logged in, show the profile icon */}
      {authAtom.isLoggedIn ? (
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Emma Stubby </span>
          <FaUserCircle className="text-gray-700 text-2xl" />
          <button className="bg-blue-500 text-white px-6 py-2 rounded">
            <Link to="/find" onClick={handleLogout}>
              Logout
            </Link>
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <button className="bg-blue-500 text-white px-6 py-2 rounded">
            <Link to="/login">Login</Link>
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

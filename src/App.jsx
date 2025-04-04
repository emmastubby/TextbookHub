import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import NavBar from "./components/NavBar"; // Import the NavBar component
import Home from "./pages/Home";
import FindBook from "./pages/FindBook";
import SellBook from "./pages/SellBook";
import Messages from "./pages/Messages";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

const App = () => {
  const location = useLocation();
  const hideNav = ["/signup", "/login"].includes(location.pathname);

  return (
    <>
      {!hideNav && <NavBar />}
      <Routes>
        <Route path="/" element={<Navigate to="/find" />} />
        <Route path="/find" element={<FindBook />} />
        <Route path="/sell" element={<SellBook />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;

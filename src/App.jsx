import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import FindBook from "./pages/FindBook";
import SellBook from "./pages/SellBook";
import Messages from "./pages/Messages";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ListBookForm from "./components/ListBookForm";
import EditBook from "./pages/EditBook";
import { useRecoilValue } from "recoil";
import { authState } from "./recoil/atoms";


const App = () => {
  const auth = useRecoilValue(authState);

  const location = useLocation();
  const hideNav = ["/signup", "/login"].includes(location.pathname);

  return (
    <>
      {!hideNav && <NavBar />}
      <Routes>
  <Route
    path="/"
    element={
      auth.isLoggedIn ? <Navigate to="/find" /> : <Navigate to="/login" />
    }
  />
  <Route
  path="/home"
  element={auth.isLoggedIn ? <Navigate to="/find" /> : <Navigate to="/login" />}
  />
  <Route
    path="/find"
    element={auth.isLoggedIn ? <FindBook /> : <Navigate to="/login" />}
  />
  <Route
    path="/sell"
    element={auth.isLoggedIn ? <SellBook /> : <Navigate to="/login" />}
  />
  <Route
    path="/sell/new"
    element={auth.isLoggedIn ? <ListBookForm /> : <Navigate to="/login" />}
  />
  <Route
    path="/sell/edit"
    element={auth.isLoggedIn ? <EditBook /> : <Navigate to="/login" />}
  />
  <Route
    path="/messages"
    element={auth.isLoggedIn ? <Messages /> : <Navigate to="/login" />}
  />
  <Route
    path="/signup"
    element={auth.isLoggedIn ? <Navigate to="/find" /> : <SignUp />}
  />
  <Route
    path="/login"
    element={auth.isLoggedIn ? <Navigate to="/find" /> : <Login />}
  />
</Routes>

    </>
  );
};

export default App;

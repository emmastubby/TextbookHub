/**
* @fileOverview Login page for users to sign in
*/

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/atoms";
import { auth } from "../firebase-config";
import { FaBook } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authAtom, setAuthAtom] = useRecoilState(authState);

  // handle login button pressed
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Login the user
      setAuthAtom({
        userID: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        isLoggedIn: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen flex items-center justify-center">
      <div className="bg-[#e3e3e3] max-w-[30rem] p-6 rounded-lg flex flex-col items-center">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center px-16 mt-[4rem]"
        >
          <div className="flex">
            <FaBook className="mr-2 mt-1 text-red-950 text-2xl" />
            <span className="font-bold text-2xl text-red-950">Textbook Hub</span>
          </div>

          <h1 className="text-2xl font-bold mt-6">Login</h1>

          <div className="flex w-full mt-6">
            <p className="justify-self-start">Email:</p>
          </div>
          <input
            type="email"
            className="w-[20rem] bg-[#FFFFFF] h-8 text-black rounded py-5 px-6 mt-2"
            value={email}
            required
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex w-full mt-6">
            <p className="justify-self-start">Password:</p>
          </div>
          <input
            type="password"
            className="w-[20rem] bg-[#FFFFFF] h-8 text-black rounded py-5 px-6 mt-2"
            value={password}
            required
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-fit bg-green-600 hover:bg-green-700 text-white py-2 px-8 rounded-xl mt-6"
          >
            Log In
          </button>
        </form>
        <div className="flex flex-col w-full items-center justify-end space-y-8 mb-[5rem] mt-8">
          <button
            className="text-black w-fit underline"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
          <button
            className="text-black w-fit underline"
            onClick={() => navigate("/signup")}
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

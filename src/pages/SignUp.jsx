/**
* @fileOverview Sign up page for users to create a new account
*/

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/atoms";
import { auth } from "../firebase-config";
import { FaBook } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [authAtom, setAuthAtom] = useRecoilState(authState);

  // when sign up button is pressed, verify password and create new user
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    try {
      console.log(email, password);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Signed up user:", user);
      setAuthAtom({
        userID: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        isLoggedIn: true,
      });
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred while signing up. Please try again.");
    }
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen flex items-center justify-center">
      <div className="bg-[#e3e3e3] max-w-[30rem] p-6 rounded-lg flex flex-col items-center">
        <form
          onSubmit={handleSignUp}
          className="flex flex-col items-center px-16 mt-4"
        >
          <div className="flex">
            <FaBook className="mr-2 mt-1 text-red-950 text-2xl" />
            <span className="font-bold text-2xl text-red-950">Textbook Hub</span>
          </div>

          <h1 className="text-2xl font-bold mt-6">Sign Up</h1>

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
          <p className="text-sm text-gray-600">
            Create a password with a length of at least 6 characters.
          </p>

          <input
            type="password"
            className="w-[20rem] bg-[#FFFFFF] h-8 text-black rounded py-5 px-6 mt-2"
            value={password}
            required
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex w-full mt-6">
            <p className="justify-self-start">Verify Password:</p>
          </div>
          <input
            type="password"
            className="w-[20rem] bg-[#FFFFFF] h-8 text-black rounded py-5 px-6 mt-2"
            value={verifyPassword}
            required
            placeholder="Re-enter password"
            onChange={(e) => setVerifyPassword(e.target.value)}
          />
        </form>
        <div className="flex flex-col w-full items-center justify-end space-y-8 mb-4 mt-8">
          <button
            type="submit"
            className="w-fit bg-green-600 hover:bg-green-700 text-white py-2 px-8 rounded-xl mt-"
            onClick={handleSignUp}
          >
            {" "}
            Sign Up
          </button>
          <button
            className="text-black w-fit underline"
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

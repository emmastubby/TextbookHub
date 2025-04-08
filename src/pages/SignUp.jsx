import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/atoms";
import { auth } from "../firebase-config";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [authAtom, setAuthAtom] = useRecoilState(authState);

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
          className="flex flex-col items-center space-y-6 px-16 mt-4"
        >
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <input
            type="email"
            className="w-[20rem] bg-[#FFFFFF] h-8 text-black rounded py-5 px-6"
            value={email}
            required
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-sm text-gray-600">
            Create a password with a length of at least 6 characters.
          </p>

          <input
            type="password"
            className="w-[20rem] bg-[#FFFFFF] h-8 text-black rounded py-5 px-6"
            value={password}
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="w-[20rem] bg-[#FFFFFF] h-8 text-black rounded py-5 px-6"
            value={verifyPassword}
            required
            placeholder="Verify password"
            onChange={(e) => setVerifyPassword(e.target.value)}
          />
        </form>
        <div className="flex flex-col w-full items-center justify-end space-y-8 mb-4 mt-8">
          <button
            type="submit"
            className="w-fit bg-white text-black py-2 px-8 rounded-xl mt-"
            onClick={handleSignUp}
          >
            {" "}
            Sign Up
          </button>
          <button
            className="text-black w-fit underline"
            onClick={() => navigate("/login")}
          >
            Log in instead
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

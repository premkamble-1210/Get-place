import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, database } from "../firebase-config";
import { ref, set, get } from "firebase/database";

function Login({ handleGlobalUser }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [Register, setRegister] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await storeUserData(user);
      setUser(user);
      handleGlobalUser(user);
      navigate("/Home");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  // Register with Email and Password
  const registerWithEmail = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      await storeUserData(user);
      setUser(user);
      handleGlobalUser(user);
      navigate("/Home");
    } catch (error) {
      setError(error.message);
    }
  };

  // Login with Email and Password
  const loginWithEmail = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      handleGlobalUser(result.user);
      navigate("/Home");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  // Store user data in Firebase Realtime Database
  const storeUserData = async (user) => {
    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      await set(userRef, {
        name: user.displayName || "Anonymous",
        email: user.email,
        photo: user.photoURL || null,
        createdAt: new Date().toISOString(),
        relations: [],
      });
    }
  };

  // Logout function
  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      handleGlobalUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Check user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("User state changed:", currentUser);
      setUser(currentUser);
      if (currentUser) {
        handleGlobalUser(currentUser);
        navigate("/Home");
      }
    });
    return () => unsubscribe();
  }, [handleGlobalUser, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#D5E3E7] via-[#EFF3CD] via-[#E4F2F6] to-[#D5E3E7]">
      {user ? (
        <div className="text-center">
          <h2>Welcome, {user.displayName || "User"}</h2>
          {user.photoURL && <img src={user.photoURL} alt="Profile" className="rounded-full w-20 h-20 mt-2" />}
          <p>Email: {user.email}</p>
          <button
            onClick={() => {
              signOut(auth);
              setUser(null);
              handleGlobalUser(null);
            }}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex md:w-[25%] flex-col items-center gap-4 p-10 rounded-2xl border border-gray-300 shadow-2xl bg-white/30 backdrop-blur-lg">
          <h2 className="text-2xl font-semibold text-gray-700">Welcome Back</h2>

          <div className="flex flex-col w-full">
            <label className="text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col w-full relative">
            <label className="text-gray-600 text-sm mb-1">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <i class="fa-solid fa-eye-slash"></i>: <i class="fa-regular fa-eye"></i>}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={() => Register ? registerWithEmail() : loginWithEmail()}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer"
          >
           {Register ? "Register" : "Login"}
          </button>

          <p className="text-gray-600 text-sm">
            {Register ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() => setRegister(!Register)}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              {Register ? "Login" : "Register"}
            </span>
          </p>

          <button
            onClick={() => signInWithGoogle()}
            className="w-full mt-4 px-4 py-2 hover:bg-blue-500 hover:text-white text-black rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <img
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-1024.png"
              alt="Google"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;

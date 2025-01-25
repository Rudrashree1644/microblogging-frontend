import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Post from "./pages/Post";
import "./App.css";
import { auth } from "./firebase"; // Assuming you have Firebase setup

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is logged out
      }
    });

    return () => unsubscribe(); // Clean up subscription on component unmount
  }, []);

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="app">
        {isLoggedIn && <Sidebar />} {/* Show Sidebar only when logged in */}
        <div className="main-content">
          <Routes>
            {/* Conditional rendering for Login and Home based on authentication */}
            <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />
            <Route path="/search" element={isLoggedIn ? <Search /> : <Login />} />
            <Route path="/post" element={isLoggedIn ? <Post /> : <Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

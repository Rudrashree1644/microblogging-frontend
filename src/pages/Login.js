import React, { useState } from "react";
import { auth, provider } from "../firebase"; // Assuming you have Firebase setup
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // for navigation after login
import "./Login.css"; // Import custom styles

const Login = () => {
  const [username, setUsername] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true); // Start loading when Google login is initiated

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const email = result.user.email;

      // Send the ID token to the backend
      const response = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken, email }),
      });

      const data = await response.json();

      setLoading(false); // Stop loading after response is received

      if (data.newUser) {
        setIsNewUser(true); // Set new user state if it's a new user
      } else {
        console.log("Welcome back!");
        navigate("/"); // Redirect to Home after login
      }
    } catch (error) {
      setLoading(false); // Stop loading if error occurs
      console.error("Error during login:", error);
    }
  };

  const handleUsernameSubmit = async () => {
    setLoading(true); // Start loading while submitting the username

    try {
      const response = await fetch("http://localhost:8080/api/auth/username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      setLoading(false); // Stop loading after username is saved

      if (response.ok) {
        console.log("Username saved successfully!");
        navigate("/"); // Redirect to Home after saving the username
      }
    } catch (error) {
      setLoading(false); // Stop loading if error occurs
      console.error("Error saving username:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {loading ? (
          <div className="spinner"></div> // Add spinner instead of text
        ) : (
          <>
            <button className="google-btn" onClick={handleGoogleLogin}>
              Continue with Google
            </button>

            {isNewUser && (
              <div className="username-container">
                <input
                  type="text"
                  placeholder="Enter a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="username-input"
                />
                <button onClick={handleUsernameSubmit} className="submit-btn">
                  Submit Username
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

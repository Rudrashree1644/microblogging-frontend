import React, { useState } from "react";
import { auth, provider } from "../firebase"; // Assuming you have Firebase setup
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // for navigation after login

const Login = () => {
  const [username, setUsername] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
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

      if (data.newUser) {
        setIsNewUser(true);
      } else {
        console.log("Welcome back!");
        navigate("/"); // Redirect to Home after login
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleUsernameSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        console.log("Username saved successfully!");
        navigate("/"); // Redirect to Home after saving the username
      }
    } catch (error) {
      console.error("Error saving username:", error);
    }
  };

  return (
    <div className="login-container">
      <button onClick={handleGoogleLogin}>Continue with Google</button>

      {isNewUser && (
        <div>
          <input
            type="text"
            placeholder="Enter a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleUsernameSubmit}>Submit Username</button>
        </div>
      )}
    </div>
  );
};

export default Login;

// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";  // Import the auth and provider

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJK9GueqCqHmO1VBDtDpo1ZoJtqIdLKg0",
  authDomain: "microblogging-firebase.firebaseapp.com",
  projectId: "microblogging-firebase",
  storageBucket: "microblogging-firebase.firebasestorage.app",
  messagingSenderId: "474113722386",
  appId: "1:474113722386:web:bbd13b9500418b0461b0cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Google Auth Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export auth and provider
export { auth, provider };

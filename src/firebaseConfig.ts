import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  // Import getAuth for Firebase Authentication
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyClQJF-Q7GhV5qHNMpQVxTuiZ4KLUGBiIg",
  authDomain: "back2u-31cc7.firebaseapp.com",
  projectId: "back2u-31cc7",
  storageBucket: "back2u-31cc7.firebasestorage.app",
  messagingSenderId: "903718463686",
  appId: "1:903718463686:web:9de645388861ed5eba8fc7",
  measurementId: "G-MZVFLP0ZMK"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);  // Add this line to initialize and export auth
export const storage = getStorage(app); // Add this line to export storage

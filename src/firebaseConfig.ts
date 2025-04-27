// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously
} from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyClQJF-Q7GhV5qHNMpQVxTuiZ4KLUGBiIg",
  authDomain: "back2u-31cc7.firebaseapp.com",
  projectId: "back2u-31cc7",
  storageBucket: "back2u-31cc7.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "903718463686",
  appId: "1:903718463686:web:9de645388861ed5eba8fc7",
  measurementId: "G-MZVFLP0ZMK"
};

// Initialize Firebase app
export const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// Email/Password Sign Up
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Error signing up with email/password:", error);
    throw error;
  }
};

// Email/Password Sign In
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Error signing in with email/password:", error);
    throw error;
  }
};

// Sign Out
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Anonymous Sign In (with better error handling)
export const signInAnon = async () => {
  try {
    const result = await signInAnonymously(auth);
    console.log("Anonymous auth successful:", result.user);
    return result.user;
  } catch (error: any) {
    console.error("Anonymous sign-in error:", error);
    // Don't throw the error - just return null and handle it gracefully
    return null;
  }
};

// Auth State Observer
export const onAuthStateChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};
// src/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '../App'; // Adjust the path as needed
import { signInAnon, loginWithEmail, signInWithGoogle, signUpWithEmail, logoutUser } from '../firebaseConfig';

export const useAuth = () => {
  const { user, loading } = useContext(AuthContext);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isAnonymous: user?.isAnonymous || false,
    signInAnonymously: signInAnon,
    signInWithEmail: loginWithEmail,
    signInWithGoogle,
    signUpWithEmail,
    logout: logoutUser,
  };
};
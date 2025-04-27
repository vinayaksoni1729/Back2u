import { useEffect, useState, createContext } from "react";
import { auth, onAuthStateChange, signInAnon } from "./firebaseConfig";
import { User } from "firebase/auth";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FoundItems from "./pages/FoundItems";
import ReportFound from "./pages/ReportFound";
import ItemDetail from "./pages/ItemDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

// Create Auth Context
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true
});

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up an auth state observer to track user state
    const unsubscribe = onAuthStateChange((currentUser) => {
      if (currentUser) {
        // User is signed in (could be anonymous or authenticated)
        setUser(currentUser);
        console.log(`✅ User signed in: ${currentUser.uid} (${currentUser.isAnonymous ? 'anonymous' : 'authenticated'})`);
      } else {
        // No user signed in, attempt anonymous login
        console.log("No user detected, signing in anonymously...");
        signInAnon()
          .then((anonUser) => {
            if (anonUser) {
              setUser(anonUser);
              console.log("✅ Signed in anonymously as fallback");
            }
          })
          .catch((error) => {
            console.error("❌ Anonymous sign-in error:", error);
          });
      }
      setLoading(false);
    });

    // Clean up the observer on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/found-items" element={<FoundItems />} />
              <Route path="/report-found" element={<ReportFound />} />
              <Route path="/item/:id" element={<ItemDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};

export default App;
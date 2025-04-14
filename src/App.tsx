import { useEffect } from "react";
import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebaseConfig"; // adjust the path if needed

// ...existing imports
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

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    signInAnonymously(auth)
      .then(() => {
        console.log("✅ Signed in anonymously");
      })
      .catch((error) => {
        console.error("❌ Anonymous sign-in error:", error);
      });
  }, []);

  return (
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

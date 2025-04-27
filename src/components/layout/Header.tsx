import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, X, LogIn, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  
  const getUsernameFromEmail = (email) => {
    if (!email) return "";
    return email.split("@")[0]; // Get everything before @
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Check if user is properly authenticated (not anonymous)
  const isAuthenticated = user && !user.isAnonymous;

  // Redirect unauthenticated users trying to access protected routes
  useEffect(() => {
    if (!loading && !isAuthenticated && window.location.pathname === "/report-found") {
      navigate("/login", { state: { from: "/report-found" } });
    }
  }, [user, loading, navigate]);

  // Add global storage event listener for auth changes in other tabs
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("storage", (event) => {
        if (event.key === "firebase:authUser") {
          // This will force a re-render when auth changes in another tab
          console.log("Auth changed in another tab");
        }
      });
    }
  }, []);

  return (
    <header className="w-full py-4 px-4 md:px-6 shadow-sm bg-white relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700">
            Back2U
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-purple-500 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/found-items"
            className="text-gray-700 hover:text-purple-500 transition-colors"
          >
            Found Items
          </Link>
          {isAuthenticated && (
            <Link
              to="/report-found"
              className="text-gray-700 hover:text-purple-500 transition-colors"
            >
              Report Found
            </Link>
          )}
          <Link
            to="/about"
            className="text-gray-700 hover:text-purple-500 transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Right-side buttons */}
        <div className="flex items-center space-x-4">
          {/* Conditional Login/Signup or User Profile */}
          {!loading && (
            <>
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={toggleProfileMenu}
                    className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden border-2 border-purple-400 hover:border-purple-500 transition-colors"
                    aria-label="User profile"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-purple-600" />
                    )}
                  </button>

                  {/* Profile dropdown menu */}
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      {/* Add this new item to display the username */}
                      <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">
                        {getUsernameFromEmail(user?.email)}
                      </div>
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-600 hover:bg-purple-50"
                  asChild
                >
                  <Link to="/login">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login / Sign Up
                  </Link>
                </Button>
              )}
            </>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed inset-0 z-40 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transform`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-40"
          onClick={toggleMenu}
        />

        {/* Sidebar */}
        <div className="relative bg-white w-64 h-full shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold text-purple-700">Menu</span>
            <button onClick={toggleMenu}>
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-purple-500 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/found-items"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-purple-500 transition-colors"
            >
              Found Items
            </Link>
            <Link
              to="/about"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-purple-500 transition-colors"
            >
              About
            </Link>
            
            {/* Show Report Found only for authenticated users */}
            {isAuthenticated && (
              <Link
                to="/report-found"
                onClick={toggleMenu}
                className="text-purple-600 font-medium"
              >
                Report Found
              </Link>
            )}

            {/* Mobile Login/Profile */}
            {!loading && (
              <>
                {isAuthenticated ? (
                  <>
                    <div className="border-t border-gray-200 my-2 pt-2"></div>
                    <Link
                      to="/dashboard"
                      onClick={toggleMenu}
                      className="text-gray-700 hover:text-purple-500 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={toggleMenu}
                      className="text-gray-700 hover:text-purple-500 transition-colors"
                    >
                      Personal Info
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="text-left text-gray-700 hover:text-purple-500 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className="border-t border-gray-200 my-2 pt-2"></div>
                    <Link
                      to="/login"
                      onClick={toggleMenu}
                      className="flex items-center text-purple-600 font-medium"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login / Sign Up
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
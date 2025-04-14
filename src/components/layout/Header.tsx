
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-4 px-4 md:px-6 shadow-sm bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700">
            Back2U
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-purple-500 transition-colors">
            Home
          </Link>
          <Link to="/found-items" className="text-gray-700 hover:text-purple-500 transition-colors">
            Found Items
          </Link>
          <Link to="/report-found" className="text-gray-700 hover:text-purple-500 transition-colors">
            Report Found
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-purple-500 transition-colors">
            About
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex text-gray-700 hover:text-purple-500">
            <Search className="h-5 w-5" />
          </Button>
          <Button className="bg-purple-500 hover:bg-purple-600 text-white" asChild>
            <Link to="/report-found">Report Found</Link>
          </Button>
        </div>

        {/* Mobile menu button - we'll implement this later */}
        <Button variant="ghost" size="icon" className="md:hidden text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </Button>
      </div>
    </header>
  );
};

export default Header;

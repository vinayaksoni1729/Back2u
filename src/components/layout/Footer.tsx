
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700">
              Back2U
            </h3>
            <p className="text-gray-600">
              Helping people reunite with their lost belongings on campus.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-gray-900 font-medium">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-purple-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/found-items" className="text-gray-600 hover:text-purple-500 transition-colors">
                  Found Items
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-purple-500 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-gray-900 font-medium">Contact</h3>
            <p className="text-gray-600">
              SRMIST Kattankulathur<br />
              Tamil Nadu 603203<br />
              Email: drxrecover@gmail.com
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-center">
            © {new Date().getFullYear()} Back2U. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

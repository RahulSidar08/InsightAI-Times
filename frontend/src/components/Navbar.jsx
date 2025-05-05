import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-blue-700">
          InsightAI <span className="text-gray-800">Times</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors shadow"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col mt-4 space-y-4 md:hidden">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors shadow w-max"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

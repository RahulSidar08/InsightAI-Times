import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <Link to="/" className="text-3xl font-extrabold text-blue-700">
        InsightAI <span className="text-gray-800">Times</span>
      </Link>
      <div className="flex items-center space-x-6">
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
    </nav>
  );
};

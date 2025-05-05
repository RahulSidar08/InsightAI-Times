import React from "react";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-2xl font-bold">InsightAI Times </h1>
        <div className="space-x-4">
          <Link href="#" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/login" className="hover:text-blue-600">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Signup
          </Link>
        </div>
      </nav>
    </>
  );
};

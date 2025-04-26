import React from 'react'
import { Link } from 'react-router-dom';
export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-2xl font-bold">🗞️ NewsDigest</h1>
        <div className="space-x-4">
          <Link href="#" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="#" className="hover:text-blue-600">
            About
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

      {/* Hero */}
      <section className="flex flex-col items-center justify-center flex-grow text-center px-4 py-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Personalized News. Daily. Effortless.
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mb-6">
          Get AI-powered news summaries tailored to your interests — delivered
          straight to your inbox or dashboard.
        </p>
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700"
        >
          Get Started
        </Link>
      </section>

      {/* Features */}
      <section className="bg-white py-12 px-6 md:px-20 grid md:grid-cols-3 gap-6 text-center">
        <div>
          <h3 className="text-xl font-semibold mb-2">🧠 AI Summarized</h3>
          <p>Get quick, concise news summaries powered by GPT.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">🎯 Custom Interests</h3>
          <p>Choose topics you care about — from Tech to Politics.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">📬 Daily Digest</h3>
          <p>Read on your dashboard or receive an email every day.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm py-4 text-gray-500">
        &copy; {new Date().getFullYear()} NewsDigest. All rights reserved.
      </footer>
    </div>
  );
};

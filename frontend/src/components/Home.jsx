import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { Features } from "./Features";
import { Footer } from "./Footer";
export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Navbar />
      {/* Hero */}
      <HeroSection />
      {/* Features */}
      <Features />
      {/* Footer */}
      <Footer />
    </div>
  );
};

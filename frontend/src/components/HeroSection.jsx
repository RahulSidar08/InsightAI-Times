import React from "react";
import { Link } from "react-router-dom";
export const HeroSection = () => {
  return (
    <>
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
    </>
  );
};

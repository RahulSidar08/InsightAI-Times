import React from "react";

export const Features = () => {
  return (
    <>
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
          <p>Read on your dashboard and save it by summarise PDF</p>
        </div>
      </section>
    </>
  );
};

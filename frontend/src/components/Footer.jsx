import React from "react";

export const Footer = () => {
  return (
    <>
      <footer className="text-center text-sm py-4 text-gray-500">
        &copy; {new Date().getFullYear()} NewsDigest. All rights reserved.
      </footer>
    </>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // adjust path if needed

function Navbar() {
  return (
    <div className="grid grid-cols-[25%_75%] h-14">
      {/* Left side with logo and title */}
      <div className="bg-blue-400 flex items-center pl-4">
        <Link to="/" className="flex items-center">
          <img
            className="h-12 w-12 transition-transform duration-300 hover:scale-110"
            src={logo}
            alt="logo"
          />
          <h1 className="text-white font-bold text-2xl pl-2 italic">
            Argonauts
          </h1>
        </Link>
      </div>

      {/* Right side with nav + search */}
      <div className="bg-black flex items-center justify-between px-6">
        {/* Nav links */}
        <div className="flex text-white font-bold text-lg space-x-8">
          <Link to="/dashboard" className="hover:text-blue-400">
          . Dashboard
          </Link>
          <Link to="/about" className="hover:text-blue-400">
          · About Us
          </Link>

          <Link to="/chatbot" className="hover:text-blue-400">
          · ChatBot
          </Link>
          <Link to="/map" className="hover:text-blue-400">
          · Map
          </Link>
        </div>
        <Link to="/howToUse" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition">
          How to use
          </Link>
        {/* Search bar */}

      </div>
    </div>
  );
}

export default Navbar;

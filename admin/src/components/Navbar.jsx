import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(""); // update auth state
    navigate("/login", { replace: true }); // go to login
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between py-4 px-[4%]">
        {/* Logo */}
        <img
          className="w-20 sm:w-24 md:w-28 max-w-[120px] object-contain"
          src={assets.logo}
          alt="Valér Logo"
        />

        {/* Center Title */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-gray-800">
            Admin Panel
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="
            text-sm font-medium tracking-wide
            px-6 py-2 rounded-full
            bg-white text-gray-900
            border border-gray-300
            transition-all duration-200 ease-out
            hover:bg-gray-100 hover:shadow-sm
            active:bg-black active:text-white active:border-black
          "
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;

import React, { useContext, useEffect, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showSearch) inputRef.current?.focus();
  }, [showSearch]);

  if (!showSearch) return null;

  return (
    <div className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
        {/* Back / Close */}
        <button
          onClick={() => {
            setShowSearch(false);
            setSearch("");
          }}
          className="
    px-4 py-1.5
    rounded-full
    border border-gray-300
    text-xs tracking-wide
    text-gray-600
    hover:bg-gray-100 hover:text-black
    transition
  "
        >
          Close
        </button>

        {/* Search Input */}
        <div className="flex-1 flex items-center gap-3 border-b border-gray-300 focus-within:border-black transition">
          <img src={assets.search_icon} alt="" className="w-4 opacity-60" />

          <input
            ref={inputRef}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              // ensure results are visible
              navigate("/collection");
            }}
            type="text"
            placeholder="Search products"
            className="w-full bg-transparent outline-none text-sm sm:text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

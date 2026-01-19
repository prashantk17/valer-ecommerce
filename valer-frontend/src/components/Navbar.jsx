import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const navItems = [
  { name: "HOME", path: "/" },
  { name: "COLLECTION", path: "/collection" },
  { name: "ABOUT", path: "/about" },
  { name: "CONTACT", path: "/contact" },
];

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white border-b">
      {/* ===================== TOP NAV ===================== */}
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between font-medium">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} className="w-32" alt="logo" />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `
                px-4 py-2 rounded-full transition-all duration-200
                ${
                  isActive
                    ? "bg-black text-white shadow-md shadow-black/20"
                    : "text-black hover:bg-white hover:shadow-md hover:shadow-black/20"
                }
                `
              }
            >
              {item.name}
            </NavLink>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-5 cursor-pointer"
            onClick={() => setShowSearch((prev) => !prev)}
          />

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5" alt="cart" />
            <span className="absolute -right-2 -top-2 w-4 h-4 text-[8px] bg-black text-white rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </Link>

          {/* Profile Dropdown (desktop) */}
          <div className="relative group hidden lg:block">
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt="profile"
            />

            <div
              className="
                absolute right-0 top-full mt-3 w-40
                bg-white rounded-lg shadow-lg
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-all duration-200
                z-50
              "
            >
              <ul className="py-2 text-sm text-gray-600">
                <li className="border-t px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  My Profile
                </li>
                <li
                  onClick={() => navigate("/orders")}
                  className="border-t px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Orders
                </li>
                <li
                  onClick={() => navigate("/Login")}
                  className="border-t px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
                <li
                  onClick={() => navigate("/Careers")}
                  className="border-t px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Careers
                </li>
              </ul>
            </div>
          </div>

          {/* Hamburger (tablet & mobile) */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer lg:hidden"
            alt="menu"
          />
        </div>
      </nav>

      {/* ===================== MOBILE SIDEBAR ===================== */}
      <div
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300
        ${visible ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col text-gray-600">
          {/* Back */}
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 border-b cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="back"
            />
            <p>Back</p>
          </div>

          {/* Links */}
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setVisible(false)}
              className="py-3 pl-6 border-b"
            >
              {item.name}
            </NavLink>
          ))}

          {/* Orders */}
          <p
            onClick={() => {
              navigate("/orders");
              setVisible(false);
            }}
            className="py-3 pl-6 border-b cursor-pointer"
          >
            ORDERS
          </p>

          <p className="py-3 pl-6 border-b cursor-pointer">CAREERS</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

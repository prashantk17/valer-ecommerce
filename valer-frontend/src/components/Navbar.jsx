import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Collection", path: "/collection" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { setShowSearch, getCartCount, token, setToken } =
    useContext(ShopContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setShowLogoutModal(false);
    setVisible(false);
    navigate("/login");
  };

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
            {getCartCount() > 0 && (
              <span className="absolute -right-2 -top-2 w-4 h-4 text-[8px] bg-black text-white rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
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
              <ul className="py-2 text-sm text-gray-700">
                <li className="px-4 py-2 text-xs text-gray-400 cursor-default">
                  Account
                </li>

                <li
                  onClick={() => navigate("/orders")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Orders
                </li>

                <li
                  onClick={() => setShowLogoutModal(true)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium"
                >
                  Logout
                </li>

                <li
                  onClick={() => navigate("/careers")}
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
        className={`fixed inset-0 z-50 bg-white transition-all duration-300
  ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}`}
      >
        <div className="flex flex-col h-full px-8 pt-8 text-gray-900">
          {/* Header */}
          <div className="flex items-center justify-between mb-14">
            <img src={assets.logo} className="w-24" alt="logo" />

            <button
              onClick={() => setVisible(false)}
              className="text-xs tracking-widest text-gray-400 hover:text-black transition"
            >
              CLOSE
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-8 text-[15px] tracking-wide">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `block transition ${
                    isActive ? "text-black font-medium" : "text-gray-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Divider */}
          <div className="my-12 h-px bg-gray-200" />

          {/* Account */}
          <div className="space-y-8 text-[15px] tracking-wide">
            <button
              onClick={() => {
                navigate("/orders");
                setVisible(false);
              }}
              className="block text-left text-gray-600 hover:text-black transition"
            >
              Orders
            </button>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="block text-left text-black font-medium"
            >
              Log out
            </button>

            <button
              onClick={() => {
                navigate("/careers");
                setVisible(false);
              }}
              className="block text-left text-gray-600 hover:text-black transition"
            >
              Careers
            </button>
          </div>

          {/* Footer */}
          <div className="mt-auto pb-6 text-[10px] tracking-widest text-gray-400">
            © VALÉR
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[90%] max-w-sm p-6 text-center">
            <h2 className="text-lg font-medium mb-3">Log out of Valér?</h2>

            <p className="text-sm text-gray-500 mb-6">
              You can always sign back in anytime.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 border py-2 rounded-md text-sm hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 bg-black text-white py-2 rounded-md text-sm hover:bg-neutral-900"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

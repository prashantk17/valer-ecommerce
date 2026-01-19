import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-neutral-50 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-14 text-sm">
          {/* Brand */}
          <div>
            <img src={assets.logo} className="mb-6 w-32" alt="Valer logo" />
            <p className="max-w-md text-gray-600 leading-relaxed">
              Crafted silhouettes, refined details, and timeless aesthetics —
              designed for those who value understated elegance.
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="text-base font-medium text-neutral-900 mb-5">
              Company
            </p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li className="hover:text-black cursor-pointer">Home</li>
              <li className="hover:text-black cursor-pointer">About Us</li>
              <li className="hover:text-black cursor-pointer">Delivery</li>
              <li className="hover:text-black cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-base font-medium text-neutral-900 mb-5">
              Customer Support
            </p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li className="hover:text-black cursor-pointer">
                +1-212-456-7890
              </li>
              <li className="hover:text-black cursor-pointer">
                contact@valer.com
              </li>
            </ul>
            <Link to="/careers" className="hover:underline">
              Careers
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-gray-200" />

        {/* Bottom */}
        <p className="py-6 text-center text-xs text-gray-500 tracking-wide">
          © 2026 VALÉR. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

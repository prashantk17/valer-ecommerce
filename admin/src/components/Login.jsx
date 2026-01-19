import React, { useState, useEffect } from "react";
import adminImage from "../assets/admin-model.png";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      if (response.data.success && response.data.token) {
        const token = response.data.token;

        localStorage.setItem("adminToken", token);
        setToken(token);

        navigate("/add", { replace: true });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-neutral-50">
      {/* LEFT — IMAGE (EDITORIAL STYLE) */}
      <div
        className="hidden md:flex items-end bg-cover bg-center relative"
        style={{ backgroundImage: `url(${adminImage})` }}
      >
        <div className="relative p-14 text-white">
          {/* Editorial Accent */}
          <div className="absolute left-8 top-14 h-16 w-px bg-white/40" />

          <p className="ml-6 text-[11px] tracking-[0.5em] uppercase opacity-80">
            Valer Administration
          </p>

          <h2 className="ml-6 mt-4 text-3xl font-extralight leading-snug">
            Crafted Control <br /> For Modern Luxury
          </h2>

          {/* Micro caption */}
          <p className="ml-6 mt-6 text-[10px] tracking-[0.4em] uppercase opacity-60">
            Est. Digital Atelier
          </p>
        </div>
      </div>

      {/* RIGHT — LOGIN */}
      <div className="flex items-center justify-center px-8">
        <div className="w-full max-w-sm bg-white px-12 py-10 border border-neutral-200 shadow-none">
          {/* Header / Branding */}
          <div className="mb-8 text-center">
            {/* LOGO */}
            <img
              src={assets.logo}
              alt="Brand Logo"
              className="mx-auto h-16 md:h-30 object-contain"
            />

            {/* DIVIDER */}
            <div className="mx-auto mt-6 h-px w-12 bg-neutral-300" />

            {/* BRAND TAGLINE */}
            <p className="mt-4 text-[11px] tracking-[0.45em] uppercase text-neutral-500">
              Luxury Fashion House
            </p>

            {/* ADMIN PANEL */}
            <h1 className="mt-8 text-xs tracking-[0.55em] uppercase text-neutral-900">
              Admin Panel
            </h1>

            <p className="mt-3 text-sm text-neutral-500">
              Authorized access only
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="space-y-8">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="peer w-full bg-transparent border-b border-neutral-300
                py-2.5 text-sm tracking-wide text-neutral-900
                outline-none transition-all duration-200
                focus:border-black"
              />

              <label
                className="
                absolute left-0 top-2
                text-xs tracking-widest uppercase
                text-neutral-400/80 transition-all duration-200

                peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-black
                peer-not-placeholder-shown:-top-3
                peer-not-placeholder-shown:text-[10px]
                peer-not-placeholder-shown:text-black
              "
              >
                Email Address
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="peer w-full bg-transparent border-b border-neutral-300
                py-2.5 text-sm tracking-wide text-neutral-900
                outline-none transition-all duration-200
                focus:border-black"
              />

              <label
                className="
                absolute left-0 top-2
                text-xs tracking-widest uppercase
                text-neutral-400/80 transition-all duration-200

                peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-black
                peer-not-placeholder-shown:-top-3
                peer-not-placeholder-shown:text-[10px]
                peer-not-placeholder-shown:text-black
              "
              >
                Password
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="
                mt-6 w-full py-2.5
                text-sm tracking-wide font-medium
                border border-neutral-300
                text-neutral-900
                transition-all duration-200
                hover:border-black hover:bg-black hover:text-white
                active:bg-black active:text-white active:border-black
              "
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

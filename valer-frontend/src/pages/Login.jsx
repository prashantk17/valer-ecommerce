import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";

const Login = () => {
  const [mode, setMode] = useState("login");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "signup") {
      // Simulate successful account creation
      setSuccess(true);

      setTimeout(() => {
        window.location.href = "/collection"; // or "/"
      }, 2000);
    } else {
      // Login flow placeholder
      console.log("Login submitted");
    }
  };

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
      {/* SUCCESS OVERLAY */}
      {success && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
          <div className="text-center">
            <h1 className="prata-regular text-4xl text-black mb-3">
              Welcome to Valér
            </h1>
            <p className="text-sm text-gray-500">
              Your account has been created successfully.
            </p>
          </div>
        </div>
      )}

      {/* IMAGE SIDE */}
      <div
        className="hidden md:block bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1600&q=80)",
        }}
      />

      {/* FORM SIDE */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-sm px-6">
          {/* TOGGLE */}
          <div className="flex border border-gray-300 rounded-full mb-10 overflow-hidden">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`w-1/2 py-2 text-sm transition ${
                mode === "login"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`w-1/2 py-2 text-sm transition ${
                mode === "signup"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* HEADING */}
          <div className="mb-6">
            <h1 className="prata-regular text-4xl text-black mb-2">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm text-gray-500">
              {mode === "login"
                ? "Sign in to continue"
                : "Join Valér for a refined experience"}
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
            />

            <input
              type="password"
              placeholder="Password"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
            />

            {mode === "signup" && (
              <input
                type="password"
                placeholder="Confirm Password"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              />
            )}

            <button
              type="submit"
              className="w-full mt-4 py-3 bg-black text-white text-xs tracking-[0.25em] hover:bg-neutral-900 transition"
            >
              {mode === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
            </button>

            {mode === "login" && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => (window.location.href = "/forgot-password")}
                  className="text-xs text-gray-500 hover:text-black transition"
                >
                  Forgot password?
                </button>
              </div>
            )}
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-6">
            <span className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 tracking-widest">OR</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>

          {/* SOCIAL */}
          <div className="space-y-3">
            <button
              onClick={() =>
                window.open("https://myaccount.google.com/", "_self")
              }
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 text-sm hover:border-black transition"
            >
              <FcGoogle className="text-lg" />
              Continue with Google
            </button>

            <button
              onClick={() =>
                window.open("https://www.facebook.com/login/", "_self")
              }
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 text-sm hover:border-black transition"
            >
              <FaFacebookF className="text-lg" />
              Continue with Facebook
            </button>

            <button
              onClick={() => window.open("https://www.icloud.com/", "_self")}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 text-sm hover:border-black transition"
            >
              <FaApple className="text-lg" />
              Continue with Apple
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

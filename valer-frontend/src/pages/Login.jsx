import { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { backendUrl } from "../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const [mode, setMode] = useState("login");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null); // 👈 response message
  const [messageType, setMessageType] = useState(""); // "error" | "success"

  const { setToken } = useContext(ShopContext);
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    return <Navigate to="/" replace />;
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      if (mode === "signup") {
        const res = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (res.data.success) {
          showSuccessToast("Account created successfully");
          setSuccess(true);

          setTimeout(() => {
            setMode("login"); // 👈 important
            setSuccess(false);
          }, 2000);
        } else {
          showErrorToast(res.data.message || "Signup failed");
        }
      } else {
        const res = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (res.data.success) {
          showSuccessToast("Welcome back");
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          navigate("/collection");
        } else {
          showErrorToast(res.data.message || "Invalid credentials");
        }
      }
    } catch (error) {
      showErrorToast(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  const showSuccessToast = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      style: {
        background: "#000",
        color: "#fff",
        letterSpacing: "0.12em",
        fontSize: "11px",
        textTransform: "uppercase",
      },
    });
  };

  const showErrorToast = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      style: {
        background: "#111",
        color: "#fff",
        letterSpacing: "0.08em",
        fontSize: "11px",
        textTransform: "uppercase",
      },
    });
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
              onClick={() => {
                setMode("login");
                setMessage(null);
              }}
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
              onClick={() => {
                setMode("signup");
                setMessage(null);
              }}
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

          {/* RESPONSE MESSAGE */}
          {message && (
            <div
              className={`mb-4 rounded-md px-4 py-3 text-sm ${
                messageType === "error"
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "bg-green-50 text-green-600 border border-green-200"
              }`}
            >
              {message}
            </div>
          )}

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
            />

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
                  onClick={() => navigate("/forgot-password")}
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

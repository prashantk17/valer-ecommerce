import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import AdminLayout from "./layouts/AdminLayout";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState("");

  // 🔹 Load token ONCE on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // 🔹 Sync token with localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("adminToken", token);
    } else {
      localStorage.removeItem("adminToken");
    }
  }, [token]);

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* LOGIN */}
        <Route
          path="/login"
          element={
            token ? <Navigate to="/" replace /> : <Login setToken={setToken} />
          }
        />

        {/* ADMIN (PROTECTED) */}
        <Route
          path="/"
          element={
            token ? (
              <AdminLayout setToken={setToken} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<List />} />
          <Route path="add" element={<Add />} />
          <Route path="list" element={<List />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

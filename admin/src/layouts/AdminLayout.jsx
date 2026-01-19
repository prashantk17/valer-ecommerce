import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = ({ setToken }) => {
  return (
    <>
      <Navbar setToken={setToken} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-10 py-8">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;

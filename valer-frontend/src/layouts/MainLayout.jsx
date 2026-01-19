import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <SearchBar />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ShopContextProvider from "./context/ShopContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import ScrollToTop from "./ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer
      position="top-right"
      hideProgressBar
      closeButton={false}
      pauseOnHover={false}
      draggable={false}
      toastClassName="couture-toast"
      bodyClassName="couture-toast-body"
    />

    <BrowserRouter>
      <ScrollToTop />
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </BrowserRouter>
  </>
);

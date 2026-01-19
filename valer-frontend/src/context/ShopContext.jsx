import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // CART STATE: { productId: { size: qty } }
  const [cartItems, setCartItems] = useState({});

  /* ---------------- LOAD CART FROM DB ---------------- */

  const loadUserCart = async (userToken) => {
    console.log("🧪 USER TOKEN:", token);
    try {
      const res = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      if (res.data.success) {
        setCartItems(res.data.cartData || {});
        console.log("🛒 CART LOADED FROM DB:", res.data.cartData);
      }
    } catch (error) {
      console.error("Failed to load cart", error);
    }
  };

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = async (productId, size, change = 1) => {
    if (!size) return;

    // Optimistic UI update
    setCartItems((prev) => {
      const updated = { ...prev };

      if (!updated[productId]) updated[productId] = {};
      if (!updated[productId][size]) updated[productId][size] = 0;

      updated[productId][size] += change;

      if (updated[productId][size] <= 0) {
        delete updated[productId][size];
      }

      if (Object.keys(updated[productId]).length === 0) {
        delete updated[productId];
      }

      return updated;
    });

    // Sync with backend
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { productId, size, quantity: change },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (error) {
        console.error(error);
        toast.error("Unable to update cart", {
          theme: "dark",
          autoClose: 2000,
        });
      }
    }
  };

  const clearCart = async () => {
    setCartItems({});
  };

  const getCartCount = () => {
    let total = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        total += cartItems[productId][size];
      }
    }
    return total;
  };

  /* ---------------- PRODUCTS ---------------- */
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    fetchProducts();

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      loadUserCart(storedToken); // ✅ NOW IT WORKS
    }
  }, []);

  return (
    <ShopContext.Provider
      value={{
        products,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        loading,
        cartItems,
        addToCart,
        getCartCount,
        token,
        setToken,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

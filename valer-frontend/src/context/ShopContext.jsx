import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const deliveryFee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const addToCart = (itemId, size, change = 1) => {
    const validSizes = ["S", "M", "L", "XL", "XXL"];

    // ✅ Validate size ONLY when adding
    if (change > 0 && !validSizes.includes(size)) {
      toast.error("Please select a size");
      return;
    }

    setCartItems((prev) => {
      const cartData = structuredClone(prev);

      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }

      cartData[itemId][size] = (cartData[itemId][size] || 0) + change;

      // ✅ Remove size if quantity is 0
      if (cartData[itemId][size] <= 0) {
        delete cartData[itemId][size];
      }

      // ✅ Remove product if no sizes left
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }

      return cartData;
    });

    // ✅ Success toast ONLY for add (+)
    if (change > 0) {
      toast.success("Added to your cart");
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }

    return totalCount;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        currency,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        navigate,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

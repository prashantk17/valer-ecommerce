import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, addToCart, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const temp = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          temp.push({
            _id: productId,
            size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }

    setCartData(temp);
  }, [cartItems]);

  const GST_RATE = 0.18;
  const PLATFORM_FEE = 20;

  const getSubtotal = () => {
    let total = 0;
    cartData.forEach((item) => {
      const product = products.find((p) => p._id === item._id);
      if (product) {
        total += product.price * item.quantity;
      }
    });
    return total;
  };

  const getGST = () => {
    return Math.round(getSubtotal() * GST_RATE);
  };

  const getTotal = () => {
    return getSubtotal() + getGST() + PLATFORM_FEE;
  };

  return (
    <div className="border-t pt-14 px-6 max-w-7xl mx-auto">
      <div className="text-2xl mb-8">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Empty Cart */}
      {cartData.length === 0 && (
        <div className="py-28 flex flex-col items-center text-center text-gray-600">
          <p className="text-2xl font-medium tracking-wide text-black">
            Your cart is empty
          </p>

          <p className="text-base mt-4 max-w-sm leading-relaxed">
            Looks like you haven’t added anything yet.
          </p>

          <Link
            to="/collection"
            className=" mt-10 inline-flex items-center justify-center
    px-8 py-3
    text-sm tracking-wide text-black
    border border-black
    transition
    hover:bg-black hover:text-white"
          >
            Continue browsing
          </Link>
        </div>
      )}

      {/* Cart items */}
      <div className="flex flex-col gap-6">
        {cartData.map((item, index) => {
          const product = products.find((p) => p._id === item._id);

          if (!product) return null;

          return (
            <div
              key={index}
              className="grid grid-cols-[4fr_1fr_1fr] sm:grid-cols-[4fr_2fr_1fr] gap-4 items-center border-b pb-6"
            >
              {/* Product */}
              <div className="flex gap-5">
                <img
                  src={product.image[0]}
                  className="w-16 sm:w-20"
                  alt={product.name}
                />
                <div>
                  <p className="text-sm sm:text-base font-medium">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Size: {item.size}
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => addToCart(item._id, item.size, -1)}
                  className="w-6 h-6 border text-sm"
                >
                  −
                </button>
                <span className="text-sm">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item._id, item.size)}
                  className="w-6 h-6 border text-sm"
                >
                  +
                </button>
              </div>

              {/* Price */}
              <p className="text-sm text-right">
                {currency}
                {product.price * item.quantity}
              </p>
            </div>
          );
        })}
      </div>

      {/* PRICE SUMMARY */}
      {cartData.length > 0 && (
        <div className="mt-12 flex justify-end">
          <div className="w-full sm:w-96 border-t pt-6 text-sm">
            <div className="flex justify-between mb-3">
              <span className="text-gray-500">Subtotal</span>
              <span>
                {currency}
                {getSubtotal()}
              </span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-gray-500">GST (18%)</span>
              <span>
                {currency}
                {getGST()}
              </span>
            </div>

            <div className="flex justify-between mb-4">
              <span className="text-gray-500">Platform fee</span>
              <span>
                {currency}
                {PLATFORM_FEE}
              </span>
            </div>

            <div className="flex justify-between font-medium text-base border-t pt-4">
              <span>Total (Estimated)</span>
              <span>
                {currency}
                {getTotal()}
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Shipping charges calculated at checkout
            </p>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-6 py-3 bg-black text-white text-sm tracking-wide"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { backendUrl } from "../config";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart, token } = useContext(ShopContext);

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const { address, cartItems, pricing } = location.state || {};

  /* ---------- GUARD ---------- */
  useEffect(() => {
    if (!address || !cartItems || !pricing) {
      navigate("/", { replace: true });
    }
  }, [address, cartItems, pricing, navigate]);

  if (!address || !cartItems || !pricing) {
    return <div className="p-10 text-center">Redirecting...</div>;
  }

  /* ---------- CART OBJECT → ARRAY ---------- */
  const formattedCartData = [];

  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      const quantity = cartItems[productId][size];
      if (quantity > 0) {
        formattedCartData.push({
          id: productId,
          size,
          quantity,
        });
      }
    }
  }

  console.log("✅ FORMATTED CART:", formattedCartData);

  /* ---------- PLACE ORDER ---------- */
  const placeOrderHandler = async () => {
    if (formattedCartData.length === 0) {
      alert("Cart empty");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        cartData: formattedCartData,
        address,
        pricing,
      };

      if (paymentMethod === "COD") {
        const res = await axios.post(`${backendUrl}/api/order/place`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          clearCart();
          navigate("/order-success");
        }
      }

      if (paymentMethod === "Stripe") {
        const res = await axios.post(
          `${backendUrl}/api/order/stripe`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.data.success) {
          window.location.href = res.data.session_url;
        }
      }
    } catch (err) {
      console.error("❌ PLACE ORDER ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto px-6 pt-16 pb-24">
        <CheckoutSteps step={2} />

        {/* Title */}
        <h1 className="text-2xl font-medium tracking-wide mt-10 mb-2">
          Payment
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          Choose your preferred payment method
        </p>

        {/* Payment Methods */}
        <div className="space-y-4">
          {/* COD */}
          <label
            className={`group flex items-center justify-between border rounded-lg px-5 py-4 cursor-pointer transition
            ${
              paymentMethod === "COD"
                ? "border-black"
                : "border-gray-200 hover:border-gray-400"
            }
          `}
          >
            <div className="flex items-center gap-4">
              <span
                className={`h-4 w-4 rounded-full border flex items-center justify-center
                ${paymentMethod === "COD" ? "border-black" : "border-gray-300"}
              `}
              >
                {paymentMethod === "COD" && (
                  <span className="h-2 w-2 rounded-full bg-black" />
                )}
              </span>

              <div>
                <p className="text-sm font-medium">Cash on Delivery</p>
                <p className="text-xs text-gray-500">
                  Pay when your order arrives
                </p>
              </div>
            </div>

            <input
              type="radio"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
              className="hidden"
            />
          </label>

          {/* STRIPE */}
          <label
            className={`group flex items-center justify-between border rounded-lg px-5 py-4 cursor-pointer transition
            ${
              paymentMethod === "Stripe"
                ? "border-black"
                : "border-gray-200 hover:border-gray-400"
            }
          `}
          >
            <div className="flex items-center gap-4">
              <span
                className={`h-4 w-4 rounded-full border flex items-center justify-center
                ${
                  paymentMethod === "Stripe"
                    ? "border-black"
                    : "border-gray-300"
                }
              `}
              >
                {paymentMethod === "Stripe" && (
                  <span className="h-2 w-2 rounded-full bg-black" />
                )}
              </span>

              <div>
                <p className="text-sm font-medium">Card / UPI / Net Banking</p>
                <p className="text-xs text-gray-500">Secure online payment</p>
              </div>
            </div>

            <input
              type="radio"
              checked={paymentMethod === "Stripe"}
              onChange={() => setPaymentMethod("Stripe")}
              className="hidden"
            />
          </label>
        </div>

        {/* CTA */}
        <button
          disabled={loading}
          onClick={placeOrderHandler}
          className="mt-12 w-full bg-black text-white py-4 text-sm tracking-widest rounded-lg
                   hover:bg-gray-900 transition disabled:opacity-50"
        >
          {loading
            ? "PROCESSING"
            : paymentMethod === "COD"
              ? "PLACE ORDER"
              : "CONTINUE TO PAYMENT"}
        </button>

        {/* Footer Note */}
        <p className="mt-4 text-center text-xs text-gray-400">
          All transactions are encrypted & secure
        </p>
      </div>
    </div>
  );
};

export default Payment;

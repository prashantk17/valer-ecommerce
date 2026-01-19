import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";

/* Simple country list (extend later if needed) */
const COUNTRIES = [
  { name: "India", code: "+91" },
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
];

const Checkout = () => {
  const { products, cartItems, currency } = useContext(ShopContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    email: "",
    country: "India",
    countryCode: "+91",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  /* Build cart data */
  const cartData = [];
  for (const id in cartItems) {
    for (const size in cartItems[id]) {
      cartData.push({
        id,
        size,
        quantity: cartItems[id][size],
      });
    }
  }

  /* Guard: prevent blank checkout */
  if (cartData.length === 0) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  /* Pricing */
  const subtotal = cartData.reduce((acc, item) => {
    const product = products.find((p) => p._id === item.id);
    return acc + product.price * item.quantity;
  }, 0);

  const gst = Math.round(subtotal * 0.18);
  const PLATFORM_FEE = 20;
  const total = subtotal + gst + PLATFORM_FEE;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payment");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-14">
      {/* Steps */}
      <CheckoutSteps step={1} />

      <div className="grid md:grid-cols-2 gap-16">
        {/* ================= ADDRESS ================= */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-medium mb-2">Shipping Address</h2>

          <input
            required
            placeholder="Full Name"
            className="w-full border px-4 py-3 text-sm rounded-md"
            value={address.name}
            onChange={(e) =>
              setAddress({ ...address, name: e.target.value })
            }
          />

          <input
            required
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-3 text-sm rounded-md"
            value={address.email}
            onChange={(e) =>
              setAddress({ ...address, email: e.target.value })
            }
          />

          {/* Country + Phone */}
          <div className="grid grid-cols-3 gap-4">
            <select
              className="col-span-1 border px-4 py-3 text-sm rounded-md bg-white"
              value={address.country}
              onChange={(e) => {
                const selected = COUNTRIES.find(
                  (c) => c.name === e.target.value
                );
                setAddress({
                  ...address,
                  country: selected.name,
                  countryCode: selected.code,
                });
              }}
            >
              {COUNTRIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            <div className="col-span-2 flex border rounded-md overflow-hidden">
              <span className="px-4 py-3 text-sm text-gray-500 bg-gray-50 border-r">
                {address.countryCode}
              </span>
              <input
                type="tel"
                required
                placeholder="Phone number"
                className="flex-1 px-4 py-3 text-sm outline-none"
                value={address.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
              />
            </div>
          </div>

          <input
            required
            placeholder="Address"
            className="w-full border px-4 py-3 text-sm rounded-md"
            value={address.address}
            onChange={(e) =>
              setAddress({ ...address, address: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              required
              placeholder="City"
              className="border px-4 py-3 text-sm rounded-md"
              value={address.city}
              onChange={(e) =>
                setAddress({ ...address, city: e.target.value })
              }
            />

            <input
              required
              placeholder="Pincode"
              className="border px-4 py-3 text-sm rounded-md"
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-black text-white py-3 text-sm tracking-wide rounded-md hover:bg-gray-900 transition"
          >
            CONTINUE TO PAYMENT
          </button>
        </form>

        {/* ================= SUMMARY ================= */}
        <div className="border rounded-md p-6 text-sm h-fit">
          <h2 className="font-medium mb-4">Order Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>
                {currency}
                {subtotal}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">GST (18%)</span>
              <span>
                {currency}
                {gst}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Platform fee</span>
              <span>
                {currency}
                {PLATFORM_FEE}
              </span>
            </div>

            <div className="flex justify-between font-medium border-t pt-4">
              <span>Total</span>
              <span>
                {currency}
                {total}
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Shipping & COD charges calculated at payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

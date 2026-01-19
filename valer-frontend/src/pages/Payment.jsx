import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const COD_FEE = 50;

  return (
    <div className="max-w-xl mx-auto px-6 pt-14 text-sm">
      <CheckoutSteps step={2} />

      <h2 className="text-lg font-medium mb-6">Select Payment Method</h2>

      <div className="space-y-4">
        <label className="flex items-center justify-between border p-4 cursor-pointer">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            Cash on Delivery
          </div>

          <span className="text-xs text-gray-500">+ ₹50</span>
        </label>

        <label className="flex items-center gap-3 border p-4 opacity-50">
          <input type="radio" disabled />
          Online Payment (Coming soon)
        </label>
      </div>

      <button
        onClick={() => navigate("/success")}
        className="mt-8 w-full bg-black text-white py-3"
      >
        PLACE ORDER
      </button>
      <>
        <p className="text-xs text-gray-600 mt-2">
          Cash on Delivery fee may apply
        </p>
      </>
    </div>
  );
};

export default Payment;

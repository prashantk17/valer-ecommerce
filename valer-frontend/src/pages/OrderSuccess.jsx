import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/orders");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-light tracking-wide">Order Placed</h1>

      <p className="text-sm text-gray-500 mt-3 max-w-sm">
        Thank you for shopping with us. Your order has been confirmed.
      </p>

      <Link
        to="/orders"
        className="
          mt-10 px-10 py-3
          border border-black
          text-xs tracking-[0.3em] uppercase
          hover:bg-black hover:text-white
          transition
        "
      >
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;

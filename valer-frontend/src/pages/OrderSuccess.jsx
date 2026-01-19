import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-medium">Order Placed</h1>
      <p className="text-sm text-gray-500 mt-3">
        Thank you for shopping with us.
      </p>

      <Link
        to="/orders"
        className="mt-8 px-8 py-3 border border-black text-sm hover:bg-black hover:text-white transition"
      >
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;

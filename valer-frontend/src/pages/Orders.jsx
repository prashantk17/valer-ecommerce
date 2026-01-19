import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  // Mock order date (today)
  const orderDate = new Date();

  const formatDate = (date) =>
    date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const getEstimatedDelivery = (date) => {
    const start = new Date(date);
    const end = new Date(date);

    start.setDate(start.getDate() + 4);
    end.setDate(end.getDate() + 6);

    return `${formatDate(start)} – ${formatDate(end)}`;
  };

  return (
    <div className="border-t pt-16 max-w-7xl mx-auto px-6">
      <div className="text-2xl mb-10">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="space-y-6">
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="border rounded-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            {/* LEFT */}
            <div className="flex gap-6">
              <img
                className="w-16 sm:w-20"
                src={item.image[0]}
                alt={item.name}
              />

              <div className="text-sm">
                <p className="text-base font-medium">{item.name}</p>

                <div className="flex gap-4 mt-2 text-gray-600">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Qty: 1</p>
                  <p>Size: M</p>
                </div>

                <p className="mt-2 text-gray-400">
                  Ordered on {formatDate(orderDate)}
                </p>

                <p className="mt-1 text-gray-600">
                  Estimated delivery:{" "}
                  <span className="font-medium">
                    {getEstimatedDelivery(orderDate)}
                  </span>
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-between md:justify-end gap-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Ready to ship</span>
              </div>

              <button
                className="border px-4 py-2 text-sm rounded-md hover:bg-black hover:text-white transition"
                disabled
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          to="/collection"
          className="
      inline-flex items-center justify-center
      px-8 py-3
      text-sm tracking-wide text-black
      border border-black
      rounded-md
      transition
      hover:bg-black hover:text-white
    "
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default Orders;

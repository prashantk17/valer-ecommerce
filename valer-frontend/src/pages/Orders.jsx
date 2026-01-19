import { useContext, useEffect, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendUrl, currency } from "../config";

const Orders = () => {
  const { token } = useContext(ShopContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [trackingOrderId, setTrackingOrderId] = useState(null);
  const [confirmingOrderId, setConfirmingOrderId] = useState(null);

  /* ---------------- HELPERS ---------------- */

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
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

  /* ---------------- FETCH ORDERS ---------------- */

  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/order/userorders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        setOrders(res.data.orders);
      }
      console.log(
        "🧪 ALL ORDER STATUSES:",
        res.data.orders.map((o) => o.status),
      );
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  /* ---------------- CANCEL ORDER ---------------- */

  const cancelOrderHandler = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/order/cancel`,
        { orderId: confirmingOrderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        await fetchOrders();
      }
    } catch (err) {
      console.error("Cancel order error:", err);
    } finally {
      setConfirmingOrderId(null);
    }
  };

  /* ---------------- TOTAL ---------------- */

  const totalOrdersAmount = useMemo(() => {
    return orders.reduce((sum, o) => sum + (o.pricing?.total || 0), 0);
  }, [orders]);

  /* ---------------- UI ---------------- */

  return (
    <div className="border-t pt-16 max-w-7xl mx-auto px-6">
      <div className="text-3xl mb-12 text-center">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet</p>
      ) : (
        <>
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="relative border rounded-lg bg-white p-6 space-y-6"
              >
                {/* HEADER */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      Order placed on{" "}
                      <span className="text-gray-600">
                        {formatDate(order.createdAt)}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Order ID · {order._id.slice(-6).toUpperCase()}
                    </p>
                  </div>

                  <p className="text-base font-semibold">
                    {currency}
                    {order.pricing?.total}
                  </p>
                </div>

                {/* ITEMS */}
                <div className="space-y-4">
                  {order.items.map((item) => {
                    const product = item.productId;

                    return (
                      <div key={item._id} className="flex gap-4">
                        <img
                          className="w-16 h-20 object-cover"
                          src={product?.images?.[0]}
                          alt={product?.name}
                        />

                        <div className="text-sm">
                          <p className="font-medium">{product?.name}</p>
                          <div className="flex gap-4 text-gray-600 mt-1">
                            <p>
                              {currency}
                              {product?.price}
                            </p>
                            <p>Qty: {item.quantity}</p>
                            <p>Size: {item.size}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-600"
                          : order.status === "Out for delivery"
                            ? "bg-blue-500"
                            : order.status === "Packing"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                      }`}
                    />
                    <span className="capitalize font-medium">
                      {order.status}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        setTrackingOrderId(
                          trackingOrderId === order._id ? null : order._id,
                        )
                      }
                      className="text-sm border px-4 py-2 rounded-md hover:bg-gray-100 transition"
                    >
                      Track Order
                    </button>

                    {(order.status === "Order Placed" ||
                      order.status === "Packing" ||
                      order.status === "Out for delivery" ||
                      order.status === "Shipping") && (
                      <button
                        onClick={() => setConfirmingOrderId(order._id)}
                        className="text-sm border border-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>

                {/* TRACKING OVERLAY */}
                {trackingOrderId === order._id && (
                  <div className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-4 shadow-sm">
                    <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">
                      Order Tracking
                    </p>

                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-600"
                            : order.status === "Out for delivery"
                              ? "bg-blue-500"
                              : order.status === "Packing"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                        }`}
                      />
                      <span className="text-sm font-medium capitalize">
                        {order.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600">
                      Estimated delivery{" "}
                      <span className="font-medium">
                        {getEstimatedDelivery(order.createdAt)}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="mt-12 text-center text-lg">
            <span className="text-gray-600 mr-2">Total Orders Amount:</span>
            <span className="font-semibold">
              {currency}
              {totalOrdersAmount}
            </span>
          </div>
        </>
      )}

      <div className="mt-12 text-center">
        <Link
          to="/collection"
          className="inline-flex items-center justify-center px-8 py-3 text-sm tracking-wide text-black border border-black rounded-md transition hover:bg-black hover:text-white"
        >
          Continue shopping
        </Link>
      </div>

      {/* CANCEL CONFIRM MODAL */}
      {confirmingOrderId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setConfirmingOrderId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[90%] max-w-sm bg-white rounded-2xl shadow-xl px-6 py-6 text-center"
          >
            <p className="text-lg font-medium">Cancel this order?</p>
            <p className="text-sm text-gray-500 mt-2">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmingOrderId(null)}
                className="flex-1 py-2 rounded-lg border text-sm hover:bg-gray-100"
              >
                Keep Order
              </button>

              <button
                onClick={cancelOrderHandler}
                className="flex-1 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-900"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;

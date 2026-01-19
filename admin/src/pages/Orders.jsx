import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = () => {
  const token = localStorage.getItem("adminToken");
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.patch(
        backendUrl + "/api/order/status",
        { orderId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        // update UI immediately (no refetch needed)
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status } : order,
          ),
        );
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-8">
      <h3 className="mb-8 text-xs tracking-[0.5em] uppercase text-neutral-500">
        Orders
      </h3>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div key={index} className="border border-neutral-200 bg-white p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <img
                  className="w-8 h-8 bg-black p-1"
                  src={assets.parcel_icon}
                  alt="parcel"
                />
                <p className="text-sm font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>
              </div>

              <p className="text-base font-semibold text-black">
                {currency} {order.pricing.total}
              </p>
            </div>

            {/* BODY */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-neutral-700">
              {/* ITEMS */}
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-neutral-400">
                  Items
                </p>
                {order.items.map((item, i) => (
                  <p key={i}>
                    {item.productId?.name} × {item.quantity}
                    <span className="text-neutral-400"> ({item.size})</span>
                  </p>
                ))}
              </div>

              {/* ADDRESS */}
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-neutral-400">
                  Shipping
                </p>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country} – {order.address.pincode}
                </p>
                <p className="mt-1">{order.address.phone}</p>
              </div>

              {/* META */}
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-neutral-400">
                  Details
                </p>
                <p>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment Status: {order.payment ? "Paid" : "Pending"}</p>
                <p>
                  Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-6 flex items-center justify-between">
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                disabled={order.status === "Cancelled"}
                className="border border-neutral-300 px-3 py-2 text-sm outline-none disabled:opacity-50"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipping">Shipping</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <p className="text-xs tracking-widest uppercase text-neutral-400">
                Order #{index + 1}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

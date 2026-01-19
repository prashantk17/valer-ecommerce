import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [confirmId, setConfirmId] = useState(null);

  const fetchList = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        setList(res.data.products);
      }
    } catch {
      toast.error("Failed to load products");
    }
  };

  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRemoveClick = (id) => {
    setConfirmId(id);
  };

  const confirmRemove = async () => {
    if (!confirmId) return;

    const id = confirmId;
    setConfirmId(null); // close popup first
    await removeProduct(id);
  };

  const cancelRemove = () => {
    setConfirmId(null);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-light tracking-wide">
          Product Collection
        </h1>
      </div>

      {/* Header */}
      <div className="hidden md:grid grid-cols-[120px_3fr_1fr_1fr_80px] pb-4 border-b text-xs uppercase tracking-widest text-gray-500">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-right">Action</span>
      </div>

      {/* List */}
      <div className="divide-y">
        {list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[120px_3fr_1fr_1fr_80px] items-center py-6 hover:bg-gray-50/40 transition"
          >
            <img
              src={item.images?.[0]}
              alt={item.name}
              className="w-20 h-28 object-cover rounded-lg grayscale hover:grayscale-0 transition duration-300"
            />

            <div>
              <p className="text-base font-light tracking-wide">{item.name}</p>
              <p className="text-xs text-gray-400 mt-1">{item.subCategory}</p>
            </div>

            <p className="text-sm text-gray-600">{item.category}</p>

            <p className="text-sm text-gray-800">
              {currency}
              {item.price}
            </p>

            <button
              onClick={() => handleRemoveClick(item._id)}
              className="text-xs uppercase tracking-widest text-gray-400 hover:text-black transition text-right"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <p className="text-center text-gray-400 text-sm py-20">
          No products available
        </p>
      )}

      {/* Confirmation Popup */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white w-[90%] max-w-sm rounded-xl p-6 shadow-xl animate-fadeIn">
            <h2 className="text-lg font-light tracking-wide mb-2">
              Remove product
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              This item will be permanently removed from your collection.
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={cancelRemove}
                className="text-sm text-gray-500 hover:text-black transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmRemove}
                className="text-sm text-gray-500 hover:text-black transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default List;

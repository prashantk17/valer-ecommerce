import { useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";

const MAX_IMAGES = 4;
const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL"];

const DEV_MODE = false; // 🔓 set false when backend auth is ready

const Add = () => {
  /* ---------------- STATE ---------------- */

  const [status, setStatus] = useState({
    type: "", // "error" | "success"
    message: "",
  });

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
  });

  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) return;

    setImages((prev) => [...prev, ...files.slice(0, remaining)]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic frontend validation (keep this)
    if (!images.length) {
      return setStatus({
        type: "error",
        message: "Please upload at least one product image.",
      });
    }

    if (!sizes.length) {
      return setStatus({
        type: "error",
        message: "Please select at least one size.",
      });
    }

    /* ================= DEV MODE (FRONTEND LEASE) ================= */
    if (DEV_MODE) {
      setLoading(true);

      // simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      setLoading(false);
      setStatus({
        type: "success",
        message: "Product added successfully (DEV MODE).",
      });

      // reset form (same as real success)
      setProduct({
        name: "",
        description: "",
        price: "",
        category: "Men",
        subCategory: "Topwear",
      });
      setImages([]);
      setSizes([]);
      setBestseller(false);

      return; // ⛔ VERY IMPORTANT
    }
    /* ============================================================= */

    // 🔒 REAL BACKEND CODE (will run later)
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("subCategory", product.subCategory);
      formData.append("bestseller", bestSeller);

      sizes.forEach((size) => formData.append("sizes", size));
      images.forEach((image) => formData.append("images", image));

      const token = localStorage.getItem("adminToken");

      await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStatus({
        type: "success",
        message: "Product added successfully.",
      });

      // 🔄 reset form AFTER success only
      setProduct({
        name: "",
        description: "",
        price: "",
        category: "Men",
        subCategory: "Topwear",
      });
      setImages([]);
      setSizes([]);
      setBestseller(false);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "You are not authorized to perform this action.",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl space-y-6 text-sm"
    >
      {/* IMAGE UPLOAD */}
      <div>
        <p className="mb-2 font-medium">Product Images</p>

        <div className="flex gap-3 flex-wrap">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(img)}
                alt=""
                className="w-24 h-32 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white text-xs rounded-full"
              >
                ×
              </button>
            </div>
          ))}

          {images.length < MAX_IMAGES && (
            <label className="w-24 h-32 flex items-center justify-center border rounded-md cursor-pointer hover:bg-gray-50 transition">
              <img src={assets.upload_area} className="w-8 opacity-70" />
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
      </div>

      {/* PRODUCT NAME */}
      <div>
        <p className="mb-2 font-medium">Product Name</p>
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          required
          placeholder="Minimal Wool Coat"
          className="w-full border px-4 py-2 rounded-md focus:ring-1 focus:ring-black"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <p className="mb-2 font-medium">Description</p>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
          placeholder="Crafted with precision and timeless elegance..."
          className="w-full border px-4 py-2 rounded-md min-h-[120px]"
        />
      </div>

      {/* CATEGORY + PRICE */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        >
          <option>Men</option>
          <option>Women</option>
          <option>Kids</option>
        </select>

        <select
          name="subCategory"
          value={product.subCategory}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        >
          <option>Topwear</option>
          <option>Bottomwear</option>
          <option>Winterwear</option>
        </select>

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="border px-3 py-2 rounded-md"
        />
      </div>

      {/* SIZES */}
      <div>
        <p className="mb-2 font-medium">Available Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {AVAILABLE_SIZES.map((size) => (
            <button
              type="button"
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-4 py-1 rounded-full border transition ${
                sizes.includes(size)
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* BESTSELLER */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={bestSeller}
          onChange={() => setBestseller((prev) => !prev)}
        />
        <label className="cursor-pointer">Mark as Best Seller</label>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 bg-black text-white px-10 py-3 rounded-full tracking-wide hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "ADDING..." : "ADD PRODUCT"}
      </button>
      {status.message && (
        <div
          className={`rounded-md px-4 py-3 text-sm border flex items-center gap-2
    ${
      status.type === "error"
        ? "bg-red-50 text-red-600 border-red-200"
        : "bg-green-50 text-green-700 border-green-200"
    }`}
        >
          <span className="font-medium">
            {status.type === "success" ? "Success" : "Error"}
          </span>
          <span>{status.message}</span>
        </div>
      )}
    </form>
  );
};

export default Add;

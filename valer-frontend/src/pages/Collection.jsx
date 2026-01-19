import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import SkeletonProduct from "../components/SkeletonProduct";

const PRICE_RANGES = [
  { label: "Under ₹150", min: 0, max: 149 },
  { label: "₹150 – ₹250", min: 150, max: 250 },
  { label: "Above ₹250", min: 251, max: Infinity },
];

const Collection = () => {
  const { products, search, loading } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [price, setPrice] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  /* ---------------- Toggle Helpers ---------------- */

  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const toggleSubCategory = (value) => {
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const togglePrice = (value) => {
    setPrice((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  /* ---------------- Filtering Logic ---------------- */

  useEffect(() => {
    let temp = [...products];

    // Category
    if (category.length > 0) {
      temp = temp.filter((p) => category.includes(p.category));
    }

    // SubCategory
    if (subCategory.length > 0) {
      temp = temp.filter((p) => subCategory.includes(p.subCategory));
    }

    if (search && search.trim() !== "") {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Price
    if (price.length > 0) {
      temp = temp.filter((p) =>
        PRICE_RANGES.some(
          (range) =>
            price.includes(range.label) &&
            p.price >= range.min &&
            p.price <= range.max,
        ),
      );
    }

    // Sorting
    if (sortType === "low-high") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      temp.sort((a, b) => b.price - a.price);
    }
    // "relevant" → keep original order

    setFilterProducts(temp);
  }, [products, category, subCategory, price, search, sortType]);

  console.log("PRODUCTS:", products.length);
  console.log("FILTERED:", filterProducts.length);

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* FILTER SIDEBAR */}
          <aside className="lg:w-64 w-full">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="lg:hidden w-full flex items-center justify-between py-3 border-b text-sm font-medium"
            >
              Filters
              <img
                src={assets.dropdown_icon}
                alt=""
                className={`h-3 transition-transform ${
                  showFilter ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`mt-8 space-y-10 ${
                showFilter ? "block" : "hidden"
              } lg:block`}
            >
              {/* Category */}
              <div>
                <p className="mb-4 text-xs uppercase tracking-widest text-gray-500">
                  Categories
                </p>
                {["Men", "Women", "Kids"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 cursor-pointer text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={category.includes(item)}
                      onChange={() => toggleCategory(item)}
                      className="accent-black w-4 h-4 appearance-auto"
                    />
                    {item}
                  </label>
                ))}
              </div>

              {/* Type */}
              <div>
                <p className="mb-4 text-xs uppercase tracking-widest text-gray-500">
                  Type
                </p>
                {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 cursor-pointer text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={subCategory.includes(item)}
                      onChange={() => toggleSubCategory(item)}
                      className="accent-black w-4 h-4 appearance-auto"
                    />
                    {item}
                  </label>
                ))}
              </div>

              {/* Price */}
              <div>
                <p className="mb-4 text-xs uppercase tracking-widest text-gray-500">
                  Price
                </p>
                {PRICE_RANGES.map(({ label }) => (
                  <label
                    key={label}
                    className="flex items-center gap-3 cursor-pointer text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={price.includes(label)}
                      onChange={() => togglePrice(label)}
                      className="accent-black w-4 h-4 appearance-auto"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* PRODUCTS */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-10">
              <Title text1="All" text2="Collections" />

              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="
      border border-gray-300
      text-xs tracking-wide
      px-4 py-2
      rounded-full
      focus:outline-none
      bg-white
    "
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonProduct key={i} />
                  ))
                : filterProducts.map((item) => (
                    <ProductItem
                      key={item._id}
                      id={item._id}
                      name={item.name}
                      price={item.price}
                      image={item.images?.[0]}
                    />
                  ))}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Collection;

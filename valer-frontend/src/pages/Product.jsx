import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(""); // FIX
  const [activeTab, setActiveTab] = useState("description");

  /* Scroll on product change */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  /* Load product & reset size */
  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
      setSelectedSize(""); // RESET size
    }
  }, [productId, products]);

  /* Toggle size */
  const handleSizeClick = (size) => {
    setSelectedSize((prev) => (prev === size ? "" : size));
  };

  if (!productData) return null;

  return (
    <section className="border-t pt-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* ---------- PRODUCT TOP ---------- */}
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Images */}
          <div className="flex-1 flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
              {productData.image.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  onClick={() => setImage(item)}
                  alt=""
                  className={`w-24 h-24 object-cover rounded-md cursor-pointer transition
                    ${
                      item === image
                        ? "ring-1 ring-black"
                        : "opacity-60 hover:opacity-100"
                    }`}
                />
              ))}
            </div>

            <div className="flex-1">
              <img src={image} alt="" className="w-full rounded-lg" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-light tracking-wide">
              {productData.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-3 opacity-70">
              {[...Array(4)].map((_, i) => (
                <img key={i} src={assets.star_icon} className="w-3" />
              ))}
              <img src={assets.star_dull_icon} className="w-3" />
              <span className="ml-2 text-xs">(122)</span>
            </div>

            {/* Price */}
            <p className="mt-6 text-2xl font-medium">
              {currency}
              {productData.price}
            </p>

            {/* Description */}
            <p className="mt-6 text-gray-500 leading-relaxed max-w-md">
              {productData.description}
            </p>

            {/* Size Selector */}
            <div className="mt-10">
              <p className="text-sm mb-3">Select Size</p>
              <div className="flex gap-3">
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeClick(size)}
                    className={`px-4 py-2 text-sm rounded-md border transition
                      ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:border-black"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(productData._id, selectedSize)}
              className="mt-10 px-12 py-3 bg-black text-white text-sm tracking-wide
                hover:bg-gray-900 transition rounded-md"
            >
              ADD TO CART
            </button>
            {/* Meta */}
            <div className="mt-8 text-xs text-gray-400 leading-relaxed">
              <p>100% Original product.</p>
              <p>Cash on delivery available.</p>
              <p>7-day easy return & exchange.</p>
            </div>
          </div>
        </div>

        {/* ---------- DESCRIPTION / REVIEWS ---------- */}
        <div className="mt-24">
          <div className="flex gap-10 border-b mb-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-3 text-sm transition ${
                activeTab === "description"
                  ? "border-b-2 border-black"
                  : "text-gray-400"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 text-sm transition ${
                activeTab === "reviews"
                  ? "border-b-2 border-black"
                  : "text-gray-400"
              }`}
            >
              Reviews (122)
            </button>
          </div>

          <div className="max-w-3xl text-sm text-gray-500 leading-relaxed">
            {activeTab === "description" ? (
              <>
                <p>
                  Crafted from premium cotton, designed for everyday comfort
                  with a refined silhouette.
                </p>
                <p className="mt-4">
                  Timeless construction with subtle detailing.
                </p>
              </>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>

        {/* ---------- RELATED PRODUCTS ---------- */}
        <div className="mt-28">
          <RelatedProducts
            category={productData.category}
            subCategory={productData.subCategory}
            currentId={productData._id}
          />
        </div>
      </div>
    </section>
  );
};

export default Product;

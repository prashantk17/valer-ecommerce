import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  if (bestSeller.length === 0) return null; // optional safety

  return (
    <div className="my-10">
      <div className="relative text-center py-12 overflow-hidden">
        {/* Background word (lighter & calmer than Latest Collection) */}
        <h2
          className="
      absolute inset-0 flex items-center justify-center
      font-prata text-[60px] sm:text-[90px] md:text-[120px]
      text-neutral-300/30 tracking-widest
      select-none pointer-events-none
    "
        >
          BEST
        </h2>

        {/* Foreground content */}
        <div className="relative z-10">
          <Title text1="Best" text2="Sellers" />

          <p className="max-w-xl mx-auto mt-3 text-xs sm:text-sm md:text-base text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;

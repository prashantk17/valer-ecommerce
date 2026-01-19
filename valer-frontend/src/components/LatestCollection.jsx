import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import { useEffect } from "react";
import ProductItem from "./ProductItem";
import Title from "./Title";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="relative text-center py-16 overflow-hidden">
        {/* Background word */}
        <h2
          className="
    absolute inset-0 flex items-center justify-center
    font-prata text-[80px] sm:text-[120px] md:text-[160px]
    text-neutral-300/30 translate-y-[-2%] tracking-widest select-none pointer-events-none
  "
        >
          COLLECTION
        </h2>

        {/* Foreground title */}
        <div className="relative z-10">
          <Title text1="Latest" text2="Collection" size="large" />

          <p className="max-w-xl mx-auto mt-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
            magni aperiam, nihil similique provident ad optio quae et molestias,
            voluptates ab dicta, ipsam omnis eius!
          </p>
        </div>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
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

export default LatestCollection;

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelatedProducts = ({ category, subCategory, currentId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!products.length) return;

    const filtered = products.filter(
      (item) =>
        item.category === category &&
        item.subCategory === subCategory &&
        item._id !== currentId
    );

    setRelated(filtered.slice(0, 4));
  }, [products, category, subCategory, currentId]);

  if (!related.length) return null;

  return (
    <section className="mt-32 mb-24">
      <div className="text-center mb-10">
        <Title text1="Related" text2="Products" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;

import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <section className="w-full py-20 bg-neutral-50">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="font-prata text-3xl md:text-4xl text-neutral-900">
          Subscribe & Receive 20% Off
        </h2>

        {/* Description */}
        <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
          Join our newsletter for exclusive access to new arrivals, private
          sales, and curated fashion stories.
        </p>

        {/* Form */}
        <form
          onSubmit={onSubmitHandler}
          className="
            mt-8 flex flex-col sm:flex-row items-center gap-3
            bg-white rounded-full
            px-3 py-2
            shadow-sm
          "
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="
              w-full sm:flex-1
              bg-transparent
              outline-none
              px-4 py-2
              text-sm
              text-neutral-900
              placeholder:text-gray-400
            "
          />

          <button
            type="submit"
            className="
              px-4 py-2 rounded-full
              bg-black text-white text-xs tracking-widest
              transition-all duration-300
              hover:bg-neutral-800
            "
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterBox;

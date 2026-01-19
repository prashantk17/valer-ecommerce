import React, { useEffect, useRef, useState } from "react";
import heroImg1 from "../assets/hero1.jpg";
import heroImg2 from "../assets/hero2.jpg";
import heroBg from "../assets/heroBg.jpg";

const Hero = () => {
  const heroRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [bgImage, setBgImage] = useState(null);

  // Detect when hero enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (!entry.isIntersecting) setBgImage(null);
      },
      { threshold: 0.4 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full overflow-hidden bg-white">
      {/* Dynamic Background Image */}
      <div
        className="
    absolute inset-0
    transition-opacity duration-700 ease-out
    pointer-events-none
  "
        style={{
          backgroundImage: `url(${bgImage || heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: inView ? 0.12 : 0,
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 z-10">
        {/* LEFT CONTENT */}
        <div className="text-[#2b2b2b] space-y-8">
          <h1 className="font-prata text-4xl lg:text-6xl leading-[1.15] tracking-tight">
            Redefining
            <br />
            Modern Luxury
          </h1>

          <p className="text-gray-600 max-w-md leading-relaxed">
            Crafted silhouettes, refined details, and timeless aesthetics —
            designed for those who value understated elegance.
          </p>

          <button
            className="
              mt-4 px-10 py-3 rounded-full
              border border-black text-black text-sm tracking-wide
              transition-all duration-300
              hover:bg-black hover:text-white
            "
          >
            Explore Collection
          </button>
        </div>

        {/* RIGHT IMAGES */}
        <div className="grid grid-cols-2 gap-4">
          <div
            className="relative overflow-hidden rounded-3xl"
            onMouseEnter={() => setBgImage(heroImg1)}
            onMouseLeave={() => setBgImage(null)}
          >
            <img
              src={heroImg1}
              alt="Luxury fashion model"
              className="
                w-full h-[520px] object-cover
                grayscale
                transition duration-500
                hover:grayscale-0
              "
            />
          </div>

          <div
            className="relative overflow-hidden rounded-3xl"
            onMouseEnter={() => setBgImage(heroImg2)}
            onMouseLeave={() => setBgImage(null)}
          >
            <img
              src={heroImg2}
              alt="Luxury fashion editorial"
              className="
                w-full h-[520px] object-cover
                grayscale
                transition duration-500
                hover:grayscale-0
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

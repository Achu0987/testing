import React, { useRef, useEffect, useState } from "react";

const V241 = () => {
  const slides = [
    {
      id: 1,
      title: "Elegant Evening Wear",
      img: "//maya-theme-empower.myshopify.com/cdn/shop/files/Slide-1_Jacket_1.webp?v=1746436222&width=1400",
    },
    {
      id: 2,
      title: "Luxury Winter Collection",
      img: "//maya-theme-empower.myshopify.com/cdn/shop/files/slide-4_cap.webp?v=1748594740&width=1400",
    },
    {
      id: 3,
      title: "Timeless Wardrobe Essentials",
      img: "//maya-theme-empower.myshopify.com/cdn/shop/files/slide-3_1.webp?v=1746436222&width=1400",
    },
  ];

  const containerRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollRange = window.innerHeight * (slides.length - 1); // exact scroll range
        const progress = Math.min(
          Math.max((0 - rect.top) / scrollRange, 0),
          1
        );
        setScrollX(progress * (slides.length - 1) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slides.length]);

  // ✅ Correct section height → only (slides.length - 1) * 100vh + 100vh
  const sectionHeight = (slides.length - 1) * 100 ; // in vh

  return (
    <section
      ref={containerRef}
      style={{ height: `${sectionHeight}vh` }}
      className="relative w-full bg-gray-100"
    >
      {/* Sticky wrapper */}
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <div className="max-w-7xl mx-auto w-full px-6 overflow-hidden">
          {/* Horizontal scroll effect */}
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${scrollX}%)` }}
          >
            {/* Text content */}
            <div className="w-1/2 shrink-0 pr-6 flex flex-col justify-center space-y-6 text-left">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="text-black/50">FASHION</span> THAT FLOWS WITH
                THE SEASONS
              </h2>
              <p className="text-gray-700 text-sm md:text-base">
                Explore our latest collection of timeless fashion. From classic
                styles to modern trends, find the perfect look for every season.
                Shop now and elevate your wardrobe!
              </p>
              <a
                href="/collections"
                className="inline-flex items-center gap-2 px-6 py-3 w-40 rounded-full border border-black hover:bg-black hover:text-white transition"
              >
                Explore More
              </a>
            </div>

            {/* Images */}
            <div className="flex w-1/2 shrink-0 gap-6">
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="min-w-full rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="p-4 text-center">
                    <h5 className="text-lg font-semibold">{slide.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default V241;

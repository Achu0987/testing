import React, { useRef, useEffect, useState } from "react";

const V240 = () => {
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
        const scrollRange = window.innerHeight * (slides.length - 1);
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

  const sectionHeight = (slides.length - 1) * 100; // vh

  return (
    <section
      ref={containerRef}
      style={{ height: `${sectionHeight}vh` }}
      className="relative w-full bg-gray-50"
    >
      {/* Sticky wrapper */}
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6 overflow-hidden">
          {/* Responsive Layout */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between h-full">
            {/* Text content */}
            <div className="w-full md:w-1/2 pr-0 md:pr-8 flex flex-col justify-center space-y-6 text-left mb-6 md:mb-0">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                <span className="text-black/50">FASHION</span> THAT FLOWS WITH
                THE SEASONS
              </h2>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Explore our latest collection of timeless fashion. From classic
                styles to modern trends, find the perfect look for every season.
                Shop now and elevate your wardrobe!
              </p>
              <a
                href="/collections"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 w-40 rounded-full border border-black hover:bg-black hover:text-white transition font-medium"
              >
                Explore More
              </a>
            </div>

            {/* Images */}
            <div className="relative w-full md:w-1/2 overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(-${scrollX}%)`,
                }}
              >
                {slides.map((slide) => (
                  <div
                    key={slide.id}
                    className="min-w-full rounded-2xl overflow-hidden shadow-lg bg-white"
                  >
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="w-full h-64 md:h-[500px] object-cover"
                    />
                    <div className="p-4 text-center bg-white">
                      <h5 className="text-base md:text-lg font-semibold text-gray-800">
                        {slide.title}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default V240;

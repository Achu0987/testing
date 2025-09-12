// app/components/HeroSection.jsx
"use client";

import React, { useEffect, useState } from "react";

const V22 = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect user's reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const t = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    // Visible in both mobile & web
    <section className="w-full bg-black text-white text-left py-28 px-5 overflow-hidden">
      <div className="w-full flex flex-col items-center justify-center gap-10">
        {/* Content */}
        <div
          className={`w-full transform transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Rating */}
          <div className="flex items-center justify-start space-x-2 text-gray-300 text-sm mb-2">
            <span className="text-base">★★★★★</span>
            <span className="text-xs">Rated 4.5/5</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-4xl leading-snug font-extrabold text-left">
            Lorem ipsum dolor sit amet{" "}
            <span className="text-gray-400">consectetur</span>
          </h1>

          {/* Subheading */}
          <p className="mt-3 text-sm md:text-base text-gray-300 max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>

          {/* Buttons */}
          <div className="mt-5 flex flex-col md:flex-row gap-3 md:gap-5">
            <button
              className="w-full md:w-auto px-5 py-3 rounded-full bg-white text-black font-semibold flex items-center justify-center gap-2 hover:scale-[1.03] hover:bg-gray-200 transition-transform duration-200"
              aria-label="Get in touch"
            >
              Lorem ipsum <span aria-hidden>→</span>
            </button>

            <button
              className="w-full md:w-auto px-5 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition-colors duration-200"
              aria-label="What we do"
            >
              Dolor sit amet
            </button>
          </div>
        </div>

        {/* Image */}
        <div
          className={`w-full transform transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="mx-auto rounded-2xl overflow-hidden shadow-xl border border-white/10 w-full max-w-xs md:max-w-md h-70">
            <img
              src="https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/gpe1q29f1f7597947445b8e71ec637215611d?orig=true"
              alt="Dummy placeholder"
              loading="lazy"
              className="w-full h-full object-cover transform hover:scale-110 transition duration-700"
            />
          </div>
        </div>
      </div>
      {/* <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> */}
    </section>
  );
};

export default V22;

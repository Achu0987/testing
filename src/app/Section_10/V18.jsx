// app/components/HeroSection.jsx
"use client";

import React, { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const t = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    // Hidden on small screens; visible from md and up (desktop/web only)
    <section className="hidden md:block w-full bg-black text-white text-left py-28 px-16 overflow-hidden">
      <div className="w-full flex items-center justify-between gap-16">
        {/* Left Content */}
        <div
          className={`flex-1 space-y-6 pl-16 transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Rating */}
          <div className="flex space-x-2 text-gray-300 items-center">
            <span className="text-lg">★★★★★</span>
            <span className="text-sm">Rated 4.9/5</span>
          </div>

          {/* Heading */}
          <h1 className="text-6xl font-extrabold leading-tight">
            Lorem ipsum dolor sit amet{" "}
            <span className="text-gray-400">consectetur</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-gray-300 max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-6 py-3 rounded-full bg-white text-black font-semibold flex items-center gap-2 hover:scale-105 hover:bg-gray-200 transition duration-300">
              Lorem ipsum <span aria-hidden>→</span>
            </button>
            <button className="px-6 py-3 rounded-full border border-white font-semibold hover:bg-white hover:text-black hover:scale-105 transition duration-300">
              Dolor sit amet
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div
          className={`flex-1 flex justify-end pr-16 transform transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="rounded-2xl overflow-hidden shadow-xl border border-white/10 w-full max-w-lg h-[500px]">
            <img
              src="https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/gpe1q29f1f7597947445b8e71ec637215611d?orig=true"
              alt="Dummy Placeholder"
              loading="lazy"
              className="w-full h-full object-cover transform hover:scale-110 transition duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

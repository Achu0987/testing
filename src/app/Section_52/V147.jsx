import React from "react";

export default function V147() {
  return (
    <section className="relative overflow-hidden py-20 md:py-[120px] bg-[#111]">
      {/* Inline CSS for rotation + reduced-motion support */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .rotate-slow {
          animation: spin 20s linear infinite;
          transform-origin: center center;
          will-change: transform;
        }

        .rotate-fast {
          animation: spin 12s linear infinite;
          transform-origin: center center;
          will-change: transform;
        }

        /* Respect user motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .rotate-slow,
          .rotate-fast {
            animation: none !important;
          }
        }
      `}</style>

      

      {/* CONTENT */}
      <div className="container mx-auto px-4 relative z-30">
        <div className="text-center max-w-3xl mx-auto">
          {/* Subtitle */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <img
              src="https://gramentheme.com/html/fresheat/assets/img/icon/titleIcon.svg"
              alt=""
              aria-hidden="true"
              className="w-4"
            />
            <span className="text-[#ff6b00] font-semibold uppercase tracking-wide text-sm sm:text-base">
              About Us
            </span>
            <img
              src="https://gramentheme.com/html/fresheat/assets/img/icon/titleIcon.svg"
              alt=""
              aria-hidden="true"
              className="w-4"
            />
          </div>

          {/* Title */}
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight md:leading-snug mb-4">
            Variety Of Flavours From <br className="hidden sm:block" /> American Cuisine
          </h2>

          {/* Paragraph */}
          <p className="text-gray-300 text-base md:text-[20px] mb-6">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>

          {/* Button */}
          <a
            href="menu.html"
            className="inline-flex items-center bg-[#ff003c] hover:bg-[#e60035] text-white font-semibold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-md transition-all text-sm sm:text-base"
            aria-label="Order now"
          >
            ORDER NOW
            <i className="fa-sharp fa-regular fa-arrow-right ml-2" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
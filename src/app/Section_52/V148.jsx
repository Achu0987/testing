import React from "react";

export default function V148() {
  return (
    <section className="relative overflow-hidden py-[120px] bg-[#111]">
      {/* Inline CSS for rotation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .rotate-slow {
          animation: spin 20s linear infinite;
          transform-origin: center center;
          display: block;
        }

        .rotate-fast {
          animation: spin 12s linear infinite;
          transform-origin: center center;
          display: block;
        }
      `}</style>

      {/* Static Background Shapes */}
      <img
        src="https://gramentheme.com/html/fresheat/assets/img/shape/aboutShape1_1.png"
        alt="shape"
        className=" 2xl:block absolute top-0 left-0  w-80 h-100 mt-0"
      />

      <img
        src="https://gramentheme.com/html/fresheat/assets/img/shape/aboutShape1_4.png"
        alt="shape"
        className=" 2xl:block absolute bottom-0 right-0 w-80 h-100 mb-0"
      />

      {/* FIRST ROTATING SHAPE (slow) */}
      <div className="absolute top-32 left-40 w-50 h-50 md:w-72  z-20 flex items-center justify-center">
        <img
          src="https://gramentheme.com/html/fresheat/assets/img/shape/aboutShape1_3.png"
          alt="rotating shape 1"
          className="rotate-slow w-full h-full object-contain"
        />
      </div>

      {/* SECOND ROTATING SHAPE (fast) */}
      <div className="absolute bottom-15 right-50 w-50 h-50  md:h-72 z-10 flex items-center justify-center">
        <img
          src="https://gramentheme.com/html/fresheat/assets/img/shape/aboutShape1_6.png"
          alt="rotating shape 2"
          className="rotate-fast w-full h-full object-contain"
        />
      </div>

      {/* CONTENT */}
      <div className="container mx-auto relative z-30">
        <div className="text-center max-w-3xl mx-auto">
          {/* Subtitle */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <img
              src="https://gramentheme.com/html/fresheat/assets/img/icon/titleIcon.svg"
              alt="icon"
              className="w-5"
            />
            <span className="text-[#ff6b00] font-semibold uppercase tracking-wide">
              About Us
            </span>
            <img
              src="https://gramentheme.com/html/fresheat/assets/img/icon/titleIcon.svg"
              alt="icon"
              className="w-5"
            />
          </div>

          {/* Title */}
          <h2 className="text-white text-4xl  font-extrabold leading-snug mb-6">
            Variety Of Flavours From <br /> American Cuisine
          </h2>

          {/* Paragraph - adjusted margin */}
          <p className="text-gray-300 text-base leading-relaxed mt-4 mb-10 ml-35 mr-35">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>

          {/* Button */}
          <a
            href="menu.html"
            className="inline-flex items-center bg-[#ff003c] hover:bg-[#e60035] text-white font-semibold px-6 py-3 rounded-md transition-all"
          >
            ORDER NOW
            <i className="fa-sharp fa-regular fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

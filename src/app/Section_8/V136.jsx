import React from "react";

export default function V136() {
  return (
    <section className="relative overflow-hidden py-[120px] bg-[#111]">
      {/* Background Shapes */}
      <img
        src="https://gramentheme.com/html/fresheat/assets/img/shape/aboutShape1_1.png"
        alt="shape"
        className="hidden 2xl:block absolute top-0 left-0"
      />
      <img
        src="https://gramentheme.com/html/fresheat/assets/img/shape/aboutShape1_2.png"
        alt="shape"
        className="hidden 2xl:block absolute bottom-10 left-10"
      />
      <img
        src="https://gramentheme.com/html/fresheat/assets/img/shape/aboutShape1_3.png"
        alt="rotating-shape"
        className="hidden 2xl:block absolute top-20 right-20 w-20 h-20 animate-spin-slow"
      />
      <img
        src="https://gramentheme.com/html/fresheat/assets/img/shape/aboutShape1_4.png"
        alt="shape"
        className="hidden 2xl:block absolute bottom-0 right-0"
      />
      <img
        src="https://gramentheme.com/html/fresheat/assets/img/shape/aboutShape1_5.png"
        alt="shape"
        className="hidden 2xl:block absolute top-40 left-[45%]"
      />
      <img
        src="https://gramentheme.com/html/fresheat/assets/img/shape/aboutShape1_6.png"
        alt="rotating-shape"
        className="hidden 2xl:block absolute bottom-20 right-[40%] w-20 h-20 animate-spin-slow"
      />

      {/* Content */}
      <div className="container mx-auto relative z-10">
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
          <h2 className="text-white text-4xl md:text-5xl font-extrabold leading-snug mb-6">
            Variety Of Flavours From <br /> American Cuisine
          </h2>

          {/* Text */}
          <p className="text-gray-300 text-lg mb-8">
            It is a long established fact that a reader will be distracted the
            readable content of a page when looking at layout the point
            established fact that
          </p>

          {/* Button */}
          <div>
            <a
              href="menu.html"
              className="inline-flex items-center bg-[#ff003c] hover:bg-[#e60035] text-white font-semibold px-6 py-3 rounded-md transition-all"
            >
              ORDER NOW
              <i className="fa-sharp fa-regular fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

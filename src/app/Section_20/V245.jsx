"use client";
import React, { useEffect, useRef, useState } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://maya-theme-empower.myshopify.com/cdn/shop/files/md-text-crl1.webp?v=1748600346&width=1200",
    heading: "EXQUISITE DESIGN, CRAFTED FOR REFINED TASTE.",
    highlight: "TASTE.",
    description: `Exquisite design, crafted for refined taste — each piece in our collection is a testament to elegance, precision, and timeless style. From the stitching to the silhouette, every detail is thoughtfully considered to create garments that speak to those who value sophistication, quality, and the art of dressing well.`,
  },
  {
    id: 2,
    image:
      "https://maya-theme-empower.myshopify.com/cdn/shop/files/md-text-crl2.webp?v=1748600355&width=1200",
    heading: "BUILT FOR COMFORT DESIGNED FOR IMPACT.",
    highlight: "IMPACT.",
    description: `Style meets comfort in every stitch we craft — designed for the modern individual, our garments bring together refined tailoring, breathable fabrics, and a flawless fit that transitions seamlessly from day to night.`,
  },
  {
    id: 3,
    image:
      "https://maya-theme-empower.myshopify.com/cdn/shop/files/md-text-crl3.webp?v=1748600355&width=1200",
    heading: "ELEVATE YOUR LOOK WITH FASHION THAT SPEAKS!",
    highlight: "SPEAKS!",
    description: `Elevate your look with fashion that speaks — bold in essence and refined in detail. Each piece in our collection is designed to make a statement, blending timeless silhouettes with contemporary flair.`,
  },
];

export default function V256() {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.index, 10);
            setActive(idx);
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  // Split heading into words for animation + highlight one word
  const getAnimatedHeading = (text, highlight, isActive) => {
    return text.split(" ").map((word, idx) => {
      const isHighlight = word === highlight;
      return (
        <span
          key={idx}
          className={`inline-block mr-2 transition-all duration-700 ease-in-out ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } ${isHighlight ? "highlighted" : ""}`}
          style={{
            transitionDelay: `${idx * 150}ms`,
          }}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <section className="relative w-full bg-gray-50 py-24 md:py-32">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-16 px-6 lg:px-12">
        {/* Sticky Left Image */}
        <div className="w-full md:w-[45%] sticky top-24 h-[90vh] flex items-center justify-center">
          <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-lg">
            {slides.map((slide, idx) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={`slide-${slide.id}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  active === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                style={{
                  transform: `translateY(${active === idx ? "0px" : "20px"}) scale(${
                    active === idx ? 1 : 1.05
                  })`,
                  transition: "all 1s cubic-bezier(0.25,0.1,0.25,1)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Scrolling Content */}
        <div className="w-full md:w-[55%] text-left flex flex-col space-y-[80vh]">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              data-index={idx}
              ref={(el) => (sectionRefs.current[idx] = el)}
              className="min-h-[80vh] flex flex-col justify-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug mb-5">
                {getAnimatedHeading(slide.heading, slide.highlight, active === idx)}
              </h2>

              <p
                className={`text-gray-600 text-base md:text-lg leading-relaxed mb-8 transition-all duration-700 delay-100 ${
                  active === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                {slide.description}
              </p>

              <a
                href="/collections"
                className={`inline-flex items-center gap-2 bg-black text-white px-8 py-3 w-50 rounded-full text-base md:text-lg hover:bg-gray-800 transition-all duration-700 delay-200 shadow-md ${
                  active === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <span>Explore</span>
                <svg
                  viewBox="0 0 52 43"
                  fill="none"
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.775823 37.8686L4.1886 42.7085L43.9453 14.675L40.6173 33.9547L46.4679 34.9684L51.5177 5.71225L22.2644 0.643612L21.2545 6.4948L40.5325 9.83504L0.775823 37.8686Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Highlighted Word Style */}
      <style jsx>{`
        .highlighted {
          -webkit-text-stroke: 1.2px currentColor;
          color: transparent;
          display: inline-block;
          transform: scale(1);
          transition: transform 450ms ease, opacity 450ms ease;
        }
        .highlighted:hover,
        .highlighted:focus {
          transform: scale(1.1) translateY(-2px);
        }
      `}</style>
    </section>
  );
}

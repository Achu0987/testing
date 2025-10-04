"use client";
import React, { useEffect, useRef, useState } from "react";

/**
 * V244.jsx
 *
 * A polished, responsive carousel with:
 * - New modern layout and neat alignment
 * - Desktop: large left image with right content panel
 * - Mobile: stacked image above content
 * - Autoplay with pause on hover/focus, keyboard nav, swipe support
 * - Smooth fade + subtle parallax / scale transitions
 * - Accessible controls, indicators, and ARIA attributes
 * - Highlighted word with gradient fill
 *
 * Requires Tailwind CSS for styling (if you don't use Tailwind, convert classes to your CSS).
 * Paste this file as V244.jsx
 */

const slides = [
  {
    id: 1,
    image:
      "https://maya-theme-empower.myshopify.com/cdn/shop/files/md-text-crl1.webp?v=1748600346&width=1600",
    heading: "EXQUISITE DESIGN, CRAFTED FOR REFINED TASTE.",
    highlight: "TASTE.",
    description:
      "Exquisite design, crafted for refined taste — each piece in our collection is a testament to elegance, precision, and timeless style.",
  },
  {
    id: 2,
    image:
      "https://maya-theme-empower.myshopify.com/cdn/shop/files/md-text-crl2.webp?v=1748600355&width=1600",
    heading: "BUILT FOR COMFORT DESIGNED FOR IMPACT.",
    highlight: "IMPACT.",
    description:
      "Style meets comfort—refined tailoring and breathable fabrics that transition effortlessly from day to night.",
  },
  {
    id: 3,
    image:
      "https://maya-theme-empower.myshopify.com/cdn/shop/files/md-text-crl3.webp?v=1748600355&width=1600",
    heading: "ELEVATE YOUR LOOK WITH FASHION THAT SPEAKS!",
    highlight: "SPEAKS!",
    description:
      "Make a statement with modern silhouettes and refined details — garments designed to be noticed for the right reasons.",
  },
];

export default function V244() {
  const [active, setActive] = useState(0);
  const autoplayRef = useRef(null);
  const pauseRef = useRef(false);
  const startX = useRef(null);
  const containerRef = useRef(null);

  // Timings
  const AUTOPLAY_MS = 4500;
  const TRANSITION_MS = 700;

  // Advance controls
  const prev = () => setActive((s) => (s - 1 + slides.length) % slides.length);
  const next = () => setActive((s) => (s + 1) % slides.length);

  // Autoplay lifecycle
  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      if (!pauseRef.current) next();
    }, AUTOPLAY_MS);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  // restart autoplay when user navigates (gives full interval)
  useEffect(() => {
    startAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Pause handlers
  const handleMouseEnter = () => (pauseRef.current = true);
  const handleMouseLeave = () => (pauseRef.current = false);
  const handleFocus = () => (pauseRef.current = true);
  const handleBlur = () => (pauseRef.current = false);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Touch (swipe)
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    pauseRef.current = true;
  };
  const onTouchEnd = (e) => {
    if (startX.current == null) {
      pauseRef.current = false;
      return;
    }
    const dx = e.changedTouches[0].clientX - startX.current;
    const threshold = 50;
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    startX.current = null;
    pauseRef.current = false;
  };

  // Utility to compare highlight (strip punctuation)
  const normalize = (w) => w.replace(/[^\w]|_/g, "").toLowerCase();
  const renderHeading = (text, highlight, isActive) => {
    const words = text.split(" ");
    const norm = normalize(highlight);
    return words.map((word, i) => {
      const isH = normalize(word) === norm;
      return (
        <span
          key={i}
          className={`inline-block mr-2 whitespace-nowrap transform transition-all duration-500 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-70 -translate-y-1"
          } ${isH ? "highlight" : ""}`}
          style={{ transitionDelay: `${i * 70}ms` }}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div
          ref={containerRef}
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-roledescription="carousel"
          aria-label="Featured collection carousel"
        >
          {/* LEFT: Image block (desktop: col-span-7, mobile: full width) */}
          <div className="relative md:col-span-7 h-[48vh] md:h-[78vh] lg:h-[80vh]">
            {slides.map((slide, idx) => {
              const isActive = idx === active;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-[${TRANSITION_MS}ms] ease-[cubic-bezier(.22,.9,.35,1)] ${
                    isActive ? "opacity-100 z-20" : "opacity-0 z-10 pointer-events-none"
                  }`}
                  aria-hidden={!isActive}
                >
                  <img
                    src={slide.image}
                    alt={slide.heading}
                    loading="lazy"
                    className={`w-full h-full object-cover`}
                    style={{
                      transform: isActive ? "scale(1)" : "scale(1.04)",
                      transition: `transform ${TRANSITION_MS}ms cubic-bezier(.22,.9,.35,1)`,
                    }}
                  />

                  {/* subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

                  {/* left vertical indicators (desktop) */}
                  <div className="hidden md:flex flex-col gap-3 absolute left-6 top-1/2 -translate-y-1/2 z-30">
                    {slides.map((_, i) => {
                      const activeDot = i === active;
                      return (
                        <button
                          key={i}
                          onClick={() => setActive(i)}
                          aria-label={`Go to slide ${i + 1}`}
                          className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                            activeDot ? "bg-white scale-110 shadow-lg" : "bg-white/60"
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* bottom-left caption overlay for desktop */}
                  <div className="hidden md:flex absolute left-10 bottom-10 z-30">
                    <div className="bg-white/6 backdrop-blur-md rounded-2xl px-6 py-5 shadow-2xl max-w-xl">
                      <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                        {renderHeading(slide.heading, slide.highlight, isActive)}
                      </h3>
                      <p className="text-white/90 text-sm md:text-base">{slide.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Content & controls (desktop: col-span-5) */}
          <div className="md:col-span-5 p-6 md:p-10 flex flex-col justify-center gap-6">
            <div className="md:hidden">
              {/* Mobile heading and desc stacked under image for neat mobile alignment */}
              <h3 className="text-gray-900 text-2xl font-extrabold leading-tight mb-2">
                {renderHeading(slides[active].heading, slides[active].highlight, true)}
              </h3>
              <p className="text-gray-600 text-sm">{slides[active].description}</p>
            </div>

            {/* Desktop content panel (neat, centered, attractive) */}
            <div className="hidden md:flex md:flex-col gap-6">
              <div>
                <span className="inline-block text-sm uppercase tracking-wider text-gray-500 mb-2">
                  New Collection
                </span>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                  {renderHeading(slides[active].heading, slides[active].highlight, true)}
                </h2>
                <p className="text-gray-600 mt-4 max-w-xl">{slides[active].description}</p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/collections"
                  className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-900 transition-shadow shadow"
                >
                  Explore collection
                  <svg width="16" height="12" viewBox="0 0 52 43" fill="none" className="ml-1">
                    <path
                      d="M0.775823 37.8686L4.1886 42.7085L43.9453 14.675L40.6173 33.9547L46.4679 34.9684L51.5177 5.71225L22.2644 0.643612L21.2545 6.4948L40.5325 9.83504L0.775823 37.8686Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    aria-label="Previous slide"
                    className="w-11 h-11 rounded-lg bg-white border shadow-sm flex items-center justify-center hover:scale-105 transition"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M15 6L9 12L15 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next slide"
                    className="w-11 h-11 rounded-lg bg-white border shadow-sm flex items-center justify-center hover:scale-105 transition"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6L15 12L9 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Indicators horizontal for desktop content area */}
              <div className="flex items-center gap-3 mt-2">
                {slides.map((_, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      aria-pressed={isActive}
                      className={`w-9 h-1.5 rounded-full overflow-hidden bg-gray-200 relative`}
                    >
                      <span
                        className={`absolute left-0 top-0 bottom-0 bg-black transition-all`}
                        style={{
                          width: isActive ? "100%" : "0%",
                          transitionDuration: `${AUTOPLAY_MS}ms`,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile controls (bottom row) */}
            <div className="md:hidden flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="w-10 h-10 rounded-md bg-white shadow flex items-center justify-center"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M15 6L9 12L15 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="w-10 h-10 rounded-md bg-white shadow flex items-center justify-center"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6L15 12L9 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`w-2.5 h-2.5 rounded-full ${i === active ? "bg-black" : "bg-gray-300"}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom progress bar (full width) */}
          <div className="absolute left-0 right-0 bottom-0 h-1 bg-transparent">
            <div
              className="h-full bg-gradient-to-r from-black/70 to-black/40"
              style={{
                width: `${((active + 1) / slides.length) * 100}%`,
                transition: `width ${TRANSITION_MS}ms ease`,
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Inline styles (highlight gradient / small refinements) */}
      <style jsx>{`
        .highlight {
          background: linear-gradient(90deg, #111827, #6b7280);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-stroke: 0.6px rgba(0, 0, 0, 0.06);
        }

        /* Ensure transition durations behave even if Tailwind dynamic class not present */
        .duration-700 {
          transition-duration: 700ms;
        }

        @media (max-width: 767px) {
          /* reduce image height on small devices for neat stacking */
          .h-\\[48vh\\] {
            height: 42vh;
          }
        }
      `}</style>
    </section>
  );
}
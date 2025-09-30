import React, { useRef, useEffect, useState } from "react";

/**
 * Simple marquee implemented with requestAnimationFrame.
 */
function Marquee({ text, speed = 150, className = "text-white font-semibold" }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [translate, setTranslate] = useState(0);
  const widthRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    widthRef.current = content.scrollWidth;

    let startTime = null;
    let rafId = null;

    function step(t) {
      if (!startTime) startTime = t;
      const elapsed = (t - startTime) / 1000; // seconds
      const dx = (elapsed * speed) % widthRef.current;
      setTranslate(-dx);
      rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [text, speed]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap select-none ${className}`}
      aria-hidden="true"
      style={{ width: "100%" }}
    >
      <div
        ref={contentRef}
        className="inline-block"
        style={{
          transform: `translateX(${translate}px)`,
          willChange: "transform",
        }}
      >
        <span className="inline-block mr-8">{text}</span>
        <span className="inline-block mr-8">{text}</span>
      </div>
    </div>
  );
}

export default function V230() {
  const videoSrc =
    "https://maya-theme-empower.myshopify.com/cdn/shop/videos/c/vp/ccb5f1aa2ff34c53bc208ff136a9df7f/ccb5f1aa2ff34c53bc208ff136a9df7f.HD-1080p-4.8Mbps-43896143.mp4?v=0";
  const poster =
    "https://maya-theme-empower.myshopify.com/cdn/shop/files/preview_images/ccb5f1aa2ff34c53bc208ff136a9df7f.thumbnail.0000000000_800x.jpg?v=1741588690";

  return (
    <section
      aria-label="Hero banner"
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
      tabIndex={-1}
    >
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        autoPlay
        loop
        poster={poster}
      >
        <source src={videoSrc} type="video/mp4" />
        <img src={poster} alt="slide-show-banner-video" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-30 flex items-center">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-xl">
            <div className="text-left text-white">
              {/* heading */}
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-snug tracking-tight mb-3 sm:mb-4">
                TIMELESS FASHION <br className="hidden sm:block" /> ESSENCE
              </h2>

              {/* description */}
              <p className="text-sm sm:text-base md:text-lg text-white/90 mb-5 sm:mb-6">
                Discover fashion that transcends trends. Elevate style with
                classic, elegant, and enduring designs.
              </p>

              {/* CTA */}
              <a
                href="/collections/all"
                className="inline-flex items-center gap-2 bg-white text-black font-medium py-2.5 px-5 rounded-md shadow-md hover:scale-[1.02] transition-transform"
              >
                <span className="w-5 h-5 inline-flex">
                  <svg viewBox="0 0 52 43" fill="none" className="w-full h-full">
                    <path
                      d="M0.775823 37.8686L4.1886 42.7085L43.9453 14.675L40.6173 33.9547L46.4679 34.9684L51.5177 5.71225L22.2644 0.643612L21.2545 6.4948L40.5325 9.83504L0.775823 37.8686Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span>EXPLORE NOW</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* marquee at bottom */}
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="">
          <Marquee
            text="ELEGANCE • STYLE • LUXURY • FOREVER •"
            speed={120}
            className="text-6xl leading-none text-white "
          />
        </div>
      </div>
    </section>
  );
}

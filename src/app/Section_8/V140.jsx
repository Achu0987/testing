import React, { useEffect, useState, useRef } from "react";

export default function V140() {
  const slides = [
    {
      id: 0,
      title: "SPICY FRIED CHICKEN",
      subtitle: "WELCOME FRESHEAT",
      cta: { text: "ORDER NOW", href: "contact.html" },
      thumb: "https://gramentheme.com/html/fresheat/assets/img/banner/bannerThumb1_1.png",
    },
    {
      id: 1,
      title: "Chicago Deep Pizza King",
      subtitle: "WELCOME FRESHEAT", 
      cta: { text: "ORDER NOW", href: "menu.html" },
      thumb: "https://gramentheme.com/html/fresheat/assets/img/banner/bannerThumb1_2.png",
    },
    {
      id: 2,
      title: "CHICAGO DEEP BURGER KING",
      subtitle: "WELCOME FRESHEAT",
      cta: { text: "ORDER NOW", href: "menu.html" },
      thumb: "https://gramentheme.com/html/fresheat/assets/img/banner/bannerThumb1_3.png",
    },
  ];

  const shapeUrls = {
    s1: "https://gramentheme.com/html/fresheat/assets/img/shape/bannerShape1_1.svg",
    s2: "https://gramentheme.com/html/fresheat/assets/img/shape/bannerShape1_2.svg",
    s3: "https://gramentheme.com/html/fresheat/assets/img/shape/bannerShape1_3.svg",
    s4: "https://gramentheme.com/html/fresheat/assets/img/shape/bannerShape1_4.svg",
    s5: "https://gramentheme.com/html/fresheat/assets/img/shape/bannerShape1_5.svg",
    s6: "https://gramentheme.com/html/fresheat/assets/img/shape/bannerShape1_6.svg",
  };

  const [active, setActive] = useState(0);
  const autoplayRef = useRef(null);

  const thumbRefs = useRef([]);
  const cursorRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setActive((p) => (p + 1) % slides.length);
    }, 5000);
    return () => clearInterval(autoplayRef.current);
  }, []);

  function goTo(i) {
    setActive(((i % slides.length) + slides.length) % slides.length);
  }

  function prev() {
    goTo(active - 1);
  }

  function next() {
    goTo(active + 1);
  }

  // Thumbnail parallax hover
  function handleThumbMouseMove(e, idx) {
    const img = thumbRefs.current[idx];
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    const strength = 24;
    const translateX = relX * strength;
    const translateY = relY * strength;

    img.style.transition = "transform 120ms ease-out";
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.03)`;
  }

  function handleThumbMouseLeave(idx) {
    const img = thumbRefs.current[idx];
    if (!img) return;
    img.style.transition = "transform 350ms cubic-bezier(.2,.9,.2,1)";
    img.style.transform = "translate(0px, 0px) scale(1)";
  }

  // Custom glowing cursor follow
  function handleSectionMouseMove(e) {
    const c = cursorRef.current;
    if (!c) return;
    c.style.left = `${e.clientX}px`;
    c.style.top = `${e.clientY}px`;
  }

  function handleSectionMouseEnter() {
    if (cursorRef.current) cursorRef.current.style.opacity = "1";
  }

  function handleSectionMouseLeave() {
    if (cursorRef.current) cursorRef.current.style.opacity = "0";
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      onMouseMove={handleSectionMouseMove}
      onMouseEnter={handleSectionMouseEnter}
      onMouseLeave={handleSectionMouseLeave}
      style={{ cursor: "default" }} // keep native cursor visible
    >
      {/* Professional glowing ring cursor */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 60,
          opacity: 0,
          width: "42px",
          height: "42px",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.35), rgba(255,255,255,0.05))",
          border: "2px solid rgba(255,255,255,0.5)",
          boxShadow: "0 0 18px rgba(255,255,255,0.35)",
          transition:
            "transform 160ms ease-out, opacity 200ms ease, background 300ms ease",
        }}
        className="cursor-glow"
      />

      {/* Banner Section */}
      <div
        className="relative w-full h-[540px] md:h-[560px] lg:h-[620px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://gramentheme.com/html/fresheat/assets/img/bg/bannerBG1_1.jpg')",
        }}
      >
        {/* Slides */}
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={s.id}
              className="min-w-full h-full relative flex items-center"
            >
              <div className="absolute inset-0 bg-black/30 z-10"></div>

              {/* Shapes */}
              <img src={shapeUrls.s1} alt="" className="hidden 2xl:block absolute left-6 top-12 z-20 w-32" />
              <img src={shapeUrls.s2} alt="" className="hidden 2xl:block absolute left-2 top-28 z-20 w-24" />
              <img src={shapeUrls.s3} alt="" className="hidden 2xl:block absolute left-6 top-40 z-20 w-28" />
              <img src={shapeUrls.s4} alt="" className="hidden 2xl:block absolute right-28 top-24 z-20 w-20" />
              <img src={shapeUrls.s5} alt="" className="hidden 2xl:block absolute right-8 top-6 z-20 w-24" />
              <img src={shapeUrls.s6} alt="" className="hidden 2xl:block absolute right-12 bottom-20 z-20 w-16" />

              {/* Content */}
              <div className="container mx-auto px-6 relative z-30 h-full flex items-center">
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 items-center h-full">
                  {/* Left Text */}
                  <div className="lg:col-span-7 flex flex-col justify-center h-full text-left ml-20">
                    <div className="max-w-[720px]">
                      <h6 className="text-xl uppercase tracking-wider mb-4 font-medium text-amber-400 text-left">
                        {s.subtitle}
                      </h6>
                      <h1 className="text-[48px] sm:text-[58px] md:text-[74px] lg:text-[86px] xl:text-[96px] leading-[0.95] font-extrabold mb-6 text-white  uppercase tracking-tight drop-shadow-[0_6px_0_rgba(0,0,0,0.35)]">
                        {s.title}
                      </h1>
                      <a
                        href={s.cta.href}
                        className="inline-flex items-center gap-3 bg-red-600 hover:bg-amber-400 hover:text-black text-white px-5 py-3 rounded-md font-semibold shadow-md transition-colors duration-200"
                      >
                        <span className="text-sm">{s.cta.text}</span>
                        <span aria-hidden className="text-xl">→</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Thumbnail */}
                  <div className="hidden lg:block lg:col-span-5 relative h-full">
                    <div className="absolute right-0 bottom-6 w-[520px] h-[420px] lg:w-[560px] lg:h-[460px] 2xl:w-[640px] 2xl:h-[520px]">
                      <img
                        src={s.thumb}
                        alt="banner thumb"
                        ref={(el) => (thumbRefs.current[i] = el)}
                        onMouseMove={(e) => handleThumbMouseMove(e, i)}
                        onMouseLeave={() => handleThumbMouseLeave(i)}
                        className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-300 ease-out"
                        style={{ transform: "translate(0px, 0px) scale(1)" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prev / Next Buttons */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:scale-105 transition-transform"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:scale-105 transition-transform"
        >
          ›
        </button>

        {/* Pagination */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium shadow-md transition-colors ${
                i === active ? "bg-white text-black" : "bg-white/40 text-white"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Cursor pulse animation */}
      <style>{`
        .cursor-glow {
          animation: cursorPulse 2.2s infinite;
        }
        @keyframes cursorPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}

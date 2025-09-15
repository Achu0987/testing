// app/components/V51.jsx
import React, { useEffect, useMemo, useState } from "react";

const SLIDES = [
  {
    id: "warm-cool",
    bg: "url(https://img.freepik.com/free-photo/group-young-cheerful-friends-jumping-having-fun-outdoors-road_181624-27850.jpg)",
    titleTop: "Warm Styles,",
    titleBottom: "Cool Prices.",
    lines: [
      "With the best quality and meticulous details, we",
      "present fashion pieces that are not only trendy, but also",
      "comfortable to wear every day.",
    ],
    cta: { label: "Explore Now", href: "#" },
    layout: {
      minH: 620,
      titleSize: 42,
      titleLineHeight: 1.2,
      paraSize: 16,
      paraMaxW: 540,
      gapTitleToPara: 20,
      gapParaToCTA: 28,
      dotsBottom: 24,
      gradients:
        "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)",
    },
  },
  {
    id: "fashionably-yours",
    bg: "url(https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-01.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com)",
    titleTop: "Fashionably",
    titleBottom: "Yours.",
    lines: [
      "Discover a world of fashion with our new arrivals,",
      "fashion catalogues, collections,",
      "and lookbooks updated every week.",
    ],
    cta: { label: "Shop Now", href: "#" },
    layout: {
      minH: 620,
      titleSize: 42,
      titleLineHeight: 1.2,
      paraSize: 16,
      paraMaxW: 540,
      gapTitleToPara: 20,
      gapParaToCTA: 28,
      dotsBottom: 24,
      gradients:
        "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)",
    },
  },
];

function V51() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const active = useMemo(() => SLIDES[idx], [idx]);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [playing]);

  const go = (dir) => {
    setIdx((i) =>
      dir === "prev"
        ? (i - 1 + SLIDES.length) % SLIDES.length
        : (i + 1) % SLIDES.length
    );
  };

  const px = (n) => `${n}px`;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: px(active.layout.minH) }}
    >
      {/* Backgrounds */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 bg-no-repeat bg-cover bg-center transition-opacity duration-700 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
          style={{
            minHeight: px(s.layout.minH),
            backgroundImage: `${s.layout.gradients}, ${s.bg}`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
          aria-hidden={i !== idx}
        />
      ))}

      {/* Content */}
      <div className="relative flex items-center justify-center h-full min-h-screen px-6">
        <div className="max-w-2xl text-center">
          <h2
            className="text-white font-semibold"
            style={{
              fontSize: `clamp(28px, 4vw, ${px(active.layout.titleSize)})`,
              lineHeight: active.layout.titleLineHeight,
              letterSpacing: "-0.02em",
            }}
          >
            <span className="block">{active.titleTop}</span>
            <span className="block">{active.titleBottom}</span>
          </h2>

          <div
            className="text-white/90 font-light mx-auto"
            style={{
              marginTop: px(active.layout.gapTitleToPara),
              fontSize: `clamp(14px, 2vw, ${px(active.layout.paraSize)})`,
              maxWidth: px(active.layout.paraMaxW),
            }}
          >
            {active.lines.map((t, i) => (
              <p key={i} className="m-0 mb-[6px]">
                {t}
              </p>
            ))}
          </div>

          <div style={{ marginTop: px(active.layout.gapParaToCTA) }}>
            <a
              href={active.cta.href}
              className="inline-block rounded-lg bg-white text-black font-semibold text-[15px] md:text-[16px] px-6 md:px-7 py-[12px] md:py-[14px] hover:bg-black hover:text-white transition-colors shadow-md"
            >
              {active.cta.label}
            </a>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous"
        onClick={() => go("prev")}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/90 hover:text-white transition-colors"
      >
        <span className="inline-block text-[32px] leading-none select-none">
          ‹
        </span>
      </button>

      <button
        aria-label="Next"
        onClick={() => go("next")}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/90 hover:text-white transition-colors"
      >
        <span className="inline-block text-[32px] leading-none select-none">
          ›
        </span>
      </button>

      {/* Dots + Play/Pause */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3"
        style={{ bottom: px(active.layout.dotsBottom) }}
      >
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className="h-4 w-4 grid place-items-center"
          title={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <span className="relative inline-block h-4 w-4">
              <span className="absolute left-0 top-0 h-4 w-[2px] bg-white" />
              <span className="absolute left-[6px] top-0 h-4 w-[2px] bg-white" />
            </span>
          ) : (
            <span
              className="inline-block"
              style={{
                width: 0,
                height: 0,
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderLeft: "10px solid white",
              }}
            />
          )}
        </button>
        <div className="flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-[8px] w-[8px] rounded-full"
              style={{
                backgroundColor:
                  i === idx ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default V51;

"use client";

import React, { useEffect, useRef, useState } from "react";

/* ---------------------- Data ---------------------- */
const CATEGORIES = [
  { id: "popular", label: "Most Popular", color: "#111827" },
  { id: "samosas", label: "Samosas", color: "#C6A26D" },
  { id: "desserts", label: "Desserts", color: "#811B48" },
  { id: "snacks", label: "Snacks", color: "#E65300" },
  { id: "dairy", label: "Dairy", color: "#3BB3E3" }
];

const PRODUCTS = {
  dairy: [
    { id: "makhani-250", title: "Makhani (250g)", img: "https://cdn.sanity.io/images/krc73rcv/production/692f2327d9d5d2afb1792e5a89939f93e65c2b1e-840x587.png?w=320&auto=format", color: "#e87200", tags: ["Vegetarian","Gelatin Free"] },
    { id: "nut-shrikhand", title: "Nut Mix Shrikhand", img: "https://cdn.sanity.io/images/krc73rcv/production/7d765556bb02b48db3b7442103da270211ef6884-840x587.png?w=320&auto=format", color: "#711d5b", tags: ["Vegetarian","Gelatin Free"] },
    { id: "makhani-500", title: "Makhani (500g)", img: "https://cdn.sanity.io/images/krc73rcv/production/762d01b46e41d514b952fa3cc283c295497b8281-840x587.png?w=320&auto=format", color: "#e87200", tags: ["Vegetarian","Gelatin Free"] },
    { id: "malai-paneer", title: "Malai Paneer (375g)", img: "https://cdn.sanity.io/images/krc73rcv/production/79f7fb366ad3daccfcab544c7f0499a3250ce0af-840x587.png?w=320&auto=format", color: "#e87200", tags: ["Vegetarian","Halal","Gelatin Free"] },
    { id: "ghee-800", title: "Pure Desi Ghee (800g)", img: "https://cdn.sanity.io/images/krc73rcv/production/af7627ef864e4aaa9caa9349ee24b60ad632b548-840x587.png?w=320&auto=format", color: "#e87200", tags: ["Vegetarian","Halal","Gelatin Free"] },
    { id: "malai-dahi-6", title: "Malai Dahi 6% (650g)", img: "https://cdn.sanity.io/images/krc73rcv/production/ba6a6a9601cb1dd2f6153a645700c2e485bf1083-840x587.png?w=320&auto=format", color: "#ebf2fa", tags: ["Vegetarian","Gluten Free","Gelatin Free"] },
    { id: "malai-dahi-2", title: "Malai Dahi 2% (650g)", img: "https://cdn.sanity.io/images/krc73rcv/production/fa3bc8ad5e49543eb741ae3d583c42149f3ecbfb-840x587.png?w=320&auto=format", color: "#00a6ce", tags: ["Vegetarian","Gluten Free","Gelatin Free"] },
    { id: "paneer-250", title: "Fresh Paneer (250g)", img: "https://cdn.sanity.io/images/krc73rcv/production/c49105c23da61d33331d2de24ad69db05a412da9-3375x6000.jpg?w=420&auto=format&dpr=2", color: "#f7e6d0", tags: ["Vegetarian"] },
    { id: "lassi-500", title: "Sweet Lassi (500ml)", img: "https://cdn.sanity.io/images/krc73rcv/production/7dbaf862008dfa551e13976a42a113a1ee492ee5-840x587.png?w=320&auto=format&dpr=2", color: "#dbeffd", tags: ["Vegetarian"] }
  ],
  samosas: [
    { id: "s1", title: "Samosa Classic", img: "https://cdn.sanity.io/images/krc73rcv/production/68238f8ef5f91d9b4e8ac893696f3068d46ba7f1-840x587.png?w=320&auto=format&dpr=2", color: "#C6A26D", tags: ["Vegetarian"] },
    { id: "s2", title: "Paneer Samosa", img: "https://cdn.sanity.io/images/krc73rcv/production/ac9a9b4544aa6b75707f1e3db1a81def4adbee88-840x587.png?w=320&auto=format&dpr=2", color: "#C6A26D", tags: ["Vegetarian"] },
    { id: "s3", title: "Aloo Samosa", img: "https://cdn.sanity.io/images/krc73rcv/production/d889ad179704a141539767c437f81345152fb0f6-840x587.png?w=320&auto=format&dpr=2", color: "#C6A26D", tags: ["Vegetarian"] },
    { id: "s4", title: "Spicy Samosa", img: "https://cdn.sanity.io/images/krc73rcv/production/b78e1762ac4849de4c4b5770ba1d60763519aac5-840x587.png?w=320&auto=format&dpr=2", color: "#C6A26D", tags: ["Vegetarian"] }
  ],
  desserts: [
    { id: "d1", title: "Milk Cake", img: "https://cdn.sanity.io/images/krc73rcv/production/c0ed0a68805eab9c475df20ed8c67b65e10fb6bf-982x1320.png?w=816&auto=format&dpr=2", color: "#811B48", tags: ["Vegetarian"] },
    { id: "d2", title: "Gulab Jamun", img: "https://cdn.sanity.io/images/krc73rcv/production/c0ed0a68805eab9c475df20ed8c67b65e10fb6bf-982x1320.png?w=816&auto=format&dpr=2", color: "#811B48", tags: ["Vegetarian"] },
    { id: "d3", title: "Rasgulla", img: "https://cdn.sanity.io/images/krc73rcv/production/424f73cbb552518b86e15bbb5a14964a8115f5a9-1576x1390.png?w=816&auto=format&dpr=2", color: "#811B48", tags: ["Vegetarian"] }
  ],
  snacks: [
    { id: "sn1", title: "Potatoes & Peas Samosas", img: "https://cdn.sanity.io/images/krc73rcv/production/45289d3aa14ebfba02dbc82676814c3880936c50-3218x5720.jpg?w=420&auto=format&dpr=2", color: "#E65300", tags: ["Vegan","Vegetarian","Halal","Gelatin Free"] },
    { id: "sn2", title: "Spicy Chips", img: "https://cdn.sanity.io/images/krc73rcv/production/7dbaf862008dfa551e13976a42a113a1ee492ee5-840x587.png?w=600&auto=format&dpr=2", color: "#E65300", tags: ["Vegetarian"] }
  ]
};

PRODUCTS.popular = [
  ...PRODUCTS.dairy.slice(0, 4),
  ...PRODUCTS.samosas.slice(0, 2),
  ...PRODUCTS.snacks.slice(0, 1)
];

/* ---------------------- TopMarquee ---------------------- */
function TopMarquee({ texts = [], speed = 14 }) {
  const items = texts.length ? texts : [""];
  const trackRef = useRef(null);
  const onTouchStart = () => { if (trackRef.current) trackRef.current.style.animationPlayState = "paused"; };
  const onTouchEnd = () => { if (trackRef.current) trackRef.current.style.animationPlayState = "running"; };

  return (
    <div className="w-full px-4">
      <div className="bg-gradient-to-r from-[#7d2a61] to-[#5a1f46] rounded-t-xl px-3 py-2">
        <div className="overflow-hidden">
          <div
            onMouseEnter={() => trackRef.current && (trackRef.current.style.animationPlayState = "paused")}
            onMouseLeave={() => trackRef.current && (trackRef.current.style.animationPlayState = "running")}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="relative h-8 flex items-center"
            aria-hidden
          >
            <div
              ref={trackRef}
              className="flex gap-6 items-center whitespace-nowrap text-xs font-semibold text-white"
              style={{ animation: `marqueeAnim ${speed}s linear infinite`, willChange: "transform" }}
            >
              {[...items, ...items].map((t, i) => (
                <div key={i} className="flex items-center gap-2 px-2">
                  <span className="text-[10px]">●</span>
                  <span className="tracking-wide">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- ProductCard ---------------------- */
function ProductCard({ product, isCenter, idx = 0, hoveredCardId, onHoverChange }) {
  const isHovered = hoveredCardId === product.id;
  const showMandala = isHovered ? true : (!hoveredCardId && isCenter);

  return (
    <div
      className="card flex-shrink-0 px-2"
      style={{ animation: `fadeInUp 420ms ease forwards`, animationDelay: `${idx * 40}ms` }}
    >
      <div
        onMouseEnter={() => onHoverChange && onHoverChange(product.id)}
        onMouseLeave={() => onHoverChange && onHoverChange(null)}
        className="group relative bg-white rounded-2xl flex flex-col items-center p-4 shadow-md transform transition-all duration-300"
        style={{ minHeight: 300 }}
      >
        <div
          className="mandala-wrapper absolute -top-8 z-0 pointer-events-none"
          style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <div className={`mandala ${showMandala ? "show" : ""}`} style={{ color: product.color || "#e87200" }} aria-hidden>
            <svg className="w-44 h-44 animate-mandala-slow mt-12" viewBox="0 0 427 428" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M397.696 107.189C390.252 94.3553 375.411 89.8893 355.889 93.8703C355.584 92.438 355.054 91.0171 354.276 89.6863C351.49 84.882 346.336 82.3218 341.149 82.5925C337.991 66.4201 331.45 49.3455 321.57 31.3912C320.589 29.6093 318.695 28.5154 316.653 28.5717C295.857 29.068 277.564 32.1017 261.832 37.6504C261.539 36.8045 261.166 35.97 260.704 35.1692C257.411 29.4852 250.802 26.9364 244.746 28.5153C238.261 10.7866 227.197 0.895941 212.829 0.929774C198.213 0.95233 187.037 11.2603 180.677 29.6206C177.248 28.8198 173.538 29.2597 170.256 31.1543C167.47 32.7671 165.44 35.1918 164.279 37.9549C148.467 32.3836 130.073 29.3725 109.13 28.9552C107.089 28.9214 105.205 30.0266 104.224 31.7972C94.1304 50.259 87.5892 67.796 84.5893 84.3518C81.5331 83.9233 78.3189 84.4646 75.443 86.1338C72.2401 87.9946 70.0409 90.9156 69.0034 94.1861C50.0228 90.6675 35.621 95.2688 28.3807 107.889C21.2644 120.261 24.2755 134.685 36.2526 149.03C30.9407 153.395 29.3957 161.086 32.9595 167.221C33.4783 168.112 34.076 168.924 34.7414 169.657C22.5501 180.416 11.2271 194.457 0.795087 211.724C-0.265029 213.472 -0.265029 215.648 0.795087 217.396C11.3286 234.674 22.7418 248.692 35.0233 259.418C31.437 263.884 30.749 270.278 33.794 275.534C34.6624 277.022 35.7676 278.297 37.0195 279.334C24.659 293.928 21.5125 308.6 28.7754 321.119C36.1849 333.896 50.8912 338.385 70.244 334.528C70.5485 336.005 71.0785 337.449 71.868 338.825C74.71 343.731 80.0332 346.302 85.345 345.896C88.5254 362.012 95.0439 379.042 104.901 396.928C105.882 398.71 107.777 399.804 109.818 399.748C130.479 399.263 148.636 396.274 164.29 390.793C164.583 391.661 164.967 392.519 165.451 393.342C168.812 399.139 175.613 401.665 181.759 399.894C188.255 417.555 199.296 427.412 213.63 427.39C228.179 427.367 239.321 417.161 245.704 398.947C249.065 399.68 252.697 399.218 255.9 397.357C258.775 395.688 260.839 393.161 261.99 390.297C277.846 395.913 296.308 398.947 317.341 399.364C319.371 399.409 321.266 398.315 322.247 396.522C332.284 378.139 338.814 360.693 341.837 344.193C344.814 344.554 347.915 344.001 350.712 342.377C353.994 340.471 356.227 337.46 357.231 334.088C376.336 337.686 390.816 333.096 398.102 320.431C405.229 308.048 402.207 293.612 390.196 279.255C395.282 274.857 396.703 267.323 393.196 261.29C392.688 260.421 392.102 259.621 391.459 258.899C403.763 248.106 415.176 233.997 425.687 216.596C426.747 214.848 426.747 212.66 425.687 210.923C415.131 193.611 403.684 179.559 391.38 168.823C394.775 164.368 395.373 158.131 392.384 152.977C391.538 151.523 390.467 150.282 389.26 149.256C401.812 134.561 405.038 119.798 397.73 107.189H397.696Z"/>
            </svg>
          </div>
        </div>

        <div className="relative z-10 pt-6 pb-3 flex justify-center">
          <img src={product.img} alt={product.title} className="w-32 h-32 object-contain transition-transform duration-700 transform-gpu group-hover:scale-105" loading="lazy" />
        </div>

        <div className="mt-3 text-center w-full px-2">
          <h4 className={`text-base leading-tight font-extrabold ${isCenter ? "text-gray-900" : "text-gray-800"}`} style={{ lineHeight: 1.05 }}>
            {product.title}
          </h4>

          <div className="mt-2 flex items-center justify-center gap-2 flex-wrap">
            {product.tags?.slice(0,3).map((t) => (
              <span key={t} className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
            <button className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-[#fef3c7] to-white rounded-full text-sm font-semibold text-[#111827] shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition">
              Add
            </button>
            <button className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- DairyGridCard ---------------------- */
function DairyGridCard({ product }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded-lg">
          <img src={product.img} alt={product.title} className="object-contain w-16 h-16" loading="lazy" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-extrabold text-gray-900">{product.title}</h5>
            <span className="text-xs text-gray-500">250g</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">{product.tags?.join(" • ")}</p>
          <div className="mt-3 flex items-center gap-2">
            <button className="px-3 py-1 bg-[#111827] text-white rounded-full text-xs">Add</button>
            <button className="px-3 py-1 border rounded-full text-xs">View</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- Main component (V272) ---------------------- */
export default function V272() {
  // Client-only; deterministic initial values to avoid hydration mismatch
  const [activeCategory, setActiveCategory] = useState("popular");
  const [items, setItems] = useState(PRODUCTS.popular);
  const containerRef = useRef(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // deterministic defaults (safe for initial render)
  const [visibleCount, setVisibleCount] = useState(1);
  const [cardWidth, setCardWidth] = useState(220);

  // update responsive values on mount and on resize (client-only)
  useEffect(() => {
    const getVisibleCount = () => {
      const w = window.innerWidth;
      if (w >= 1400) return 4;
      if (w >= 1024) return 3;
      if (w >= 720) return 2;
      return 1;
    };
    const getCardWidth = () => {
      if (window.innerWidth >= 720) return 220;
      return Math.round(Math.min(360, window.innerWidth * 0.76));
    };

    // set initial client values
    setVisibleCount(getVisibleCount());
    setCardWidth(getCardWidth());

    const onResize = () => {
      setVisibleCount(getVisibleCount());
      setCardWidth(getCardWidth());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // update items when category changes
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    setItems(PRODUCTS[activeCategory] || []);
    setAnimKey((k) => k + 1);
    // reset scroll position to start (smooth)
    if (containerRef.current) containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
  }, [activeCategory]);

  const gap = 16;
  const pages = Math.max(1, Math.ceil(items.length / Math.max(1, visibleCount)));
  const [pageIndex, setPageIndex] = useState(0);
  const centerOffset = Math.floor(visibleCount / 2);
  const centerIndex = Math.min(items.length - 1, pageIndex * visibleCount + centerOffset);

  const scrollToPage = (p) => {
    const el = containerRef.current;
    if (!el) return;
    const left = p * visibleCount * (cardWidth + gap);
    el.scrollTo({ left, behavior: "smooth" });
    setPageIndex(p);
  };
  const next = () => scrollToPage(Math.min(pageIndex + 1, pages - 1));
  const prev = () => scrollToPage(Math.max(pageIndex - 1, 0));

  // sync pageIndex with manual scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let rafId = null;
    const handler = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const sLeft = el.scrollLeft;
        const approx = Math.round(sLeft / (visibleCount * (cardWidth + gap)));
        const bounded = Math.max(0, Math.min(approx, pages - 1));
        setPageIndex(bounded);
      });
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => {
      el.removeEventListener("scroll", handler);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [pages, visibleCount, cardWidth]);

  // Drag-to-scroll (pointer events)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeftStart = 0;

    const onPointerDown = (e) => {
      isDown = true;
      try { el.setPointerCapture?.(e.pointerId); } catch {}
      el.classList.add("dragging");
      startX = e.clientX;
      scrollLeftStart = el.scrollLeft;
    };
    const onPointerMove = (e) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      el.scrollLeft = scrollLeftStart - dx;
    };
    const onPointerUpOrLeave = (e) => {
      if (!isDown) return;
      isDown = false;
      try { el.releasePointerCapture?.(e.pointerId); } catch {}
      el.classList.remove("dragging");
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUpOrLeave);
    el.addEventListener("pointercancel", onPointerUpOrLeave);
    el.addEventListener("pointerleave", onPointerUpOrLeave);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUpOrLeave);
      el.removeEventListener("pointercancel", onPointerUpOrLeave);
      el.removeEventListener("pointerleave", onPointerUpOrLeave);
    };
  }, [containerRef, cardWidth, visibleCount]);

  // Wheel -> horizontal translate
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      const canScroll = el.scrollWidth > el.clientWidth + 2;
      if (!canScroll) return;
      // convert vertical wheel to horizontal scroll
      if (Math.abs(e.deltaY) > 0 || Math.abs(e.deltaX) > 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY || e.deltaX;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [containerRef]);

  const marqueeTexts = [
    "VEGETARIAN DONE BETTER AND ENJOYING YOUR FOOD",
    "BRINGING YOU THE BEST IN SNACKS, DESSERTS & DAIRY AMAZING FOOD & TASTY DRINKS!"
  ];

  return (
    <div className="w-full px-4">
      <style>{`
        /* hide native scrollbar */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* marquee */
        @keyframes marqueeAnim { 0% { transform: translateX(0%);} 100% { transform: translateX(-50%);} }

        /* fade in up */
        @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(8px);} 100% { opacity: 1; transform: translateY(0);} }

        /* mandala rotation */
        @keyframes mandalaSlow { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
        @keyframes mandalaFast { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
        .animate-mandala-slow { animation: mandalaSlow 30s linear infinite; transform-origin: 50% 50%; }
        .group:hover .animate-mandala-fast { animation: mandalaFast 6s linear infinite; }

        .fade-in { animation: fadeInUp 360ms ease both; }

        .mandala {
          opacity: 0;
          transform: scale(.95);
          transition: opacity 320ms cubic-bezier(.2,.9,.2,1), transform 420ms cubic-bezier(.2,.9,.2,1);
          pointer-events: none;
          will-change: opacity, transform;
          display: none; /* default mobile hidden */
        }
        .mandala.show { opacity: 1; transform: scale(1.05); display: block; }

        /* Card sizing: compact box size */
        .card {
          width: 76vw;
          max-width: 300px;
          box-sizing: border-box;
        }
        @media (min-width: 720px) {
          .card {
            width: 220px;
            max-width: none;
          }
          .mandala { display: block; } /* enable mandala on larger screens */
        }

        .snap-mandatory { scroll-snap-type: x mandatory; }
        .snap-center { scroll-snap-align: center; }

        /* dragging cursor */
        .dragging { cursor: grabbing !important; }
        .no-scrollbar { cursor: grab; }
        .no-scrollbar:active { cursor: grabbing; }

        /* small focus ring */
        button:focus { outline: 3px solid rgba(59,130,246,0.18); outline-offset: 2px; border-radius: 8px; }
      `}</style>

      <TopMarquee texts={marqueeTexts} speed={12} />

      <div className="max-w-7xl mx-auto -mt-1 bg-[#f6efe6] rounded-2xl overflow-hidden shadow-lg">
        <div className="px-6 pt-6 pb-12">
          {/* Categories */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-3 flex-wrap">
              {CATEGORIES.map((cat) => {
                const active = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      active ? "bg-[#111827] text-white shadow-xl transform scale-105" : "bg-transparent text-gray-800 hover:bg-white/60"
                    }`}
                    aria-pressed={active}
                    aria-label={`Select ${cat.label}`}
                  >
                    <span className="inline-flex items-center justify-center w-3 h-3 rounded-full ring-1 ring-white/20" style={{ background: cat.color }} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Carousel with drag + wheel */}
          <div className="relative">
            <div
              key={animKey}
              ref={containerRef}
              className="flex gap-4 overflow-x-auto snap-mandatory py-6 px-2 no-scrollbar fade-in"
              style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch", alignItems: "start" }}
              aria-label="Product carousel"
            >
              {items.map((p, i) => (
                <div key={p.id} className="snap-center" style={{ scrollSnapAlign: "center" }}>
                  <ProductCard product={p} isCenter={i === centerIndex} idx={i} hoveredCardId={hoveredCardId} onHoverChange={setHoveredCardId} />
                </div>
              ))}
            </div>

            {/* controls */}
            <div className="w-full flex justify-center mt-4">
              <div className="inline-flex items-center gap-3 bg-[#111827] rounded-full px-3 py-2 shadow-lg">
                <button onClick={prev} className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition" aria-label="Previous">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 2L4 6l4.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div className="flex items-center gap-2 px-2">
                  {Array.from({ length: pages }).map((_, i) => (
                    <button key={i} onClick={() => scrollToPage(i)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === pageIndex ? "bg-white scale-110" : "bg-white/40"}`} aria-label={`Go to page ${i+1}`} />
                  ))}
                </div>

                <button onClick={next} className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition" aria-label="Next">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 2L8 6l-4.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div className="w-px h-6 bg-white/20 mx-3" />

                <a href="/products" className="inline-flex items-center gap-2 bg-white text-black px-3 py-2 rounded-full font-semibold hover:bg-gray-100 transition" aria-label="View all products">
                  View All
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L8 5.5L1 10" stroke="#111827" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}
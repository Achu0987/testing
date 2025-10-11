// V256.jsx
import React, { useEffect, useRef, useState } from "react";

/*
  V256.jsx
  - Single-file React component (requires TailwindCSS configured).
  - Inline Tailwind utility classes only (no external CSS).
  - Matches the visual layout you provided: purple top marquee, centered category pills,
    beige rounded panel, horizontal carousel with center card enlarged + mandala,
    and centered black pill controls (prev/dots/next + View All).
*/

const CATEGORIES = [
  { id: "popular", label: "Most Popular", color: "#111827" },
  { id: "samosas", label: "Samosas", color: "#C6A26D" },
  { id: "desserts", label: "Desserts", color: "#811B48" },
  { id: "snacks", label: "Snacks", color: "#E65300" },
  { id: "dairy", label: "Dairy", color: "#3BB3E3" }
];

const PRODUCTS = {
  dairy: [
    {
      id: "makhani-250",
      title: "Makhani (250g)",
      img: "https://cdn.sanity.io/images/krc73rcv/production/692f2327d9d5d2afb1792e5a89939f93e65c2b1e-840x587.png?w=320&auto=format",
      color: "#e87200",
      tags: ["Vegetarian", "Gelatin Free"]
    },
    {
      id: "nut-shrikhand",
      title: "Nut Mix Shrikhand",
      img: "https://cdn.sanity.io/images/krc73rcv/production/7d765556bb02b48db3b7442103da270211ef6884-840x587.png?w=320&auto=format",
      color: "#711d5b",
      tags: ["Vegetarian", "Gelatin Free"]
    },
    {
      id: "makhani-500",
      title: "Makhani (500g)",
      img: "https://cdn.sanity.io/images/krc73rcv/production/762d01b46e41d514b952fa3cc283c295497b8281-840x587.png?w=320&auto=format",
      color: "#e87200",
      tags: ["Vegetarian", "Gelatin Free"]
    },
    {
      id: "malai-paneer",
      title: "Malai Paneer (375g)",
      img: "https://cdn.sanity.io/images/krc73rcv/production/79f7fb366ad3daccfcab544c7f0499a3250ce0af-840x587.png?w=320&auto=format",
      color: "#e87200",
      tags: ["Vegetarian", "Halal", "Gelatin Free"]
    },
    {
      id: "ghee-800",
      title: "Pure Desi Ghee (800g)",
      img: "https://cdn.sanity.io/images/krc73rcv/production/af7627ef864e4aaa9caa9349ee24b60ad632b548-840x587.png?w=320&auto=format",
      color: "#e87200",
      tags: ["Vegetarian", "Halal", "Gelatin Free"]
    },
    {
      id: "malai-dahi-6",
      title: "Malai Dahi 6% (650g)",
      img: "https://cdn.sanity.io/images/krc73rcv/production/ba6a6a9601cb1dd2f6153a645700c2e485bf1083-840x587.png?w=320&auto=format",
      color: "#ebf2fa",
      tags: ["Vegetarian", "Gluten Free", "Gelatin Free"]
    },
    {
      id: "malai-dahi-2",
      title: "Malai Dahi 2% (650g)",
      img: "https://cdn.sanity.io/images/krc73rcv/production/fa3bc8ad5e49543eb741ae3d583c42149f3ecbfb-840x587.png?w=320&auto=format",
      color: "#00a6ce",
      tags: ["Vegetarian", "Gluten Free", "Gelatin Free"]
    }
  ],
  samosas: [
    { id: "s1", title: "Samosa Classic", img: "https://placehold.co/300x220?text=Samosa+1", color: "#C6A26D", tags: ["Vegetarian"] },
    { id: "s2", title: "Paneer Samosa", img: "https://placehold.co/300x220?text=Paneer", color: "#C6A26D", tags: ["Vegetarian"] },
    { id: "s3", title: "Aloo Samosa", img: "https://placehold.co/300x220?text=Aloo", color: "#C6A26D", tags: ["Vegetarian"] }
  ],
  desserts: [
    { id: "d1", title: "Milk Cake", img: "https://placehold.co/300x220?text=Milk+Cake", color: "#811B48", tags: ["Vegetarian"] },
    { id: "d2", title: "Gulab Jamun", img: "https://placehold.co/300x220?text=Gulab+Jamun", color: "#811B48", tags: ["Vegetarian"] }
  ],
  snacks: [
    { id: "sn1", title: "Potatoes & Peas Samosas", img: "https://placehold.co/300x220?text=Potato+Samosa", color: "#E65300", tags: ["Vegan","Vegetarian","Halal","Gelatin Free"] },
    { id: "sn2", title: "Spicy Chips", img: "https://placehold.co/300x220?text=Chips", color: "#E65300", tags: ["Vegetarian"] }
  ]
};

// create popular using some dairy + snacks
PRODUCTS.popular = [...PRODUCTS.dairy.slice(0, 4), ...(PRODUCTS.snacks || [])];

function TopMarquee({ texts = [] }) {
  const ref = useRef(null);
  const pos = useRef(0);
  const last = useRef(null);
  const speed = 0.25;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let mounted = true;
    pos.current = 0;
    last.current = null;

    const step = (t) => {
      if (!mounted) return;
      if (last.current == null) last.current = t;
      const dt = t - last.current;
      last.current = t;
      pos.current += dt * speed;
      const width = el.scrollWidth / 2 || 1;
      if (pos.current >= width) pos.current -= width;
      el.style.transform = `translateX(${-pos.current}px)`;
      requestAnimationFrame(step);
    };

    const raf = requestAnimationFrame(step);
    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
    };
  }, [texts]);

  return (
    <div className="w-full bg-[#7d2a61] rounded-t-xl px-4">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-hidden">
          <div
            ref={ref}
            className="flex whitespace-nowrap items-center gap-8 text-sm font-semibold text-white py-2"
            style={{ transform: "translateX(0px)" }}
          >
            {[...texts, ...texts].map((t, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-xs">●</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, isCenter }) {
  return (
    <div className={`w-64 flex-shrink-0 snap-center px-3 transition-transform duration-300 ${isCenter ? "scale-110 z-30" : "scale-100 z-10"}`}>
      <div className="relative bg-transparent rounded-xl flex flex-col items-center">
        <div className="relative w-full flex justify-center">
          {isCenter && (
            <div className="absolute -top-10 z-0" aria-hidden>
              <div style={{ color: product.color || "#e87200" }} className="opacity-90">
                {/* mandala SVG */}
                <svg width="220" height="220" viewBox="0 0 427 428" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M397.696 107.189C390.252 94.3553 375.411 89.8893 355.889 93.8703C355.584 92.438 355.054 91.0171 354.276 89.6863C351.49 84.882 346.336 82.3218 341.149 82.5925C337.991 66.4201 331.45 49.3455 321.57 31.3912C320.589 29.6093 318.695 28.5154 316.653 28.5717C295.857 29.068 277.564 32.1017 261.832 37.6504C261.539 36.8045 261.166 35.97 260.704 35.1692C257.411 29.4852 250.802 26.9364 244.746 28.5153C238.261 10.7866 227.197 0.895941 212.829 0.929774C198.213 0.95233 187.037 11.2603 180.677 29.6206C177.248 28.8198 173.538 29.2597 170.256 31.1543C167.47 32.7671 165.44 35.1918 164.279 37.9549C148.467 32.3836 130.073 29.3725 109.13 28.9552C107.089 28.9214 105.205 30.0266 104.224 31.7972C94.1304 50.259 87.5892 67.796 84.5893 84.3518C81.5331 83.9233 78.3189 84.4646 75.443 86.1338C72.2401 87.9946 70.0409 90.9156 69.0034 94.1861C50.0228 90.6675 35.621 95.2688 28.3807 107.889C21.2644 120.261 24.2755 134.685 36.2526 149.03C30.9407 153.395 29.3957 161.086 32.9595 167.221C33.4783 168.112 34.076 168.924 34.7414 169.657C22.5501 180.416 11.2271 194.457 0.795087 211.724C-0.265029 213.472 -0.265029 215.648 0.795087 217.396C11.3286 234.674 22.7418 248.692 35.0233 259.418C31.437 263.884 30.749 270.278 33.794 275.534C34.6624 277.022 35.7676 278.297 37.0195 279.334C24.659 293.928 21.5125 308.6 28.7754 321.119C36.1849 333.896 50.8912 338.385 70.244 334.528C70.5485 336.005 71.0785 337.449 71.868 338.825C74.71 343.731 80.0332 346.302 85.345 345.896C88.5254 362.012 95.0439 379.042 104.901 396.928C105.882 398.71 107.777 399.804 109.818 399.748C130.479 399.263 148.636 396.274 164.29 390.793C164.583 391.661 164.967 392.519 165.451 393.342C168.812 399.139 175.613 401.665 181.759 399.894C188.255 417.555 199.296 427.412 213.63 427.39C228.179 427.367 239.321 417.161 245.704 398.947C249.065 399.68 252.697 399.218 255.9 397.357C258.775 395.688 260.839 393.161 261.99 390.297C277.846 395.913 296.308 398.947 317.341 399.364C319.371 399.409 321.266 398.315 322.247 396.522C332.284 378.139 338.814 360.693 341.837 344.193C344.814 344.554 347.915 344.001 350.712 342.377C353.994 340.471 356.227 337.46 357.231 334.088C376.336 337.686 390.816 333.096 398.102 320.431C405.229 308.048 402.207 293.612 390.196 279.255C395.282 274.857 396.703 267.323 393.196 261.29C392.688 260.421 392.102 259.621 391.459 258.899C403.763 248.106 415.176 233.997 425.687 216.596C426.747 214.848 426.747 212.66 425.687 210.923C415.131 193.611 403.684 179.559 391.38 168.823C394.775 164.368 395.373 158.131 392.384 152.977C391.538 151.523 390.467 150.282 389.26 149.256C401.812 134.561 405.038 119.798 397.73 107.189H397.696Z" />
                </svg>
              </div>
            </div>
          )}
          <div className="relative z-10 pt-6 pb-4 flex justify-center">
            <img src={product.img} alt={product.title} className="w-36 h-36 object-contain" loading="lazy" />
          </div>
        </div>

        <div className="mt-3 text-center">
          <h4 className={`text-lg font-extrabold ${isCenter ? "text-black" : "text-gray-900"}`}>{product.title}</h4>
          <div className="mt-2 flex items-center justify-center gap-2 flex-wrap">
            {product.tags?.slice(0, 3).map((t) => (
              <span key={t} className="text-xs text-[#E65300] flex items-center gap-2">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="5" r="5" fill="#E65300" /></svg>
                <span className="text-xs text-gray-800">{t}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function V273() {
  // default category to 'popular' like the video
  const [activeCategory, setActiveCategory] = useState("popular");
  const [items, setItems] = useState(PRODUCTS.popular || []);
  const containerRef = useRef(null);

  // responsive visible count
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 4;
    const w = window.innerWidth;
    if (w >= 1280) return 4;
    if (w >= 1024) return 3;
    if (w >= 640) return 2;
    return 1;
  };
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);

  useEffect(() => {
    const onResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // update items when category changes
  useEffect(() => {
    setItems(PRODUCTS[activeCategory] || []);
    setPageIndex(0);
    if (containerRef.current) containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
  }, [activeCategory]);

  // pagination math
  const cardWidth = 256; // w-64
  const gap = 16; // gap-4
  const pages = Math.max(1, Math.max(0, items.length - visibleCount + 1));
  const [pageIndex, setPageIndex] = useState(0);

  // recompute center index based on pageIndex & visibleCount
  const centerOffset = Math.floor(visibleCount / 2);
  const centerIndex = Math.min(items.length - 1, pageIndex + centerOffset);

  // scroll helper
  const scrollToPage = (p) => {
    const el = containerRef.current;
    if (!el) return;
    const left = p * (cardWidth + gap);
    el.scrollTo({ left, behavior: "smooth" });
    setPageIndex(p);
  };

  const next = () => scrollToPage(Math.min(pageIndex + 1, pages - 1));
  const prev = () => scrollToPage(Math.max(pageIndex - 1, 0));

  // sync pageIndex while user scrolls manually
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let rafId = null;
    const handler = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const sLeft = el.scrollLeft;
        const approx = Math.round(sLeft / (cardWidth + gap));
        const bounded = Math.max(0, Math.min(approx, pages - 1));
        setPageIndex(bounded);
      });
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => {
      el.removeEventListener("scroll", handler);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [pages]);

  const marqueeTexts = ["VEGETARIAN DONE BETTER", "BRINGING YOU THE BEST IN SNACKS, DESSERTS & DAIRY!"];

  return (
    <div className="w-full px-4">
      {/* top purple marquee strip */}
      <TopMarquee texts={marqueeTexts} />

      {/* main rounded beige panel */}
      <div className="max-w-7xl mx-auto -mt-2 bg-[#f6efe6] rounded-2xl overflow-hidden">
        <div className="px-8 pt-8 pb-12">
          {/* categories (centered horizontal) */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-6">
              {CATEGORIES.map((cat) => {
                const active = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-full text-sm font-semibold transition ${
                      active ? "bg-[#111827] text-white shadow-lg" : "bg-transparent text-gray-800"
                    }`}
                  >
                    <span className="inline-flex items-center justify-center w-3 h-3 rounded-full" style={{ background: cat.color }} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* carousel */}
          <div className="relative">
            <div
              ref={containerRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-6 px-6"
              style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
            >
              {items.map((p, i) => (
                <ProductCard key={p.id} product={p} isCenter={i === centerIndex} />
              ))}
            </div>

            {/* centered black pill controls */}
            <div className="w-full flex justify-center mt-6">
              <div className="inline-flex items-center gap-4 bg-[#111827] rounded-full px-4 py-3 shadow-lg">
                {/* prev */}
                <button onClick={prev} className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center" aria-label="Previous">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 2L4 6l4.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>

                {/* dots */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: pages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToPage(i)}
                      className={`w-2.5 h-2.5 rounded-full ${i === pageIndex ? "bg-white" : "bg-white/40"}`}
                      aria-label={`Go to page ${i + 1}`}
                    />
                  ))}
                </div>

                {/* next */}
                <button onClick={next} className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center" aria-label="Next">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2L8 6l-4.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>

                {/* divider */}
                <div className="w-px h-6 bg-white/20 mx-3" />

                {/* View All */}
                <a href="/products" className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-semibold">
                  View All
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L8 5.5L1 10" stroke="#111827" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
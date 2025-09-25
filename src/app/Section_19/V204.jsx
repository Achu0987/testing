import React, { useRef, useState, useEffect, useCallback } from "react";

// --- Product Data (unchanged) ---
const PRODUCTS = [
  {
    id: "p1",
    name: "Blackberry Pucker",
    pricePer100g: 550,
    img: "https://cdn.shopify.com/s/files/1/0917/0101/8909/files/Frame1.png?v=1755613400",
    tags: ["gluten free", "sweet"],
    href: "/shop/sugar-rush/banana-caramel-marshmallow-mushrooms",
  },
  {
    id: "p2",
    name: "Sweet & Cute",
    pricePer100g: 550,
    img: "https://cdn.shopify.com/s/files/1/0917/0101/8909/files/Frame3.png?v=1755613436",
    tags: ["gluten free", "sweet"],
    href: "/shop/sugar-rush/banana-marshmallow",
  },
  {
    id: "p3",
    name: "Strawberry Teddy",
    pricePer100g: 550,
    img: "https://cdn.shopify.com/s/files/1/0917/0101/8909/files/Frame2.png?v=1755613579",
    tags: ["gelatin free", "gluten free", "sweet"],
    href: "/shop/sugar-rush/blue-smiles",
  },
  {
    id: "p4",
    name: "The Crown",
    pricePer100g: 550,
    img: "https://cdn.shopify.com/s/files/1/0917/0101/8909/files/Frame4.png?v=1755611865",
    tags: ["gelatin free", "gluten free", "sour"],
    href: "/shop/sour-power/bubs-foamy-pear-ovals",
  },
  {
    id: "p5",
    name: "Choco & Almond Blend",
    pricePer100g: 550,
    img: "https://cdn.shopify.com/s/files/1/0917/0101/8909/files/Frame14.png?v=1755674775",
    tags: ["chocolate", "gelatin free", "gluten free"],
    href: "/shop/cocoa-bliss/center-caramel-caps",
  },
  {
    id: "p6",
    name: "Sweet & Green",
    pricePer100g: 550,
    img: "https://cdn.shopify.com/s/files/1/0917/0101/8909/files/Frame46.png?v=1755613972",
    tags: ["gluten free", "sweet"],
    href: "/shop/sugar-rush/cola-chestnuts",
  },
  {
    id: "p7",
    name: "The Knot",
    pricePer100g: 550,
    img: "https://cdn.shopify.com/s/files/1/0917/0101/8909/files/Frame19.png?v=1755675374",
    tags: ["liquorice"],
    href: "/shop/licorizz/peppermint-licorice-chalk",
  },
];

// --- Buzz Sound ---
function useBuzz() {
  return function playBuzz() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sawtooth";
      o.frequency.value = 120;
      g.gain.value = 0.02;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      setTimeout(() => {
        o.frequency.setValueAtTime(300, ctx.currentTime + 0.02);
      }, 18);
      setTimeout(() => {
        o.stop();
        ctx.close();
      }, 160);
    } catch (e) {}
  };
}

// --- Main Component ---
export default function V206() {
  const [cart, setCart] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState(() =>
    PRODUCTS.reduce((acc, p) => {
      acc[p.id] = 100;
      return acc;
    }, {})
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recentAdded, setRecentAdded] = useState(null); // productId for toast
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const playBuzz = useBuzz();

  // --- Helpers ---
  const removeProductFromCart = (productId) => {
    setCart((prev) => prev.filter((it) => it.productId !== productId));
    playBuzz();
    setIsCartOpen(false);
  };

  const clearAllAndClose = () => {
    setCart([]);
    playBuzz();
    setIsCartOpen(false);
  };

  const changeWeight = (productId, delta) => {
    setSelectedWeights((prev) => {
      const current = prev[productId] || 100;
      let next = current + delta;
      if (next < 100) next = 100;
      if (next > 1000) next = 1000;
      playBuzz();
      return { ...prev, [productId]: next };
    });
  };

  const addToCart = (productId) => {
    const weight = selectedWeights[productId] || 100;
    setCart((prev) => {
      const idx = prev.findIndex((it) => it.productId === productId && it.weight === weight);
      if (idx !== -1) {
        const next = [...prev];
        next[idx].qty += 1;
        return next;
      }
      return [...prev, { productId, weight, qty: 1 }];
    });
    setIsCartOpen(true);          // open cart (will be bottom sheet on mobile)
    setRecentAdded(productId);    // show small toast
    playBuzz();
    setTimeout(() => setRecentAdded(null), 1600);
  };

  const updateCartItemWeight = (index, newWeight) => {
    setCart((prev) => {
      const clone = [...prev];
      clone[index] = { ...clone[index], weight: newWeight };
      return clone;
    });
  };

  const updateCartItemQty = (index, delta) => {
    setCart((prev) => {
      const clone = [...prev];
      clone[index].qty = Math.max(1, clone[index].qty + delta);
      return clone;
    });
  };

  const removeCartItem = (index) => setCart((prev) => prev.filter((_, i) => i !== index));

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount);

  const productById = (id) => PRODUCTS.find((p) => p.id === id);

  const total = cart.reduce((sum, it) => {
    const p = productById(it.productId);
    if (!p) return sum;
    return sum + (p.pricePer100g * it.weight * it.qty) / 100;
  }, 0);

  // --- Carousel active tracking ---
  const handleScrollActive = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const children = Array.from(slider.children);
    const sliderRect = slider.getBoundingClientRect();
    const sliderCenter = sliderRect.left + sliderRect.width / 2;
    let closestIdx = 0;
    let closestDist = Infinity;
    children.forEach((child, idx) => {
      const r = child.getBoundingClientRect();
      const childCenter = r.left + r.width / 2;
      const dist = Math.abs(childCenter - sliderCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = idx;
      }
    });
    setActiveIndex(closestIdx);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    let raf = null;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(handleScrollActive);
    };
    slider.addEventListener("scroll", onScroll, { passive: true });
    handleScrollActive();
    return () => {
      slider.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [handleScrollActive]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        const idx = Math.max(0, activeIndex - 1);
        setActiveIndex(idx);
        sliderRef.current?.children[idx]?.scrollIntoView({ behavior: "smooth", inline: "center" });
      } else if (e.key === "ArrowRight") {
        const idx = Math.min(PRODUCTS.length - 1, activeIndex + 1);
        setActiveIndex(idx);
        sliderRef.current?.children[idx]?.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  // Prevent body scroll when cart open
  useEffect(() => {
    if (isCartOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isCartOpen]);

  return (
    <section
      className="flex flex-col items-center py-12 sm:py-20 px-4 sm:px-6"
      style={{
        background: "radial-gradient(ellipse,#9A88B6 0%, #ECE7F2 68%)",
      }}
    >
      {/* Styles */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #000, #7c3aed, #000);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 2.5s linear infinite;
        }
        .icon-btn {
          transition: transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
        }
        .icon-btn:hover { transform: scale(1.06); box-shadow: 0 6px 20px rgba(0,0,0,0.12); }
        .carousel-container { -webkit-overflow-scrolling: touch; scrollbar-width: none; }
        .carousel-container::-webkit-scrollbar { display: none; }
        .product-card { min-width: 84%; max-width: 88%; border-radius: 1rem; }
        @media (min-width: 640px) { .product-card { min-width: 320px; max-width: 380px; } }

        /* Cart panel responsive: desktop slide from right, mobile bottom sheet */
        .cart-panel {
          position: fixed;
          top: 0;
          right: 0;
          height: 100%;
          background: white;
          z-index: 70;
          box-shadow: 0 16px 60px rgba(11,8,30,0.18);
          transition: transform 320ms cubic-bezier(.2,.9,.3,1);
          border-left: 1px solid rgba(0,0,0,0.04);
        }
        /* states for open/closed on desktop */
        .cart-panel.closed { transform: translateX(110%); }
        .cart-panel.open { transform: translateX(0); }

        /* mobile override: bottom sheet */
        @media (max-width: 768px) {
          .cart-panel {
            left: 0;
            right: 0;
            top: auto;
            bottom: 0;
            height: 86vh;
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
            border-left: none;
            box-shadow: 0 -12px 40px rgba(11,8,30,0.22);
          }
          .cart-panel.closed { transform: translateY(110%); }
          .cart-panel.open { transform: translateY(0); }
        }

        /* backdrop */
        .backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 60;
          opacity: 1;
          transition: opacity 220ms ease;
        }
        .backdrop.hidden { opacity: 0; pointer-events: none; }

        /* big cancel/clear button */
        .clear-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          border-radius: 999px;
          background: rgba(255, 59, 48, 0.06);
          color: #ff3b30;
          border: 1px solid rgba(255,59,48,0.12);
          font-weight: 600;
        }

        /* added toast */
        .added-toast {
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          bottom: 6.25rem;
          z-index: 80;
          background: linear-gradient(180deg, #fff, #f8fafc);
          padding: 0.6rem 1rem;
          border-radius: 999px;
          box-shadow: 0 8px 26px rgba(2,6,23,0.14);
          display: flex;
          gap: 0.6rem;
          align-items: center;
          transition: opacity 180ms ease, transform 220ms ease;
        }
        .added-toast.hidden { opacity: 0; transform: translateX(-50%) translateY(8px); pointer-events: none; }
      `}</style>

      {/* Heading */}
      <div className="max-w-3xl text-center">
        
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-black mt-2 leading-tight" style={{ maxWidth: "900px", margin: "0 auto" }}>
          OUR BESTSELLING TREATS
        </h1>
        <p className="mt-3 text-gray-700 text-sm sm:text-lg leading-relaxed max-w-3xl mx-auto">
          Sweet, sour, chewy, or fruity – we’ve got the right candy for every mood.
        </p>
      </div>

      {/* Carousel */}
      <div className="w-full mt-6 relative max-w-6xl">
        <div className="overflow-x-auto carousel-container">
          <div ref={sliderRef} className="flex gap-5 px-2 py-6 items-start scroll-smooth snap-x" style={{ scrollSnapType: "x mandatory" }}>
            {PRODUCTS.map((p, idx) => (
              <div key={p.id} className="product-card bg-white/95 overflow-hidden flex-shrink-0 transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl snap-center relative" style={{ boxShadow: "0 10px 30px rgba(17,9,40,0.08)" }}>
                <div className="absolute top-3 right-3 z-20">
                  {cart.some((it) => it.productId === p.id) && (
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeProductFromCart(p.id); }} className="p-2 bg-white/95 rounded-full shadow hover:bg-gray-100" title="Remove all of this product from cart" aria-label={`Remove ${p.name} from cart`}>✕</button>
                  )}
                </div>

                <a href={p.href} target="_top" rel="noreferrer" className="block">
                  <div className="bg-gradient-to-b from-purple-50 to-white h-56 sm:h-72 md:h-80 flex items-center justify-center relative">
                    <img alt={p.name} src={p.img} className="max-h-[84%] w-auto object-contain" />
                  </div>
                </a>

                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/95 text-xs font-semibold rounded-full shadow-sm">{tag}</span>
                  ))}
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-base truncate">{p.name}</p>
                    <div className="text-gray-900 font-extrabold text-base">{formatPrice(p.pricePer100g)} RSD</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={() => changeWeight(p.id, -100)} className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center hover:bg-purple-200 touch-manipulation" aria-label={`Decrease weight for ${p.name}`}>−</button>
                      <div className="text-sm px-3 py-1 bg-white rounded shadow-sm">{(selectedWeights[p.id] || 100) + "g"}</div>
                      <button onClick={() => changeWeight(p.id, 100)} className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center hover:bg-purple-200 touch-manipulation" aria-label={`Increase weight for ${p.name}`}>+</button>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      {formatPrice((p.pricePer100g * (selectedWeights[p.id] || 100)) / 100)} RSD
                    </div>
                  </div>

                  <div className="flex gap-3 mt-1">
                    <button onClick={() => addToCart(p.id)} className="flex-1 bg-gradient-to-r from-yellow-300 to-lime-300 text-black font-semibold py-3 rounded-full border-2 border-yellow-400 shadow-md" aria-label={`Add ${p.name} to cart`}>Add to cart +</button>
                    <button onClick={() => window.open(p.href, "_top")} className="px-4 py-3 rounded-full border border-gray-200 bg-white" aria-label={`View ${p.name}`}>View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow Controls (desktop only) */}
        <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 flex-col gap-3 z-30">
          <button onClick={() => { const slider = sliderRef.current; if (!slider) return; const idx = Math.max(0, activeIndex - 1); setActiveIndex(idx); slider.children[idx]?.scrollIntoView({ behavior: "smooth", inline: "center" }); }} className="icon-btn p-3 rounded-full bg-white/95 text-purple-700 shadow-md" title="Previous" aria-label="Previous product">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>

          <button onClick={() => { const slider = sliderRef.current; if (!slider) return; const idx = Math.min(PRODUCTS.length - 1, activeIndex + 1); setActiveIndex(idx); slider.children[idx]?.scrollIntoView({ behavior: "smooth", inline: "center" }); }} className="icon-btn p-3 rounded-full bg-white/95 text-purple-700 shadow-md" title="Next" aria-label="Next product">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Mobile dots */}
        <div className="flex gap-2 justify-center mt-3 md:hidden">
          {PRODUCTS.map((_, i) => (
            <button key={i} onClick={() => { sliderRef.current?.children[i]?.scrollIntoView({ behavior: "smooth", inline: "center" }); }} className={`w-2 h-2 rounded-full ${i === activeIndex ? "bg-purple-700" : "bg-gray-300"}`} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6">
        <a href="/shop" target="_top" rel="noreferrer">
          <button className="bg-purple-800 text-white px-6 py-3 rounded-full border-4 border-purple-800 hover:bg-purple-600">TREAT YOURSELF</button>
        </a>
      </div>

      {/* Backdrop (closes cart when tapped) */}
      {isCartOpen ? (
        <div className="backdrop" onClick={() => setIsCartOpen(false)} aria-hidden="true" />
      ) : (
        <div className="backdrop hidden" aria-hidden="true" />
      )}

      {/* Cart Panel (desktop: right drawer, mobile: bottom sheet) */}
      <div className={`cart-panel ${isCartOpen ? "open" : "closed"}`} role="dialog" aria-label="Shopping cart">
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Shopping cart</h3>
            <div className="text-sm text-gray-600">{cart.length} items • {formatPrice(total)} RSD</div>
          </div>

          <div className="flex gap-2 items-center">
            {/* Clear all (prominent cancel symbol) */}
            <button onClick={clearAllAndClose} className="clear-all-btn" aria-label="Clear all items from cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6v12a2 2 0 002 2h4a2 2 0 002-2V6M10 11v6M14 11v6M9 6V4h6v2" />
              </svg>
              <span className="text-xs">Clear</span>
            </button>

            {/* Close */}
            <button onClick={() => setIsCartOpen(false)} className="p-2 bg-gray-100 rounded-full" aria-label="Close cart">✕</button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-180px)]">
          {cart.length === 0 && <div className="text-gray-500">Your cart is empty.</div>}
          {cart.map((it, idx) => {
            const p = productById(it.productId);
            if (!p) return null;
            const itemPrice = (p.pricePer100g * it.weight) / 100;
            return (
              <div key={idx} className="flex gap-4 mb-4 items-start relative">
                <img src={p.img} alt={p.name} className="w-20 h-20 object-contain bg-gray-50 rounded" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-gray-600">{it.weight}g • {formatPrice(itemPrice)} RSD</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">x{it.qty}</div>
                      <div className="text-sm font-bold">{formatPrice(itemPrice * it.qty)} RSD</div>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={() => { updateCartItemWeight(idx, Math.max(100, it.weight - 100)); playBuzz(); }} className="p-2 bg-purple-100 rounded" aria-label="Decrease item weight">−</button>
                    <div className="px-3 py-1 bg-gray-50 rounded">{it.weight}g</div>
                    <button onClick={() => { updateCartItemWeight(idx, Math.min(1000, it.weight + 100)); playBuzz(); }} className="p-2 bg-purple-100 rounded" aria-label="Increase item weight">+</button>

                    <div className="ml-auto flex items-center gap-2">
                      <button onClick={() => updateCartItemQty(idx, -1)} className="px-2 py-1 bg-gray-100 rounded" aria-label="Decrease quantity">−</button>
                      <div>{it.qty}</div>
                      <button onClick={() => updateCartItemQty(idx, 1)} className="px-2 py-1 bg-gray-100 rounded" aria-label="Increase quantity">+</button>

                      <button onClick={() => removeCartItem(idx)} className="ml-2 text-gray-400 hover:text-red-600 transition" title="Remove item" aria-label="Remove item">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-3">
            <div className="text-gray-600">Total</div>
            <div className="font-bold">{formatPrice(total)} RSD</div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => alert("Checkout not implemented in demo.")} className="flex-1 bg-purple-800 text-white px-4 py-3 rounded-full">Checkout</button>
            <button onClick={() => setCart([])} className="px-4 py-3 rounded-full border">Clear</button>
          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      <button className="fixed right-4 bottom-4 z-80 bg-white px-4 py-3 rounded-full flex items-center gap-3 shadow-lg" onClick={() => setIsCartOpen(true)} aria-label="Open cart">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
          {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">{cart.length}</span>}
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-xs text-gray-500">Cart</div>
          <div className="font-semibold">{formatPrice(total)} RSD</div>
        </div>
      </button>

      {/* Added Toast */}
      <div className={`added-toast ${recentAdded ? "" : "hidden"}`} aria-hidden={!recentAdded}>
        {recentAdded && (
          <>
            <img src={productById(recentAdded).img} alt="" className="w-8 h-8 object-contain rounded" />
            <div className="text-sm">
              <div className="font-semibold">Added to cart</div>
              <div className="text-xs text-gray-500">{productById(recentAdded).name}</div>
            </div>
            <button onClick={() => setRecentAdded(null)} className="ml-3 text-gray-400" aria-label="Dismiss toast">✕</button>
          </>
        )}
      </div>
    </section>
  );
}
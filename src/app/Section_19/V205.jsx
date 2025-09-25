import React, { useRef, useState } from "react";

// --- Product Data ---
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
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const playBuzz = useBuzz();

  // --- New helper: remove all cart entries for a product and close cart ---
  const removeProductFromCart = (productId) => {
    setCart((prev) => prev.filter((it) => it.productId !== productId));
    playBuzz();
    setIsCartOpen(false);
  };

  // Weight Control
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

  // Add to Cart
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
    setIsCartOpen(true);
  };

  // Cart Operations
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

  const removeCartItem = (index) =>
    setCart((prev) => prev.filter((_, i) => i !== index));

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount);

  const productById = (id) => PRODUCTS.find((p) => p.id === id);

  const total = cart.reduce((sum, it) => {
    const p = productById(it.productId);
    if (!p) return sum;
    return sum + (p.pricePer100g * it.weight * it.qty) / 100;
  }, 0);

  return (
    <section
      className="flex flex-col items-center py-20"
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
        .icon-btn:hover { transform: scale(1.08); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }
      `}</style>

      {/* Heading */}
      <div className="container mx-auto px-6 flex flex-col items-center">
        <p className="uppercase tracking-wide text-black font-bold text-base">
          SHOP THE LATEST SWEETS
        </p>
        <h1
          className=" text-4xl md:text-6xl font-black mt-2 leading-tight text-center"
          style={{ maxWidth: "900px" }}
        >
          OUR BESTSELLING TREATS
        </h1>
        <p className="mt-4 text-gray-700 text-lg leading-relaxed max-w-3xl text-center">
          Sweet, sour, chewy, or fruity – we’ve got the right candy for every mood.  
          From sharp bursts of sour to soft bites of sweetness, there’s always something to enjoy.
        </p>
      </div>

      {/* Carousel */}
      <div className="w-full mt-10 relative">
        <div className="overflow-x-hidden">
          <div
            ref={sliderRef}
            className="flex gap-6 px-6 py-8 items-start scroll-smooth snap-x"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {PRODUCTS.map((p) => (
              <div
                key={p.id}
                className="min-w-[320px] max-w-[380px] bg-white/90 rounded-3xl overflow-hidden flex-shrink-0 transition-all duration-400 hover:scale-105 hover:shadow-2xl snap-center relative"
                style={{ boxShadow: "0 10px 36px rgba(17, 9, 40, 0.10)" }}
              >
                {/* Cancel button (shows only if this product exists in cart) */}
                <div className="absolute top-3 right-3 z-20">
                  {cart.some((it) => it.productId === p.id) && (
                    <button
                      onClick={(e) => {
                        // stop propagation so link / other handlers don't trigger
                        e.preventDefault();
                        e.stopPropagation();
                        removeProductFromCart(p.id);
                      }}
                      className="p-2 bg-white/95 rounded-full shadow hover:bg-gray-100"
                      title="Remove all of this product from cart"
                      aria-label={`Remove ${p.name} from cart`}
                    >
                      ✕
                    </button>
                  )}
                </div>

                <a href={p.href} target="_top" rel="noreferrer" className="block">
                  <div className="bg-gradient-to-b from-purple-50 to-white h-80 flex items-center justify-center relative">
                    <img alt={p.name} src={p.img} className="h-full w-full object-contain" />
                  </div>
                </a>

                {/* Tags */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/95 text-xs font-semibold rounded-full shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-lg truncate">{p.name}</p>
                    <div className="text-gray-900 font-extrabold text-lg">
                      {formatPrice(p.pricePer100g)} RSD
                    </div>
                  </div>

                  {/* Weight */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeWeight(p.id, -100)}
                        className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center hover:bg-purple-200"
                      >
                        −
                      </button>
                      <div className="text-sm px-3 py-1 bg-white rounded shadow-sm">
                        {(selectedWeights[p.id] || 100) + "g"}
                      </div>
                      <button
                        onClick={() => changeWeight(p.id, 100)}
                        className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center hover:bg-purple-200"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      {formatPrice((p.pricePer100g * (selectedWeights[p.id] || 100)) / 100)} RSD
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => addToCart(p.id)}
                      className="flex-1 bg-gradient-to-r from-yellow-300 to-lime-300 text-black font-semibold py-3 rounded-full border-2 border-yellow-400 shadow-md"
                    >
                      Add to cart +
                    </button>
                    <button
                      onClick={() => window.open(p.href, "_top")}
                      className="px-4 py-3 rounded-full border border-gray-200 bg-white"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow Controls */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
          <button
            onClick={() => {
              const slider = sliderRef.current;
              if (!slider) return;
              const idx = Math.max(0, activeIndex - 1);
              setActiveIndex(idx);
              slider.children[idx]?.scrollIntoView({ behavior: "smooth", inline: "center" });
            }}
            className="icon-btn p-3 rounded-full bg-white/95 text-purple-700 shadow-md"
            title="Previous"
          >
            {/* Left Arrow Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => {
              const slider = sliderRef.current;
              if (!slider) return;
              const idx = Math.min(PRODUCTS.length - 1, activeIndex + 1);
              setActiveIndex(idx);
              slider.children[idx]?.scrollIntoView({ behavior: "smooth", inline: "center" });
            }}
            className="icon-btn p-3 rounded-full bg-white/95 text-purple-700 shadow-md"
            title="Next"
          >
            {/* Right Arrow Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8">
        <a href="/shop" target="_top" rel="noreferrer">
          <button className="bg-purple-800 text-white px-8 py-3 rounded-full border-4 border-purple-800 hover:bg-purple-600">
            TREAT YOURSELF
          </button>
        </a>
      </div>

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl transform transition-transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 60, width: "30rem" }}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-bold">Shopping cart</h3>
          <div className="flex gap-2 items-center">
            <div className="text-sm text-gray-600">{cart.length} items</div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 bg-gray-100 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
          {cart.length === 0 && (
            <div className="text-gray-500">Your cart is empty.</div>
          )}
          {cart.map((it, idx) => {
            const p = productById(it.productId);
            if (!p) return null;
            const itemPrice = (p.pricePer100g * it.weight) / 100;
            return (
              <div key={idx} className="flex gap-4 mb-4 items-start relative">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-20 h-20 object-contain bg-gray-50 rounded"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-gray-600">
                        {it.weight}g • {formatPrice(itemPrice)} RSD
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">x{it.qty}</div>
                      <div className="text-sm font-bold">
                        {formatPrice(itemPrice * it.qty)} RSD
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => {
                        updateCartItemWeight(idx, Math.max(100, it.weight - 100));
                        playBuzz();
                      }}
                      className="p-2 bg-purple-100 rounded"
                    >
                      −
                    </button>
                    <div className="px-3 py-1 bg-gray-50 rounded">{it.weight}g</div>
                    <button
                      onClick={() => {
                        updateCartItemWeight(idx, Math.min(1000, it.weight + 100));
                        playBuzz();
                      }}
                      className="p-2 bg-purple-100 rounded"
                    >
                      +
                    </button>

                    <div className="ml-auto flex items-center gap-2">
                      <button
                        onClick={() => updateCartItemQty(idx, -1)}
                        className="px-2 py-1 bg-gray-100 rounded"
                      >
                        −
                      </button>
                      <div>{it.qty}</div>
                      <button
                        onClick={() => updateCartItemQty(idx, 1)}
                        className="px-2 py-1 bg-gray-100 rounded"
                      >
                        +
                      </button>
                      {/* Cancel/Remove Button */}
                      <button
                        onClick={() => removeCartItem(idx)}
                        className="ml-2 text-gray-400 hover:text-red-600 transition"
                        title="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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
            <button
              onClick={() => alert("Checkout not implemented in demo.")}
              className="flex-1 bg-purple-800 text-white px-4 py-3 rounded-full"
            >
              Checkout
            </button>
            <button
              onClick={() => setCart([])}
              className="px-4 py-3 rounded-full border"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
     
    </section>
  );
}
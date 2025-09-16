"use client";

import React, { useState } from "react";

const images = [
  "https://glamourgallery-demo.zohoecommerce.com/product-images/11.webp/5317960000000103809/6", // yellow
  "https://glamourgallery-demo.zohoecommerce.com/product-images/6.webp/5317960000000103811/600x600", // blue
  "https://glamourgallery-demo.zohoecommerce.com/product-images/4.webp/5317960000000086865/600x600", // green
  "https://glamourgallery-demo.zohoecommerce.com/product-images/Background+Image.webp/5317960000000086857/600x600", // white
];

export default function V56() {
  const [color, setColor] = useState("yellow");
  const [size, setSize] = useState("L");
  const [qty, setQty] = useState(1);
  const [customOpen, setCustomOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);

  // New: accordion state for product information
  const [accordion, setAccordion] = useState({
    details: false,
    specs: false,
    reviews: false,
  });

  const toggleAccordion = (key) =>
    setAccordion((s) => ({ ...s, [key]: !s[key] }));

  const decrement = () => setQty((q) => Math.max(1, q - 1));
  const increment = () => setQty((q) => q + 1);

  const colorMap = { yellow: 0, blue: 1, green: 2, white: 3 };

  const colorOptions = [
    { key: "yellow", label: "Yellow", bg: "bg-yellow-400", ring: "ring-yellow-300" },
    { key: "blue", label: "Blue", bg: "bg-sky-400", ring: "ring-sky-300" },
    { key: "green", label: "Green", bg: "bg-emerald-400", ring: "ring-emerald-300" },
    { key: "white", label: "White", bg: "bg-white", ring: "ring-gray-300", border: true },
  ];

  return (
    <div className="w-full min-h-screen bg-white flex items-start justify-center p-8">
      <div className="w-full max-w-6xl flex gap-10">
        {/* Left: 2x2 Image layout */}
        <div className="flex-1">
          <div className="w-full bg-white grid grid-cols-2 gap-6">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`rounded-2xl overflow-hidden shadow-sm bg-gray-50 cursor-pointer transition-transform ${
                  selectedIndex === i ? "ring-2 ring-offset-2 ring-gray-300" : ""
                }`}
              >
                <img
                  src={img}
                  alt={`image-${i}`}
                  className={`w-full h-[420px] object-cover transition-transform duration-500 ${
                    selectedIndex === i ? "scale-110" : "scale-100"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product details */}
        <aside className="w-[420px]">
          <div className="flex items-start justify-between">
            <div className="flex gap-2">
              <span className="text-xs px-3 py-1 border border-gray-200 rounded-full text-gray-700 font-medium">
                Best Seller
              </span>
              <span className="text-xs px-3 py-1 border border-gray-200 rounded-full text-gray-700 font-medium">
                New
              </span>
            </div>
          </div>

          <h1 className="mt-4 text-2xl text-left font-extrabold text-gray-900">Sweatshirts</h1>

          <p className="mt-3 text-sm text-left text-gray-600 leading-6">
            Whether you're lounging at home, running errands, or enjoying outdoor activities, embrace comfort without compromising fashion with our versatile sweatshirts.
          </p>

          <div className="mt-6 flex items-baseline gap-4">
            <div className="text-3xl font-extrabold text-gray-900">Rs.1,899.00/-</div>
            <div className="text-sm text-gray-400 line-through">Rs.1,999.00</div>
          </div>

          {/* Color & Size */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            {/* Color */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">Color</div>
              <div className="flex items-center gap-3">
                {colorOptions.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => {
                      setColor(c.key);
                      setSelectedIndex(colorMap[c.key]);
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      c.border ? "border border-gray-300" : ""
                    } ${
                      color === c.key
                        ? "ring-2 ring-offset-2 " + (c.ring || "ring-gray-300")
                        : "border-gray-200"
                    }`}
                    aria-label={c.label}
                    title={c.label}
                  >
                    <span className={`w-5 h-5 rounded-full ${c.bg} ${c.key === "white" ? "border border-gray-200" : ""}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">Size</div>
              <div className="flex items-center gap-3">
                {["L", "XL", "XXL"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      size === s ? "bg-black text-white shadow-sm" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Customize */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <button
              onClick={() => setCustomOpen((v) => !v)}
              className="w-full flex items-center justify-between text-sm text-gray-700 py-3"
            >
              <span>Customize</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className={`${customOpen ? "transform rotate-180" : ""}`}
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="#374151"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {customOpen && (
              <div className="mt-3 text-sm text-gray-600">
                Add initials or a patch to your sweatshirt. (Sample placeholder content.)
              </div>
            )}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="text-sm text-gray-700 mb-3">Choose Quantity :</div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                <button onClick={decrement} className="px-3 py-2 text-gray-700 bg-white hover:bg-gray-50">
                  -
                </button>
                <div className="px-6 py-2 text-sm font-medium">{qty}</div>
                <button onClick={increment} className="px-3 py-2 text-gray-700 bg-white hover:bg-gray-50">
                  +
                </button>
              </div>

              <div className="flex-1 text-right">
                <button
                  onClick={() => setPopupOpen(true)}
                  className="px-6 py-3 bg-black text-white rounded-md w-full max-w-[260px] hover:opacity-95 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-400">
            Selected: {color} / {size} • Qty: {qty} • Image: {selectedIndex + 1}
          </div>

          {/* Product Information (ADDED BELOW Add to Cart) */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Product Information</h3>

            {/* Product Details */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleAccordion("details")}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gray-700">
                    <path d="M3 7a2 2 0 012-2h10l6 6v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 3v6h6" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-800">Product Details</span>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={`${accordion.details ? "transform rotate-180" : ""}`}>
                  <path d="M6 9l6 6 6-6" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {accordion.details && (
                <div className="px-1 pb-4 text-sm text-gray-600">
                  Soft cotton blend, relaxed fit, pre-washed for minimal shrinkage. Machine wash cold; tumble dry low.
                </div>
              )}
            </div>

            {/* Specifications */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleAccordion("specs")}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gray-700">
                    <path d="M9 2v4M15 2v4M3 10h18M5 14h14M7 18h10" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-800">Specifications</span>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={`${accordion.specs ? "transform rotate-180" : ""}`}>
                  <path d="M6 9l6 6 6-6" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {accordion.specs && (
                <div className="px-1 pb-4 text-sm text-gray-600">
                  Material: 80% cotton, 20% polyester. Weight: 320 GSM. Available sizes: L, XL, XXL.
                </div>
              )}
            </div>

            {/* Ratings and Reviews */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleAccordion("reviews")}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gray-700">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-800">Ratings And Reviews</span>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={`${accordion.reviews ? "transform rotate-180" : ""}`}>
                  <path d="M6 9l6 6 6-6" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {accordion.reviews && (
                <div className="px-1 pb-4 text-sm text-gray-600">
                  ⭐⭐⭐⭐☆ (4.2) — "Comfortable & good quality. True to size." — by Shankar
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Popup Modal */}
      {popupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative text-center animate-fadeIn scale-95">
            {/* Close button */}
            <button
              onClick={() => setPopupOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <div className="text-green-600 text-5xl mb-3">✔</div>
            <h2 className="text-xl font-bold text-gray-900">Added to Cart</h2>
            <p className="text-gray-600 mt-2">
              {qty} × {color} / {size} Sweatshirt added successfully.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setPopupOpen(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                Continue Shopping
              </button>
              <button className="flex-1 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition">
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";
import React, { useState, useEffect, useRef } from "react";

const PRODUCTS = [
  {
    slug: "dairy",
    title: "DAIRY",
    img: "https://cdn.sanity.io/images/krc73rcv/production/d58dac996908b557c32026e361441641bb625f3c-600x600.png?w=420&auto=format",
  },
  {
    slug: "desserts",
    title: "DESSERTS",
    img: "https://cdn.sanity.io/images/krc73rcv/production/9897ce7f3ed4077aa5c9561a5af520b6adc14e23-600x600.png?w=420&auto=format",
  },
  {
    slug: "snacks",
    title: "SNACKS",
    img: "https://cdn.sanity.io/images/krc73rcv/production/410f6e540030291f5e4d0419dc44de5908a2c73d-600x600.png?w=420&auto=format",
  },
  {
    slug: "samosas",
    title: "SAMOSAS",
    img: "https://cdn.sanity.io/images/krc73rcv/production/45577cae6d33ce9af02f7d7bfbb594bd6a9a23d5-600x600.png?w=420&auto=format",
  },
  {
    slug: "all",
    title: "ALL PRODUCTS",
    img: "https://cdn.sanity.io/images/krc73rcv/production/7dbaf862008dfa551e13976a42a113a1ee492ee5-840x587.png?w=120&auto=format&dpr=1",
  },
];

const TAGS = [
  {
    title: "VEGAN",
    img: "https://cdn.sanity.io/images/krc73rcv/production/4e2319bfd758f38c13e3a137cf9edc63bea4cf66-600x600.png?w=420&auto=format",
  },
  {
    title: "GELATIN FREE",
    img: "https://cdn.sanity.io/images/krc73rcv/production/56c728188c5eaa1145004ceb0b9caa726c60bdfe-500x500.png?w=420&auto=format",
  },
  {
    title: "GLUTEN FREE",
    img: "https://cdn.sanity.io/images/krc73rcv/production/71f4a2e540358457e9e5d4701248b3c985686dc1-600x600.png?w=420&auto=format",
  },
  {
    title: "HALAL",
    img: "https://cdn.sanity.io/images/krc73rcv/production/abc6bca16bfbadf70ddc4109b79d107c2b1605af-600x600.png?w=420&auto=format",
  },
];

export default function V260() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0); // 0 = Product Categories, 1 = Type of Products
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (
        open &&
        panelRef.current &&
        toggleRef.current &&
        !panelRef.current.contains(e.target) &&
        !toggleRef.current.contains(e.target)
      ) {
        setOpen(false);
        setTab(0);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  // Disable background scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <div
      className="min-h-screen bg-[#bcbcbc]/20 flex flex-col  p-4"
      style={{
        fontFamily:
          "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
      }}
    >
      {/* HEADER */}
      <div className="bg-[#1b1a1a] text-white flex items-center justify-between w-full max-w-[400px] rounded-xl px-4 py-3">
        <img
          src="https://cdn.sanity.io/images/krc73rcv/production/26fab2e70d6dd82eef0f22a10b3682347b638e7b-151x40.svg"
          alt="logo"
          className="h-8"
        />
        <div className="flex items-center gap-2">
          <button className="bg-white text-[#1b1a1a] px-3 py-1.5 rounded-md text-[13px] font-semibold">
            Find Product
          </button>
          <button
            ref={toggleRef}
            onClick={() => setOpen(!open)}
            className="w-9 h-9 rounded-lg bg-white flex items-center justify-center"
          >
            {!open ? (
              <svg width="18" height="12" viewBox="0 0 20 12" fill="none">
                <rect width="20" height="2" rx="1" fill="#1e1919" />
                <rect y="5" width="20" height="2" rx="1" fill="#1e1919" />
                <rect y="10" width="20" height="2" rx="1" fill="#1e1919" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6L18 18"
                  stroke="#1e1919"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <path
                  d="M6 18L18 6"
                  stroke="#1e1919"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* PANEL OVERLAY */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-200" />
      )}

      {/* PANEL */}
      <div
        ref={panelRef}
        className={`fixed left-4 right-4 top-27 bottom-6 z-50 mx-auto max-w-[420px] transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 pointer-events-none translate-y-6"
        }`}
      >
        <div className="h-full bg-[#fbf8f4] border-[5px] border-[#1b1a1a] rounded-[18px] overflow-hidden shadow-2xl flex flex-col">
          {/* TABS */}
          <div className="flex items-center gap-3 px-5 pt-4 pb-3">
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 6L9 12l6 6"
                  stroke="#1b1a1a"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={() => setTab(0)}
              className={`px-3 py-2 rounded-full text-sm font-semibold ${
                tab === 0
                  ? "bg-[#ffd24a] text-[#1b1a1a]"
                  : "text-[#3b3b3b] bg-transparent"
              }`}
            >
              Product Categories
            </button>
            <button
              onClick={() => setTab(1)}
              className={`px-3 py-2 rounded-full text-sm font-semibold ${
                tab === 1
                  ? "bg-[#ffd24a] text-[#1b1a1a]"
                  : "text-[#3b3b3b] bg-transparent"
              }`}
            >
              Type of Products
            </button>
          </div>

          {/* PRODUCT / TAG LIST */}
          <div className="flex-1 overflow-y-auto px-5 pb-6">
            {tab === 0 && (
              <div className="space-y-5">
                {PRODUCTS.map((p) => (
                  <a
                    key={p.slug}
                    href="#"
                    className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#f6f6f6] rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={p.img}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span
                        className="text-[18px] font-extrabold"
                        style={{ fontFamily: "'Anton', sans-serif" }}
                      >
                        {p.title}
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-md bg-[#1b1a1a] flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M8 5l8 7-8 7"
                          stroke="white"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* TAG LIST (now aligned like Product Categories) */}
            {tab === 1 && (
              <div className="space-y-5">
                {TAGS.map((t) => (
                  <a
                    key={t.title}
                    href="#"
                    className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#f6f6f6] rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={t.img}
                          alt={t.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span
                        className="text-[16px] font-extrabold"
                        style={{ fontFamily: "'Anton', sans-serif" }}
                      >
                        {t.title}
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-md bg-[#1b1a1a] flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M8 5l8 7-8 7"
                          stroke="white"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* BOTTOM CIRCLE */}
        
        </div>
      </div>
    </div>
  );
}
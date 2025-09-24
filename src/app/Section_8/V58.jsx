import React, { useState } from "react";

export default function V58() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="relative container mx-auto flex items-center justify-between py-6 max-md:py-4 px-4">
        {/* Logo */}
        <div className="flex-1">
          <a target="_top" rel="noreferrer" className="relative" href="/">
            {/* Desktop logo */}
            <img
              alt="Logo"
              loading="lazy"
              width="192"
              height="33"
              decoding="async"
              className="max-w-48 opacity-100 transition hidden md:block"
              style={{ color: "transparent" }}
              src="https://bombon.rs/images/logo.svg"
            />
            {/* Mobile logo */}
            <img
              alt="Logo"
              loading="lazy"
              width="67"
              height="44"
              decoding="async"
              className="w-14 opacity-100 transition block md:hidden"
              style={{ color: "transparent" }}
              src="https://bombon.rs/images/logo.svg"
            />
          </a>
        </div>

        {/* Center Menu Button */}
        <div
          onClick={() => setMenuOpen((s) => !s)}
          role="button"
          tabIndex={0}
          className="relative flex w-[56px] md:w-[66px] cursor-pointer justify-center rounded-2xl border-b-2 border-b-purple-200 bg-purple-50 px-2 py-2 md:py-3"
        >
          {/* Hamburger */}
          <div className={`flex flex-col transition ${menuOpen ? "opacity-0" : "opacity-100"}`}>
            {[1, 2, 3].map((i) => (
              <svg
                key={i}
                className="w-10 md:w-12"
                height="8"
                viewBox="0 0 64 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 0 4 Q 32 4, 64 4"
                  stroke="#212121"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            ))}
          </div>

          {/* Close Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            onClick={() => setMenuOpen(false)}
            className={`absolute top-1/2 left-1/2 h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 transition ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            viewBox="0 0 32 32"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2 30L30 2m0 28L2 2"
            />
          </svg>
        </div>

        {/* Right links */}
        <div className="flex flex-1 justify-end items-center gap-6 md:gap-10">
          <a
            target="_top"
            rel="noreferrer"
            className="hidden md:block text-xl font-bold"
            href="/shop"
          >
            Shop
          </a>
          <button
            onClick={() => setCartOpen(true)}
            className="text-xl flex items-center gap-2"
            aria-label="Open cart"
          >
            Cart
          </button>
        </div>
      </div>

      {/* Full screen menu overlay */}
      <div
        className={`fixed top-0 left-0 z-40 flex h-screen w-full items-center justify-center bg-pink-200 transition ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative flex flex-col items-center gap-10 text-center px-6"
        >
          <a
            href="/"
            className="text-[3rem] md:text-[5rem] font-bold hover:scale-110 transition"
          >
            Home
          </a>
          <a
            href="/shop"
            className="text-[3rem] md:text-[5rem] font-bold hover:scale-110 transition"
          >
            Shop
          </a>
          <a
            href="/shop?tag=mix"
            className="text-[3rem] md:text-[5rem] font-bold hover:scale-110 transition"
          >
            Mixes
          </a>
          <a
            href="/contact"
            className="text-[3rem] md:text-[5rem] font-bold hover:scale-110 transition"
          >
            Contact
          </a>
          <p className="mt-10 text-lg">©2025 Bombon. All rights reserved.</p>
        </div>
      </div>

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 h-screen w-full transition-all duration-500 ${
          cartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setCartOpen(false)}
        />
        {/* Drawer */}
        <div className="absolute top-0 right-0 h-full w-full md:w-[400px] bg-gradient-to-b from-purple-50 to-purple-200 rounded-l-2xl shadow-lg flex flex-col">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <button onClick={() => setCartOpen(false)} className="text-2xl">
              ✕
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <p className="text-purple-500 font-semibold mb-6">
              No products in the cart...yet!
            </p>
            <img
              src="/images/gummy-empty.png"
              alt="Empty cart"
              className="h-52 opacity-70"
            />
            <a href="/shop" className="mt-6">
              <button className="px-6 py-3 bg-lime-400 hover:bg-lime-500 rounded-full text-lg font-bold">
                Go to shop
              </button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

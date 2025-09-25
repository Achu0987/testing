import React, { useState } from "react";

export default function V198() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Calculate offset from center, normalized and scaled up for stronger effect
    const offsetX = (clientX - centerX) / centerX; // -1 to 1
    const offsetY = (clientY - centerY) / centerY; // -1 to 1

    setCursorPos({ x: offsetX, y: offsetY });
  };

  return (
    <header className="fixed top-20 z-50 w-full">
      <div className="relative z-2 container mx-auto flex items-center justify-between py-8 max-md:py-4 px-4">
        {/* Logo */}
        <div className="flex-1">
          <a target="_top" rel="noreferrer" className="relative" href="/">
            <img
              alt="Logo"
              loading="lazy"
              width="192"
              height="33"
              decoding="async"
              className="max-w-48 opacity-100 transition max-md:hidden"
              style={{ color: "transparent" }}
              src="https://bombon.rs/images/logo.svg"
            />
            <img
              alt="Logo"
              loading="lazy"
              width="67"
              height="44"
              decoding="async"
              className="hidden w-16 max-w-none opacity-100 transition max-md:block"
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
          className="relative flex w-[66px] cursor-pointer justify-center rounded-2xl border-b-2 border-b-purple-200 bg-purple-50 px-2 py-3 max-md:w-[56px] max-md:py-2"
        >
          <div className="flex flex-col transition">
            {/* Hamburger lines */}
            {[...Array(3)].map((_, i) => (
              <svg
                key={i}
                className="w-12 max-md:w-12"
                height="8"
                viewBox="0 0 64 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 0 4 Q 1.641 4, 2.462 4 Q 3.282 4, 4.103 4 Q 4.923 4, 5.744 4 Q 6.564 4, 7.385 4 Q 8.205 4, 9.026 4 Q 9.846 4, 10.667 4 Q 11.487 4, 12.308 4 Q 13.128 4, 13.949 4 Q 14.769 4, 15.59 4 Q 16.41 4, 17.231 4 Q 18.051 4, 18.872 4 Q 19.692 4, 20.513 4 Q 21.333 4, 22.154 4 Q 22.974 4, 23.795 4 Q 24.615 4, 25.436 4 Q 26.256 4, 27.077 4 Q 27.897 4, 28.718 4 Q 29.538 4, 30.359 4 Q 31.179 4, 32 4 Q 32.821 4, 33.641 4 Q 34.462 4, 35.282 4 Q 36.103 4, 36.923 4 Q 37.744 4, 38.564 4 Q 39.385 4, 40.205 4 Q 41.026 4, 41.846 4 Q 42.667 4, 43.487 4 Q 44.308 4, 45.128 4 Q 45.949 4, 46.769 4 Q 47.59 4, 48.41 4 Q 49.231 4, 50.051 4 Q 50.872 4, 51.692 4 Q 52.513 4, 53.333 4 Q 54.154 4, 54.974 4 Q 55.795 4, 56.615 4 Q 57.436 4, 58.256 4 Q 59.077 4, 59.897 4 Q 60.718 4, 61.538 4 Q 62.359 4, 63.179 4 T 64 4"
                  stroke="#212121"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            ))}
          </div>

          {/* Close X icon when menu is open */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            onClick={() => setMenuOpen(false)}
            className={`cursor-pointer absolute top-1/2 left-1/2 h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 transition ${
              menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            width="1em"
            height="1em"
            viewBox="0 0 32 32"
            stroke="#6B21A8" // Purple color for visibility
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            <path d="M2 30L30 2M30 30L2 2" />
          </svg>
        </div>

        {/* Right links */}
        <div className="flex flex-1 justify-end gap-19 items-center">
          <a target="_top" rel="noreferrer" className="links max-lg:hidden text-2xl font-bold" href="/shop">
            shop
          </a>
          <button onClick={() => setCartOpen(true)} className="links flex cursor-pointer text-2xl items-center gap-2" aria-label="Open cart">
            cart
          </button>
        </div>
      </div>

      {/* Full screen menu overlay (center) */}
      <div
        className={`fixed inset-0 z-10 flex items-end justify-center overflow-hidden bg-pink-200 pb-10 transition ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="pointer-events-none absolute top-1/2 left-1/2 flex h-screen w-full -translate-x-1/2 -translate-y-1/2 scale-110 items-center justify-center">
          <img
            alt="Decorative background"
            loading="lazy"
            width="2200"
            height="1280"
            decoding="async"
            className="background h-full w-full max-w-none object-cover"
            style={{
              color: "transparent",
              // Amplified parallax effect: multiply by 25px instead of 10px
              transform: `translate(calc(12.0833px + ${cursorPos.x * 25}px), calc(16.0811px + ${cursorPos.y * 25}px))`,
              transition: "transform 0.1s ease-out",
            }}
            src="https://bombon.rs/images/menu-bg.svg"
          />
        </div>

        {/* Cancel button on the image overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent closing menu twice
            setMenuOpen(false);
          }}
          aria-label="Close menu"
          className="absolute top-20 right-10 z-20 rounded-full bg-white bg-opacity-90 p-3 shadow-lg hover:bg-opacity-100 transition"
          style={{ backdropFilter: "blur(6px)" }} // subtle blur behind button for clarity
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-purple-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Menu content container with stopPropagation to prevent closing on clicks inside */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative flex-col max-lg:flex max-lg:items-center pointer-events-auto"
        >
          <div className="mb-12 flex items-center justify-center gap-10 max-md:flex-col">
            <a
              target="_top"
              rel="noreferrer"
              className="heading-1 hover:text-blackish text-[5rem] transition-all hover:!text-[6.875rem] max-md:text-[4rem] max-md:hover:!text-[5rem]"
              href="/"
            >
              Home
            </a>
            <img
              alt="Decorative candy"
              loading="lazy"
              width="80"
              height="80"
              decoding="async"
              className="top-0 left-0 max-md:absolute max-md:-translate-1/2"
              style={{ color: "transparent" }}
              src="https://bombon.rs/_next/image?url=%2Fimages%2Fmenu-candy.png&w=256&q=75"
            />
            <a
              target="_top"
              rel="noreferrer"
              className="heading-1 hover:text-blackish text-[5rem] transition-all hover:!text-[6.875rem] max-md:text-[4rem] max-md:hover:!text-[5rem]"
              href="/shop"
            >
              Shop
            </a>
          </div>

          <div className="flex items-center justify-center gap-10 max-md:flex-col">
            <a
              target="_top"
              rel="noreferrer"
              className="heading-1 hover:text-blackish text-[5rem] transition-all hover:!text-[6.875rem] max-md:text-[4rem] max-md:hover:!text-[5rem]"
              href="/shop?tag=mix"
            >
              Mixes
            </a>
            <img
              alt="Decorative candy"
              loading="lazy"
              width="80"
              height="80"
              decoding="async"
              className="right-0 bottom-0 max-md:absolute max-md:translate-1/2"
              style={{ color: "transparent" }}
              src="https://bombon.rs/_next/image?url=%2Fimages%2Fmenu-candy.png&w=256&q=75"
            />
            <a
              target="_top"
              rel="noreferrer"
              className="heading-1 hover:text-blackish text-[5rem] transition-all hover:!text-[6.875rem] max-md:text-[4rem] max-md:hover:!text-[5rem]"
              href="/contact"
            >
              Contact
            </a>
          </div>

          <div className="order-2 mb-10 flex justify-center gap-3 max-md:mb-6 mt-10">
            <a target="_top" rel="noreferrer" className="text-blackish text-4xl transition hover:text-purple-500" href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="iconify iconify--feather"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01"></path>
                </g>
              </svg>
            </a>
            <a target="_top" rel="noreferrer" className="text-blackish text-4xl transition hover:text-purple-500" href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="iconify iconify--feather"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                ></path>
              </svg>
            </a>
            <a target="_top" rel="noreferrer" className="text-blackish text-4xl transition hover:text-purple-500" href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="iconify iconify--feather"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2"></circle>
                </g>
              </svg>
            </a>
          </div>

          <div>
            <p className="max-md:w-full max-md:text-center">©2025 Bombon. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <div
        className={`pointer-events-none absolute top-0 left-0 z-99 h-[100svh] w-full transition-all duration-500 ${
          cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
        }`}
      >
        <div className="fixed top-0 left-0 h-screen w-screen bg-[#C1B8CF]/70" onClick={() => setCartOpen(false)} />

        <div className="fixed top-0 right-0 flex h-[100svh] w-166 flex-col overflow-hidden rounded-l-4xl max-md:h-200 max-md:w-full max-md:justify-between max-md:rounded-l-none max-md:rounded-b-4xl max-md:shadow-2xl bg-gradient-to-b from-purple-50 to-[#CFC3E0] to-70%">
          <div className="flex h-full flex-col pt-12">
            <div className="px-8">
              <div className="border-b-purple-0 mb-16 flex items-start justify-between border-b-2 pb-5 max-lg:mb-10">
                <p className="heading-3 max-w-100 font-bold capitalize">Shopping Cart</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--fa6-solid h-8 w-8 cursor-pointer"
                  width="0.75em"
                  height="1em"
                  viewBox="0 0 384 512"
                  onClick={() => setCartOpen(false)}
                >
                  <path
                    fill="currentColor"
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7L86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256L41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256z"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="flex-1" data-lenis-prevent="true">
              <div className="flex h-full flex-col items-center justify-between pb-12">
                <div className="mt-10 flex flex-col items-center">
                  <p className="paragraph-lg w-full text-center font-semibold text-purple-400">No products in the cart...yet!</p>
                  <img
                    alt="No products in the cart"
                    loading="lazy"
                    width="534"
                    height="534"
                    decoding="async"
                    className="h-[50vh] w-auto max-w-none opacity-60 mix-blend-hard-light max-md:h-auto max-md:w-4/5"
                    style={{ color: "transparent" }}
                    src="/images/gummy-empty.png"
                  />
                </div>

                <a target="_top" rel="noreferrer" href="/shop">
                  <button
                    data-slot="button"
                    className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 outline-none bg-lime hover:bg-light-lime text-blackish border-lime border-4 hover:border-light-lime active:border-lime py-3 px-8 rounded-full button mt-6"
                  >
                    Go to shop
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}



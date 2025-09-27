import React, { useEffect, useState } from "react";

const V216 = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);

  // sample cart items
  const cartItems = [
    {
      id: "1",
      title: "NX Jacket",
      price: 45,
      qty: 2,
      img:
        "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/6682feab029d8cf678a71c94_1254.avif",
    },
    {
      id: "2",
      title: "NX Suit",
      price: 150,
      qty: 2,
      img:
        "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/6682fc9718fabe5571ab9096_suit-2688310_1280.avif",
    },
  ];

  const itemsCount = cartItems.reduce((s, it) => s + it.qty, 0);
  const subtotal = cartItems.reduce((s, it) => s + it.price * it.qty, 0);

  // lock body scroll while overlays are open
  useEffect(() => {
    const locked = cartOpen || menuOpen;
    document.documentElement.style.overflow = locked ? "hidden" : "";
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [cartOpen, menuOpen]);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setCartOpen(false);
        setMenuOpen(false);
        setPagesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/shop", label: "Shop" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const pagesItems = [
    { href: "/faq", label: "FAQ" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
  ];

  // helper to close menu + reset pages submenu
  const closeMenu = () => {
    setMenuOpen(false);
    setPagesOpen(false);
  };

  return (
    <header className="sticky top-50 Overflow-hidden z-50">
      {/* Top bar */}
      <div className="w-full bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-12">
            {/* Left: Categories */}
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/668277f4c7b425e60254a477_category.webp"
                alt="categories"
                className="h-5 w-5 object-contain"
              />
              <span className="text-sm text-white font-semibold tracking-wide uppercase">
                CATEGORIES
              </span>
            </div>

            {/* Right: icons */}
            <div className="flex items-center gap-4">
              {/* search */}
              <button
                aria-label="Search"
                className="p-1 rounded hover:bg-white/5 transition"
                title="Search"
              >
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="11"
                    cy="11"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* account */}
              <a
                href="/user-account"
                className="p-1 rounded hover:bg-white/5 transition"
                title="Account"
              >
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              {/* cart */}
              <div className="relative">
                <button
                  aria-label="Open cart"
                  onClick={() => setCartOpen(true)}
                  className="flex items-center gap-2 p-1 rounded hover:bg-white/5 transition"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="9"
                      cy="20"
                      r="1"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="1"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
                <div className="absolute -top-1 -right-1 min-w-[18px] h-5 bg-red-500 text-white rounded-full text-xs font-semibold flex items-center justify-center pointer-events-none">
                  {itemsCount}
                </div>
              </div>

              {/* hamburger */}
              <button
                onClick={() =>
                  setMenuOpen((s) => {
                    const next = !s;
                    if (!next) setPagesOpen(false); // reset pages when closing the menu
                    return next;
                  })
                }
                className={`p-2 rounded transition ${menuOpen ? "text-red-500" : "text-white"}`}
                aria-label="menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {!menuOpen ? (
                  <div className="space-y-1">
                    <div className="w-5 h-[2px] bg-white"></div>
                    <div className="w-5 h-[2px] bg-white"></div>
                    <div className="w-5 h-[2px] bg-white"></div>
                  </div>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          aria-hidden
        />
      )}

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-12 z-40 transform transition-transform duration-300 origin-top ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-[#0b0b0b] mt-20 text-white min-h-[320px] max-h-[calc(100vh-48px)] overflow-auto relative">
          {/* Dedicated close button inside the menu to ensure it always closes */}
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="absolute top-3 right-4 p-2 rounded hover:bg-white/5"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className=" mx-auto px-6 py-6">
            <nav className="mt-3">
              <ul className="space-y-6">
                {navItems.map((n, idx) => (
                  <li key={n.label}>
                    <a
                      href={n.href}
                      onClick={closeMenu}
                      className={`block text-lg font-bold tracking-wider uppercase ${
                        idx === 0 ? "text-red-500" : "text-white"
                      }`}
                    >
                      {n.label}
                    </a>
                  </li>
                ))}

                {/* Pages with submenu */}
                <li>
                  <button
                    className="flex items-center gap-2 w-full justify-center items-center font-bold uppercase text-lg font-semibold tracking-wider"
                    onClick={() => setPagesOpen((s) => !s)}
                  >
                    <span>Pages</span>
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        pagesOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M19 9l-7 7-7-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {pagesOpen && (
                    <ul className="mt-2 ml-4 text-center space-y-3 text-lg">
                      {pagesItems.map((p) => (
                        <li key={p.label}>
                          <a
                            href={p.href}
                            onClick={closeMenu}
                            className="block text-gray-300 hover:text-white"
                          >
                            {p.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Cart drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 transform transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        } w-full sm:w-96`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="h-full bg-white text-black shadow-2xl flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Your Cart</h3>
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-600">{itemsCount} items</div>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="text-gray-600 hover:text-black p-2 rounded"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4 overflow-auto flex-1">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-600 py-10">
                Your cart is empty.
              </div>
            ) : (
              cartItems.map((it) => (
                <div key={it.id} className="flex gap-3 items-start">
                  <img
                    src={it.img}
                    alt={it.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{it.title}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      ${it.price.toFixed(2)} USD
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <label className="text-sm text-gray-500">Qty</label>
                      <input
                        type="number"
                        min="1"
                        value={it.qty}
                        readOnly
                        className="w-16 text-center border rounded px-1 py-0.5 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center justify-between mb-3">
              <div className="font-medium">Subtotal</div>
              <div className="font-semibold">${subtotal.toFixed(2)} USD</div>
            </div>
            <div className="space-y-2">
              <a
                href="/checkout"
                className="block w-full text-center bg-black text-white py-2 rounded font-medium"
              >
                Continue to Checkout
              </a>
              <button
                onClick={() => setCartOpen(false)}
                className="block w-full text-center border border-gray-300 py-2 rounded text-sm"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* cart backdrop */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
          aria-hidden
        />
      )}
    </header>
  );
};

export default V216;
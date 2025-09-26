import React, { useState } from "react";

const V217 = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-50">
      {/* Navbar wrapper */}
      <div className="w-full bg-black backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-6 relative">
            {/* Left: Categories */}
            <div
              className="group relative flex items-center gap-3 cursor-pointer select-none"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <img
                src="https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/668277f4c7b425e60254a477_category.webp"
                alt="categories"
                className="h-5 w-5 object-contain"
              />
              <div className="text-sm uppercase text-white font-semibold tracking-wide group-hover:text-red-500 transition">
                Categories
              </div>

              {/* dropdown */}
              <div
                className={`absolute left-0 mt-3 w-48 bg-black/90 text-white rounded shadow-lg transform transition-all origin-top ${
                  categoriesOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                <ul className="flex flex-col divide-y divide-white/10">
                  {[
                    "T-Shirts",
                    "Sweater",
                    "Suit",
                    "Shirts",
                    "Jeans",
                    "Jackets",
                  ].map((c) => (
                    <li key={c}>
                      <a
                        href={`/category/${c.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block px-4 py-2 text-sm text-white hover:text-red-500 transition"
                      >
                        {c}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Center: Nav links */}
            <nav className="absolute left-1/2 transform -translate-x-1/2">
              <ul className="flex gap-10 items-center">
                <li>
                  <a
                    href="/"
                    className="text-sm text-white hover:text-red-500 font-semibold tracking-wider transition"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-sm text-white hover:text-red-500 transition"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    className="text-sm text-white hover:text-red-500 transition"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="text-sm text-white hover:text-red-500 transition"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-sm text-white hover:text-red-500 transition"
                  >
                    Contact
                  </a>
                </li>

                {/* Pages dropdown */}
                <li className="relative group">
                  <div className="flex items-center gap-1 text-sm text-white hover:text-red-500 transition cursor-pointer">
                    Pages
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 bg-black/90 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                    <div className="p-3 grid grid-cols-2 gap-2">
                      <a
                        href="/faq"
                        className="text-sm hover:text-red-500 transition"
                      >
                        FAQ
                      </a>
                      <a
                        href="/privacy-policy"
                        className="text-sm hover:text-red-500 transition"
                      >
                        Privacy Policy
                      </a>
                      <a
                        href="/sign-up"
                        className="text-sm hover:text-red-500 transition"
                      >
                        Sign Up
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>

            {/* Right: icons */}
            <div className="flex items-center gap-5">
              {/* search */}
              <button
                aria-label="Search"
                className="p-1 rounded-md hover:bg-white/5 transition"
                title="Search"
              >
                <img
                  src="https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/668441728689707b7ce3c00d_loupe%20(1).webp"
                  alt="search"
                  className="h-5 w-5 object-contain"
                />
              </button>

              {/* account */}
              <a
                href="/user-account"
                className="p-1 rounded-md hover:bg-white/5 transition"
                title="Account"
              >
                <img
                  src="https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/6684401d74d5a2771c70a70c_user%20(1).webp"
                  alt="account"
                  className="h-5 w-5 object-contain"
                />
              </a>

              {/* cart */}
              <div className="relative">
                <button
                  aria-label="Open cart"
                  onClick={() => setCartOpen(true)}
                  className="flex items-center gap-2 p-1 rounded-md hover:bg-white/5 transition"
                >
                  <img
                    src="https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/668441431befabe07033acf3_trolley.webp"
                    alt="cart"
                    className="h-5 w-5 object-contain"
                  />
                  <div className="text-sm text-white font-medium">
                    {itemsCount}
                  </div>
                </button>
              </div>

              {/* mobile hamburger */}
              <button
                onClick={() => setMenuOpen((s) => !s)}
                className="ml-2 md:hidden p-2 rounded-md hover:bg-white/5 transition"
                aria-label="menu"
              >
                <div className="w-5 h-0.5 bg-white mb-1"></div>
                <div className="w-5 h-0.5 bg-white mb-1"></div>
                <div className="w-5 h-0.5 bg-white"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-black/95 text-white transition-max-h duration-300 overflow-hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 py-4 space-y-3">
          <a href="/" className="block hover:text-red-500 transition">
            Home
          </a>
          <a href="/about" className="block hover:text-red-500 transition">
            About Us
          </a>
          <a href="/shop" className="block hover:text-red-500 transition">
            Shop
          </a>
          <a href="/blog" className="block hover:text-red-500 transition">
            Blog
          </a>
          <a href="/contact" className="block hover:text-red-500 transition">
            Contact
          </a>
        </div>
      </div>

      {/* Cart drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white text-black shadow-2xl transform transition-transform duration-300 z-50 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-auto h-[calc(100vh-200px)]">
          {cartItems.map((it) => (
            <div key={it.id} className="flex gap-3 items-start">
              <img
                src={it.img}
                alt={it.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-medium">{it.title}</div>
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
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <div className="font-medium">Subtotal</div>
            <div className="font-semibold">${subtotal.toFixed(2)} USD</div>
          </div>
          <div className="space-x-2">
            <a
              href="/checkout"
              className="inline-block w-full text-center bg-black text-white py-2 rounded font-medium"
            >
              Continue to Checkout
            </a>
          </div>
        </div>
      </div>

      {/* backdrop */}
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

export default V217;

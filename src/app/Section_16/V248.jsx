import React, { useState, useRef, useEffect } from "react";


const MENU_DATA = [
  {
    id: "home",
    title: "Home",
    type: "mega",
    groups: [
      {
        header: "SUMMER ESSENTIALS",
        href: "/collections/sports-jacket",
        items: [
          { title: "Chic Soft Teddy Coat", href: "/products/chic-soft-teddy-coat" },
          { title: "Fitted Sleeveless Shirt", href: "/products/sleeveless-gym-vest" },
          { title: "Classic Zip Front Shirt", href: "/products/classic-zip-front-shirt" },
          { title: "Cropped Trucker Shirt", href: "/products/cotton-cropped-trucker-shirt" },
          { title: "Crop top co-ord set", href: "/products/crop-top-co-ord-set" },
          { title: "Loose T-shirt", href: "/products/loose-fit-t-shirt" },
          { title: "Sports Tee", href: "/products/long-sleeve-sports-tee" },
        ],
      },
      {
        header: "SPORTSWEAR",
        href: "/collections/sports-jacket",
        items: [
          { title: "Long-Sleeve Sports Tee", href: "/products/long-sleeve-sports-tee" },
          { title: "Polyester Gym Suit", href: "/products/polyester-women-gym-suit" },
          { title: "Racerback Sports Bra", href: "/products/medium-impact-padded-racerback-sports-bra" },
          { title: "Round Neck T-shirt", href: "/products/solid-round-neck-t-shirt" },
          { title: "Outdoor Sports Jacket", href: "/products/outdoor-sports-jacket" },
          { title: "Racer Back Sports top", href: "/products/racer-back-sports-bra" },
        ],
      },
      {
        header: "WINTER WARDROBE",
        href: "/collections/winter-essentials",
        items: [
          { title: "Oversized Hoodie", href: "/products/mens-round-neck-t-shirt" },
          { title: "Warm and Soft Hoodie", href: "/products/warm-and-soft-winter-hoodie" },
          { title: "Winter Hoodie", href: "/products/racer-back-sports-bra" },
          { title: "Wool Overcoat", href: "/products/mens-wool-overcoat" },
          { title: "Women Sweater", href: "/products/flexfit-gym-set" },
          { title: "Soft Winter Hoodie", href: "/products/warm-and-soft-winter-hoodie" },
        ],
      },
    ],
  },
  {
    id: "catalog",
    title: "Catalog",
    type: "dropdown",
    items: [
      { title: "SPORTS JACKET", href: "/collections/sports-jacket" },
      { title: "SPORTS WEAR", href: "/collections/sportswear" },
      { title: "SUMMER DRIFT", href: "/collections/summer-drift" },
      { title: "SUMMER ESSENTIALS", href: "/collections/summer-essentials" },
      { title: "TIMELESS THREADS", href: "/collections/timeless-threads" },
      { title: "URBAN LAYERS", href: "/collections/urban-layers" },
      { title: "WINTER ESSENTIALS", href: "/collections/winter-essentials" },
    ],
  },
];

const Icon = {
  Hamburger: () => (
    <svg viewBox="0 0 15 9" className="w-5 h-4" fill="none" aria-hidden>
      <rect width="15" height="2" rx="1" fill="currentColor" />
      <rect y="7" width="9" height="2" rx="1" fill="currentColor" />
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 16 16" className="w-5 h-5 text-gray-500" fill="none" aria-hidden>
      <path d="M15.813 14.8711L11.8369 10.8951C12.9205 9.56987 13.4532 7.87893 13.325 6.17198C13.1967 4.46502 12.4173 2.87267 11.1479 1.72427C9.87853 0.575873 8.21632 -0.0406994 6.50509 0.00208668C4.79386 0.0448727 3.16454 0.743743 1.95414 1.95414C0.743743 3.16454 0.0448727 4.79386 0.00208668 6.50509C-0.0406994 8.21632 0.575873 9.87853 1.72427 11.1479C2.87267 12.4173 4.46502 13.1967 6.17198 13.325C7.87893 13.4532 9.56987 12.9205 10.8951 11.8369L14.8711 15.813C14.9968 15.9344 15.165 16.0015 15.3397 16C15.5143 15.9985 15.6814 15.9284 15.8049 15.8049C15.9284 15.6814 15.9985 15.5143 16 15.3397C16.0015 15.165 15.9344 14.9968 15.813 14.8711ZM6.68251 12.0115C5.62855 12.0115 4.59825 11.6989 3.72191 11.1134C2.84556 10.5278 2.16254 9.69556 1.7592 8.72182C1.35587 7.74808 1.25034 6.6766 1.45595 5.64289C1.66157 4.60917 2.16911 3.65964 2.91437 2.91437C3.65964 2.16911 4.60917 1.66157 5.64289 1.45595C6.6766 1.25034 7.74808 1.35587 8.72182 1.7592C9.69556 2.16254 10.5278 2.84556 11.1134 3.72191C11.6989 4.59825 12.0115 5.62855 12.0115 6.68251C12.0099 8.09535 11.4479 9.44987 10.4489 10.4489C9.44987 11.4479 8.09535 12.0099 6.68251 12.0115Z" fill="currentColor" />
    </svg>
  ),
  Account: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-700" fill="none" aria-hidden>
      <path d="M20.4853 3.51471C18.2188 1.24823 15.2053 0 12 0C8.79474 0 5.78119 1.24823 3.51471 3.51471C1.24823 5.78119 0 8.79474 0 12C0 15.2053 1.24823 18.2188 3.51471 20.4853C5.78119 22.7518 8.79474 24 12 24C15.2053 24 18.2188 22.7518 20.4853 20.4853C22.7518 18.2188 24 15.2053 24 12C24 8.79474 22.7518 5.78119 20.4853 3.51471ZM5.20807 20.1233C5.60431 16.7139 8.53564 14.0815 12 14.0815C13.8263 14.0815 15.5436 14.7931 16.8354 16.0847C17.9268 17.1762 18.6151 18.6013 18.7921 20.1231C16.9519 21.6643 14.5825 22.5938 12 22.5938C9.41748 22.5938 7.04828 21.6645 5.20807 20.1233ZM12 12.6332C9.99042 12.6332 8.35529 10.998 8.35529 8.98846C8.35529 6.9787 9.99042 5.34375 12 5.34375C14.0096 5.34375 15.6447 6.9787 15.6447 8.98846C15.6447 10.998 14.0096 12.6332 12 12.6332Z" fill="currentColor" />
    </svg>
  ),
  Cart: () => (
    <svg viewBox="0 0 22 22" className="w-6 h-6 text-gray-700" fill="none" aria-hidden>
      <path d="M16.8499 21.5H5.1499C2.6749 21.5 0.649902 19.475 0.649902 17V16.85L1.0999 4.85C1.1749 2.375 3.1999 0.5 5.5999 0.5H16.3999C18.7999 0.5 20.8249 2.375 20.8999 4.85L21.3499 16.85C21.4249 18.05 20.9749 19.175 20.1499 20.075C19.3249 20.975 18.1999 21.5 16.9999 21.5C16.9999 21.5 16.9249 21.5 16.8499 21.5ZM5.5999 2C3.9499 2 2.6749 3.275 2.5999 4.85L2.1499 17C2.1499 18.65 3.4999 20 5.1499 20H16.9999C17.8249 20 18.5749 19.625 19.0999 19.025C19.6249 18.425 19.9249 17.675 19.9249 16.85L19.4749 4.85C19.3999 3.2 18.1249 2 16.4749 2H5.5999Z" fill="currentColor" />
      <path d="M11 9.5C8.075 9.5 5.75 7.175 5.75 4.25C5.75 3.8 6.05 3.5 6.5 3.5C6.95 3.5 7.25 3.8 7.25 4.25C7.25 6.35 8.9 8 11 8C13.1 8 14.75 6.35 14.75 4.25C14.75 3.8 15.05 3.5 15.5 3.5C15.95 3.5 16.25 3.8 16.25 4.25C16.25 7.175 13.925 9.5 11 9.5Z" fill="currentColor" />
    </svg>
  ),
  ChevronRight: ({ className = "w-4 h-4" }) => (
    <svg viewBox="0 0 8 8" className={className} fill="none" aria-hidden>
      <path d="M2 1.5L5 4L2 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Dot: ({ className = "w-2 h-2" }) => (
    <svg viewBox="0 0 8 8" className={className} aria-hidden>
      <circle cx="4" cy="4" r="4" fill="currentColor" />
    </svg>
  ),
};

const focusVisible = "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black focus-visible:ring-opacity-90";

/* Main component */
export default function V248() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(7);
  const navRef = useRef(null);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close desktop menus on outside click
  useEffect(() => {
    function handleClick(e) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) {
        setOpenMega(null);
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close drawer on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    if (mobileOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Hamburger + Brand */}
          <div className="flex items-center gap-3">
            <button
              className={`md:hidden p-2 rounded hover:bg-gray-100 transition ${focusVisible}`}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)} // TOGGLE instead of only open
            >
              <Icon.Hamburger />
            </button>

            {/* Brand text for a clean, image-free look */}
            <a href="/" className="flex items-center">
              <span className="font-bold tracking-widest text-lg text-gray-900">MAYA</span>
            </a>
          </div>

          {/* Center: Desktop nav (kept simple) */}
          <nav ref={navRef} className="hidden md:flex items-center space-x-6" aria-label="Primary">
            {MENU_DATA.map((menu) => (
              <div key={menu.id} className="relative" onMouseEnter={() => setOpenMega(menu.id)} onMouseLeave={() => setOpenMega(null)}>
                <button
                  className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 transition ${focusVisible}`}
                  aria-haspopup={menu.type === "mega" ? "true" : undefined}
                  aria-expanded={openMega === menu.id || openDropdown === menu.id}
                >
                  {menu.title}
                </button>
              </div>
            ))}
            <a href="/pages/about-us" className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 ${focusVisible}`}>About</a>
            <a href="/blogs/news" className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 ${focusVisible}`}>Blogs</a>
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setSearchOpen((s) => !s)}
                className={`p-2 rounded hover:bg-gray-100 ${focusVisible}`}
                aria-label="Search"
              >
                <Icon.Search />
              </button>

              {searchOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-gray-900 rounded-md shadow-lg p-3">
                  <label htmlFor="header-search" className="sr-only">Search</label>
                  <div className="flex items-center gap-3 bg-gray-50 rounded px-3 py-2">
                    <Icon.Search />
                    <input id="header-search" type="search" placeholder="Search products..." className="w-full bg-transparent text-sm outline-none" />
                    <button className="px-3 py-1.5 bg-gray-900 text-white rounded text-sm">Search</button>
                  </div>
                </div>
              )}
            </div>

            <a href="/account/login" className={`hidden sm:flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${focusVisible}`} aria-label="Account">
              <Icon.Account />
            </a>

            <button className={`relative p-2 rounded hover:bg-gray-100 ${focusVisible}`} aria-label="Cart">
              <Icon.Cart />
              <div className="absolute -right-1 -top-1 bg-gray-900 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">
                {cartCount}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div aria-hidden={!mobileOpen} className={`fixed inset-0 z-50 transition-all ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <aside
          className={`relative h-full bg-white text-gray-900 w-full mt-23 sm:max-w-md transform transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
        >
          {/* Header — brand text + search (image removed) */}
          <div className="sticky top-0 z-10 bg-white border-b p-4 flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div>
                  <span className="font-bold text-lg tracking-widest">MAYA</span>
                  
                </div>
              </div>
            </div>

            <div className="flex-1">
              <label htmlFor="mobile-search" className="sr-only">Search</label>
              <div className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2 shadow-sm">
                <Icon.Search />
                <input id="mobile-search" type="search" placeholder="Search products..." className="bg-transparent w-full text-sm outline-none" />
              </div>
            </div>

            <button className={`ml-3 p-2 rounded hover:bg-gray-100 ${focusVisible}`} onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <svg viewBox="0 0 12 12" className="w-5 h-5">
                <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Content: single-level top list by default; clicking shows details */}
          <div className="overflow-y-auto h-[calc(100vh-64px)] px-4 py-6 space-y-6">
            {/* Quick actions */}
            <div className="flex items-center gap-3">
              <a href="/account/login" className="flex-1 bg-gray-50 border rounded-lg p-3 flex items-center gap-3 hover:shadow transition-shadow">
                <Icon.Account />
                <div className="text-sm font-medium">Log in</div>
              </a>

              <a href="/cart" className="w-24 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-lg p-3 flex items-center justify-center shadow-md hover:opacity-95 transition">
                <div className="relative">
                  <Icon.Cart />
                  <div className="absolute -right-2 -top-2 bg-white text-gray-900 rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">{cartCount}</div>
                </div>
              </a>
            </div>

            {/* New MobileMenu — default top-level list, click to reveal details */}
            <MobileMenu onClose={() => setMobileOpen(false)} />
          </div>

          {/* Footer CTA */}
          <div className="border-t p-4">
            <a href="/collections/all" className="w-full block text-center py-3 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-lg shadow-md hover:scale-[0.997] transition-transform">
              Shop All
            </a>
          </div>
        </aside>
      </div>
    </header>
  );
}

/* MobileMenu: shows top-level items by default. Clicking an item opens inline details.
   - Home -> MobileAccordionAnimated (groups)
   - Catalog -> MobileListAnimated (items)
   - About / Blogs / Privacy -> direct links
*/
function MobileMenu({ onClose }) {
  const [active, setActive] = useState(null); // null => show only top list

  const topItems = [
    { id: "home", title: "Home" },
    { id: "catalog", title: "Catalog" },
    { id: "about", title: "About", href: "/pages/about-us" },
    { id: "blogs", title: "Blogs", href: "/blogs/news" },
    { id: "privacy", title: "Privacy", href: "/policies/privacy-policy" },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y">
          {topItems.map((it) => {
            const isActive = active === it.id;
            return (
              <div key={it.id} className="px-4 py-3">
                {it.href ? (
                  <a
                    href={it.href}
                    className="flex items-center justify-between gap-3"
                    onClick={() => onClose && onClose()}
                  >
                    <div className="font-medium text-gray-900">{it.title}</div>
                    <div className="text-sm text-gray-500">{/* no chevron for simple links */}</div>
                  </a>
                ) : (
                  <button
                    className="w-full text-left flex items-center justify-between gap-3"
                    onClick={() => setActive(isActive ? null : it.id)}
                    aria-expanded={isActive}
                  >
                    <div className="font-medium text-gray-900">{it.title}</div>
                    <div className={`transform transition-transform ${isActive ? "rotate-90" : ""}`}>
                      <Icon.ChevronRight />
                    </div>
                  </button>
                )}

                {/* inline detail panel */}
                {!it.href && isActive && (
                  <div className="mt-3">
                    {it.id === "home" && (
                      <RevealOnMount whenVisible={isActive}>
                        <MobileAccordionAnimated groups={MENU_DATA.find(m => m.id === "home").groups} />
                      </RevealOnMount>
                    )}

                    {it.id === "catalog" && (
                      <RevealOnMount whenVisible={isActive}>
                        <MobileListAnimated items={MENU_DATA.find(m => m.id === "catalog").items} />
                      </RevealOnMount>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* Mobile accordion with neat spacing and staggered animation */
function MobileAccordionAnimated({ groups }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-3">
      {groups.map((g, i) => {
        const panelId = `mobile-panel-${i}`;
        const buttonId = `mobile-btn-${i}`;
        return (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              id={buttonId}
              aria-controls={panelId}
              aria-expanded={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left flex items-center justify-between gap-3 px-4 py-4 hover:bg-gray-50 transition"
            >
              <div>
                <div className="text-sm font-semibold text-gray-900">{g.header}</div>
                <div className="text-xs text-gray-500 mt-1">View {g.items.length} items</div>
              </div>

              <div className={`transform transition-transform ${openIndex === i ? "rotate-90" : ""}`}>
                <Icon.ChevronRight />
              </div>
            </button>

            <div id={panelId} role="region" aria-labelledby={buttonId} className={`${openIndex === i ? "block" : "hidden"} px-4 pb-4 pt-2`}>
              <ul className="space-y-2">
                {g.items.map((it, idx) => (
                  <li key={idx} style={{ transitionDelay: `${idx * 40}ms` }}>
                    <RevealOnMount whenVisible={openIndex === i}>
                      <a href={it.href} className="block py-3 px-2 rounded hover:bg-gray-50 flex items-center gap-3">
                        <span className="text-amber-400">
                          <Icon.Dot />
                        </span>
                        <span className="text-sm text-gray-800">{it.title}</span>
                      </a>
                    </RevealOnMount>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* Simple list with subtle animation */
function MobileListAnimated({ items }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button className="w-full text-left flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition" onClick={() => setOpen(!open)} aria-expanded={open}>
        <div>
          <div className="font-semibold text-gray-900">Catalog</div>
          <div className="text-xs text-gray-500 mt-1">Popular categories</div>
        </div>
        <div className={`transform transition-transform ${open ? "rotate-90" : ""}`}>
          <Icon.ChevronRight />
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-2">
          <ul className="space-y-2">
            {items.map((it, idx) => (
              <li key={idx} style={{ transitionDelay: `${idx * 30}ms` }}>
                <RevealOnMount whenVisible={open}>
                  <a href={it.href} className="block py-3 px-2 rounded hover:bg-gray-50 flex items-center gap-3">
                    <span className="text-amber-400"><Icon.Dot /></span>
                    <span className="text-sm text-gray-800">{it.title}</span>
                  </a>
                </RevealOnMount>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* Tiny helper that reveals children with short opacity/translate animation when `whenVisible` becomes true. */
function RevealOnMount({ whenVisible, children }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let t;
    if (whenVisible) {
      // small stagger base delay for a smoother entrance
      t = setTimeout(() => setVisible(true), 30);
    } else {
      setVisible(false);
    }
    return () => clearTimeout(t);
  }, [whenVisible]);

  return (
    <div className={`transition-all duration-200 ease-out transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}>
      {children}
    </div>
  );
}
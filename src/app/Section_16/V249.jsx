import React, { useState, useRef, useEffect } from "react";

/**
 * V249.jsx
 *
 * Changes:
 * - Desktop Home mega menu: images removed (only grouped links shown).
 * - Catalog dropdown panel: background black, white text, item hover darker black.
 * - General styling: neat spacing, rounded panels, consistent text sizing for a professional look.
 *
 * Usage:
 *  import V249 from "./V249.jsx";
 *  <V249 />
 *
 * Tailwind CSS required.
 */

const MENU_DATA = [
  {
    id: "home",
    title: "Home",
    type: "mega",
    // media intentionally kept in data so mobile can still show images; desktop mega will not render them
    media: [
      {
        title: "Home One",
        image:
          "https://maya-theme-empower.myshopify.com/cdn/shop/files/hm1-n_a7f4b6d4-97ee-4d87-907b-b21489a36953.jpg?v=1749019810&width=723",
        href: "https://maya-theme-empower.myshopify.com/",
      },
      {
        title: "Home Two",
        image:
          "https://maya-theme-empower.myshopify.com/cdn/shop/files/hm2-n_2a6d6976-65e1-4b46-9b93-8ee8beed78e1.jpg?v=1749019810&width=723",
        href: "/pages/home-two",
      },
    ],
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
    <svg viewBox="0 0 15 9" className="w-4 h-3" fill="none" aria-hidden>
      <rect width="15" height="2" rx="1" fill="currentColor" />
      <rect y="7" width="9" height="2" rx="1" fill="currentColor" />
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" aria-hidden>
      <path d="M15.813 14.8711L11.8369 10.8951C12.9205 9.56987 13.4532 7.87893 13.325 6.17198C13.1967 4.46502 12.4173 2.87267 11.1479 1.72427C9.87853 0.575873 8.21632 -0.0406994 6.50509 0.00208668C4.79386 0.0448727 3.16454 0.743743 1.95414 1.95414C0.743743 3.16454 0.0448727 4.79386 0.00208668 6.50509C-0.0406994 8.21632 0.575873 9.87853 1.72427 11.1479C2.87267 12.4173 4.46502 13.1967 6.17198 13.325C7.87893 13.4532 9.56987 12.9205 10.8951 11.8369L14.8711 15.813C14.9968 15.9344 15.165 16.0015 15.3397 16C15.5143 15.9985 15.6814 15.9284 15.8049 15.8049C15.9284 15.6814 15.9985 15.5143 16 15.3397C16.0015 15.165 15.9344 14.9968 15.813 14.8711ZM6.68251 12.0115C5.62855 12.0115 4.59825 11.6989 3.72191 11.1134C2.84556 10.5278 2.16254 9.69556 1.7592 8.72182C1.35587 7.74808 1.25034 6.6766 1.45595 5.64289C1.66157 4.60917 2.16911 3.65964 2.91437 2.91437C3.65964 2.16911 4.60917 1.66157 5.64289 1.45595C6.6766 1.25034 7.74808 1.35587 8.72182 1.7592C9.69556 2.16254 10.5278 2.84556 11.1134 3.72191C11.6989 4.59825 12.0115 5.62855 12.0115 6.68251C12.0099 8.09535 11.4479 9.44987 10.4489 10.4489C9.44987 11.4479 8.09535 12.0099 6.68251 12.0115Z" fill="currentColor" />
    </svg>
  ),
  Account: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden>
      <path d="M20.4853 3.51471C18.2188 1.24823 15.2053 0 12 0C8.79474 0 5.78119 1.24823 3.51471 3.51471C1.24823 5.78119 0 8.79474 0 12C0 15.2053 1.24823 18.2188 3.51471 20.4853C5.78119 22.7518 8.79474 24 12 24C15.2053 24 18.2188 22.7518 20.4853 20.4853C22.7518 18.2188 24 15.2053 24 12C24 8.79474 22.7518 5.78119 20.4853 3.51471ZM5.20807 20.1233C5.60431 16.7139 8.53564 14.0815 12 14.0815C13.8263 14.0815 15.5436 14.7931 16.8354 16.0847C17.9268 17.1762 18.6151 18.6013 18.7921 20.1231C16.9519 21.6643 14.5825 22.5938 12 22.5938C9.41748 22.5938 7.04828 21.6645 5.20807 20.1233ZM12 12.6332C9.99042 12.6332 8.35529 10.998 8.35529 8.98846C8.35529 6.9787 9.99042 5.34375 12 5.34375C14.0096 5.34375 15.6447 6.9787 15.6447 8.98846C15.6447 10.998 14.0096 12.6332 12 12.6332Z" fill="currentColor" />
    </svg>
  ),
  Cart: () => (
    <svg viewBox="0 0 22 22" className="w-5 h-5" fill="none" aria-hidden>
      <path d="M16.8499 21.5H5.1499C2.6749 21.5 0.649902 19.475 0.649902 17V16.85L1.0999 4.85C1.1749 2.375 3.1999 0.5 5.5999 0.5H16.3999C18.7999 0.5 20.8249 2.375 20.8999 4.85L21.3499 16.85C21.4249 18.05 20.9749 19.175 20.1499 20.075C19.3249 20.975 18.1999 21.5 16.9999 21.5C16.9999 21.5 16.9249 21.5 16.8499 21.5ZM5.5999 2C3.9499 2 2.6749 3.275 2.5999 4.85L2.1499 17C2.1499 18.65 3.4999 20 5.1499 20H16.9999C17.8249 20 18.5749 19.625 19.0999 19.025C19.6249 18.425 19.9249 17.675 19.9249 16.85L19.4749 4.85C19.3999 3.2 18.1249 2 16.4749 2H5.5999Z" fill="currentColor" />
      <path d="M11 9.5C8.075 9.5 5.75 7.175 5.75 4.25C5.75 3.8 6.05 3.5 6.5 3.5C6.95 3.5 7.25 3.8 7.25 4.25C7.25 6.35 8.9 8 11 8C13.1 8 14.75 6.35 14.75 4.25C14.75 3.8 15.05 3.5 15.5 3.5C15.95 3.5 16.25 3.8 16.25 4.25C16.25 7.175 13.925 9.5 11 9.5Z" fill="currentColor" />
    </svg>
  ),
  ChevronDown: ({ className = "w-2 h-2" }) => (
    <svg viewBox="0 0 8 6" className={className} fill="none" aria-hidden>
      <path d="m1 1.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 52 43" className="w-4 h-4" fill="none" aria-hidden>
      <path d="M0.7758 37.8686L4.1886 42.7085L43.9453 14.675L40.6173 33.9547L46.4679 34.9684L51.5177 5.71225L22.2644 0.643612L21.2545 6.4948L40.5325 9.83504L0.7758 37.8686Z" fill="currentColor" />
    </svg>
  ),
};

export default function V249() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState(null); // id of open mega on desktop
  const [openDropdown, setOpenDropdown] = useState(null); // id for small dropdowns
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(7);
  const [hoveredNav, setHoveredNav] = useState(null); // which nav item is hovered

  const navRef = useRef(null);
  const closeTimerRef = useRef(null);

  // close menus on outside click
  useEffect(() => {
    function handleClick(e) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) {
        setOpenMega(null);
        setOpenDropdown(null);
        setHoveredNav(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // helpers to open/close dropdowns with small delay to avoid flicker
  function openDropdownImmediate(id) {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenDropdown(id);
    setHoveredNav(id);
  }
  function closeDropdownWithDelay(idToClose = null, delay = 120) {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      // only clear if it's still the same one
      if (!idToClose || openDropdown === idToClose) {
        setOpenDropdown(null);
      }
      setHoveredNav(null);
      closeTimerRef.current = null;
    }, delay);
  }

  // same for mega menus
  const megaOpenTimerRef = useRef(null);
  function openMegaImmediate(id) {
    if (megaOpenTimerRef.current) {
      clearTimeout(megaOpenTimerRef.current);
      megaOpenTimerRef.current = null;
    }
    setOpenMega(id);
    setHoveredNav(id);
  }
  function closeMegaWithDelay(idToClose = null, delay = 120) {
    if (megaOpenTimerRef.current) clearTimeout(megaOpenTimerRef.current);
    megaOpenTimerRef.current = setTimeout(() => {
      if (!idToClose || openMega === idToClose) {
        setOpenMega(null);
      }
      setHoveredNav(null);
      megaOpenTimerRef.current = null;
    }, delay);
  }

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Mobile hamburger + Logo */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <span className="text-white"><Icon.Hamburger /></span>
            </button>

            <a href="/" className="flex items-center gap-3">
              <img
                src="https://maya-theme-empower.myshopify.com/cdn/shop/files/MAYA-1.png?v=1741591345&width=360"
                alt="Maya-theme-empower"
                className="h-[26px] w-auto"
                loading="eager"
              />
            </a>
          </div>

          {/* Center: Navigation (desktop) */}
          <nav
            ref={navRef}
            className="hidden md:flex items-center space-x-4"
            aria-label="Primary"
          >
            {MENU_DATA.map((menu) => {
              if (menu.type === "mega") {
                return (
                  <div
                    key={menu.id}
                    className="relative"
                    onMouseEnter={() => openMegaImmediate(menu.id)}
                    onMouseLeave={() => closeMegaWithDelay(menu.id)}
                  >
                    <button
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium focus:outline-none transform transition-transform transition-colors duration-150 ${
                        hoveredNav === menu.id
                          ? "bg-white text-black rounded-md -translate-y-1"
                          : "text-white hover:text-gray-200 hover:-translate-y-1"
                      }`}
                      aria-haspopup="true"
                      aria-expanded={openMega === menu.id}
                      onMouseEnter={() => setHoveredNav(menu.id)}
                    >
                      <span>{menu.title}</span>
                      <span className="text-gray-200"><Icon.ChevronDown /></span>
                    </button>

                    {/* Mega menu panel (desktop) - For 'home' we do NOT show the media/images */}
                    <div
                      className={`absolute left-0 mt-2 w-[820px] bg-white text-black rounded-md shadow-lg transform transition-opacity duration-150 ${
                        openMega === menu.id ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                      }`}
                      onMouseEnter={() => openMegaImmediate(menu.id)}
                      onMouseLeave={() => closeMegaWithDelay(menu.id)}
                    >
                      <div className="p-6 grid grid-cols-3 gap-6">
                        {/* RENDER: groups only (images removed for desktop Home mega) */}
                        {menu.groups.map((g, i) => (
                          <div key={i}>
                            <a href={g.href} className="text-sm font-semibold mb-3 inline-block text-gray-900">{g.header}</a>
                            <ul className="mt-2 space-y-2">
                              {g.items.map((it, j) => (
                                <li key={j}>
                                  <a href={it.href} className="text-sm text-gray-700 hover:text-gray-900 block">
                                    {it.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              if (menu.type === "dropdown") {
                return (
                  <div
                    key={menu.id}
                    className="relative"
                    onMouseEnter={() => openDropdownImmediate(menu.id)}
                    onMouseLeave={() => closeDropdownWithDelay(menu.id)}
                  >
                    <button
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium focus:outline-none transform transition-transform transition-colors duration-150 ${
                        hoveredNav === menu.id
                          ? "bg-white text-black rounded-md -translate-y-1"
                          : "text-white hover:text-gray-200 hover:-translate-y-1"
                      }`}
                      aria-expanded={openDropdown === menu.id}
                      onMouseEnter={() => setHoveredNav(menu.id)}
                    >
                      <span>{menu.title}</span>
                      <span className="text-gray-200"><Icon.ChevronDown /></span>
                    </button>

                    {/* Catalog dropdown panel: black background with white text */}
                    <div
                      className={`absolute left-0 mt-2 w-60 bg-white text-black text-left rounded-md shadow-md py-2 transition-opacity duration-150 ${
                        openDropdown === menu.id ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                      }`}
                      onMouseEnter={() => openDropdownImmediate(menu.id)}
                      onMouseLeave={() => closeDropdownWithDelay(menu.id)}
                    >
                      {menu.items.map((it) => (
                        <a
                          key={it.href}
                          href={it.href}
                          className="block px-4 py-2 text-sm text-black hover:bg-black hover:rounded-xl hover:text-white"
                        >
                          {it.title}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }

              return null;
            })}

            {/* plain nav items: About, Blogs, Privacy — consistent hover highlight + translate Y */}
            <a
              href="/pages/about-us"
              className={`px-3 py-2 text-sm font-medium transform transition-transform transition-colors duration-150 ${hoveredNav === "about" ? "bg-white text-black rounded-md -translate-y-1" : "text-white hover:text-gray-200 hover:-translate-y-1"}`}
              onMouseEnter={() => setHoveredNav("about")}
              onMouseLeave={() => setHoveredNav(null)}
            >
              About
            </a>

            <a
              href="/blogs/news"
              className={`px-3 py-2 text-sm font-medium transform transition-transform transition-colors duration-150 ${hoveredNav === "blogs" ? "bg-white text-black rounded-md -translate-y-1" : "text-white hover:text-gray-200 hover:-translate-y-1"}`}
              onMouseEnter={() => setHoveredNav("blogs")}
              onMouseLeave={() => setHoveredNav(null)}
            >
              Blogs
            </a>

            <a
              href="/policies/privacy-policy"
              className={`px-3 py-2 text-sm font-medium transform transition-transform transition-colors duration-150 ${hoveredNav === "privacy" ? "bg-white text-black rounded-md -translate-y-1" : "text-white hover:text-gray-200 hover:-translate-y-1"}`}
              onMouseEnter={() => setHoveredNav("privacy")}
              onMouseLeave={() => setHoveredNav(null)}
            >
              Privacy
            </a>
          </nav>

          {/* Right: Buttons */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setSearchOpen((s) => !s)}
                className="p-2 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Search"
              >
                <Icon.Search />
              </button>

              {searchOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white text-black rounded-md shadow-lg p-3">
                  <label htmlFor="header-search" className="sr-only">Search</label>
                  <div className="flex items-center gap-2">
                    <input id="header-search" type="search" placeholder="Search products..." className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none" />
                    <button className="px-3 py-2 bg-black text-white rounded">Go</button>
                  </div>
                </div>
              )}
            </div>

            <a href="/account/login" className="p-2 rounded hover:bg-white/10 flex items-center gap-2">
              <Icon.Account />
              <span className="sr-only">Log in</span>
            </a>

            <button
              className="relative p-2 rounded hover:bg-white/10"
              aria-label="Cart"
            >
              <Icon.Cart />
              <span className="sr-only">Cart</span>
              <div className="absolute -right-1 -top-1 bg-white text-black rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">
                {cartCount}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-50 transition-all ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={`relative w-80 max-w-full h-full bg-white text-black transform transition-transform ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <a href="/" className="flex items-center gap-3">
              <img
                src="https://maya-theme-empower.myshopify.com/cdn/shop/files/MAYA-1.png?v=1741591345&width=360"
                alt="Maya-logo"
                className="h-6 w-auto"
              />
            </a>
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <svg viewBox="0 0 9 9" className="w-4 h-4">
                <path d="M0.27999 7.36976C-0.0933304 7.74327 -0.0933304 8.34672 0.27999 8.72022C0.466213 8.90645 0.710665 9 0.95529 9C1.19974 9 1.44419 8.90645 1.63041 8.72022L4.5 5.85039L7.36959 8.72022C7.55581 8.90645 7.80026 9 8.04471 9C8.28934 9 8.53379 8.90645 8.72001 8.72022C9.09333 8.34672 9.09333 7.74327 8.72001 7.36976L5.85025 4.50011L8.72001 1.63045C9.09333 1.25695 9.09333 0.653502 8.72001 0.279997C8.34651 -0.0933324 7.74308 -0.0933324 7.36959 0.279997L4.5 3.14983L1.63041 0.279997C1.25692 -0.0933324 0.653486 -0.0933324 0.27999 0.279997C-0.0933304 0.653502 -0.0933304 1.25695 0.27999 1.63045L3.14975 4.50011L0.27999 7.36976Z" fill="currentColor" />
              </svg>
            </button>
          </div>

          <div className="p-4">
            <nav className="space-y-4">
              {/* Home with nested */}
              <div className="border-b pb-4">
                <MobileMenuSection title="Home" groups={MENU_DATA.find(m=>m.id==="home").groups} media={MENU_DATA.find(m=>m.id==="home").media} />
              </div>

              {/* Catalog */}
              <div className="border-b pb-4">
                <MobileSimpleDropdown title="Catalog" items={MENU_DATA.find(m=>m.id==="catalog").items} />
              </div>

              <a href="/pages/about-us" className="block py-2 text-sm">About</a>
              <a href="/blogs/news" className="block py-2 text-sm">Blogs</a>
              <a href="/policies/privacy-policy" className="block py-2 text-sm">Privacy</a>
            </nav>
          </div>

          <div className="mt-auto p-4 border-t">
            <a href="/account/login" className="flex gap-2 items-center text-sm">
              <Icon.Account />
              Log in
            </a>
          </div>
        </aside>
      </div>
    </header>
  );
}

/* Mobile helpers as internal components */
function MobileMenuSection({ title, groups, media }) {
  const [openGroup, setOpenGroup] = useState(null);
  return (
    <div>
      <div className="flex items-center justify-between">
        <a href="/" className="text-base font-semibold">{title}</a>
      </div>

      <div className="mt-3">
        {groups.map((g, i) => (
          <div key={i} className="mb-3">
            <button
              className="w-full text-left flex items-center justify-between py-2"
              onClick={() => setOpenGroup(openGroup === i ? null : i)}
            >
              <span className="font-semibold">{g.header}</span>
              <svg className={`w-3 h-3 transform transition-transform ${openGroup === i ? "rotate-90" : ""}`} viewBox="0 0 7 7" fill="none">
                <path d="M0.48249 0.923833L0.482511 1.77624L4.82887 1.77626L0.625632 5.77029L1.25997 6.37305L5.4632 2.37902L5.4632 6.50903L6.36025 6.50905L6.36025 0.923812L0.48249 0.923833Z" fill="currentColor" />
              </svg>
            </button>
            {openGroup === i && (
              <ul className="mt-2 space-y-1 pl-3">
                {g.items.map((it, idx) => (
                  <li key={idx}><a className="block py-1 text-sm" href={it.href}>{it.title}</a></li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="mt-4 grid grid-cols-2 gap-2">
          {media.map((m, i) => (
            <a key={i} href={m.href} className="block">
              <div className="h-28 bg-gray-100 overflow-hidden rounded">
                <img src={m.image} alt={m.title} className="object-cover w-full h-full" />
              </div>
              <div className="mt-1 text-sm font-medium">{m.title}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileSimpleDropdown({ title, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className="w-full text-left flex items-center justify-between py-2" onClick={() => setOpen(!open)}>
        <span className="font-semibold">{title}</span>
        <svg className={`w-3 h-3 transform transition-transform ${open ? "rotate-90" : ""}`} viewBox="0 0 7 7" fill="none">
          <path d="M0.48249 0.923833L0.482511 1.77624L4.82887 1.77626L0.625632 5.77029L1.25997 6.37305L5.4632 2.37902L5.4632 6.50903L6.36025 6.50905L6.36025 0.923812L0.48249 0.923833Z" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <ul className="mt-2 pl-3 space-y-1">
          {items.map((it, idx) => (
            <li key={idx}><a className="block py-1 text-sm" href={it.href}>{it.title}</a></li>
          ))}
        </ul>
      )}
    </div>
  );
}
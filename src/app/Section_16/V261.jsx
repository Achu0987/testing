import React, { useEffect, useRef, useState } from 'react';

/* Product data (featured content stays fixed to Classic Paneer per your request) */
const PRODUCTS = [
  {
    slug: 'dairy',
    title: 'DAIRY',
    img: 'https://cdn.sanity.io/images/krc73rcv/production/d58dac996908b557c32026e361441641bb625f3c-600x600.png?w=420&auto=format',
  },
  {
    slug: 'desserts',
    title: 'DESSERTS',
    img: 'https://cdn.sanity.io/images/krc73rcv/production/9897ce7f3ed4077aa5c9561a5af520b6adc14e23-600x600.png?w=420&auto=format',
  },
  {
    slug: 'snacks',
    title: 'SNACKS',
    img: 'https://cdn.sanity.io/images/krc73rcv/production/410f6e540030291f5e4d0419dc44de5908a2c73d-600x600.png?w=420&auto=format',
  },
  {
    slug: 'samosas',
    title: 'SAMOSAS',
    img: 'https://cdn.sanity.io/images/krc73rcv/production/45577cae6d33ce9af02f7d7bfbb594bd6a9a23d5-600x600.png?w=420&auto=format',
  }
];

const TAGS = [
  { title: 'VEGAN', img: 'https://cdn.sanity.io/images/krc73rcv/production/4e2319bfd758f38c13e3a137cf9edc63bea4cf66-600x600.png?w=420&auto=format' },
  { title: 'GELATIN FREE', img: 'https://cdn.sanity.io/images/krc73rcv/production/56c728188c5eaa1145004ceb0b9caa726c60bdfe-500x500.png?w=420&auto=format' },
  { title: 'GLUTEN FREE', img: 'https://cdn.sanity.io/images/krc73rcv/production/71f4a2e540358457e9e5d4701248b3c985686dc1-600x600.png?w=420&auto=format' },
  { title: 'HALAL', img: 'https://cdn.sanity.io/images/krc73rcv/production/abc6bca16bfbadf70ddc4109b79d107c2b1605af-600x600.png?w=420&auto=format' }
];

/* Featured is fixed to Classic Paneer image (per your instruction: clicking products should NOT change the right image) */
const FEATURED = {
  headline: 'CLASSIC\nPANEER',
  desc: "Fresh, handcrafted paneer made using our traditional process — creamy texture, perfect for curries and grilling.",
  badge: 'https://cdn.sanity.io/images/krc73rcv/production/bc841fb33ef0730af8eb82914313e1d86f465b2c-400x400.png?w=200&auto=format',
  productImage: 'https://cdn.sanity.io/images/krc73rcv/production/7dbaf862008dfa551e13976a42a113a1ee492ee5-840x587.png?w=320&auto=format&dpr=2',
  cta: '/products/paneer'
};

export default function V261() {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0); // which product row appears active
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const productRefs = useRef([]);

  /* Close behaviors: Escape, outside click, resize */
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onDocClick(e) {
      if (open && panelRef.current && toggleRef.current && !panelRef.current.contains(e.target) && !toggleRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onDocClick);
    window.addEventListener('resize', () => setOpen(false));
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onDocClick);
      window.removeEventListener('resize', () => setOpen(false));
    };
  }, [open]);

  /* When opened, focus first product row */
  useEffect(() => {
    if (open) {
      productRefs.current[0]?.focus();
      if (panelRef.current) panelRef.current.scrollTop = 0;
    } else {
      toggleRef.current?.focus();
    }
  }, [open]);

  function handleProductClick(idx) {
    // mark row active, but DO NOT change featured image (per your request)
    setActiveIdx(idx);
  }

  function productKeyHandler(e, idx) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleProductClick(idx);
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next = Math.min(PRODUCTS.length - 1, idx + 1);
      productRefs.current[next]?.focus();
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = Math.max(0, idx - 1);
      productRefs.current[prev]?.focus();
    }
  }

  return (
    <div className="min-h-screen p-5 bg-white" style={{ fontFamily: "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, Arial" }}>
      <div className="">
        <header className="relative bg-[#1e1919] rounded-[12px] h-[80px] grid grid-cols-[1fr_auto_1fr] items-center px-5">
          {/* LEFT NAV */}
          <nav aria-label="Primary navigation" className="flex items-center">
            <ul className="flex gap-4 items-center list-none" role="menubar">
              {/* Products - with arrow that rotates when open */}
              <li role="none">
                <button
                  ref={toggleRef}
                  id="products-toggle"
                  aria-haspopup="true"
                  aria-expanded={open}
                  onClick={() => setOpen(v => !v)}
                  className="inline-flex items-center gap-2 text-white font-semibold text-[20px] px-1 py-2 focus:outline-none"
                >
                  <span className="border-b-2 border-transparent hover:border-white transition-colors">Products</span>
                  {/* Arrow (points right when closed, down when open) */}
                  <span aria-hidden className={`inline-block transform transition-transform duration-200 ${open ? 'rotate-90' : 'rotate-0'}`}>
                    <svg viewBox="0 0 10 10" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 3L5.5 6.5L2 9" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </span>
                </button>
              </li>

              {/* Other nav items - underline only on hover */}
              <li role="none">
                <a href="/recipes" role="menuitem" onClick={() => setOpen(false)} className="text-white font-semibold text-[15px] px-1 py-2 focus:outline-none">
                  <span className="border-b-2 border-transparent hover:border-white transition-colors">Recipes</span>
                </a>
              </li>

              <li role="none">
                <a href="/about" role="menuitem" onClick={() => setOpen(false)} className="text-white font-semibold text-[15px] px-1 py-2 focus:outline-none">
                  <span className="border-b-2 border-transparent hover:border-white transition-colors">About Us</span>
                </a>
              </li>

              <li role="none">
                <a href="/news" role="menuitem" onClick={() => setOpen(false)} className="text-white font-semibold text-[15px] px-1 py-2 focus:outline-none">
                  <span className="border-b-2 border-transparent hover:border-white transition-colors">News</span>
                </a>
              </li>

              <li role="none">
                <a href="/search" role="menuitem" aria-label="Search link" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 text-white font-semibold text-[15px] px-1 py-2 focus:outline-none">
                  <span className="border-b-2 border-transparent hover:border-white transition-colors">Search</span>
                  <span className="w-[22px] h-[22px] rounded-full bg-[#262222] inline-flex items-center justify-center border border-white/6">
                    <svg viewBox="0 0 12 12" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="5" cy="5" r="3" stroke="#fff" strokeWidth="1.1" fill="none" />
                      <path d="M8.2 8.2L11 11" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                  </span>
                </a>
              </li>
            </ul>
          </nav>

          {/* CENTER LOGO */}
          <div className="flex justify-center">
            <a href="/" title="Brar's" aria-label="Brar's logo" className="block focus:outline-none">
              <img alt="Brar's" src="https://cdn.sanity.io/images/krc73rcv/production/26fab2e70d6dd82eef0f22a10b3682347b638e7b-151x40.svg" className="h-11 block" />
            </a>
          </div>

          {/* RIGHT CTAS */}
          <div className="flex gap-3 justify-end items-center">
            <a className="inline-flex items-center gap-3 rounded-[10px] px-4 py-2 font-semibold text-[14px] bg-white text-[#1e1919] border border-black/6 hover:bg-gray transition-colors focus:outline-none" href="/where-to-buy">
              Find Product
              <span className="inline-flex w-4.5 h-4.5 rounded-[8px] bg-[#1e1919] text-white items-center justify-center" style={{ width: 18, height: 18 }}>
                <svg viewBox="0 0 10 10" width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5h5.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M5.2 2.1L8.7 5.5 5.2 8.9" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>

            <a className="inline-flex items-center gap-3 rounded-[10px] px-3 py-2 font-semibold text-[14px] text-white border border-white/16 hover:bg-white/10 transition-colors focus:outline-none" href="https://restaurants.brars.com/#/" target="_blank" rel="noopener noreferrer">
              Dine with Us
              <span className="inline-flex w-4.5 h-4.5 rounded-[8px] bg-transparent text-white items-center justify-center" style={{ width: 18, height: 18 }}>
                <svg viewBox="0 0 10 10" width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5h5.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M5.2 2.1L8.7 5.5 5.2 8.9" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>

          {/* MEGA PANEL */}
          <div
            ref={panelRef}
            role="region"
            aria-label="Products menu"
            aria-hidden={!open}
            className={`absolute left-3 right-3 top-[calc(72px+16px)] bg-[#fbf8f4] rounded-[12px] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.16)] z-50 overflow-auto transition-all ${open ? 'block' : 'hidden'} min-h-[360px] max-h-[520px] border border-gray-200`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_420px] gap-6 items-start">
              {/* LEFT: Product categories */}
              <div>
                <div className="text-[18px] font-extrabold mb-4 text-[#2b2b2b]">Product Categories</div>
                <div className="flex flex-col gap-3" role="list" aria-label="Product categories">
                  {PRODUCTS.map((p, idx) => {
                    const isActive = idx === activeIdx;
                    return (
                      <div
                        key={p.slug}
                        role="listitem"
                        tabIndex={0}
                        ref={(el) => (productRefs.current[idx] = el)}
                        onKeyDown={(e) => productKeyHandler(e, idx)}
                        onClick={() => handleProductClick(idx)}
                        className={`flex gap-4 items-center p-4 rounded-xl cursor-pointer ${isActive ? 'bg-[#f3ead7]' : 'hover:bg-[#f7f5f3]'} focus:outline-none`}
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-white shrink-0">
                          <img alt={p.title} src={p.img} className="w-[56px] h-[56px] object-cover" />
                        </div>
                        <div className="font-extrabold text-[20px] text-[#1b1a1a] tracking-[0.4px]">{p.title}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* MIDDLE: Type of products (tags) */}
              <div>
                <div className="text-[18px] font-extrabold mb-4 text-[#2b2b2b]">Type of Products</div>
                <div className="flex flex-col gap-3" role="list" aria-label="Type of products">
                  {TAGS.map((t, i) => (
                    <div
                      key={t.title}
                      tabIndex={0}
                      className="flex items-center gap-4 cursor-pointer p-4 rounded-xl hover:bg-[#f7f5f3] focus:outline-none"
                    >
                      <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shrink-0">
                        <img alt={t.title} src={t.img} className="w-[44px] h-[44px] object-cover" />
                      </div>
                      <div className="font-extrabold text-[18px]">{t.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Featured (STATIC; does not change on product click) */}
              <aside className="bg-[#973f54] text-white rounded-[14px] p-6 min-h-[420px] flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <div id="featured-title" className="font-['Anton'] text-[48px] leading-[0.95] tracking-[1px] uppercase mb-4 whitespace-pre-line">
                    {FEATURED.headline}
                  </div>
                  <p className="text-[14px] opacity-95 leading-6 max-w-[320px] mb-5">{FEATURED.desc}</p>

                  <a className="inline-flex items-center gap-3 bg-white text-[#1e1919] rounded-[10px] px-4 py-2.5 font-semibold hover:bg-gray-100 transition-colors focus:outline-none" href={FEATURED.cta}>
                    View Product
                    <span className="inline-flex w-4.5 h-4.5 rounded-[6px] bg-[#1e1919] text-white items-center justify-center" style={{ width: 18, height: 18 }}>
                      <svg viewBox="0 0 10 10" width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 5h5.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
                        <path d="M5.2 2.1L8.7 5.5 5.2 8.9" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                </div>

                <div className="relative z-10 flex justify-center items-end mt-4">
                  <img alt="Classic Paneer" src={FEATURED.productImage} className="max-w-[400px] w-full h-auto  rotate-[-8deg] object-contain" />
                </div>

                <img alt="Badge" src={FEATURED.badge} className="absolute right-[5px] top-[450px]  bottom-[] w-[100px] rotate-[8deg] opacity-90 z-0" />
              </aside>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
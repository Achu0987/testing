'use client';

// app/components/Navbar.js
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const MENU = [
  { label: 'Home', href: '/' },
  {
    label: 'Section 1-15',
    href: '',
    submenu: [
      { label: 'Section 1', href: '/Section_1' },
      { label: 'Section 10', href: '/Section_10' },
      { label: 'Section 11', href: '/Section_11' },
      { label: 'Section 17', href: '/Section_17' },
      { label: 'Section 18', href: '/Section_18' },
      { label: 'Section 30', href: '/Section_30' },

    
    ],
  },
  {
    label: 'Section 16-30',
    href: '',
    submenu: [
      { label: 'Section 11', href: '/Section_12' },
    ],
  },
];

const OPEN_DELAY = 80;   // ms before opening submenu
const CLOSE_DELAY = 260; // ms before closing submenu

const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const openTimer = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const hasHref = (href) => !!href && href.trim() !== '';

  const handleMouseEnter = (i) => {
    // entering either the trigger or submenu cancels close timer and starts open timer
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (openTimer.current) clearTimeout(openTimer.current);
    openTimer.current = setTimeout(() => {
      setOpenIndex(i);
      openTimer.current = null;
    }, OPEN_DELAY);
  };

  const handleMouseLeave = (i = null) => {
    // leaving either the trigger or submenu starts the close timer;
    // only close if the currently open menu matches (prevents cross-closing)
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpenIndex((prev) => (i === null || prev === i ? null : prev));
      closeTimer.current = null;
    }, CLOSE_DELAY);
  };

  const toggleSubmenu = (i) => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <header className="w-full bg-gray-900 text-white fixed top-0 left-0 z-[1000]">
      <nav className="flex items-center justify-between max-w-[1200px] mx-auto py-[12px] px-[20px]">
        <div className="brand">
          <Link href="/" className="text-white font-bold text-[18px] no-underline">MyApp</Link>
        </div>

        <ul className="nav-list flex gap-[12px] list-none m-0 p-0 items-center">
          {MENU.map((item, i) => {
            const isOpen = openIndex === i;
            const itemHasHref = hasHref(item.href);

            // Submenu classes now entirely controlled by isOpen
            const submenuClass = [
              'submenu absolute left-0 top-[calc(100%+6px)] bg-[#0b1220] min-w-[180px] rounded-lg py-[8px] list-none m-0 z-50',
              'shadow-[0_6px_18px_rgba(2,6,23,0.6)]',
              'transform origin-top transition-[opacity,transform] duration-[120ms]',
              isOpen
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                : 'pointer-events-none opacity-0 -translate-y-[6px] scale-[0.98]',
            ].join(' ');

            return (
              <li
                key={`${i}-${item.label}`}
                className={`nav-item relative ${isOpen ? 'open' : ''}`}
                onMouseEnter={() => item.submenu && handleMouseEnter(i)}
                onMouseLeave={() => item.submenu && handleMouseLeave(i)}
              >
                <div
                  className="nav-link inline-flex items-center gap-[8px] px-[12px] py-[8px] rounded-[6px] text-gray-200 cursor-pointer"
                  onClick={() => item.submenu && toggleSubmenu(i)}
                  role={item.submenu ? 'button' : undefined}
                  tabIndex={item.submenu ? 0 : undefined}
                  aria-haspopup={item.submenu ? 'true' : undefined}
                  aria-expanded={item.submenu ? isOpen : undefined}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && item.submenu) {
                      e.preventDefault();
                      toggleSubmenu(i);
                    }
                  }}
                  onFocus={() => item.submenu && handleMouseEnter(i)}
                  onBlur={() => item.submenu && handleMouseLeave(i)}
                >
                  {itemHasHref ? (
                    <Link href={item.href} className="text-inherit no-underline">{item.label}</Link>
                  ) : (
                    <span className="nav-label text-inherit text-[15px]">{item.label}</span>
                  )}
                  {item.submenu && <span className="caret text-[12px] opacity-80">▾</span>}
                </div>

                {item.submenu && (
                  <ul
                    className={submenuClass}
                    aria-hidden={!isOpen}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={() => handleMouseLeave(i)}
                  >
                    {item.submenu.map((sub, j) => {
                      const subHasHref = hasHref(sub.href);
                      return (
                        <li key={`${i}-${j}-${sub.label}`} className="px-[14px] py-[6px]">
                          {subHasHref ? (
                            <Link href={sub.href} className="text-gray-200 block no-underline hover:bg-[rgba(255,255,255,0.03)] hover:rounded-[6px]">
                              {sub.label}
                            </Link>
                          ) : (
                            <span className="sub-label text-gray-200 block">{sub.label}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Small global styles for <=720px */}
      <style jsx global>{`
        @media (max-width: 720px) {
          .navbar { padding: 10px 12px; }
          .nav-list { gap: 6px; overflow-x: auto; padding-bottom: 6px; }
          .submenu {
            position: static !important;
            transform: none !important;
            opacity: 1 !important;
            display: none !important;
            box-shadow: none !important;
            background: transparent !important;
            padding: 0 !important;
            pointer-events: auto !important;
          }
          .nav-item.open .submenu {
            display: block !important;
          }
          .submenu li { padding: 8px 0 8px 12px !important; }
        }
      `}</style>
    </header>
  );
};

export default Sidebar;
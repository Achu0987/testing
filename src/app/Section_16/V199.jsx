import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Instagram, Facebook, Linkedin } from "lucide-react";

export default function V199() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent background scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const links = [
    { label: "HOME", href: "#" },
    { label: "SHOP", href: "#" },
    { label: "MIXES", href: "#" },
    { label: "CONTACT", href: "#" },
  ];

  const linkVariants = {
    hidden: { opacity: 0, y: 30 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, type: "spring", stiffness: 70 },
    }),
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <div className="relative w-full font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md relative z-50">
        <h1 className="font-extrabold text-2xl tracking-wide">BOMBON</h1>
        <div className="flex items-center gap-6">
          <span className="cursor-pointer text-lg font-semibold">CART</span>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md border border-gray-300"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-cover bg-center flex flex-col justify-between"
            style={{
              backgroundImage: `url("https://bombon.rs/images/menu-bg.svg")`,
            }}
            aria-modal="true"
            role="dialog"
          >
            {/* Floating candies */}
            <img
              src="https://bombon.rs/_next/image?url=%2Fimages%2Fmenu-candy.png&w=256&q=75"
              alt="candy left"
              className="absolute top-10 left-0 w-20 h-20 object-contain"
            />
            <img
              src="https://bombon.rs/_next/image?url=%2Fimages%2Fmenu-candy.png&w=256&q=75"
              alt="candy right"
              className="absolute bottom-20 right-0 w-20 h-20 object-contain"
            />

            {/* Center Nav Links */}
            <nav
              className={`flex flex-col items-center justify-center flex-1 space-y-8 text-white font-bold text-4xl transition-all duration-300 ${
                menuOpen ? "font-serif" : ""
              }`}
            >
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  whileHover={{ scale: 1.1, color: "#FFD700" }}
                  onClick={() => setMenuOpen(false)}
                  className="tracking-widest transition-transform duration-200"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            {/* Footer Section */}
            <footer className="flex flex-col items-center gap-4 pb-6 text-white text-sm">
              <div className="flex gap-6 text-2xl">
                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="hover:text-pink-400 transition-colors"
                >
                  <Instagram size={28} />
                </a>

                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="hover:text-blue-500 transition-colors"
                >
                  <Facebook size={28} />
                </a>

                {/* LinkedIn */}
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="hover:text-blue-400 transition-colors"
                >
                  <Linkedin size={28} />
                </a>
              </div>
              <p className="text-xs tracking-wide">
                ©2025 Bombon. All rights reserved.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

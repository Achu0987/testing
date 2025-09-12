// app/components/V17.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const cards = [
  { icon: "🌿", title: "Global Reach", desc: "Deploy worldwide in minutes with edge-enabled routing and multi-region support for fast delivery." },
  { icon: "⚙️", title: "Automated Workflows", desc: "Design, schedule and monitor workflows visually with robust retry and observability." },
  { icon: "📈", title: "Realtime Analytics", desc: "Instant dashboards, anomaly alerts, and live funnels so you can react to trends as they happen." },
  { icon: "🧩", title: "Modular Integrations", desc: "Plug into popular services or write small adapters — keep integrations maintainable." },
  { icon: "🔐", title: "Enterprise Security", desc: "End-to-end encryption, RBAC and audit trails built for compliance and scale." },
  { icon: "⚡", title: "Performance Tuning", desc: "Auto-scaling, intelligent caching and latency optimizations for instant-feeling apps." }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 12 } },
};

// animation presets
const effects = {
  burst: { scale: [1, 1.3, 0.9, 1], opacity: [1, 0.7, 1], transition: { duration: 0.5 } },
  wobble: { rotate: [0, -8, 8, -4, 4, 0], transition: { duration: 0.7 } },
  jello: { scale: [1, 1.25, 0.75, 1.15, 0.9, 1], transition: { duration: 0.8 } },
  buzz: { x: [0, -3, 3, -3, 3, 0], transition: { duration: 0.3 } },
  pulse: { scale: [1, 1.1, 1], transition: { duration: 1.5, repeat: Infinity } },
  sparkle: {} // handled separately
};

function IconButton({ icon, activeEffect, setActiveEffect }) {
  const controls = useAnimation();

  // ensure base effect is applied (and re-applied when activeEffect changes)
  useEffect(() => {
    // if effect is sparkle we don't have per se an "animate" object; fallback to small pulse if sparkle
    const base = effects[activeEffect] && Object.keys(effects[activeEffect]).length ? effects[activeEffect] : effects.pulse;
    controls.start(base);
  }, [activeEffect, controls]);

  // one-off jump / bounce sequence on hover start
  const handleHoverStart = async () => {
    // short jump + settle sequence
    await controls.start({
      y: [-0, -12, 6, 0],
      scale: [1, 1.08, 0.98, 1],
      transition: [
        { duration: 0.12, ease: "easeOut" },
        { duration: 0.16, ease: "easeInOut" },
        { duration: 0.18, ease: "easeOut" }
      ]
    });
    // return to base effect
    const base = effects[activeEffect] && Object.keys(effects[activeEffect]).length ? effects[activeEffect] : effects.pulse;
    controls.start(base);
  };

  // click random effect (like your previous behavior)
  const handleClick = () => {
    const keys = ["burst", "wobble", "jello", "buzz", "sparkle"];
    const random = keys[Math.floor(Math.random() * keys.length)];
    setActiveEffect(random);
    // after the chosen effect, return to pulse after a short delay (for non-infinite effects)
    if (random !== "pulse") {
      setTimeout(() => setActiveEffect("pulse"), 800);
    }
  };

  return (
    <motion.div
      className="
        w-12 h-12 rounded-md flex items-center justify-center text-2xl
        bg-gradient-to-tr from-rose-50 to-sky-50 text-emerald-700
        transition-all duration-300
        group-hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]
        cursor-pointer relative overflow-visible
      "
      animate={controls}
      onMouseEnter={handleHoverStart}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
      aria-label="feature icon"
    >
      {icon}
      {/* SPARKLE EFFECT */}
      {activeEffect === "sparkle" &&
        Array.from({ length: 6 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full"
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{
              x: [0, (Math.random() - 0.5) * 50],
              y: [0, (Math.random() - 0.5) * 50],
              opacity: [1, 0],
              scale: [0, 1, 0],
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))
      }
    </motion.div>
  );
}

export default function V17() {
  const [activeEffect, setActiveEffect] = useState("pulse");

  return (
    <section className="w-full py-16 px-6 bg-gradient-to-b from-sky-50 to-white flex flex-col items-center">
      <div className="max-w-7xl w-full mx-auto">
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {cards.map((card, idx) => (
            <motion.article
              key={idx}
              variants={cardVariants}
              tabIndex={0}
              className="
                group relative bg-white rounded-xl p-6 shadow-md flex flex-col justify-between
                border border-transparent
                hover:scale-[1.03] hover:shadow-emerald-200/80
                hover:border-emerald-100
                transition-transform duration-300
              "
            >
              {/* SHINE EFFECT */}
              <div aria-hidden className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none z-20">
                <span
                  className="
                    absolute left-1/2 -translate-x-1/2 -top-40
                    w-20 h-[160%]
                    bg-gradient-to-b from-transparent via-white/80 to-transparent
                    transform -skew-y-12
                    opacity-0
                    group-hover:opacity-100
                    group-hover:translate-y-[220%]
                    transition-all duration-700 ease-out
                    mix-blend-screen
                  "
                />
              </div>

              {/* ICON + TEXT */}
              <div className="flex items-start gap-4 relative z-10">
                <IconButton
                  icon={card.icon}
                  activeEffect={activeEffect}
                  setActiveEffect={setActiveEffect}
                />

                <div className="flex-1 text-left">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 font-serif">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>

              {/* BUTTON */}
              <div className="mt-6 flex justify-end">
                <button
                  className="
                    inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                    transition transform duration-150 focus:outline-none
                    bg-emerald-50 text-emerald-700 border border-emerald-100
                    hover:scale-[1.05] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]
                  "
                >
                  Explore
                  <svg
                    className="w-4 h-4 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
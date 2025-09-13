// app/components/SideDrawerCards.jsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const cards = [
  {
    icon: "🌿",
    title: "Global Reach",
    desc: "Deploy worldwide in minutes with edge-enabled routing and multi-region support.",
  },
  {
    icon: "⚙️",
    title: "Automated Workflows",
    desc: "Design, schedule and monitor workflows visually with observability.",
  },
  {
    icon: "📈",
    title: "Realtime Analytics",
    desc: "Instant dashboards and anomaly alerts for fast insights.",
  },
  {
    icon: "🧩",
    title: "Modular Integrations",
    desc: "Plug into popular services or write small adapters.",
  },
  {
    icon: "🔐",
    title: "Enterprise Security",
    desc: "End-to-end encryption and RBAC built for compliance.",
  },
  {
    icon: "⚡",
    title: "Performance Tuning",
    desc: "Auto-scaling, caching and latency optimizations.",
  },
];

export default function V28() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="w-full py-20 px-6 bg-gradient-to-b from-gray-50 to-white flex flex-col items-center">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative h-[220px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer group"
          >
            {/* FRONT */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
              <span className="text-4xl">{card.icon}</span>
              <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
            </div>

            {/* SIDE DRAWER SLIDE */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: hovered === idx ? "0%" : "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-center p-6 text-center"
            >
              <p className="text-sm font-medium leading-relaxed">{card.desc}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

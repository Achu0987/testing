// app/components/InteractiveCardsScroll.js
"use client";

import React from "react";
import { motion } from "framer-motion";

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
    transition: {
      staggerChildren: 0.15,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 12 } },
};

export default function V45() {
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
              className="bg-white rounded-xl p-6 shadow-md flex flex-col justify-between border border-transparent hover:scale-[1.03] hover:shadow-lg transition-transform duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-md flex items-center justify-center text-2xl bg-gradient-to-tr from-rose-50 to-sky-50 text-emerald-700">
                  {card.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 font-serif">{card.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition transform duration-150 focus:outline-none bg-emerald-50 text-emerald-700 border border-emerald-100 hover:scale-[1.05] hover:shadow-md">
                  Explore
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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

// app/components/InteractiveCards.js
"use client";

import React, { useRef, useEffect, useState } from "react";

const cards = [
  { icon: "🌿", title: "Global Reach", desc: "Deploy worldwide in minutes with edge-enabled routing and multi-region support for fast delivery." },
  { icon: "⚙️", title: "Automated Workflows", desc: "Design, schedule and monitor workflows visually with robust retry and observability." },
  { icon: "📈", title: "Realtime Analytics", desc: "Instant dashboards, anomaly alerts, and live funnels so you can react to trends as they happen." },
  { icon: "🧩", title: "Modular Integrations", desc: "Plug into popular services or write small adapters — keep integrations maintainable." },
  { icon: "🔐", title: "Enterprise Security", desc: "End-to-end encryption, RBAC and audit trails built for compliance and scale." },
  { icon: "⚡", title: "Performance Tuning", desc: "Auto-scaling, intelligent caching and latency optimizations for instant-feeling apps." }
];

function FeatureCard({ item, index, onActivate, cardRefCallback }) {
  const wrapperRef = useRef(null);
  const cRef = useRef(null);
  const iconRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => { return () => cancelAnimationFrame(rafRef.current || 0); }, []);

  const handleMove = (e) => {
    const w = wrapperRef.current;
    const c = cRef.current;
    const ic = iconRef.current;
    if (!w || !c) return;

    const rect = w.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    const nx = (x - rect.width / 2) / (rect.width / 2);
    const ny = (y - rect.height / 2) / (rect.height / 2);
    const maxTilt = 6;
    const rotateY = nx * maxTilt;
    const rotateX = -ny * maxTilt;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      c.style.transition = "transform 120ms linear";
      c.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      if (ic) ic.style.transform = `translate(${nx * 8}px, ${ny * 8}px)`;
    });
  };

  const handleLeave = () => {
    const c = cRef.current;
    const ic = iconRef.current;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (c) { c.style.transition = "transform 700ms cubic-bezier(.2,.9,.2,1)"; c.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
      setTimeout(() => { if (c) c.style.transition = ""; }, 750); }
    if (ic) { ic.style.transition = "transform 450ms cubic-bezier(.2,.9,.2,1)"; ic.style.transform = "";
      setTimeout(() => { if (ic) ic.style.transition = ""; }, 480); }
  };

  useEffect(() => { if (cardRefCallback) cardRefCallback(cRef.current, index); }, [cRef.current]);

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={() => onActivate(index)}
      className="group relative p-[2.5px] rounded-2xl transition-transform duration-200 transform-gpu h-full"
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
        <div className="absolute -inset-0.5 w-[calc(100%+4px)] h-[calc(100%+4px)] left-[-2px] top-[-2px] rounded-2xl blur-[16px] opacity-85">
          <div className="w-full h-full rounded-2xl bg-[conic-gradient(from_180deg_at_50%_50%,_#7c3aed,_#06b6d4,_#f97316,_#7c3aed)] opacity-95" />
        </div>
      </div>

      <div className="absolute inset-[6px] rounded-xl bg-white/96 shadow-sm pointer-events-none" />

      <article
        ref={cRef}
        tabIndex={0}
        role="group"
        aria-label={item.title}
        className="relative bg-white rounded-xl p-6 h-full flex flex-col justify-between border border-transparent shadow-md overflow-hidden will-change-transform transition-shadow duration-300"
      >
        <div className="relative flex items-start gap-4 z-10">
          <div className="flex-shrink-0">
            <div ref={iconRef} className="w-12 h-12 rounded-md flex items-center justify-center text-2xl bg-gradient-to-tr from-rose-50 to-sky-50 text-emerald-700 transition-transform duration-200">
              {item.icon}
            </div>
          </div>

          <div className="flex-1 text-left">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 font-serif">{item.title}</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end z-10">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition transform duration-150 focus:outline-none bg-emerald-50 text-emerald-700 border border-emerald-100 hover:scale-[1.03] hover:shadow-md" aria-label={`Explore ${item.title}`}>
            Explore
            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </article>
    </div>
  );
}

export default function V13() {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const activeBorderRef = useRef(null);
  const cardRefs = useRef([]);
  const rafRef = useRef(null);

  const followers = useRef([{ x: 0, y: 0, tx: 0, ty: 0 }, { x: 0, y: 0, tx: 0, ty: 0 }, { x: 0, y: 0, tx: 0, ty: 0 }]);
  const [activeIndex, setActiveIndex] = useState(1);
  const cardRefCallback = (node, idx) => { cardRefs.current[idx] = node; };

  const borderState = useRef({ x: 0, y: 0, w: 0, h: 0, tx: 0, ty: 0, tw: 0, th: 0 });
  const wobbleOffset = useRef(0);

  const moveActiveBorderTo = (idx) => {
    const border = activeBorderRef.current;
    const container = containerRef.current;
    const card = cardRefs.current[idx];
    if (!border || !container || !card) return;

    const cRect = container.getBoundingClientRect();
    const r = card.getBoundingClientRect();

    borderState.current.tx = r.left - cRect.left + container.scrollLeft;
    borderState.current.ty = r.top - cRect.top + container.scrollTop;
    borderState.current.tw = r.width;
    borderState.current.th = r.height;
  };

  useEffect(() => { moveActiveBorderTo(activeIndex); }, [activeIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    followers.current.forEach((p) => { p.tx = cx; p.ty = cy; p.x = cx; p.y = cy; });

    function onPointerMove(e) {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      if (logoRef.current) {
        logoRef.current.style.transform = `translate3d(${nx*12}px, ${ny*8}px, 0) rotate(${nx*4}deg)`;
      }
    }

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", () => { if (logoRef.current) logoRef.current.style.transform = ""; });

    const sizes = [24, 40, 56];
    let bgPos = 0;

    function loop() {
      wobbleOffset.current += 0.08;

      followers.current.forEach((p, i) => {
        const sp = [0.18, 0.12, 0.08][i];
        p.x += (p.tx - p.x) * sp;
        p.y += (p.ty - p.y) * sp;
        const el = container.querySelector(`.follower-${i}`);
        if (el) el.style.transform = `translate3d(${p.x - sizes[i]/2}px, ${p.y - sizes[i]/2}px, 0) scale(${1 - i*0.18})`;
        if (el) el.style.opacity = `${0.95 - i*0.28}`;
      });

      const b = borderState.current;
      b.x += (b.tx - b.x) * 0.12;
      b.y += (b.ty - b.y) * 0.12;
      b.w += (b.tw - b.w) * 0.12;
      b.h += (b.th - b.h) * 0.12;
      if (activeBorderRef.current) {
        const border = activeBorderRef.current;
        const wobbleX = Math.sin(wobbleOffset.current) * 3;
        const wobbleY = Math.cos(wobbleOffset.current) * 2;
        border.style.left = `${b.x + wobbleX}px`;
        border.style.top = `${b.y + wobbleY}px`;
        border.style.width = `${b.w}px`;
        border.style.height = `${b.h}px`;
        bgPos = (bgPos + 0.6) % 300;
        border.style.backgroundPosition = `${bgPos}% 50%`;
      }

      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(rafRef.current || 0);
    };
  }, []);

  return (
    <section id="3" className="w-full py-16 px-6 bg-gradient-to-b from-sky-50 to-white flex flex-col items-center">
      <div className="max-w-7xl w-full mx-auto">
        <div ref={containerRef} className="relative">
          <div
            ref={activeBorderRef}
            className="pointer-events-none rounded-2xl"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 0,
              height: 0,
              zIndex: 0,
              borderRadius: "14px",
              padding: "4px",
              background: "linear-gradient(90deg, rgba(124,58,237,0.95), rgba(6,182,212,0.9), rgba(249,115,22,0.95), rgba(124,58,237,0.95))",
              backgroundSize: "300% 100%",
              boxShadow: "0 10px 30px rgba(2,6,23,0.18)",
            }}
          />

          <div className="pointer-events-none">
            <div className="follower-0 absolute w-6 h-6 rounded-full bg-indigo-500/90 blur-sm z-50" style={{ mixBlendMode: "screen", transition: "transform 120ms linear, opacity 120ms" }} />
            <div className="follower-1 absolute w-10 h-10 rounded-full bg-purple-500/80 blur-md z-40" style={{ mixBlendMode: "screen", transition: "transform 120ms linear, opacity 120ms" }} />
            <div className="follower-2 absolute w-14 h-14 rounded-full bg-pink-400/70 blur-lg z-30" style={{ mixBlendMode: "screen", transition: "transform 120ms linear, opacity 120ms" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch relative z-10">
            {cards.map((c, i) => (
              <div key={i} className="z-10 h-full">
                <FeatureCard
                  item={c}
                  index={i}
                  onActivate={(idx) => setActiveIndex(idx)}
                  cardRefCallback={cardRefCallback}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

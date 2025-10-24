import React, { useEffect, useRef, useState } from "react";

export default function V313() {
  const text = "JUST TALK";
  const radius = 120;
  const letterRefs = useRef([]);
  const [visible, setVisible] = useState(() =>
    Array.from({ length: text.length }, () => false)
  );
  const [pos, setPos] = useState({ x: -9999, y: -9999 });

  letterRefs.current = Array.from({ length: text.length }, (_, i) => letterRefs.current[i] || React.createRef());

  useEffect(() => {
    const handleMove = (e) => {
      const mx = e.clientX;
      const my = e.clientY;
      setPos({ x: mx, y: my });

      const newVis = visible.slice();
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " ") continue;
        const el = letterRefs.current[i]?.current;
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const d = Math.hypot(mx - cx, my - cy);
        // 👇 stay revealed once it's visible
        if (d < radius) newVis[i] = true;
      }
      setVisible(newVis);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [visible, text.length]);

  return (
    <div className="relative w-full h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Cursor Glow */}
      <div
        className="pointer-events-none fixed w-24 h-24 rounded-full bg-blue-400/30 blur-3xl transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${pos.x - 48}px, ${pos.y - 48}px)`,
        }}
      ></div>

      {/* Text container */}
      <div className="flex space-x-3 select-none">
        {text.split("").map((ch, i) => {
          if (ch === " ") return <div key={i} className="w-6" />;
          const isVisible = visible[i];
          return (
            <span
              key={i}
              ref={letterRefs.current[i]}
              className={`text-7xl font-bold transition-all duration-300 ease-out inline-block ${
                isVisible
                  ? "text-white scale-105 blur-0"
                  : "text-transparent blur-md"
              }`}
              style={{
                textShadow: isVisible ? "0 0 18px rgba(96,165,250,0.9)" : "none",
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>
    </div>
  );
}

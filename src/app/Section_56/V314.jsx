import React, { useEffect, useState } from "react";

export default function V314() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTrail((prev) => [
        ...prev.slice(-10),
        { x: e.clientX, y: e.clientY, id: Math.random() },
      ]);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      {/* Main glow */}
      <div
        className="fixed w-24 h-24 rounded-full pointer-events-none blur-2xl bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 opacity-70 transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${pos.x - 50}px, ${pos.y - 50}px)`,
        }}
      ></div>

      {/* Spark trail */}
      {trail.map((p) => (
        <div
          key={p.id}
          className="fixed w-4 h-4 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-300 blur-sm pointer-events-none opacity-80"
          style={{
            left: p.x - 2,
            top: p.y - 2,
            animation: "fadeOut 0.6s forwards",
          }}
        ></div>
      ))}

      <style>{`
        @keyframes fadeOut {
          0% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 0; transform: scale(0); }
        }
      `}</style>

      <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-extrabold tracking-wide select-none">
        ZRUBIX MAGIC ✨
      </div>
    </div>
  );
}

// app/components/Sidebar.js
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const sections = [
  { href: "/Section_1", label: "Section_1" },
  { href: "/Section_2", label: "Section_2" },
  { href: "/Section_3", label: "Section_3" },
  { href: "/Section_4", label: "Section_4" },
  { href: "/Section_5", label: "Section_5" },
];

const Sidebar = () => {
  const containerRef = useRef(null);
  const indicatorRef = useRef(null);
  const itemsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  // Per-item transform for 3D tilt
  const [tilt, setTilt] = useState({}); // { [index]: "rotateX(...) rotateY(...) translateZ(...)" }

  // Logo parallax ref
  const logoRef = useRef(null);

  // Move indicator (sliding border) to an item (by index)
  const moveIndicatorTo = (index) => {
    const container = containerRef.current;
    const el = itemsRef.current[index];
    const indicator = indicatorRef.current;
    if (!container || !el || !indicator) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const left = elRect.left - containerRect.left;
    const width = elRect.width;

    indicator.style.transform = `translateX(${left}px)`;
    indicator.style.width = `${width}px`;
  };

  useEffect(() => {
    // move indicator to initial active
    moveIndicatorTo(activeIndex);

    // reposition on resize
    const onResize = () => moveIndicatorTo(hoverIndex ?? activeIndex);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When hoverIndex changes, move indicator
  useEffect(() => {
    moveIndicatorTo(hoverIndex ?? activeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoverIndex, activeIndex]);

  // 3D tilt handlers
  const handleMouseMoveItem = (e, index) => {
    const el = itemsRef.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1

    // tilt degrees
    const rotateY = (px - 0.5) * 18; // -9..9 deg
    const rotateX = -(py - 0.5) * 10; // -5..5 deg
    const translateZ = 8; // subtle pop
    setTilt((t) => ({ ...t, [index]: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)` }));
  };

  const handleMouseLeaveItem = (index) => {
    setTilt((t) => ({ ...t, [index]: "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)" }));
    setHoverIndex(null);
  };

  // Logo parallax via mouse movement on the top container
  const handleTopMouseMove = (e) => {
    if (!logoRef.current) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const px = (e.clientX - cx) / cx; // -1..1
    const py = (e.clientY - cy) / cy;
    logoRef.current.style.transform = `translate3d(${px * 6}px, ${py * 6}px, 0) rotate(${px * 2}deg)`;
  };

  const handleTopMouseLeave = () => {
    if (!logoRef.current) return;
    logoRef.current.style.transform = `translate3d(0px, 0px, 0) rotate(0deg)`;
  };

  return (
    <div
      className="bg-gray-900 text-white py-4 px-6 relative overflow-hidden"
      onMouseMove={handleTopMouseMove}
      onMouseLeave={handleTopMouseLeave}
    >
      {/* Logo (left) */}
      <div
        ref={logoRef}
        className="absolute left-6 top-3 w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shadow-lg z-30"
        style={{ transition: "transform 0.15s linear" }}
      >
        {/* Replace with <img src="/logo.png" alt="Logo" /> if you have a logo */}
        L
      </div>

      <div
        ref={containerRef}
        className="flex justify-start gap-6 items-center overflow-x-auto relative z-20"
        style={{ paddingLeft: "56px" }} // make room for logo
      >
        {sections.map((s, i) => (
          <div
            key={s.href}
            ref={(el) => (itemsRef.current[i] = el)}
            className="relative"
            onMouseEnter={() => {
              setHoverIndex(i);
            }}
            onMouseMove={(e) => handleMouseMoveItem(e, i)}
            onMouseLeave={() => handleMouseLeaveItem(i)}
          >
            <Link
              href={s.href}
              onClick={() => setActiveIndex(i)}
              className={`block px-4 py-2 rounded-lg bg-transparent text-white transform transition-shadow duration-300 hover:shadow-xl hover:bg-white/5`}
              style={{
                // apply tilt transform if present
                transform: tilt[i] ?? "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
                transition: "transform 160ms ease, box-shadow 180ms ease",
                willChange: "transform",
                cursor: "pointer",
              }}
            >
              <span className="select-none font-medium">{s.label}</span>
            </Link>
          </div>
        ))}

        {/* Sliding indicator (bottom border) */}
        <div
          ref={indicatorRef}
          className="absolute bottom-0 h-[3px] bg-indigo-400 rounded transition-all duration-300"
          style={{
            left: 0,
            width: 0,
            transform: "translateX(0px)",
            transitionProperty: "transform, width",
            transitionTimingFunction: "cubic-bezier(.2,.9,.2,1)",
          }}
        />
      </div>

      {/* Overflow three dots - keep it interactive */}
      <div className="absolute right-6 top-3 z-30">
        <button
          className="text-white text-2xl font-bold focus:outline-none"
          title="More"
          onClick={() => {
            // if you want to open a dropdown you can implement it here
            alert("Add your dropdown handler here");
          }}
        >
          ...
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
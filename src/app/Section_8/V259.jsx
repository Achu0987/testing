"use client";
import React, { useEffect, useRef, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Yogurt & Cilantro",
    accent: "text-[rgb(255,73,0)]",
    bg: "#f9bf23",
    img: "https://cdn.sanity.io/images/krc73rcv/production/35579149cc31668c55a6459219949100f90332c7-840x587.png?w=320&auto=format&dpr=2",
    stickerLeft:
      "https://cdn.sanity.io/images/krc73rcv/production/8722962422a01c6724158379b67078e23c0e6d43-400x400.png?w=230&auto=format&dpr=2",
    stickerRight:
      "https://cdn.sanity.io/images/krc73rcv/production/bc841fb33ef0730af8eb82914313e1d86f465b2c-400x400.png?w=152&auto=format&dpr=2",
  },
  {
    id: 2,
    title: "Paneer & Mixed Veggies",
    accent: "text-[rgb(255,73,0)]",
    bg: "#fff3d6",
    img: "https://cdn.sanity.io/images/krc73rcv/production/7dbaf862008dfa551e13976a42a113a1ee492ee5-840x587.png?w=600&auto=format&dpr=2",
    stickerLeft:
      "https://cdn.sanity.io/images/krc73rcv/production/bc841fb33ef0730af8eb82914313e1d86f465b2c-400x400.png?w=152&auto=format&dpr=2",
    stickerRight:
      "https://cdn.sanity.io/images/krc73rcv/production/8722962422a01c6724158379b67078e23c0e6d43-400x400.png?w=230&auto=format&dpr=2",
  },
  {
    id: 3,
    title: "Indian Dessert Delicacy",
    accent: "text-[rgb(129,27,72)]",
    bg: "#f0e6f6",
    img: "https://cdn.sanity.io/images/krc73rcv/production/2c484f36845197e5e9e795a4c0a70cab7d1c5727-840x589.png?w=300&auto=format&dpr=2",
    stickerLeft:
      "https://cdn.sanity.io/images/krc73rcv/production/bc841fb33ef0730af8eb82914313e1d86f465b2c-400x400.png?w=152&auto=format&dpr=2",
    stickerRight:
      "https://cdn.sanity.io/images/krc73rcv/production/8722962422a01c6724158379b67078e23c0e6d43-400x400.png?w=230&auto=format&dpr=2",
  },
  {
    id: 4,
    title: "Plain Home-Style Yogurt",
    accent: "text-[rgba(0, 0, 0, 1)]",
    bg: "#f6f6f6",
    img: "https://cdn.sanity.io/images/krc73rcv/production/83e1e276c2a0407d5635e4addeff52a061be14b2-840x587.png?w=600&auto=format&dpr=2",
    stickerLeft:
      "https://cdn.sanity.io/images/krc73rcv/production/a537b213d0d11ddf19c487bd3bad04bac74f03ec-400x400.png?w=230&auto=format&dpr=2",
    stickerRight:
      "https://cdn.sanity.io/images/krc73rcv/production/8722962422a01c6724158379b67078e23c0e6d43-400x400.png?w=230&auto=format&dpr=2",
  },
];

export default function V259() {
  const AUTOPLAY_MS = 7000;
  const N = slides.length;
  const extendedSlides = [slides[N - 1], ...slides, slides[0]];

  const [extIndex, setExtIndex] = useState(1);
  const extIndexRef = useRef(extIndex);
  extIndexRef.current = extIndex;

  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const isTransitionRef = useRef(isTransitionEnabled);
  isTransitionRef.current = isTransitionEnabled;

  const [renderDragX, setRenderDragX] = useState(0);
  const renderDragXRef = useRef(0);
  renderDragXRef.current = renderDragX;

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTRef = useRef(0);

  const containerWidthRef = useRef(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const autoplayRef = useRef(null);

  const [prevRealIndex, setPrevRealIndex] = useState(0);
  const prevRealRef = useRef(prevRealIndex);
  prevRealRef.current = prevRealIndex;
  const [bgAnimColor, setBgAnimColor] = useState(null);
  const [isBgAnimating, setIsBgAnimating] = useState(false);
  const firstMountRef = useRef(true);

  useEffect(() => {
    const measure = () => {
      const w = containerRef.current?.clientWidth || 0;
      containerWidthRef.current = w;
      setContainerWidth(w);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, []);

  function startAutoplay() {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      goNext();
    }, AUTOPLAY_MS);
  }
  function stopAutoplay() {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }

  const extToReal = (idx) => (idx - 1 + N) % N;
  const realToExt = (r) => r + 1;

  const goNext = () => {
    setIsTransitionEnabled(true);
    setExtIndex((i) => i + 1);
  };
  const goPrev = () => {
    setIsTransitionEnabled(true);
    setExtIndex((i) => i - 1);
  };
  const goToReal = (realIdx) => {
    setIsTransitionEnabled(true);
    setExtIndex(realToExt(realIdx));
    startAutoplay();
  };

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let pointerIdHeld = null;
    let dragging = false;

    const onPointerDown = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      e.preventDefault();
      try {
        node.setPointerCapture(e.pointerId);
        pointerIdHeld = e.pointerId;
      } catch {}
      stopAutoplay();
      dragging = true;
      setIsTransitionEnabled(false);

      startXRef.current = e.clientX;
      lastXRef.current = e.clientX;
      lastTRef.current = performance.now();
      setRenderDragX(0);

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerCancel);
      node.style.cursor = "grabbing";
    };

    const onPointerMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startXRef.current;
      lastXRef.current = e.clientX;
      lastTRef.current = performance.now();
      setRenderDragX(dx);
    };

    const onPointerUp = (e) => {
      if (!dragging) return;
      dragging = false;

      const now = performance.now();
      const dt = now - lastTRef.current || 1;
      const dxSinceLast = lastXRef.current - startXRef.current;
      const velocity = dxSinceLast / dt;

      const distThreshold = Math.max(50, (containerWidthRef.current || 1) * 0.15);
      const flickVelocity = 0.6;

      setIsTransitionEnabled(true);
      setRenderDragX(0);

      if (velocity <= -flickVelocity) setExtIndex((i) => i + 1);
      else if (velocity >= flickVelocity) setExtIndex((i) => i - 1);
      else {
        const totalDx = lastXRef.current - startXRef.current;
        if (totalDx <= -distThreshold) setExtIndex((i) => i + 1);
        else if (totalDx >= distThreshold) setExtIndex((i) => i - 1);
        else setExtIndex((i) => i);
      }

      try {
        if (pointerIdHeld !== null) node.releasePointerCapture(pointerIdHeld);
      } catch {}
      pointerIdHeld = null;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
      startAutoplay();
      node.style.cursor = "grab";
    };

    const onPointerCancel = () => {
      dragging = false;
      setRenderDragX(0);
      setIsTransitionEnabled(true);
      try {
        if (pointerIdHeld !== null) node.releasePointerCapture(pointerIdHeld);
      } catch {}
      pointerIdHeld = null;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
      startAutoplay();
      node.style.cursor = "grab";
    };

    node.addEventListener("pointerdown", onPointerDown);
    node.style.cursor = "grab";

    return () => {
      node.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onTransitionEnd = (ev) => {
      if (ev.propertyName !== "transform") return;
      const current = extIndexRef.current;

      if (current === 0) {
        setIsTransitionEnabled(false);
        setExtIndex(N);
        setPrevRealIndex(N - 1);
      } else if (current === N + 1) {
        setIsTransitionEnabled(false);
        setExtIndex(1);
        setPrevRealIndex(0);
      } else {
        const real = extToReal(current);
        setPrevRealIndex(real);
      }
    };

    track.addEventListener("transitionend", onTransitionEnd);
    return () => track.removeEventListener("transitionend", onTransitionEnd);
  }, []);

  useEffect(() => {
    if (!isTransitionEnabled) {
      const t = setTimeout(() => setIsTransitionEnabled(true), 20);
      return () => clearTimeout(t);
    }
  }, [isTransitionEnabled]);

  useEffect(() => {
    const real = extToReal(extIndex);
    if (firstMountRef.current) {
      firstMountRef.current = false;
      setPrevRealIndex(real);
      return;
    }
    if (real === prevRealRef.current) return;
    setBgAnimColor(slides[real].bg);
    setIsBgAnimating(true);
  }, [extIndex]);

  const handleBgAnimEnd = () => {
    setIsBgAnimating(false);
    setBgAnimColor(null);
    setPrevRealIndex(extToReal(extIndexRef.current));
  };

  const effectiveWidth = containerWidth || containerWidthRef.current || 0;
  const translateX = -extIndex * effectiveWidth + renderDragX;
  const transitionStyle =
    isTransitionEnabled ? "transform 700ms cubic-bezier(.3,.85,.25,1)" : "none";

  const currentReal = extToReal(extIndex);
  const currentSlide = slides[currentReal];

  return (
    <section
      className="relative w-full overflow-hidden select-none"
      style={{ backgroundColor: slides[prevRealIndex]?.bg || slides[0].bg }}
    >
      <style>{`
        /* Background animation scales from bottom to top */
        .bg-scale-circle {
          position: absolute;
          left: 50%;
          bottom: 0; /* start from bottom */
          transform: translateX(-50%) scaleY(0);
          width: 1200px;
          height: 1200px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 3;
          transform-origin: bottom center; /* scale from bottom */
          will-change: transform, opacity;
        }
        @keyframes bgScaleUp {
          0% { transform: translateX(-50%) scaleY(0); opacity: 1; }
          60% { transform: translateX(-50%) scaleY(1.06); opacity: 1; }
          100% { transform: translateX(-50%) scaleY(1); opacity: 1; }
        }
        .bg-scale-animate {
          animation: bgScaleUp 1000ms cubic-bezier(.3,.85,.25,1) forwards;
        }
        @media (min-width: 768px) {
          .bg-scale-circle {
            width: 3200px;
            height: 3200px;
          }
        }
      `}</style>

      {isBgAnimating && bgAnimColor && (
        <div
          className="bg-scale-circle bg-scale-animate"
          style={{ backgroundColor: bgAnimColor }}
          onAnimationEnd={handleBgAnimEnd}
        />
      )}

      <h1
        className={`absolute z-20 font-extrabold uppercase tracking-tight leading-none ${currentSlide.accent} text-center left-1/2 -translate-x-1/2`}
        style={{
          top: undefined,
          fontSize: "clamp(26px,6vw,96px)",
          transition: "opacity .7s ease, transform .7s ease",
        }}
      >
        <span className="block mt-6 md:mt-10">{currentSlide.title}</span>
      </h1>

      <div className="relative z-10 flex items-center justify-center pt-28 md:pt-40 pb-8">
        <div
          ref={containerRef}
          className="relative w-full h-[420px] md:h-[760px] overflow-hidden"
          onDragStart={(e) => e.preventDefault()}
        >
          <div
            ref={trackRef}
            className="absolute left-0 top-0 h-full flex items-center"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              transition: transitionStyle,
              width: `${extendedSlides.length * 100}%`,
            }}
          >
            {extendedSlides.map((s, i) => {
              const isActiveExtended = i === extIndex;
              return (
                <div
                  key={`ext-${i}-${s.id}`}
                  className="relative flex-shrink-0 h-full flex items-center justify-center"
                  style={{ width: `${100 / extendedSlides.length}%` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                    <img
                      src={s.stickerLeft}
                      alt="sticker left"
                      className={`hidden md:block absolute left-[18%] top-[20%] w-52 h-52 md:w-72 md:h-72 object-contain opacity-60 transition-all duration-700 ${
                        isActiveExtended ? "opacity-100 scale-100 rotate-[-12deg]" : "opacity-0 scale-90"
                      }`}
                    />
                    <img
                      src={s.stickerRight}
                      alt="sticker right"
                      className={`hidden md:block absolute right-[18%] bottom-[15%] w-52 h-52 md:w-72 md:h-72 object-contain opacity-60 transition-all duration-700 ${
                        isActiveExtended ? "opacity-100 scale-100 rotate-[10deg]" : "opacity-0 scale-90"
                      }`}
                    />
                  </div>

                  <div
                    className={`relative z-10 flex flex-col items-center justify-center transform transition-all duration-700 ${
                      isActiveExtended ? "opacity-100 scale-100 -translate-y-4" : "opacity-0 scale-95 translate-y-2"
                    }`}
                    style={{ pointerEvents: isActiveExtended ? "auto" : "none" }}
                  >
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-[320px] md:w-[900px] max-w-full mt-8 object-contain drop-shadow-2xl"
                      draggable={false}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center gap-4 pb-8">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <button
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-3 bg-[#171516] text-white px-6 py-3 rounded-full shadow-lg hover:bg-black transition-all w-full md:w-auto justify-center"
          >
            View Product
            <span className="w-6 h-6 rounded-full bg-white text-[#171516] inline-flex items-center justify-center font-bold">
              ›
            </span>
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-3 bg-white text-[#111] px-6 py-3 rounded-full border-2 border-[#111] shadow-sm hover:bg-gray-100 transition-all w-full md:w-auto justify-center"
          >
            Find Product
            <span className="w-6 h-6 rounded-full bg-[#111] text-white inline-flex items-center justify-center font-bold">
              ›
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3 mt-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                goToReal(i);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                currentReal === i ? "bg-slate-800 scale-125" : "bg-white/70 hover:scale-110"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

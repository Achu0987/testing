'use client';


import React, { useEffect, useRef } from "react";

/**
 * V335.jsx
 * Single-file React component that reproduces the provided parallax design.
 * - Uses Tailwind utility classes via `className` (no external CSS files).
 * - Background layers use inline `style.backgroundImage`.
 * - HERO 3 ("Subtle final touch") uses only CSS gradients/radial glows (no photo image).
 * - Includes prefers-reduced-motion handling and proper cleanup of listeners.
 *
 * Drop this file into your React app (e.g., src/components/V335.jsx) and render <V335 />.
 */

export default function V335() {
  const mountedRef = useRef(false);
  const layersRef = useRef([]);
  const tickingRef = useRef(false);
  const smallScreenRef = useRef(false);
  const supportsPassiveRef = useRef(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    // Respect prefers-reduced-motion
    reducedMotionRef.current =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Gather parallax sections & layers
    const sections = Array.from(document.querySelectorAll("[data-parallax-section]"));
    const layers = [];
    sections.forEach((section) => {
      const bg = section.querySelector("[data-bg-layer]");
      if (bg) {
        const speedAttr = parseFloat(bg.getAttribute("data-speed"));
        const origSpeed = Number.isFinite(speedAttr) ? speedAttr : 0.25;
        layers.push({ section, bg, origSpeed, speed: origSpeed });
      }
    });
    layersRef.current = layers;

    if (!layers.length || reducedMotionRef.current) {
      // If reduced-motion is preferred or no layers present, reset
      layers.forEach((it) => {
        it.bg.style.transform = "none";
        it.bg.style.willChange = "auto";
      });
      return;
    }

    // small-screen adjustment
    smallScreenRef.current = window.matchMedia && window.matchMedia("(max-width:840px)").matches;
    if (smallScreenRef.current) {
      layers.forEach((it) => {
        it.speed = Math.max(it.origSpeed * 0.22, 0.02);
      });
    }

    // detect passive event listener support
    try {
      const opts = Object.defineProperty({}, "passive", {
        get() {
          supportsPassiveRef.current = true;
          return true;
        },
      });
      window.addEventListener("testPassive", null, opts);
      window.removeEventListener("testPassive", null, opts);
    } catch (e) {
      supportsPassiveRef.current = false;
    }

    // update function
    function update() {
      tickingRef.current = false;
      const vh = window.innerHeight || document.documentElement.clientHeight;

      layersRef.current.forEach((it) => {
        const rect = it.section.getBoundingClientRect();
        const offsetFromCenter = rect.top + rect.height / 2 - vh / 2;
        let translateY = -offsetFromCenter * it.speed;

        const max = vh * 0.8;
        const clamped = Math.max(Math.min(translateY, max), -max);
        const scale = 1 + Math.min(Math.abs(it.speed) * 0.12, 0.18);

        it.bg.style.transform = `translate3d(0, ${clamped}px, 0) scale(${scale})`;
        it.bg.style.willChange = "transform";
      });
    }

    // rAF wrapper
    function requestTick() {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(update);
      }
    }

    // Scroll & resize handlers
    const passiveOpt = supportsPassiveRef.current ? { passive: true } : false;

    function onScroll() {
      requestTick();
    }

    function onResize() {
      // recompute small-screen change
      const nowSmall = window.matchMedia && window.matchMedia("(max-width:840px)").matches;
      if (nowSmall !== smallScreenRef.current) {
        smallScreenRef.current = nowSmall;
        layersRef.current.forEach((it) => {
          it.speed = smallScreenRef.current ? Math.max(it.origSpeed * 0.22, 0.02) : it.origSpeed;
        });
      }
      requestTick();
    }

    window.addEventListener("scroll", onScroll, passiveOpt);
    window.addEventListener("resize", onResize, passiveOpt);

    // Initial paint
    update();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", onScroll, passiveOpt);
      window.removeEventListener("resize", onResize, passiveOpt);
      // reset transforms & will-change for safety
      layersRef.current.forEach((it) => {
        it.bg.style.transform = "";
        it.bg.style.willChange = "";
      });
    };
  }, []);

  return (
    <div id="top" className="min-h-screen w-full bg-[#071022] text-white antialiased scroll-smooth">
      {/* Floating header */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/6 rounded-lg px-4 py-2 font-bold tracking-wider text-[#eaf3ff] shadow-lg">
        Perfect Parallax Demo
      </div>

      {/* HERO 1 */}
      <section
        data-parallax-section
        className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-[6vw] py-[8vh]"
      >
        <div
          data-bg-layer
          data-speed="0.35"
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop')",
            transform: "translate3d(0,0,0)",
          }}
        />
        {/* subtle dim overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#02060c]/25 to-[#02060c]/55" />

        <div className="relative z-20 max-w-[1200px] text-center">
          <h1 className="m-0 mb-2 text-[clamp(30px,6vw,56px)] leading-none font-extrabold tracking-tight">
            Cinematic Parallax
          </h1>
          <p className="mx-auto mb-5 max-w-[820px] text-[clamp(14px,1.8vw,18px)] leading-[1.6] text-[#ebf5ff]" style={{ marginTop: 0 }}>
            This section uses a hardware-accelerated transform-based parallax that feels natural and fluid while
            scrolling. The background moves slower than the content to create depth.
          </p>
          <div className="inline-flex gap-3 flex-wrap">
            <a
              href="#second"
              className="inline-block px-5 py-3 rounded-lg font-extrabold text-white bg-gradient-to-r from-[#ff8a00] to-[#e52e71] no-underline"
            >
              Explore
            </a>
            <a
              href="#third"
              className="inline-block px-5 py-3 rounded-lg font-extrabold text-[#eaf3ff] bg-white/4 border border-white/6 no-underline"
            >
              Learn
            </a>
          </div>
        </div>
      </section>

      {/* Content - second */}
      <section
        id="second"
        className="min-h-[70vh] px-[6vw] py-[8vh] flex items-center justify-center bg-gradient-to-b from-white/2 to-white/0.7 text-[#ebf5ff]"
      >
        <div className="max-w-[1100px] flex gap-9 items-left justify-left text-left flex-wrap">
          <div className="flex-1 min-w-[360px]">
            <h2 className="text-[45px] mb-2">Beautiful, readable content</h2>
            <p className="mb-3 leading-[1.7] text-[#ebf5ff] text-[18px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum
              vestibulum. Cras venenatis euismod malesuada.
            </p>
            <p className="text-[#ebf5ff]/90">
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean lacinia bibendum nulla sed
              consectetur.
            </p>
          </div>
          <div className="flex-1 min-w-[260px] max-w-[420px] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(2,6,18,0.55)]">
            <img
              alt="Studio desk"
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop"
              className="w-full h-full object-cover block"
            />
          </div>
        </div>
      </section>

      {/* HERO 2 */}
      <section
        data-parallax-section
        className="relative min-h-[95vh] w-full overflow-hidden flex items-center justify-center px-[6vw] py-[6vh]"
      >
        <div
          data-bg-layer
          data-speed="0.55"
          aria-hidden="true"
          className="absolute inset-0 bg-cover z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2200&auto=format&fit=crop')",
            backgroundPosition: "40% 50%",
            transform: "translate3d(0,0,0)",
          }}
        />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#030914]/25 to-[#030914]/60" />

        <div className="relative z-20 max-w-[1100px] text-center">
          <h2 className="m-0 mb-3 text-[clamp(28px,5vw,44px)] font-extrabold">Depth & Motion</h2>
          <p className="mx-auto mb-5 max-w-[820px] leading-[1.6] text-[#ebf5ff]">
            Multiple layers moving at different speeds create a realistic sense of depth. This section uses a stronger
            background speed to feel visually distant.
          </p>
          <div className="inline-flex gap-3">
            <a
              href="#third"
              className="inline-block px-5 py-3 rounded-lg font-extrabold bg-[#06b6d4] text-[#042026] no-underline"
            >
              Our Work
            </a>
            <a
              href="#third"
              className="inline-block px-5 py-3 rounded-lg font-extrabold text-[#eaf3ff] border border-white/6 no-underline"
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      {/* Content - third */}
      <section
        id="third"
        className="min-h-[70vh] px-[6vw] py-[8vh] flex items-center justify-center bg-gradient-to-b from-white/1 to-white/0.4 text-[#ebf5ff]"
      >
        <div className="max-w-[1100px] w-full flex gap-9 justify-lefy items-left text-left flex-wrap">
          <div className="flex-1 min-w-[420px]">
            <h3 className="mb-2 text-[50px]">Design that moves</h3>
            <p className="mb-4 leading-[1.7] text-[#ebf5ff] text-[18px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis. Maecenas
              sed diam eget risus varius blandit sit amet non magna.
            </p>
            <ul className=" text-[#ebf5ff]/87 text-left">
              <li className="mb-2">Cinematic depth</li>
              <li className="mb-2">Hardware-accelerated transforms</li>
              <li className="mb-2">Mobile-aware, smooth motion</li>
            </ul>
          </div>

          <div className="flex-1 min-w-[260px] grid gap-4">
            <div className="rounded-xl overflow-hidden shadow-[0_14px_40px_rgba(2,6,23,0.45)]">
              <img
                alt="Team working"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-[220px] object-cover block"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-[0_14px_40px_rgba(2,6,23,0.45)]">
              <img
                alt="Creative desk"
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-[220px] object-cover block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HERO 3 (Subtle final touch) */}
      <section
        data-parallax-section
        className="relative min-h-[110vh] w-full overflow-hidden flex items-center justify-center px-[6vw] py-[6vh]"
      >
        <div
          data-bg-layer
          data-speed="0.18"
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            /*
              Layered gradient-only background: two soft radial glows (warm + cool),
              an overall subtle tonal linear gradient, and a very dark base to match the site.
              This replaces a photo so there's no external image used here.
            */
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop')",
            backgroundSize: "cover, cover, cover",
            transform: "translate3d(0,0,0)",
            filter: "brightness(0.96) contrast(1.02)",
          }}
        />
        {/* subtle overlay to help text legibility */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#03060c]/14 to-[#020408]/56" />

        <div className="relative z-20 text-center max-w-[960px]">
          <h2 className="m-0 mb-3 text-[clamp(24px,4.5vw,42px)] font-extrabold">Subtle final touch</h2>
          <p className="mb-5 text-[#ebf5ff]">
            A softer movement in the final section leaves room for calls-to-action and converts attention into action.
          </p>
          <a href="#top" className="inline-block px-6 py-3 rounded-lg bg-[#ffd166] text-[#08101a] font-extrabold no-underline">
            Back to top
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-[6vw] py-9 text-center text-[#ebf5ff]/80 bg-gradient-to-b from-white/0.5 to-white/0.2">
        <div className="max-w-[1000px] mx-auto">
          <p className="mb-1">Made with care • Smooth parallax using transforms</p>
          <small className="opacity-80">Images from Unsplash</small>
        </div>
      </footer>
    </div>
  );
}
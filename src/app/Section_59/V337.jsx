'use client'

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function V337() {
  const wrapperRef = useRef(null);
  const imgRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // Inject Google Fonts
    const fonts = [
      "https://fonts.googleapis.com/css2?family=Beth+Ellen&display=swap",
      "https://fonts.googleapis.com/css2?family=Chelsea+Market&display=swap",
    ];
    const links = fonts.map((href) => {
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = href;
      document.head.appendChild(l);
      return l;
    });

    // Scroll pin + image zoom
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 0.5,
      },
    });

    tl.to(imgRef.current, {
      scale: 2,
      z: 250,
      transformOrigin: "center center",
      ease: "power1.inOut",
      duration: 1,
    });

    tl.to(
      heroRef.current,
      {
        scale: 1.4,
        transformOrigin: "center center",
        ease: "power1.inOut",
        duration: 1,
      },
      "<"
    );

    // Darken-on-scroll
    const heroEl = heroRef.current;
    let rafId = null;

    function onScroll() {
      if (!heroEl) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scroll = window.scrollY || window.pageYOffset;
        const rect = heroEl.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY + heroEl.offsetHeight;
        let opacity = Math.min(Math.max(scroll / offsetTop, 0), 1);
        heroEl.style.boxShadow = `10000px 0 0 0 rgba(0,0,0,${opacity}) inset`;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    // Hover flicker + glow effect
    const spookyLines = document.querySelectorAll(".spooky-line");
    spookyLines.forEach((line) => {
      line.addEventListener("mouseenter", () => {
        gsap.to(line, {
          color: "#ffb86b",
          textShadow: "0 0 20px rgba(255,180,90,0.9)",
          y: -6,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(line, {
          opacity: 0.6,
          repeat: 6,
          yoyo: true,
          duration: 0.08,
          ease: "none",
        });
      });
      line.addEventListener("mouseleave", () => {
        gsap.to(line, {
          color: "#ff9605c4",
          textShadow: "0 0 6px rgba(255,160,80,0.45)",
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        });
      });
    });

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
      window.removeEventListener("scroll", onScroll);
      links.forEach((l) => l.remove());
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full z-10"
      style={{
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        background: "black",
        fontFamily: "Chelsea Market, system-ui",
        fontSize: "34px",
        fontWeight: 400,
        overflowX: "hidden",
        color: "white",
      }}
    >
      <audio autoPlay loop>
        <source src="https://www.soundjay.com/horror/sounds/ghostly-wind-01.mp3" type="audio/mpeg" />
      </audio>

      {/* Intro */}
      <div
        className="absolute left-0 top-0 w-full h-screen flex flex-col justify-center items-center text-center z-2"
        style={{ color: "#ff0000" }}
      >
        <h1
          className="m-0"
          style={{
            fontSize: "50px",
            fontFamily: "Beth Ellen, cursive",
            margin: 0,
          }}
        >
          The Story of
        </h1>
        <p
          className="m-0"
          style={{
            fontSize: "70px",
            fontFamily: "Chelsea Market, system-ui",
            fontWeight: "bolder",
            margin: 0,
          }}
        >
          something very spooky
        </p>
      </div>

      {/* Content */}
      <div className="relative w-full overflow-x-hidden">
        {/* Hero */}
        <section
          ref={heroRef}
          className="w-full h-screen transition-opacity duration-500 ease-in-out"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512747646639-ed824d861e0d?q=80&w=2070&auto=format&fit=crop')",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />

        {/* Spooky Text Section */}
        <section
          className="w-full h-screen flex justify-center items-center flex-col text-white"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,20,60,0.8), rgba(0,0,0,1))",
          }}
        >
          <div
            className="relative top-10 max-w-3xl mx-auto text-center"
            style={{
              lineHeight: "45px",
              color: "#ff9605c4",
              fontFamily: "Chelsea Market, system-ui",
              padding: "0 1rem",
            }}
          >
            <p className="spooky-line">In the shadowed depths of yon ancient keep,</p>
            <p className="spooky-line">lurketh secrets darker than the night.</p>
            <p className="spooky-line">
              Beware, for in the forgotten corners of this cursed realm,
            </p>
            <p className="spooky-line">doth dwell entities of eldritch horror,</p>
            <p className="spooky-line">
              their eerie whispers echoing through the corridors like the
              lamentations of souls long departed.
            </p>
          </div>
        </section>
      </div>

      {/* Image overlay */}
      <div
        className="w-full h-screen absolute top-0 left-0 right-0 z-10 overflow-hidden"
        style={{ perspective: 500 }}
      >
        <img
          ref={imgRef}
          src="https://uploads-ssl.webflow.com/5cff83ac2044e22cb8cf2f11/5d13364599bb70e3560cc4e5_background-min%203.png"
          alt="image"
          className="w-full h-full object-cover object-center relative"
          style={{ zIndex: 1, transformOrigin: "center center" }}
        />
      </div>
    </div>
  );
}

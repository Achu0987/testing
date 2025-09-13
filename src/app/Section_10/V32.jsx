// app/components/V32.jsx
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const V32 = () => {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null); // matches your .home-hero-image-wrap
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pinDuration = 700; // px of scroll the content stays pinned
    const maxBlur = 6; // px blur at the end
    const startScale = 1; // start smaller
    const endScale = 1.15; // end larger -> zoom in
    const yMove = 160; // how many px to move up (parallax)

    // Place to store button cleanup so we don't reference `ctx` inside its own initializer
    let btnCleanup = null;

    const ctx = gsap.context(() => {
      // Pin the centered content
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${pinDuration}`,
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Parallax + scale (zoom in)
      gsap.fromTo(
        imageWrapRef.current,
        {
          transform: `translate3d(0px, 0px, 0px) scale3d(${startScale}, ${startScale}, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
          transformStyle: "preserve-3d",
          willChange: "transform",
          opacity: 1,
        },
        {
          transform: `translate3d(0px, ${yMove}px, 0px) scale3d(${endScale}, ${endScale}, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
          ease: "none",
          overwrite: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${pinDuration}`,
            scrub: true,
          },
        }
      );

      // Blur the pinned content progressively
      gsap.fromTo(
        contentRef.current,
        { filter: "blur(0px)", opacity: 1 },
        {
          filter: `blur(${maxBlur}px)`,
          opacity: 0.92,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${pinDuration}`,
            scrub: true,
          },
        }
      );

      // Button animation: entry + hover (using your design structure)
      const btnWrap = contentRef.current.querySelector(".has_fade_anim");
      if (btnWrap) {
        const btnText = btnWrap.querySelector(".button-text");
        const btnIcon = btnWrap.querySelector(".button-icon");

        // Ensure initial states (in case inline styles differ)
        gsap.set(btnText, { x: 12 });
        gsap.set(btnIcon, { opacity: 0 });

        // Entrance / fade-in
        gsap.from(btnWrap, {
          opacity: 0,
          y: 8,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.15,
        });

        // Hover timeline (play on enter, reverse on leave)
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(
          btnText,
          { x: 0, duration: 0.25, ease: "power2.out", overwrite: true },
          0
        );
        hoverTl.to(
          btnIcon,
          { opacity: 1, duration: 0.25, ease: "power2.out" },
          0
        );

        const enterHandler = () => hoverTl.play();
        const leaveHandler = () => hoverTl.reverse();

        // Use the anchor for hover target for better UX
        const anchor = btnWrap.querySelector("a") || btnWrap;
        anchor.addEventListener("mouseenter", enterHandler);
        anchor.addEventListener("mouseleave", leaveHandler);

        // Save cleanup to outer variable
        btnCleanup = () => {
          anchor.removeEventListener("mouseenter", enterHandler);
          anchor.removeEventListener("mouseleave", leaveHandler);
          hoverTl.kill();
        };
      }
    }, sectionRef);

    return () => {
      // run button cleanup if present
      if (btnCleanup) {
        try {
          btnCleanup();
        } catch (e) {
          // ignore
        }
      }
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-full  bg-gradient-to-b from-white via-green-50 to-green-100 pt-40 overflow-hidden relative"
    >
      {/* Centered & pinned content */}
      <div
        ref={contentRef}
        className="relative max-w-full inset-0 flex items-center justify-center text-center z-30 px-6"
        style={{ filter: "blur(0px)", pointerEvents: "auto" }}
      >
        <div className="max-w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Your All-in-One Sales and <br /> Customer Solution
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Manage your sales, track customers, and drive growth — all in one
            easy-to-use platform designed for smarter business decisions
          </p>

          {/* Replaced button with your HTML structure and custom linear gradient */}
          <div
            className="has_fade_anim mt-8 inline-block"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              opacity: 1,
              transform: "translate(0px, 0px)",
            }}
          >
            <a
              data-w-id="a62ba691-561d-a0e4-5855-cd6c7444b28b"
              href="/pricing"
              className="button is-secondary w-inline-block inline-flex items-center rounded-full text-white font-semibold text-lg shadow-lg px-8 py-3 hover:opacity-90 transition-all"
              style={{
                background: "linear-gradient(94.62deg, #abff59, #6cd3ff)",
              }}
            >
              <div
                className="button-text"
                style={{
                  transform:
                    "translate3d(12px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                30 days free Trial
              </div>
              <img
                src="https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684d3c79a829853c9d3ed7dc_Vector%20(5).svg"
                loading="lazy"
                alt="Icon"
                className="button-icon ml-3"
                style={{ opacity: 0 }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Image wrapper using your exact pattern and classes */}
      <div className="mt-16 max-w-5xl z-999 w-full h-[0] mx-auto overflow-visible relative">
        <div
          ref={imageWrapRef}
          data-w-id="cdd5371a-4e1a-3893-a4d0-59a81e342db9"
          style={{
            transform:
              "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
            transformStyle: "preserve-3d",
            willChange: "transform",
            opacity: 1,
          }}
          className="home-hero-image-wrap"
        >
          <img
            src="https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684db2291a3afe28a0d1c855_Dashboard.webp"
            loading="lazy"
            sizes="(max-width: 2613px) 100vw, 2613px"
            srcSet="https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684db2291a3afe28a0d1c855_Dashboard-p-500.webp 500w, https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684db2291a3afe28a0d1c855_Dashboard-p-800.webp 800w, https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684db2291a3afe28a0d1c855_Dashboard-p-1080.webp 1080w, https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684db2291a3afe28a0d1c855_Dashboard-p-1600.webp 1600w, https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684db2291a3afe28a0d1c855_Dashboard-p-2000.webp 2000w, https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684db2291a3afe28a0d1c855_Dashboard-p-2600.webp 2600w, https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684db2291a3afe28a0d1c855_Dashboard.webp 2613w"
            alt="Orderze Webflow Template Image"
            className="home-hero-image  w-full h-full object-cover rounded-2xl shadow-xl border border-gray-100"
          />
        </div>
      </div>

      {/* extra height so the pin/blur movement can complete */}
      <div className="h-[130vh]" />
    </section>
  );
};

export default V32;
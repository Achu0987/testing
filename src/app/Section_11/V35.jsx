// app/components/V32.jsx
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const V35 = () => {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // breakpoint-specific settings
    const settings = {
      desktop: { pinDuration: 700, maxBlur: 6, startScale: 1, endScale: 1.15, yMove: 160 },
      mobile: { pinDuration: 500, maxBlur: 6, startScale: 1, endScale: 1.12, yMove: 120 },
    };

    // Desktop
    mm.add("(min-width: 768px)", () => {
      const { pinDuration, maxBlur, startScale, endScale, yMove } = settings.desktop;
      let btnCleanup = null;

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${pinDuration}`,
          pin: contentRef.current,
          pinSpacing: false,
        });

        gsap.fromTo(
          imageWrapRef.current,
          {
            transform: `translate3d(0px, 0px, 0px) scale3d(${startScale}, ${startScale}, 1)`,
            transformStyle: "preserve-3d",
            willChange: "transform",
            opacity: 1,
          },
          {
            transform: `translate3d(0px, ${yMove}px, 0px) scale3d(${endScale}, ${endScale}, 1)`,
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

        const btnWrap = contentRef.current.querySelector(".has_fade_anim");
        if (btnWrap) {
          const btnText = btnWrap.querySelector(".button-text");
          const btnIcon = btnWrap.querySelector(".button-icon");

          gsap.set(btnText, { x: 12 });
          gsap.set(btnIcon, { opacity: 0 });

          gsap.from(btnWrap, {
            opacity: 0,
            y: 8,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.15,
          });

          const hoverTl = gsap.timeline({ paused: true });
          hoverTl.to(btnText, { x: 0, duration: 0.25, ease: "power2.out", overwrite: true }, 0);
          hoverTl.to(btnIcon, { opacity: 1, duration: 0.25, ease: "power2.out" }, 0);

          const enterHandler = () => hoverTl.play();
          const leaveHandler = () => hoverTl.reverse();

          const anchor = btnWrap.querySelector("a") || btnWrap;
          anchor.addEventListener("mouseenter", enterHandler);
          anchor.addEventListener("mouseleave", leaveHandler);

          // store cleanup for listeners/tl only (do NOT call ctx.revert here)
          btnCleanup = () => {
            anchor.removeEventListener("mouseenter", enterHandler);
            anchor.removeEventListener("mouseleave", leaveHandler);
            hoverTl.kill();
          };
        }
      }, sectionRef);

      // mm.add expects a cleanup function — call listener cleanup then ctx.revert once
      return () => {
        if (btnCleanup) {
          try {
            btnCleanup();
          } catch (e) {}
        }
        try {
          ctx.revert();
        } catch (e) {}
      };
    });

    // Mobile
    mm.add("(max-width: 767px)", () => {
      const { pinDuration, maxBlur, startScale, endScale, yMove } = settings.mobile;
      let btnCleanup = null;

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${pinDuration}`,
          pin: contentRef.current,
          pinSpacing: false,
        });

        gsap.fromTo(
          imageWrapRef.current,
          {
            transform: `translate3d(0px, 0px, 0px) scale3d(${startScale}, ${startScale}, 1)`,
            transformStyle: "preserve-3d",
            willChange: "transform",
            opacity: 1,
          },
          {
            transform: `translate3d(0px, ${yMove}px, 0px) scale3d(${endScale}, ${endScale}, 1)`,
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

        const btnWrap = contentRef.current.querySelector(".has_fade_anim");
        if (btnWrap) {
          const btnText = btnWrap.querySelector(".button-text");
          const btnIcon = btnWrap.querySelector(".button-icon");

          gsap.set(btnText, { x: 12 });
          gsap.set(btnIcon, { opacity: 0 });

          gsap.from(btnWrap, {
            opacity: 0,
            y: 8,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.15,
          });

          const hoverTl = gsap.timeline({ paused: true });
          hoverTl.to(btnText, { x: 0, duration: 0.25, ease: "power2.out", overwrite: true }, 0);
          hoverTl.to(btnIcon, { opacity: 1, duration: 0.25, ease: "power2.out" }, 0);

          const enterHandler = () => hoverTl.play();
          const leaveHandler = () => hoverTl.reverse();

          const anchor = btnWrap.querySelector("a") || btnWrap;
          anchor.addEventListener("mouseenter", enterHandler);
          anchor.addEventListener("mouseleave", leaveHandler);

          btnCleanup = () => {
            anchor.removeEventListener("mouseenter", enterHandler);
            anchor.removeEventListener("mouseleave", leaveHandler);
            hoverTl.kill();
          };
        }
      }, sectionRef);

      return () => {
        if (btnCleanup) {
          try {
            btnCleanup();
          } catch (e) {}
        }
        try {
          ctx.revert();
        } catch (e) {}
      };
    });

    // Top-level cleanup
    return () => {
      try {
        mm.revert();
      } catch (e) {}
      try {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      } catch (e) {}
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-full bg-gradient-to-b from-white via-green-50 to-green-100 pt-12 md:pt-40 overflow-hidden relative "
    >
      <div
        ref={contentRef}
        className="relative max-w-4xl mx-auto inset-0 flex flex-col items-center md:items-center justify-center text-center z-30 px-6 py-8 md:py-0"
        style={{ filter: "blur(0px)", pointerEvents: "auto" }}
      >
        <div className="w-full">
          <h1 className="text-2xl md:text-2xl font-bold text-gray-900 leading-tight">
            Your All-in-One Sales and <br /> Customer Solution
          </h1>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600">
            Manage your sales, track customers, and drive growth — all in one
            easy-to-use platform designed for smarter business decisions
          </p>

          <div
            className="has_fade_anim mt-6 md:mt-8 inline-block"
            style={{ translate: "none", rotate: "none", scale: "none", opacity: 1, transform: "translate(0px, 0px)" }}
          >
            <a
              href="/pricing"
              className="button is-secondary w-inline-block inline-flex items-center rounded-full text-white font-semibold text-base md:text-lg shadow-lg px-6 py-3 hover:opacity-90 transition-all"
              style={{ background: "linear-gradient(94.62deg, #abff59, #6cd3ff)" }}
            >
              <div className="button-text" style={{ transform: "translate3d(12px, 0px, 0px) scale3d(1, 1, 1)", transformStyle: "preserve-3d" }}>
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

      {/* Image block — responsive sizing & centered on mobile */}
      <div className="mt-6 md:mt-16 w-full z-[999] mx-auto overflow-visible relative flex justify-center ">
        <div
          ref={imageWrapRef}
          style={{ transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1)", transformStyle: "preserve-3d", willChange: "transform", opacity: 1 }}
          className="home-hero-image-wrap mx-auto w-full max-w-[92vw] md:max-w-[1200px] flex justify-center"
        >
          <img
            src="https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684db2291a3afe28a0d1c855_Dashboard.webp"
            loading="lazy"
            sizes="(max-width: 2613px) 100vw, 2613px"
            alt="Orderze Webflow Template Image"
            className="home-hero-image w-full h-auto object-cover rounded-2xl shadow-xl border border-gray-100"
            style={{ maxHeight: "70vh" }}
          />
        </div>
      </div>

      <div className="h-[130vh]" />
    </section>
  );
};

export default V35;
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const HERO_CANDIES = [
  { src: "https://bombon.rs/_next/image?url=%2Fimages%2Fcandy%2Fherocandy%2Fherocandy1.png&w=640&q=75" },
  { src: "https://bombon.rs/_next/image?url=%2Fimages%2Fcandy%2Fherocandy%2Fherocandy2.png&w=640&q=75" },
  { src: "https://bombon.rs/_next/image?url=%2Fimages%2Fcandy%2Fherocandy%2Fherocandy3.png&w=640&q=75" },
  { src: "https://bombon.rs/_next/image?url=%2Fimages%2Fcandy%2Fherocandy%2Fherocandy4.png&w=640&q=75" },
  { src: "https://bombon.rs/_next/image?url=%2Fimages%2Fcandy%2Fherocandy%2Fherocandy5.png&w=640&q=75" },
  { src: "https://bombon.rs/_next/image?url=%2Fimages%2Fcandy%2Fherocandy%2Fherocandy6.png&w=640&q=75" },
  { src: "https://bombon.rs/_next/image?url=%2Fimages%2Fcandy%2Fherocandy%2Fherocandy7.png&w=640&q=75" },
  { src: "https://bombon.rs/_next/image?url=%2Fimages%2Fcandy%2Fherocandy%2Fherocandy8.png&w=640&q=75" },
  { src: "https://bombon.rs/_next/image?url=%2Fimages%2Fcandy%2Fherocandy%2Fherocandy9.png&w=640&q=75" },
  { src: "https://bombon.rs/_next/image?url=%2Fimages%2Fcandy%2Fherocandy%2Fherocandy10.png&w=640&q=75" },

  { src: "https://bombon.rs/_next/image?url=%2Fimages%2Fcandy%2Fherocandy%2Fherocandy1.png&w=640&q=75" },
  { src: "https://bombon.rs/_next/image?url=%2Fimages%2Fcandy%2Fherocandy%2Fherocandy4.png&w=640&q=75" },
  { src: "https://bombon.rs/_next/image?url=%2Fimages%2Fcandy%2Fherocandy%2Fherocandy6.png&w=640&q=75" },
  { src: "https://bombon.rs/_next/image?url=%2Fimages%2Fcandy%2Fherocandy%2Fherocandy9.png&w=640&q=75" },
  { src: "https://bombon.rs/_next/image?url=%2Fimages%2Fcandy%2Fherocandy%2Fherocandy3.png&w=640&q=75" },
];

const ASSETS = {
  pause: "https://bombon.rs/images/pause.svg",
  sticker: "https://bombon.rs/images/home/hero/stiker.svg",
  game: "https://bombon.rs/images/home/hero/game.svg",
  kesazadnja: "https://bombon.rs/images/home/hero/kesazadnja.png",
  kesaprednja: "https://bombon.rs/images/home/hero/kesaprednja.png",
};

export default function V190() {
  const containerRef = useRef(null);
  const bagRef = useRef(null);
  const candyEls = useRef([]);
  const timelines = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const bagEl = bagRef.current;
    if (!container || !bagEl) return;

    const getRects = () => {
      const cRect = container.getBoundingClientRect();
      const bRect = bagEl.getBoundingClientRect();
      return { cRect, bRect };
    };

    const launchCandy = (el, delay = 0) => {
      const { cRect, bRect } = getRects();

      const startX = bRect.left + bRect.width * 0.5 - cRect.left;
      const startY = bRect.top + bRect.height * 0.28 - cRect.top;

      const padding = Math.max(12, cRect.width * 0.03);
      const endX = padding + Math.random() * (cRect.width - padding * 2);
      const endY = Math.max(8, Math.random() * (cRect.height * 0.62));

      const cpX = startX + (endX - startX) * 0.45 + (Math.random() * 120 - 60);
      const cpY = Math.min(startY, endY) - (80 + Math.random() * 90);

      gsap.set(el, {
        x: startX,
        y: startY,
        opacity: 0,
        scale: gsap.utils.random(0.95, 1.15),
        rotate: gsap.utils.random(-30, 30),
        position: "absolute",
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        delay,
        onComplete: () => {
          const nextDelay = gsap.utils.random(0.45, 1.1);
          launchCandy(el, nextDelay);
        }
      });

      timelines.current.push(tl);

      tl.to(el, { opacity: 1, duration: 0.16 })
        .to(el, {
          duration: 1.0 + Math.random() * 0.6,
          motionPath: {
            path: [
              { x: startX, y: startY },
              { x: cpX, y: cpY },
              { x: endX, y: endY }
            ],
            curviness: 1.05,
            autoRotate: false,
          },
          scale: gsap.utils.random(1.0, 1.25),
          rotate: gsap.utils.random(-160, 160),
          ease: "power2.out",
        }, 0)
        .to(el, { opacity: 0, duration: 0.28, ease: "power1.in" }, "-=0.14");
    };

    candyEls.current.forEach((el, idx) => {
      if (el) launchCandy(el, idx * 0.12 + Math.random() * 0.28);
    });

    const onResize = () => {
      timelines.current.forEach(t => t.kill());
      timelines.current = [];
      candyEls.current.forEach((el, idx) => {
        if (el) launchCandy(el, idx * 0.08 * Math.random());
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      timelines.current.forEach(t => t.kill());
      timelines.current = [];
      window.removeEventListener("resize", onResize);
      gsap.killTweensOf(candyEls.current);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#F3EBF6]">
      {/* Title block - spacing adjusted */}
      <div className="relative z-30 top-15 flex flex-col items-center justify-start h-full pt-2 sm:pt-3 md:pt-4 px-4">
        <div className="max-w-3xl w-full text-center">
          <h1
            className={
              "mx-auto font-extrabold uppercase tracking-tight text-black leading-tight " +
              "text-[4.5rem] sm:text-[3rem] md:text-[5rem] lg:text-[6.5rem] xl:text-[8rem]"
            }
            style={{ lineHeight: 0.95 }}
          >
            <div>BOMBON ROYAL</div>
            <div>SWEDISH CANDY</div>
          </h1>

          <p className="mt-2 sm:mt-3 text-[0.95rem] sm:text-[1.1rem] md:text-[1.2rem] text-gray-600 px-2">
            In the land of Bombon, flavor holds the crown.
            <br />
            Experience the elegance of Sweden in its sweetest form.
          </p>
        </div>
      </div>

      {/* Back bag */}
      <img
        ref={bagRef}
        src={ASSETS.kesazadnja}
        alt="bag-back"
        className={
          "absolute bottom-0 left-1/2 -translate-x-1/2 object-contain z-10 pointer-events-none " +
          "h-[32vh] sm:h-[38vh] md:h-[46vh] lg:h-[52vh]"
        }
      />

      {/* Front bag */}
      <img
        src={ASSETS.kesaprednja}
        alt="bag-front"
        className={
          "absolute bottom-0 left-1/2 -translate-x-1/2 object-contain z-30 pointer-events-none " +
          "h-[24vh] sm:h-[30vh] md:h-[38vh] lg:h-[42vh]"
        }
      />

      {/* Candies - increased size */}
      {HERO_CANDIES.map((c, idx) => (
        <img
          key={idx}
          ref={(el) => (candyEls.current[idx] = el)}
          src={c.src}
          alt={`candy-${idx}`}
          className={
            "absolute z-20 pointer-events-none " +
            "w-[72px] sm:w-[96px] md:w-[130px] lg:w-[150px]"
          }
          style={{ left: 0, top: 0 }}
        />
      ))}

      {/* Play sticker */}
      <button
        className={
          "absolute z-40 transform pointer-events-auto group " +
          "bottom-60 right-2 w-36 " +
          "md:bottom-auto md:top-1/2 md:right-24 md:-translate-y-1/2 md:w-52"
        }
        aria-label="Play game"
      >
        <img
          src={ASSETS.sticker}
          alt="sticker"
          className="absolute inset-0 w-full h-full object-contain animate-spin-slow"
        />
        <img
          src={ASSETS.game}
          alt="game"
          className="absolute inset-0 m-auto w-3/5 transition-transform duration-300 group-hover:scale-110"
        />
      </button>

      {/* Music control */}
      <div className="absolute bottom-6 left-4 z-50 pointer-events-auto sm:left-6 md:left-10">
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center">
          <img src={ASSETS.pause} alt="pause" className="h-7 w-7 sm:h-9 sm:w-9" />
        </div>
      </div>

      {/* Cloud full bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-35 pointer-events-none">
        <svg
          viewBox="0 0 1440 220"
          className="w-full h-[28vh] sm:h-[30vh] md:h-[34vh] lg:h-[36vh]"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cloudGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
            </linearGradient>
            <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>

          <g filter="url(#blur)">
            <path
              d="M0,120 C120,80 240,160 360,120 C480,80 600,140 720,120 C840,100 960,140 1080,120 C1200,100 1320,140 1440,120 L1440,220 L0,220 Z"
              fill="url(#cloudGrad)"
            />
          </g>
        </svg>
      </div>
    </section>
  );
}

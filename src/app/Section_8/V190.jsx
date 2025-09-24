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
];

const ASSETS = {
  pause: "https://bombon.rs/images/pause.svg",
  sticker: "https://bombon.rs/images/home/hero/stiker.svg",
  game: "https://bombon.rs/images/home/hero/game.svg",
  kesazadnja: "https://bombon.rs/images/home/hero/kesazadnja.png",
  kesaprednja: "https://bombon.rs/images/home/hero/kesaprednja.png",
};

export default function V190() {
  const bagRef = useRef(null);
  const candyEls = useRef([]);

  useEffect(() => {
    const bagEl = bagRef.current;
    if (!bagEl) return;

    const launchCandy = (el, delay = 0) => {
      const bagRect = bagEl.getBoundingClientRect();
      const startX = bagRect.left + bagRect.width * 0.5;
      const startY = bagRect.top + bagRect.height * 0.25;

      const endX = startX + (Math.random() * window.innerWidth - window.innerWidth / 2);
      const endY = startY - (window.innerHeight * 0.6 + Math.random() * 150);

      const cpX = startX + (endX - startX) * 0.5 + gsap.utils.random(-60, 60);
      const cpY = startY - Math.abs(endY - startY) * 0.5 - gsap.utils.random(60, 100);

      gsap.set(el, { x: startX, y: startY, opacity: 0, scale: 0.7, rotate: gsap.utils.random(-20, 20) });

      gsap.timeline({
        delay,
        onComplete: () => launchCandy(el, gsap.utils.random(1.0, 1.8)),
      })
        .to(el, { opacity: 1, duration: 0.25 })
        .to(el, {
          duration: 1.8 + Math.random() * 0.6,
          motionPath: {
            path: [
              { x: startX, y: startY },
              { x: cpX, y: cpY },
              { x: endX, y: endY },
            ],
            curviness: 1.3,
          },
          scale: gsap.utils.random(0.9, 1.3),
          rotate: gsap.utils.random(-160, 160),
          ease: "power2.out",
        }, 0)
        .to(el, { opacity: 0, duration: 0.5, ease: "power1.in" }, "-=0.3");
    };

    candyEls.current.forEach((el, idx) => {
      if (el) launchCandy(el, idx * 0.3);
    });

    return () => gsap.killTweensOf(candyEls.current);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#F3EBF6]">
      {/* Title */}
      <div className="relative z-40 text-center pt-8 px-4">
        <h1 className="font-extrabold uppercase text-5xl sm:text-7xl lg:text-8xl leading-tight tracking-tight">
          <div>BOMBON</div>
          <div>ROYAL</div>
          <div>SWEDISH</div>
          <div>CANDY</div>
        </h1>
        <p className="mt-4 text-sm sm:text-lg text-gray-600 max-w-md mx-auto">
          In the land of Bombon, flavor holds the crown.<br />
          Experience the elegance of Sweden in its sweetest form.
        </p>
      </div>

      {/* Bag back */}
      <img
        ref={bagRef}
        src={ASSETS.kesazadnja}
        alt="bag-back"
        className="absolute bottom-[18vh] heightsm:bottom-[20vh] left-1/2 -translate-x-1/2 object-contain z-10 pointer-events-none"
        style={{ height: "50vh" }}
      />

      {/* Animated candies */}
      {HERO_CANDIES.map((c, idx) => (
        <img
          key={idx}
          ref={el => (candyEls.current[idx] = el)}
          src={c.src}
          alt={`candy-${idx}`}
          className="absolute z-20 w-30 sm:w-20 md:w-24 pointer-events-none"
          style={{ left: 0, top: 0 }}
        />
      ))}

      {/* Bag front */}
      <img
        src={ASSETS.kesaprednja}
        alt="bag-front"
        className="absolute bottom-[20vh]  sm:bottom-[14vh] left-1/2 -translate-x-1/2 object-contain z-30 pointer-events-none"
        style={{ height: "42vh" }}
      />

      {/* Sticker button */}
      <button className="absolute right-1 bottom-85 sm:bottom-36 w-20 sm:w-28 z-40">
        <img src={ASSETS.sticker} alt="sticker" />
        <img
          src={ASSETS.game}
          alt="game"
          className="absolute inset-0 w-2/3 m-auto"
        />
      </button>

      {/* Music control */}
      <div className="absolute left-5 bottom-6 w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center z-50">
        <img src={ASSETS.pause} alt="pause" className="w-1/2" />
      </div>

      {/* Fog overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[26vh] pointer-events-none">
        <div className="absolute -bottom-6 left-0 right-0 h-[38vh] bg-white opacity-90 blur-3xl" />
      </div>
    </section>
  );
}

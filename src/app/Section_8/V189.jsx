import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const HERO_CANDIES = [
  // Existing 10
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

  // Extra duplicates (to make it look fuller)
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

export default function V189() {
  const containerRef = useRef(null);
  const bagRef = useRef(null);
  const candyEls = useRef([]);

  useEffect(() => {
    const bagEl = bagRef.current;
    if (!bagEl) return;

    const launchCandy = (el, delay = 0) => {
      const bagRect = bagEl.getBoundingClientRect();
      const startX = bagRect.left + bagRect.width * 0.5;
      const startY = bagRect.top + bagRect.height * 0.3;

      const endX = startX + (Math.random() * window.innerWidth - window.innerWidth / 2);
      const endY = startY - (window.innerHeight * 0.8 + Math.random() * 150);

      const cpX = startX + (endX - startX) * 0.5 + (Math.random() * 200 - 100);
      const cpY = startY - Math.abs(endY - startY) * 0.5 - (100 + Math.random() * 80);

      gsap.set(el, {
        x: startX,
        y: startY,
        opacity: 0,
        scale: 0.8,
        rotate: gsap.utils.random(-40, 40),
        transformOrigin: "50% 50%",
      });

      gsap.timeline({
        delay,
        onComplete: () => launchCandy(el, gsap.utils.random(0.5, 1.2)) // loop
      })
        .to(el, { opacity: 1, duration: 0.2 })
        .to(el, {
          duration: 1.2 + Math.random() * 0.6,
          motionPath: {
            path: [
              { x: startX, y: startY },
              { x: cpX, y: cpY },
              { x: endX, y: endY }
            ],
            curviness: 1.1,
          },
          scale: gsap.utils.random(1, 1.2),
          rotate: gsap.utils.random(-180, 180),
          ease: "power2.out",
        }, 0)
        .to(el, {
          opacity: 0,
          duration: 0.3,
          ease: "power1.in"
        }, "-=0.2");
    };

    candyEls.current.forEach((el, idx) => {
      if (el) launchCandy(el, idx * 0.2);
    });

    return () => gsap.killTweensOf(candyEls.current);
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#F3EBF6]">
     

      {/* Title block */}
      <div className="relative z-30 flex flex-col items-center justify-start h-full pt-[6vh]">
        <h1 className="text-center font-extrabold leading-none text-[9.2rem] md:text-[10.5rem] lg:text-[7.5rem] uppercase tracking-tight text-black">
          <div>BOMBON ROYAL</div>
          <div>SWEDISH CANDY</div>
        </h1>
        <p className="mt-6 text-[1.15rem] md:text-[1.25rem] text-gray-600 text-center max-w-3xl px-6">
          In the land of Bombon, flavor holds the crown.<br />
          Experience the elegance of Sweden in its sweetest form.
        </p>
      </div>

      {/* Back bag */}
      <img ref={bagRef} src={ASSETS.kesazadnja} alt="bag-back"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[50vh] object-contain z-10 pointer-events-none"
      />

      {/* Front bag */}
      <img src={ASSETS.kesaprednja} alt="bag-front"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[40vh] object-contain z-30 pointer-events-none"
      />

      {/* Candies */}
      {HERO_CANDIES.map((c, idx) => (
        <img
          key={idx}
          ref={(el) => (candyEls.current[idx] = el)}
          src={c.src}
          alt={`candy-${idx}`}
          className="absolute z-20 w-28 md:w-40 pointer-events-none"
          style={{ left: 0, top: 0 }}
        />
      ))}

      {/* Play sticker */}
      <button className="absolute right-24 top-1/2 z-40 w-52 aspect-square transform -translate-y-1/2 pointer-events-auto group">
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

      {/* Music */}
      <div className="absolute bottom-10 left-10 z-50 pointer-events-auto">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
          <img src={ASSETS.pause} alt="pause" className="h-9 w-9" />
        </div>
      </div>

      {/* Fog */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] z-40 pointer-events-none">
        <div className="absolute -bottom-6 left-0 right-0 h-[40vh] bg-white opacity-90 blur-3xl" />
      </div>
    </section>
  );
}

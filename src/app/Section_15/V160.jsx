import React from "react";

/**
 * V162.jsx
 * CTA image moves left<->right. Shapes now move top<->bottom and are clearly visible.
 */

const BG_IMAGE = "https://gramentheme.com/html/fresheat/assets/img/bg/ctaBG1_1.jpg";
const CTA_IMAGE = "https://gramentheme.com/html/fresheat/assets/img/cta/ctaThumb1_1.png";

const SHAPE_1 = "https://gramentheme.com/html/fresheat/assets/img/shape/ctaShape1_1.png"; // top-left leaf
 // small round accent
const SHAPE_3 = "https://gramentheme.com/html/fresheat/assets/img/shape/ctaShape1_3.png"; // bottom-right tomatoes

export default function V160() {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Special food hero"
      style={{
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <style>
        {`
          :root {
            --sway-duration: 2s; /* CTA left<->right cycle */
          }

          /* Respect reduced motion preference */
          @media (prefers-reduced-motion: reduce) {
            .cta-sway, .shape-move { animation: none !important; transform: none !important; }
          }

          /* CTA horizontal sway (unchanged) */
          .cta-sway {
            animation: sway var(--sway-duration) ease-in-out infinite;
            will-change: transform;
            transform-origin: center;
          }
          @keyframes sway {
            0%   { transform: translateY(-6px) translateX(-6px); }
            50%  { transform: translateY(-6px) translateX(6px); }
            100% { transform: translateY(-6px) translateX(-6px); }
          }

          /* Vertical movement for shapes (clear & visible) */
          .shape-move { will-change: transform, opacity; display: block; opacity: 1; }

          /* top-left leaf — slightly larger and clearer */
          .shape-1 {
            animation: move1 4.5s ease-in-out infinite;
            filter: drop-shadow(0 8px 22px rgba(0,0,0,0.5));
          }
          @keyframes move1 {
            0%   { transform: translateY(-14px) translateX(0) rotate(-3deg); }
            50%  { transform: translateY(10px) translateX(0) rotate(2deg); }
            100% { transform: translateY(-14px) translateX(0) rotate(-3deg); }
          }

          /* small center accent — subtle bounce */
         
          @keyframes move2 {
            0%   { transform: translateY(-6px) translateX(0) scale(1); opacity:0.95; }
            50%  { transform: translateY(8px) translateX(0) scale(1.04); opacity:1; }
            100% { transform: translateY(-6px) translateX(0) scale(1); opacity:0.95; }
          }

          /* bottom-right tomatoes — gentle float up/down */
          .shape-3 {
            animation: move3 4.5s ease-in-out infinite;
            filter: drop-shadow(0 10px 26px rgba(0,0,0,0.55));
          }
          @keyframes move3 {
            0%   { transform: translateY(10px) translateX(0) scale(1); }
            50%  { transform: translateY(-12px) translateX(0) scale(1.02); }
            100% { transform: translateY(10px) translateX(0) scale(1); }
          }

          /* Make shapes clearer on small screens by slightly increasing size using breakpoints */
          @media (max-width: 640px) {
            .shape-1 { width: 72px !important; }
            .shape-3 { width: 150px !important; right: 18px !important; bottom: 8px !important; }
          }
        `}
      </style>

      {/* overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/80 lg:bg-gradient-to-r lg:from-black/85 lg:via-black/30 lg:to-orange-700/40" />
      </div>

      {/* Shape images — always visible and moving vertically */}
      <img
        src={SHAPE_1}
        alt="leaf shape"
        aria-hidden
        className="shape-move shape-1"
        style={{
          position: "absolute",
          top: "14px",
          left: "14px",
          width: "96px",
          height: "auto",
          zIndex: 30,
          transform: "translateZ(0)",
        }}
      />

     

      <img
        src={SHAPE_3}
        alt="tomato cluster"
        aria-hidden
        className="shape-move shape-3"
        style={{
          position: "absolute",
          right: "28px",
          bottom: "18px",
          width: "180px",
          height: "auto",
          zIndex: 30,
          transform: "translateZ(0)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
          {/* LEFT content */}
          <div className="w-full lg:w-1/2 text-left">
            <h6 className="text-red-500 font-extrabold tracking-wider mb-4 uppercase text-sm lg:text-base">
              WELCOME FRESHEAT
            </h6>

            <h2 className="text-white font-extrabold uppercase leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
              TODAY SPACIAL FOOD
            </h2>

            <p className="text-orange-400 font-semibold mb-6 text-lg">Limits Time Offer</p>

            <div className="flex items-center gap-6">
              <a
                href="menu.html"
                className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded shadow-lg"
                style={{ boxShadow: "0 8px 18px rgba(220,20,60,0.18)" }}
              >
                ORDER NOW
                <svg
                  className="ml-3 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-[420px] sm:w-[520px] md:w-[620px] lg:w-[680px] overflow-visible">
              <img
                src={CTA_IMAGE}
                alt="cta"
                className="w-full object-contain drop-shadow-2xl cta-sway"
                style={{ transform: "translateY(-6px)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* blurred floor */}
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-0 h-28"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 50%, rgba(139,69,19,0.25) 100%)",
          filter: "blur(6px)",
          transform: "translateY(6px)",
        }}
      />
    </section>
  );
}
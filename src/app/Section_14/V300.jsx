// V300.jsx
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function V300() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    // Load Google Fonts once (update data attribute to v300)
    const families = "Permanent+Marker|Montserrat:wght@500;700&display=swap";
    const href = `https://fonts.googleapis.com/css2?family=${families}`;
    if (!document.querySelector(`link[data-v300="true"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.setAttribute("data-v300", "true");
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  // Variants for animation
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: "easeOut" },
    }),
  };

  const scaleIn = {
    hidden: { scale: 0.98, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
  };

  return (
    <div
      ref={ref}
      className="w-full flex items-center justify-center py-12 sm:py-20 bg-[#f6f1e6] overflow-hidden"
      style={{
        fontFamily:
          "'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
        color: "#0e5960",
      }}
    >
      {/* Outer Wrapper */}
      <motion.div
        className="relative w-full max-w-[1400px] px-6 sm:px-8 lg:px-[48px]"
        variants={scaleIn}
        initial="hidden"
        animate={controls}
      >
        {/* Pink Rounded Box */}
        <motion.div
          className="relative w-full rounded-[20px] overflow-hidden flex flex-col justify-between"
          style={{
            backgroundColor: "#f0b6c6",
            padding: "32px 20px",
            minHeight: "auto",
          }}
          variants={fadeUp}
          custom={0.15}
        >
          {/* Top-center decorative SVG (visible on all sizes) */}
        

          {/* Left text + top small drip (on mobile this sits above main row) */}
          <motion.div
            className="w-full md:max-w-[46%] mb-6 md:mb-0"
            variants={fadeUp}
            custom={0.25}
          >
            <div className="flex items-start gap-3">
              <motion.img
                src="https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/6745ca6cec81ee7fac907794_drip.svg"
                alt="decorative drip"
                className="w-[28px] mt-1"
                initial={{ rotate: -20, opacity: 0 }}
                animate={inView ? { rotate: 0, opacity: 1, transition: { duration: 0.7 } } : {}}
              />
              <motion.p
                className="m-0 font-[700] text-left"
                style={{
                  fontSize: "14px",
                  lineHeight: "1.8",
                  letterSpacing: "0.2px",
                  color: "#0c4650",
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0, transition: { duration: 0.9 } } : {}}
              >
                Enjoy the pure, organic taste of Charlie’s
                <br />
                – no added sugars, no nonsense, just
                <br />
                refreshment in a fully recyclable can
              </motion.p>
            </div>
          </motion.div>

          {/* Main Row: stacks on mobile */}
          <motion.div
            className="flex flex-col items-center md:flex-row md:items-end justify-between gap-6 md:gap-0 mt-2"
            variants={fadeUp}
            custom={0.45}
          >
            {/* CHARLIE - left on desktop, centered on mobile */}
            <motion.h1
              className="text-[#0e5960] font-[700] tracking-[4px] leading-[0.9] whitespace-nowrap text-center md:text-left"
              style={{
                fontFamily: "'Permanent Marker', 'Montserrat', sans-serif",
                fontSize: "clamp(40px, 8vw, 110px)",
                transform: "translateY(6px)",
                zIndex: 10,
                marginLeft: 0,
                marginRight: 0,
              }}
              initial={{ opacity: 0, x: -80 }}
              animate={
                inView
                  ? { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } }
                  : {}
              }
            >
              CHARLIE
            </motion.h1>

            {/* Globe - centered and slightly raised */}
            <motion.img
              src="https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/66db13f84899dbf5d5ab3de2_world.avif"
              alt="CO2 Neutral Globe"
              className="w-[110px] sm:w-[130px] md:w-[150px] object-contain relative z-20"
              initial={{ scale: 0, rotate: -160, opacity: 0 }}
              animate={
                inView
                  ? {
                      scale: 1,
                      rotate: 0,
                      opacity: 1,
                      transition: { duration: 1.0, ease: "backOut" },
                    }
                  : {}
              }
              style={{
                transform: "translateY(-6px)",
                boxShadow: "0 6px 0 rgba(0,0,0,0.02)",
              }}
            />

            {/* FOLLOW US - right on desktop, centered on mobile */}
            <motion.h1
              className="text-[#0e5960] font-[700] tracking-[4px] leading-[0.9] whitespace-nowrap text-center md:text-right"
              style={{
                fontFamily: "'Permanent Marker', 'Montserrat', sans-serif",
                fontSize: "clamp(40px, 8vw, 110px)",
                transform: "translateY(6px)",
                zIndex: 10,
                marginLeft: 0,
                marginRight: 0,
              }}
              initial={{ opacity: 0, x: 80 }}
              animate={
                inView
                  ? { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } }
                  : {}
              }
            >
              FOLLOW&nbsp;US
            </motion.h1>
          </motion.div>

          {/* Bottom Info Row: stack on small screens */}
          <motion.div
            className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4 mt-6 text-[#0e5960] px-2"
            variants={fadeUp}
            custom={0.75}
          >
            <motion.div className="text-[13px] font-[700]" variants={fadeUp} custom={0.9}>
              ©2025
            </motion.div>

            <motion.div
              className="flex gap-6 text-[13px] font-[700] flex-wrap justify-center md:justify-center"
              variants={fadeUp}
              custom={1.0}
            >
              <a href="#privacy" className="hover:underline">
                Privacyvoorwaarden
              </a>
              <a href="#actie" className="hover:underline">
                Actievoorwaarden
              </a>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 text-[13px] font-[700] justify-center md:justify-end"
              variants={fadeUp}
              custom={1.1}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#0e5960"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M12 21s-7-4.35-9-7.02C.72 10.8 3.3 6 7.5 6 9.8 6 12 8.2 12 8.2S14.2 6 16.5 6C20.7 6 23.28 10.8 21 13.98 19 16.65 12 21 12 21z" />
              </svg>
              <span>made by mr boost</span>
            </motion.div>
          </motion.div>

          {/* Soft Right Curve Accent (desktop only) */}
          <motion.div
            aria-hidden="true"
            className="hidden md:block absolute right-[-80px] top-[48px] w-[220px] h-[360px]"
            style={{
              borderRadius: "50% 10% 10% 50% / 30% 10% 10% 30%",
              boxShadow: "inset -36px 0 0 rgba(255,255,255,0.06)",
              transform: "rotate(-1deg)",
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1, transition: { delay: 1.0, duration: 0.9 } } : {}}
          ></motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
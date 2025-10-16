// V302.jsx
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function V301() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    // Load Google Fonts once
    const families = "Permanent+Marker|Montserrat:wght@500;700&display=swap";
    const href = `https://fonts.googleapis.com/css2?family=${families}`;
    if (!document.querySelector(`link[data-v302="true"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.setAttribute("data-v302", "true");
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
    hidden: { opacity: 0, y: 50 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: "easeOut" },
    }),
  };

  const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.1, ease: "easeOut" } },
  };

  return (
    <div
      ref={ref}
      className="w-full flex items-center justify-center py-[80px] bg-[#f6f1e6] overflow-hidden"
      style={{
        fontFamily:
          "'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
        color: "#0e5960",
      }}
    >
      {/* Outer Wrapper */}
      <motion.div
        className="relative w-full max-w-[1400px] h-140 px-[48px]"
        variants={scaleIn}
        initial="hidden"
        animate={controls}
      >
        {/* Pink Rounded Box */}
        <motion.div
          className="relative w-full rounded-[20px] h-150 overflow-hidden flex flex-col justify-between"
          style={{
            backgroundColor: "#f0b6c6",
            minHeight: "540px",
            padding: "60px 70px",
          }}
          variants={fadeUp}
          custom={0.2}
        >
          {/* Left Text Block */}
          <motion.div
            className="max-w-[46%]"
            variants={fadeUp}
            custom={0.4}
          >
            <div className="flex items-start gap-3">
              <motion.img
                src="https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/6745ca6cec81ee7fac907794_drip.svg"
                alt="drip"
                className="w-[28px] ml-15 mt-16"
                initial={{ rotate: -20, opacity: 0 }}
                animate={inView ? { rotate: 0, opacity: 1, transition: { duration: 0.8 } } : {}}
              />
              <motion.p
                className="m-0 font-[700] text-[#0c4650] mt-13 text-left"
                style={{
                  fontSize: "18px",
                  lineHeight: "1.9",
                  letterSpacing: "0.2px",
                }}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0, transition: { duration: 1 } } : {}}
              >
                Enjoy the pure, organic taste of Charlie’s
                <br />
                – no added sugars, no nonsense, just
                <br />
                refreshment in a fully recyclable can
              </motion.p>
            </div>
          </motion.div>

          {/* Right Decorative Text Bubble */}
          <motion.img
            src="https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/67471d8adf80dd6be4682802_footer-img.svg"
            alt="Let's Drink Harmless"
            className="absolute right-[150px] top-[40px] w-[320px] pointer-events-none select-none"
            initial={{ opacity: 0, x: 100, rotate: 10 }}
            animate={
              inView
                ? { opacity: 1, x: 0, rotate: 0, transition: { duration: 1.2, ease: "easeOut" } }
                : {}
            }
          />

          {/* Middle Main Row */}
          <motion.div
            className="flex items-end justify-between mt-[110px] right-10 relative"
            variants={fadeUp}
            custom={0.6}
          >
            {/* CHARLIE */}
            <motion.h1
              className="text-[#0e5960] font-[700] tracking-[6px] leading-[0.9] whitespace-nowrap"
              style={{
                fontFamily: "'Permanent Marker', 'Montserrat', sans-serif",
                fontSize: "clamp(92px, 11.5vw, 130px)",
                marginLeft: "-6%",
                transform: "translateY(6px)",
                zIndex: 10,
              }}
              initial={{ opacity: 0, x: -100 }}
              animate={
                inView
                  ? { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }
                  : {}
              }
            >
              CHARLIE
            </motion.h1>

            {/* Globe */}
            <motion.img
              src="https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/66db13f84899dbf5d5ab3de2_world.avif"
              alt="CO2 Neutral Globe"
              className="w-[150px] md:w-[150px] object-contain relative z-20"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={
                inView
                  ? {
                      scale: 1,
                      rotate: 0,
                      opacity: 1,
                      transition: { duration: 1.2, ease: "backOut" },
                    }
                  : {}
              }
              style={{
                transform: "translateY(-6px)",
                boxShadow: "0 6px 0 rgba(0,0,0,0.02)",
              }}
            />

            {/* FOLLOW US */}
            <motion.h1
              className="text-[#0e5960] font-[700] tracking-[6px] leading-[0.9] whitespace-nowrap text-right"
              style={{
                fontFamily: "'Permanent Marker', 'Montserrat', sans-serif",
                fontSize: "clamp(92px, 11.5vw, 130px)",
                marginRight: "-6%",
                transform: "translateY(6px)",
                zIndex: 10,
              }}
              initial={{ opacity: 0, x: 100 }}
              animate={
                inView
                  ? { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }
                  : {}
              }
            >
              FOLLOW&nbsp;US
            </motion.h1>
          </motion.div>

          {/* Bottom Info Row */}
          <motion.div
            className="flex items-center justify-between mt-[60px] text-[#0e5960]"
            variants={fadeUp}
            custom={0.8}
          >
            <motion.div className="text-[14px] font-[700]" variants={fadeUp} custom={1}>
              ©2025
            </motion.div>

            <motion.div className="flex gap-[40px] text-[14px] font-[700]" variants={fadeUp} custom={1.1}>
              <a href="#privacy" className="hover:underline">
                Privacyvoorwaarden
              </a>
              <a href="#actie" className="hover:underline">
                Actievoorwaarden
              </a>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 text-[14px] font-[700]"
              variants={fadeUp}
              custom={1.2}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#0e5960"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 21s-7-4.35-9-7.02C.72 10.8 3.3 6 7.5 6 9.8 6 12 8.2 12 8.2S14.2 6 16.5 6C20.7 6 23.28 10.8 21 13.98 19 16.65 12 21 12 21z" />
              </svg>
              <span>made by mr boost</span>
            </motion.div>
          </motion.div>

          {/* Soft Right Curve Accent */}
          <motion.div
            aria-hidden="true"
            className="absolute right-[-100px] top-[50px] w-[260px] h-[420px]"
            style={{
              borderRadius: "50% 10% 10% 50% / 30% 10% 10% 30%",
              boxShadow: "inset -44px 0 0 rgba(255,255,255,0.06)",
              transform: "rotate(-1deg)",
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1, transition: { delay: 1.3, duration: 1 } } : {}}
          ></motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

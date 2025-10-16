import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function V297() {
  // Outer box zoom animation controls + intersection observer
  const boxControls = useAnimation();
  const [boxRef, boxInView] = useInView({ threshold: 0.4, triggerOnce: false });

  useEffect(() => {
    // On mount: play a small "startup shrink" so the box appears reduced initially
    // (set then animate so we don't flash)
    boxControls.set({ scale: 1, opacity: 1, filter: "blur(0px)" });
    boxControls.start({
      scale: 0.85,
      opacity: 0.95,
      filter: "blur(3px)",
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }, [boxControls]);

  useEffect(() => {
    // When the section becomes visible, pop / grow into view.
    // When it leaves, shrink back to the initial reduced size.
    if (boxInView) {
      // keyframe gives a small overshoot then settle
      boxControls.start({
        scale: [0.85, 1.03, 1],
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.9, times: [0, 0.6, 1], ease: [0.2, 0.9, 0.2, 1] },
      });
    } else {
      boxControls.start({
        scale: 0.85,
        opacity: 0.95,
        filter: "blur(3px)",
        transition: { duration: 0.6, ease: "easeInOut" },
      });
    }
  }, [boxInView, boxControls]);

  // Inner cards animation
  const AnimatedCard = ({ number, title, text, img }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    useEffect(() => {
      if (inView) {
        controls.start({ opacity: 1, scale: 1, y: 0 });
      }
    }, [controls, inView]);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9, y: 60 }}
        animate={controls}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-[#eeffcf] rounded-2xl p-10 md:p-12 shadow-md hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-start justify-between">
          <div className="text-[100px] md:text-[120px] font-extrabold text-[#bcd36a] leading-none select-none">
            {number}
          </div>
          <img src={img} alt={title} className="w-50 h-full object-contain" />
        </div>
        <div className="mt-10 md:mt-12">
          <h3 className="font-['Baloo_2'] text-4xl md:text-5xl text-[#144b4b] tracking-wide">
            {title}
          </h3>
          <p className="mt-6 text-[#174e4a] max-w-4xl leading-relaxed font-medium">
            {text}
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-[#f3efe7] min-h-screen flex items-center justify-center text-left px-6 py-12 font-[Inter]">
      {/* Outer zoom-animated container */}
      <motion.div
        ref={boxRef}
        // initial is set by controls (we used boxControls.set on mount)
        animate={boxControls}
        // optional: origin so scaling looks natural from the left area
        style={{ transformOrigin: "left center" }}
        className="relative w-full max-w-7xl bg-[#cfe49b] rounded-[20px] shadow-xl overflow-hidden h-[82vh] flex flex-col"
      >
        <div className="flex flex-1 overflow-hidden">
          {/* LEFT SIDE — Sticky Info Section */}
          <div className="w-2/5 p-10 flex flex-col justify-center">
            <div className="sticky top-16">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex flex-col justify-between h-[68vh]"
              >
                <div>
                  <div className="inline-block bg-[#e9f8cb] text-[#0f5660] text-xs font-semibold py-2 px-3 rounded-md shadow-sm">
                    WE CARE ABOUT OUR PLANET!
                  </div>
                  <h1 className="font-['Baloo_2'] text-[#1b5b56] mt-8 text-5xl leading-tight tracking-tight">
                    Charlie wants <br />
                    <span className="block mt-1">a healthy</span>
                    <span className="block">environment for</span>
                    <span className="block">everybody</span>
                  </h1>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDE — Scrollable Cards */}
          <div className="w-3/5 overflow-y-auto p-10 md:p-12 space-y-10 scroll-smooth no-scrollbar">
            <AnimatedCard
              number="01"
              title="YES WE CAN. CAN!"
              img="https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/67cec10f089cd19966bf86d1_Recycle%20can.svg"
              text={`Cans, crafted from permanent aluminum, offer unique recycling advantages. 
                Unlike plastic bottles, cans can be recycled endlessly, contributing to a circular economy.`}
            />

            <AnimatedCard
              number="02"
              title="ORGANIC FRUITS"
              img="https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/67cec1abc5ef8a703d8d25d2_Bio%20organic%201.svg"
              text={`Organic farming reduces pollution, erosion, and energy use, 
                while improving soil quality, supporting insects and birds, 
                and conserving water.`}
            />

            <AnimatedCard
              number="03"
              title="HARMLESS HYDRATION"
              img="https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/68a4943660ea770a57e46440_CO2%20neutral.svg"
              text={`Unsweetened, zero sugar. Vegan. Harmless and never boring — 
                made to keep our planet healthy and beautiful.`}
            />
          </div>
        </div>

        {/* Floating CTA Button */}
        <motion.a
          href="/store-finder"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute left-10 bottom-6 inline-flex items-center gap-3 bg-[#f8e97d] border border-[#e9d86b] text-[#074b4b] px-5 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        >
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0e6b6b] text-white text-sm">
            💧
          </span>
          <span className="text-sm font-semibold">Need hydration NOW? To the storefinder!</span>
          <span className="ml-2 text-sm">×</span>
        </motion.a>
      </motion.div>

      {/* Hidden scrollbar style */}
      <style>{`
            html {
              scroll-behavior: smooth;
            }
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
        `}</style>
    </div>
  );
}
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function V296() {
  const boxControls = useAnimation();
  const [boxRef, boxInView] = useInView({ threshold: 0.4, triggerOnce: true });

  useEffect(() => {
    if (boxInView) {
      boxControls.start({
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
      });
    }
  }, [boxInView, boxControls]);

  // Animated card component
  const AnimatedCard = ({ number, title, text, img }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    useEffect(() => {
      if (inView) controls.start({ opacity: 1, y: 0 });
    }, [controls, inView]);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#eeffcf] rounded-2xl p-6 h-110 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="text-[80px] font-extrabold text-[#bcd36a] leading-none select-none">
            {number}
          </div>
          <img
            src={img}
            alt={title}
            className="w-50 h-40 object-contain mt-1"
          />
        </div>

        <div className="mt-2 text-left">
          <h3 className="font-['Baloo_2'] text-[#144b4b] text-4xl mb-2">
            {title}
          </h3>
          <p className="text-[#174e4a] text-base leading-relaxed font-medium">
            {text}
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-[#cfe49b] h-430 w-full overflow-hidden flex flex-col items-center justify-start px-4 py-8 font-[Inter]">
      <motion.div
        ref={boxRef}
        initial={{ scale: 0.95, opacity: 0, filter: "blur(8px)" }}
        animate={boxControls}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-left mb-8 ml-1">
          <div className="inline-block bg-[#e9f8cb] text-[#0f5660] text-xs font-semibold py-2 px-3 rounded-md shadow-sm mb-3">
            WE CARE ABOUT OUR PLANET!
          </div>
          <h1 className="font-['Baloo_2'] text-[#1b5b56] text-3xl leading-snug tracking-tight">
            Charlie wants <br />
            a healthy environment for <br />
            everybody
          </h1>
        </div>

        {/* Cards */}
        <div className="space-y-6 ">
          <AnimatedCard
            number="01"
           
            title="YES WE CAN. CAN!"
            img="https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/67cec10f089cd19966bf86d1_Recycle%20can.svg"
            text="Cans, crafted from permanent aluminum, offer unique recycling advantages. Unlike plastic bottles, cans can be recycled endlessly, contributing to a circular economy."
          />

          <AnimatedCard
            number="02"
            title="ORGANIC FRUITS"
            img="https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/67cec1abc5ef8a703d8d25d2_Bio%20organic%201.svg"
            text="Organic farming reduces pollution, erosion, and energy use, while improving soil quality, supporting insects and birds, and conserving water."
          />

          <AnimatedCard
            number="03"
            title="HARMLESS HYDRATION"
            img="https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/68a4943660ea770a57e46440_CO2%20neutral.svg"
            text="Unsweetened, zero sugar. Vegan. Harmless and never boring — made to keep our planet healthy and beautiful."
          />
        </div>
      </motion.div>

      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}

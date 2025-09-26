import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function V208() {
  const slides = [
    {
      id: 1,
      title: "Cloths: Innovation Meets Excellence!",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      btn: "Shop Products Now",
      img: "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/6682f4d17fa5af1724d6d7a4_jacket-2899729_1280.avif",
      price: "$ 90.00 USD",
    },
    {
      id: 2,
      title: "Electronicz: Innovation Meets Excellence!",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      btn: "Shop Products Now",
      img: "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/6682fcee109b6b1b2aacf89e_2149745031.avif",
      price: "$ 120.00 USD",
    },
    {
      id: 3,
      title: "Electronicz: Innovation Meets Excellence!",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      btn: "Shop Products Now",
      img: "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/6682feab029d8cf678a71c94_1254.avif",
      price: "$ 45.00 USD",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const categories = [
    {
      title: "Sweater",
      img: "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/66838808b8fe00265bf62a36_zoe-skhWkJ6Sm1o-unsplash.avif",
    },
    {
      title: "T-Shirts",
      img: "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/667e83da39bce5aceddc51b6_pexels-paggiarofrancesco-581087.avif",
    },
    {
      title: "Shirts",
      img: "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/667e83eaf746cc72a868ae75_nimble-made-N0ke5zChVBU-unsplash.avif",
    },
    {
      title: "Jackets",
      img: "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/667e844757cf2ed0510615c8_tessa-simpson-eTCogYz7kQE-unsplash.avif",
    },
    {
      title: "Suit",
      img: "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/667e84858345119f56d6dc0d_hardini-lestari-MujZAKea8Lw-unsplash.avif",
    },
    {
      title: "Jeans",
      img: "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/667e8491d746b4d430e4074d_mnz-m1m2EZOZVwA-unsplash.avif",
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(#000000e6,#000000e6),url(https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/667d247ccfed335bea25c51b_parker-burchfield-tvG4WvjgsEY-unsplash.webp)",
      }}
    >
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-10 text-center md:text-left">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Text */}
          <div className="w-full md:w-1/2 text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[current].id + "-text"}
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-snug">
                  {slides[current].title}
                </h1>
                <p className="mb-8 text-gray-300 text-base md:text-lg leading-relaxed">
                  {slides[current].desc}
                </p>
                <button className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-md font-semibold uppercase text-sm md:text-base">
                  {slides[current].btn}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Product Image */}
          <div className="relative w-full md:w-1/2 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[current].id + "-img"}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative flex justify-center items-center"
              >
                <div className="h-[300px] w-[300px] md:h-[400px] md:w-[400px] flex items-center justify-center">
                  <img
                    src={slides[current].img}
                    alt={slides[current].title}
                    className="h-full w-full object-contain drop-shadow-lg"
                  />
                </div>
                <div className="absolute top-2 right-5 md:top-0 md:right-10 -rotate-12 bg-red-600 text-white px-3 py-1 font-bold text-sm md:text-base">
                  {slides[current].price}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`transition-all duration-300 rounded-full h-3 ${
                current === idx ? "bg-red-600 w-12" : "bg-gray-300 w-3"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Category Hover Grid */}
      <div className="container mx-auto px-4 mt-12 mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="relative h-28 sm:h-36 md:h-40 flex items-center justify-center bg-white border group overflow-hidden"
            >
              {/* Mobile view => full image with dark overlay + text */}
              <div className="md:hidden absolute inset-0">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl uppercase">
                    {cat.title}
                  </span>
                </div>
              </div>

              {/* Desktop / Tablet => Hover effect */}
              <div className="hidden md:flex items-center justify-center w-full h-full relative">
                <span className="z-10 font-bold text-xl uppercase transition group-hover:opacity-0">
                  {cat.title}
                </span>
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

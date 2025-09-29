import { useState, useEffect } from "react";

const V222 = () => {
  const [currentSlide, setCurrentSlide] = useState(1); // Default: Grape Splash
  const [animate, setAnimate] = useState(false);

  // Set to true to show object1 on the RIGHT and object2 on the LEFT (swap).
  // Set to false to keep object1 on LEFT and object2 on RIGHT.
  const swapObjects = true;


   const flavorColors = [
    "#ac2020ff", // Watermelon
    "#a78bfa", // Grape Splash
    "#86efac", // Kiwi Bliss
    "#f871dbff", // Raspberry
  ]

  const flavors = [
    {
      name: "Watermelon",
      
      canImage:
        "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66bb49972c0549b6b1a3851b_66af95a0bf98e4cbfe3bf913_2.png",
      object1:
        "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66bb4997a9e036c986b62c90_66afa799d2202672505cb53b_7.png",
      object2:
        "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66bb4998089006c17ef9598b_66afa798d2202672505cb4f7_8.png",
    },
    {
      name: "Grape Splash",
      canImage:
        "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66bb498a6311da1c57e42e6f_66af90543366d46c5670929b_Untitled%2520design%2520(16).png",
      object1:
        "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66bb498ae1f140862dd4b1e7_66af929783aac744a84bc864_Untitled%2520design%2520(17).png",
      object2:
        "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66bb498af691be2232ed7a56_66af92bad9a9003eed36f98c_degfbv.png",
    },
    {
      name: "Kiwi Bliss",
      canImage:
        "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66bb49b59a8ef0671b9e7f95_66af95e98a76943ae0f40afa_5.png",
      object1:
        "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66bb49b5a71717dea46d0288_66af96918b0221f7f323ee65_2.png",
      object2:
        "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66af9693b6c15f8509ccd574_3.png",
    },
    {
      name: "Raspberry",
      canImage:
        "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66bb49a150b3ed64af11a9be_66af95a9503a85bd0d10928f_6.png",
      object1:
        "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66bb49a017a3cdee4541b347_66afa78bcb30cb40dd235ede_18.png",
      object2:
        "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66bb49a0887a00c3a639eef6_66afa78d99b6b5202119f8c8_17.png",
    
   
    
      },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % flavors.length);
    triggerAnimation();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + flavors.length) % flavors.length);
    triggerAnimation();
  };

  const triggerAnimation = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 600);
  };

  // keyboard navigation (left / right)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // compute left/right object sources depending on swapObjects
  const leftObjectSrc = swapObjects
    ? flavors[currentSlide].object2
    : flavors[currentSlide].object1;
  const rightObjectSrc = swapObjects
    ? flavors[currentSlide].object1
    : flavors[currentSlide].object2;

  return (
    <section className="relative min-h-screen w-full bg-[#071a02] overflow-hidden flex flex-col items-center justify-center">
      {/* FULL BACKGROUND IMAGE */}
      <img
        src="https://cdn.prod.website-files.com/66ae6d5d335aaf4dfce34142/66af891d96a32cf0deeffb6f_Untitled%20design%20(11)-p-2000.webp"
        alt="background"
        className="absolute inset-0 mt-60 w-full h-full "
      />

      {/* Bottom tiger background */}
      <img
        src="https://cdn.prod.website-files.com/66ae6d5d335aaf4dfce34142/66b2068ae4eb6829fd899505_Untitled%20design%20(1).webp"
        alt="tiger"
        loading="lazy"
        className="absolute bottom-2 left-0 w-full object-cover h-40 md:h-64 lg:h-96 opacity-90 -z-10 pointer-events-none"
      />

      {/* Heading */}
      <h2 className="text-white text-4xl md:text-6xl font-extrabold text-center mt-20 mb-10 tracking-wide z-30">
        OUR FLAVORS
      </h2>

      <div className="text-center mb-6 z-30">
        <h3
          className="text-xl md:text-2xl font-bold transition-colors duration-600"
          style={{ color: flavorColors[currentSlide] }}
        >
          {flavors[currentSlide].name}
        </h3>
        <button className="text-white text-sm underline mt-2">Shop Now</button>
      </div>

      {/* Main Can + Objects */}
      <div className="relative flex items-center justify-center z-30 mb-10 px-4 w-full max-w-4xl">
        {/* LEFT DECORATION */}
        <img
          src={leftObjectSrc}
          alt={`${flavors[currentSlide].name} left decoration`}
          loading="lazy"
          className={`absolute left-1/2 -translate-x-[220%] bottom-15 ml-50 w-50 h-50 object-contain animate-float transition-transform duration-500 ${
            animate ? "scale-bounce" : ""
          }`}
          style={{ transformOrigin: "center" }}
        />

        {/* CAN (center) */}
        <div className="relative z-40">
          <img
            src={flavors[currentSlide].canImage}
            alt={flavors[currentSlide].name}
            loading="lazy"
            className="w-40 md:w-56 h-auto object-contain transition-transform duration-700 ease-in-out drop-shadow-2xl"
          />
        </div>

        {/* RIGHT DECORATION */}
        <img
          src={rightObjectSrc}
          alt={`${flavors[currentSlide].name} right decoration`}
          loading="lazy"
          className={`absolute right-40 -translate-x-8 md:-translate-x-12 top-10 w-50 h-50 object-contain animate-float transition-transform duration-500 ${
            animate ? "scale-bounce" : ""
          }`}
          style={{ transformOrigin: "center" }}
        />

        {/* Stone Base / shadow under can */}
        <div className="absolute bottom-2 md:bottom-1 left-1/2 -translate-x-1/2 w-56 md:w-72 h-4 md:h-8 bg-gray-800 rounded-full blur-sm opacity-60 z-20" />
      </div>

      {/* Carousel Arrows */}
      <button
        onClick={prevSlide}
        aria-label="previous flavor"
        className="absolute left-80 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 md:p-4 z-40 transform transition-transform duration-200 shadow-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/40 hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        aria-label="next flavor"
        className="absolute right-80 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 md:p-4 z-40 transform transition-transform duration-200 shadow-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/40 hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex space-x-2 mt-8 z-40">
        {flavors.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              triggerAnimation();
            }}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              currentSlide === index ? "bg-white scale-125" : "bg-gray-500"
            }`}
          />
        ))}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes scaleBounce {
          0% { transform: scale(1); }
          50% { transform: scale(1.18); }
          100% { transform: scale(1); }
        }
        .scale-bounce {
          animation: scaleBounce 0.6s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default V222;
  
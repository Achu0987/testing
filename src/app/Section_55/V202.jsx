import React, { useEffect, useState } from "react";

const IMAGES = {
  BACK:
    "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcastle%2Fzamak-back.png&w=3840&q=75",
  FRONT:
    "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcastle%2Fzamak-front.png&w=1200&q=75",
  ART1:
    "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcastle%2Fart1.png&w=1080&q=75",
  ART3:
    "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcastle%2Fart3.png&w=1080&q=75",
  CLOUD:
    "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcastle%2Fcloud.png&w=3840&q=75",
  AUDIO: "/audio/candy.mp3",
};

const HOTSPOTS = [
  {
    id: "art1",
    top: "55%",
    left: "30%",
    title: "Creation of the Bombon",
    subtitle: "Oil on Canvas",
    image: IMAGES.ART1,
  },
  {
    id: "art2",
    top: "68%",
    left: "60%",
    title: "The Birth of Teddy Bear",
    subtitle: "Oil on Canvas",
    image: IMAGES.ART3,
  },
  {
    id: "art3",
    top: "80%",
    left: "30%",
    title: "Lady with a Bombon",
    subtitle: "Oil on Canvas",
    image: IMAGES.ART3,
  },
];

export default function V202() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [hoverCastle, setHoverCastle] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setOpen(false);
        setActive(null);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openModal(h) {
    setActive(h);
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    setActive(null);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EDE6F6] to-[#D1BAD8] min-h-screen">
      {/* bottom overlay */}
      <div className="absolute bottom-0 left-0 h-[50rem] md:h-[55rem] w-full bg-gradient-to-b from-[#ece7f2]/0 to-[#ece7f2]/100 pointer-events-none" />

      {/* Title */}
      <div className="w-full max-w-[1100px] mx-auto text-center pt-8 md:pt-12 px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#3B2A4E]">
          Bombon Castle Hidden Treasures
        </h2>
        
      </div>

      {/* Scene container */}
      <div className="relative w-full max-w-[1920px] mx-auto mt-8 md:mt-10 px-2">
        {/* BACK image - styled to emulate the tall/mobile crop from your uploaded image */}
        <div className="relative w-full">
          <img
            src={IMAGES.BACK}
            alt="Castle Background"
            loading="lazy"
            className="w-full block object-cover md:object-contain
                       h-[120vh] md:h-auto
                       transform scale-[1.15] md:scale-100
                       transition-transform duration-500"
            style={{
              transformOrigin: "center top",
              objectPosition: "center 10%", // push focus upward (shows castle top)
            }}
          />

          {/* HOTSPOTS */}
          {HOTSPOTS.map((h) => (
            <div
              key={h.id}
              className="absolute z-30"
              style={{
                top: h.top,
                left: h.left,
                transform: "translate(-50%, -50%)",
              }}
            >
              <button
                onClick={() => openModal(h)}
                aria-label={`open-${h.id}`}
                className="h-10 w-10 md:h-16 md:w-16 rounded-full flex items-center justify-center cursor-pointer"
              >
                <div className="relative h-full w-full rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-dashed border-white/80 md:border-2" />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-white"
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* FRONT image - hidden on small screens to avoid overlap with tall mobile crop */}
        <img
          src={IMAGES.FRONT}
          alt="Castle Front"
          loading="lazy"
          onMouseEnter={() => setHoverCastle(true)}
          onMouseLeave={() => setHoverCastle(false)}
          className="absolute top-0 left-1/2 -translate-x-1/2 transition-opacity duration-200 hidden md:block"
          style={{
            cursor: "pointer",
            width: "clamp(180px, 40%, 560px)",
            opacity: hoverCastle ? 1 : 0,
            zIndex: 20,
          }}
        />

        {/* clouds */}
        <img
          src={IMAGES.CLOUD}
          alt="Cloud decor center"
          className="pointer-events-none absolute bottom-[3rem] md:bottom-[8.5rem] left-1/2 z-10"
          style={{
            width: "1200px",
            height: "400px",
            transform: "translateX(-50%) translateY(50%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* MODAL */}
      {open && active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2 md:px-4">
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div className="relative z-60 bg-[#F6F0FF] rounded-2xl md:rounded-3xl p-4 md:p-6 max-w-full md:max-w-[900px] w-full mx-auto max-h-[95vh] overflow-y-auto">
            {/* Image */}
            <div className="flex justify-center">
              <div className="bg-[#E9D98B] p-2 md:p-4 rounded-md">
                <div className="bg-white p-1 md:p-3 rounded-sm border border-[#c9b57b] md:border-2">
                  <img
                    src={active.image}
                    alt={active.title}
                    className="block max-h-[70vh] w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="mt-6 text-center">
              <h3 className="text-2xl md:text-4xl font-bold text-[#3B2A4E]">
                {active.title}
              </h3>
              <p className="text-base md:text-lg mt-3 text-neutral-700">
                {active.subtitle}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={closeModal}
              aria-label="close"
              className="absolute top-3 right-3 md:top-5 md:right-5 h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center bg-white/10 border border-dashed border-white/80 md:border-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <audio src={IMAGES.AUDIO} preload="auto" />
    </section>
  );
}
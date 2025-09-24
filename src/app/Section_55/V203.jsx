import React, { useEffect, useState } from "react";

const IMAGES = {
  BACK: "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcastle%2Fzamak-back.png&w=3840&q=75",
  FRONT: "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcastle%2Fzamak-front.png&w=1200&q=75",
  ART1: "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcastle%2Fart1.png&w=1080&q=75",
  ART3: "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcastle%2Fart3.png&w=1080&q=75",
  CLOUD: "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcastle%2Fcloud.png&w=3840&q=75",
  AUDIO: "/audio/candy.mp3",
};

// NOTE: preview.widthPx used instead of tailwind arbitrary width class to keep fixed pixel sizing
const HOTSPOTS = [
  {
    id: "art1",
    top: "50%",
    left: "30%",
    title: "Creation of the Bombon",
    subtitle: "oil on canvas",
    image: IMAGES.ART1,
    preview: { translateX: "-50%", translateY: "-140%", widthPx: 288 }, // 18rem = 288px
  },
  {
    id: "art2",
    top: "60%",
    left: "45%",
    title: "The Birth of Teddy Bear",
    subtitle: "oil on canvas",
    image: IMAGES.ART3,
    preview: { translateX: "-50%", translateY: "-140%", widthPx: 256 }, // 16rem = 256px
  },
  {
    id: "art3",
    top: "75%",
    left: "30%",
    title: "Lady with a Bombon",
    subtitle: "oil on canvas",
    image: IMAGES.ART3,
    preview: { translateX: "-50%", translateY: "-140%", widthPx: 288 },
  },
];

export default function V203() {
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
    <section className="relative overflow-x-clip bg-gradient-to-b from-[#EDE6F6] to-[#D1BAD8] min-h-screen">
      {/* subtle bottom overlay */}
      <div className="absolute bottom-0 left-0 h-[22.5rem] w-full bg-gradient-to-b from-[#ece7f2]/0 to-[#ece7f2]/100 pointer-events-none" />

      {/* Scene container: keep a minimum width so zoom/pan doesn't make it too small */}
      <div className="relative w-screen max-w-[1920px] mx-auto min-w-[1200px]">
        {/* BACK image always visible */}
        <div className="relative w-full">
          <img
            src={IMAGES.BACK}
            alt="Castle Background"
            loading="lazy"
            className="w-full h-auto block min-w-[1200px]"
            style={{ display: "block" }}
          />

          {/* HOTSPOTS (aligned inside BACK image) */}
          {HOTSPOTS.map((h) => {
            const previewTranslateX = h.preview.translateX || "-50%";
            const previewTranslateY = h.preview.translateY || "-140%";
            const previewWidthPx = h.preview.widthPx || 256;

            return (
              <div
                key={h.id}
                className="absolute z-30"
                style={{
                  top: h.top,
                  left: h.left,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative group flex items-center justify-center">
                  {/* plus circular button */}
                  <button
                    onClick={() => openModal(h)}
                    aria-label={`open-${h.id}`}
                    className="h-16 w-16 rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <div className="relative h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/80" />
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="relative z-10 text-white"
                      >
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Hover preview card - use fixed pixel width so it doesn't scale down too much */}
                  <div
                    className="pointer-events-none absolute rounded-3xl bg-[#F6F0FF] p-4 shadow-lg opacity-0 group-hover:opacity-100"
                    style={{
                      left: previewTranslateX,
                      top: previewTranslateY,
                      width: previewWidthPx,
                      transform: "translateX(0) translateY(0)",
                    }}
                  >
                    <div className="flex justify-center">
                      <img
                        src={h.image}
                        alt={h.title}
                        loading="lazy"
                        className="w-full h-auto rounded-md object-contain"
                      />
                    </div>
                    <h3 className="mt-4 text-center text-lg font-bold">
                      {h.title}
                    </h3>
                    <p className="text-center text-sm mt-1 text-neutral-600">
                      {h.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FRONT castle image (only show when castle hovered) */}
        <img
          src={IMAGES.FRONT}
          alt="Castle Front"
          loading="lazy"
          onMouseEnter={() => setHoverCastle(true)}
          onMouseLeave={() => setHoverCastle(false)}
          className={`absolute top-0 left-1/2 -translate-x-1/2 transition-opacity duration-200`}
          style={{
            cursor: "pointer",
            // keep front castle responsive but not too small:
            width: "clamp(280px, 30%, 560px)",
            opacity: hoverCastle ? 1 : 0,
          }}
        />

        {/* clouds - fixed pixel width (was w-[2000rem] which was likely a typo) */}
        <img
          src={IMAGES.CLOUD}
          alt="Cloud decor center"
          className="pointer-events-none absolute bottom-[8.5rem] left-1/2 z-10"
          style={{
            width: "2000px",
            height: "430px",
            transform: "translateX(-50%) translateY(50%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Modal */}
      {open && active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {/* backdrop */}
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* modal card */}
          <div className="relative z-60 bg-[#F6F0FF] rounded-3xl p-6 max-w-[760px] w-full mx-auto">
            <div className="flex justify-center">
              <div className="bg-[#E9D98B] p-3 rounded-md">
                <div className="bg-white p-2 rounded-sm border-2 border-[#c9b57b]">
                  <img
                    src={active.image}
                    alt={active.title}
                    loading="lazy"
                    className="block max-h-[50vh] w-[min(36rem,72vw)] h-auto object-contain"
                    style={{ maxWidth: "720px" }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 text-center">
              <h3 className="text-2xl md:text-3xl font-bold">
                {active.title}
              </h3>
              <p className="text-sm mt-2 text-neutral-700">
                {active.subtitle}
              </p>
            </div>

            {/* Move close button inside modal top-right for better accessibility/visibility */}
            <button
              onClick={closeModal}
              aria-label="close"
              className="absolute top-4 right-4 h-12 w-12 rounded-full flex items-center justify-center bg-white/10 border-2 border-dashed border-white/80"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 text-white"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Preloaded audio */}
      <audio src={IMAGES.AUDIO} preload="auto" />
    </section>
  );
}
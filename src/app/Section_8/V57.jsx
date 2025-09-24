import React, { useEffect, useState } from "react";

/**
 * V57.jsx
 * - Tailwind CSS required.
 * - Inline Tailwind utility classes only.
 *
 * Changes: modal framed artwork size reduced and frame padding tightened.
 */

const IMAGES = {
  BACK: "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcastle%2Fzamak-back.png&w=3840&q=75",
  FRONT: "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcastle%2Fzamak-front.png&w=1200&q=75",
  ART1: "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcastle%2Fart1.png&w=1080&q=75",
  ART3: "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcastle%2Fart3.png&w=1080&q=75",
  CLOUD: "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcastle%2Fcloud.png&w=3840&q=75",
  AUDIO: "/audio/candy.mp3",
};

const HOTSPOTS = [
  {
    id: "art1",
    top: "46%",
    left: "28%",
    title: "Creation of the Bombon",
    subtitle: "oil on canvas",
    image: IMAGES.ART1,
    preview: { translateX: "-50%", translateY: "-140%", width: "w-[18rem]" },
  },
  {
    id: "art2",
    top: "50%",
    left: "56%",
    title: "The Birth of Teddy Bear",
    subtitle: "oil on canvas",
    image: IMAGES.ART3,
    preview: { translateX: "-50%", translateY: "-140%", width: "w-[16rem]" },
  },
  {
    id: "art3",
    top: "78%",
    left: "22%",
    title: "Lady with a Bombon",
    subtitle: "oil on canvas",
    image: IMAGES.ART3,
    preview: { translateX: "-50%", translateY: "-140%", width: "w-[18rem]" },
  },
];

export default function V57() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

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

      {/* Scene container (.group so hovering the whole scene shows FRONT image instantly) */}
      <div className="relative w-screen max-w-[1920px] mx-auto group">
        {/* BACK image (default) */}
        <img
          src={IMAGES.BACK}
          alt="Castle Background"
          loading="lazy"
          className="w-full h-auto max-w-none block"
        />

        {/* FRONT image: no transition — appears instantly on group hover and disappears instantly */}
        <img
          src={IMAGES.FRONT}
          alt="Castle Front"
          loading="lazy"
          className="absolute top-0 left-1/2 w-[30%] -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100"
        />

        {/* clouds */}
        <img
          src={IMAGES.CLOUD}
          alt="Cloud decor center"
          className="pointer-events-none absolute bottom-[7.5rem] left-1/2 z-10 w-[42rem] -translate-x-1/2 translate-y-1/2 mix-blend-screen"
        />
      </div>

      {/* HOTSPOTS */}
      {HOTSPOTS.map((h) => {
        const previewTranslateX = h.preview.translateX || "-50%";
        const previewTranslateY = h.preview.translateY || "-140%";
        const previewWidthClass = h.preview.width || "w-[16rem]";

        return (
          <div
            key={h.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
            style={{ top: h.top, left: h.left }}
          >
            <div className="relative group flex items-center justify-center">
              {/* plus circular button (kept compact) */}
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
                    <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>

              {/* Hover preview card — appears instantly on hover (no delay) */}
              <div
                className={`pointer-events-none absolute transform ${previewWidthClass} rounded-3xl bg-[#F6F0FF] p-4 shadow-lg opacity-0 group-hover:opacity-100`}
                style={{ left: previewTranslateX, top: previewTranslateY }}
              >
                <div className="flex justify-center">
                  <img
                    src={h.image}
                    alt={h.title}
                    loading="lazy"
                    className="w-full h-auto rounded-md object-contain"
                  />
                </div>
                <h3 className="mt-4 text-center text-lg font-bold">{h.title}</h3>
                <p className="text-center text-sm mt-1 text-neutral-600">{h.subtitle}</p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Modal: framed artwork with reduced size and tighter frame */}
      {open && active && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* backdrop */}
          <div onClick={closeModal} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* modal card */}
          <div className="relative z-60 bg-[#F6F0FF] rounded-3xl p-6 max-w-[760px] w-full mx-auto">
            {/* Framed artwork: outer gold frame, inner white mat, reduced artwork size */}
            <div className="flex justify-center">
              <div className="bg-[#E9D98B] p-3 rounded-md"> {/* slightly thinner outer frame */}
                <div className="bg-white p-2 rounded-sm border-2 border-[#c9b57b]"> {/* thinner mat */}
                  <img
                    src={active.image}
                    alt={active.title}
                    loading="lazy"
                    // Reduced size: smaller max width and height
                    className="block max-h-[50vh] w-[min(36rem,72vw)] h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Title & subtitle */}
            <div className="mt-5 text-center">
              <h3 className="text-2xl md:text-3xl font-bold">{active.title}</h3>
              <p className="text-sm mt-2 text-neutral-700">{active.subtitle}</p>
            </div>

            {/* dashed circular close button overlapping bottom-left */}
            <button
              onClick={closeModal}
              aria-label="close"
              className="absolute -bottom-8 -left-8 h-14 w-14 rounded-full flex items-center justify-center bg-white/10 border-2 border-dashed border-white/80"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 text-white"
              >
                <path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
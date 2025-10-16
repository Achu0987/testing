import React, { useCallback, useEffect, useRef, useState } from "react";

export default function V276() {
  const playlist = [
    { src: "https://pub-fb9062f1fe2444cd88ae29118656462c.r2.dev/Charlies_casis_%5B001-128%5D-vp9-chrome.webm", bg: "#C8A2D9", taste: "Cassis" },
    { src: "https://pub-fb9062f1fe2444cd88ae29118656462c.r2.dev/Charlies_Orange%20%26%20Mandarin_%5B001-128%5D-vp9-chrome.webm", bg: "#FFD7A8", taste: "Orange & Mandarin" },
    { src: "https://pub-fb9062f1fe2444cd88ae29118656462c.r2.dev/Charlies_Raspberry_%5B001-128%5D-vp9-chrome.webm", bg: "#F6C1E0", taste: "Raspberry" },
    { src: "https://pub-fb9062f1fe2444cd88ae29118656462c.r2.dev/Charlies_grapefruit_%5B001-128%5D-vp9-chrome.webm", bg: "#F2B4BD", taste: "Grapefruit" },
    { src: "https://pub-fb9062f1fe2444cd88ae29118656462c.r2.dev/Charlies_passionfruit_%5B001-128%5D-vp9-chrome.webm", bg: "#FFE08A", taste: "Passionfruit" },
    { src: "https://pub-fb9062f1fe2444cd88ae29118656462c.r2.dev/charlies_lemon_%5B001-128%5D-vp9-chrome.webm", bg: "#FFF8A0", taste: "Lemon" },
  ];

  const containerRef = useRef(null);
  const cardRef = useRef(null); // main card box ref
  const videoRef = useRef(null);
  const textureRef = useRef(null);
  const floatingRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [taste, setTaste] = useState(playlist[0].taste);
  const [hoverActive, setHoverActive] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [bgLayer, setBgLayer] = useState([{ color: playlist[0].bg, id: 0 }]);
  const nextId = useRef(1);

  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isLight = (hex) => {
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b > 180;
  };
  const contrastBtnColor = (hex) => (isLight(hex) ? "#F7DF63" : "#FFD966");

  // Initialize video
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.src = playlist[0].src;
      vid.loop = true;
      vid.play().catch(() => {});
    }
  }, []);

  // Floating TAP follows cursor (desktop only)
  const animateFloating = useCallback(() => {
    if (isMobile) return; // disable floating on mobile
    const el = floatingRef.current;
    if (!el) return;
    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.18;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.18;
    const tx = currentPos.current.x - 45;
    const ty = currentPos.current.y - 45;
    el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    rafId.current = requestAnimationFrame(animateFloating);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      if (hoverActive) {
        if (!rafId.current) rafId.current = requestAnimationFrame(animateFloating);
      } else {
        if (rafId.current) cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    }
    return () => rafId.current && cancelAnimationFrame(rafId.current);
  }, [hoverActive, animateFloating, isMobile]);

  // Parallax
  useEffect(() => {
    if (isMobile) return;
    const el = containerRef.current;
    if (!el) return;
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      const nx = relX / rect.width - 0.5;
      const ny = relY / rect.height - 0.5;

      if (textureRef.current)
        textureRef.current.style.transform = `translate(${nx * 30}px, ${ny * 30}px) scale(1.05)`;
      if (videoRef.current)
        videoRef.current.style.transform = `translate(${nx * 20}px, ${ny * 20}px) rotate(${nx * 3}deg)`;
    };
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Change background/video
  const changeToIndex = useCallback(
    (nextIndex) => {
      if (animating) return;
      setAnimating(true);
      const item = playlist[nextIndex];
      setTaste(item.taste);

      const id = nextId.current++;
      setBgLayer((prev) => [...prev, { color: item.bg, id }]);

      const vid = videoRef.current;
      if (vid && vid.src !== item.src) {
        vid.src = item.src;
        vid.loop = true;
        vid.play().catch(() => {});
      }

      setTimeout(() => {
        setBgLayer((prev) => prev.filter((layer) => layer.id === id));
        setAnimating(false);
        setIndex(nextIndex);
      }, 900);
    },
    [playlist, animating]
  );

  const handleTap = (e) => {
    e.stopPropagation();
    setRippleActive(true);
    setTimeout(() => setRippleActive(false), 420);
    const nextIndex = (index + 1) % playlist.length;
    changeToIndex(nextIndex);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-[#efe7da] p-3 sm:p-6 overflow-hidden relative"
      onMouseEnter={() => !isMobile && setHoverActive(true)}
      onMouseLeave={() => !isMobile && setHoverActive(false)}
    >
      {/* Main Box */}
      <div
        ref={cardRef}
        className="w-full max-w-[900px] h-[95vh] sm:h-[90vh] rounded-[30px] sm:rounded-[50px] overflow-hidden relative shadow-[0_12px_36px_rgba(0,0,0,0.12)] flex items-center justify-center"
      >
        {bgLayer.map((layer) => (
          <div
            key={layer.id}
            className="absolute inset-0 z-0"
            style={{
              background: layer.color,
              animation: "bgPulse 0.9s cubic-bezier(.2,.9,.15,1) forwards",
              transformOrigin: "50% 50%",
            }}
          />
        ))}

        {/* Texture */}
        <img
          ref={textureRef}
          src="https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/66dadc75a87cf9914f4539d7_Mask%20Group%20119.avif"
          alt=""
          aria-hidden
          className="absolute inset-0 w-[120%] h-[140%] object-cover mix-blend-overlay z-10 transition-transform duration-300 ease-out"
        />

        {/* Video */}
        <div className="relative z-20 flex flex-col items-center gap-6 mt-6 mb-25 sm:mt-10 sm:mb-16">
          <div className="flex items-center justify-center relative -rotate-6 transition-all duration-500 ease-[cubic-bezier(.3,.9,.2,1)]">
            <video
              ref={videoRef}
              playsInline
              autoPlay
              muted
              loop
              preload="auto"
              className="rounded-md block cursor-default"
              style={{
                width: isMobile ? "200vw" : "px",
                maxWidth: isMobile ? "800px" : "none",
                height: isMobile ? "300vh" : "900px",
                maxHeight: isMobile ? "760px" : "none",
                background: "transparent",
              }}
            />
          </div>
        </div>

        {/* Text */}
        <div className="absolute left-1/2 top-[30%] -translate-x-1/2 text-center pointer-events-none">
          <div className="font-extrabold text-[30vw] sm:text-[120px] leading-[0.9] tracking-[2px] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
            BRIGHTON
          </div>
          <div className="font-extrabold text-[30vw] sm:text-[120px] mt-[-6px] tracking-[2px] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
            CHARLIE'S
          </div>
        </div>

        {/* Taste Label */}
        <div className="absolute left-4 bottom-3 sm:left-7 sm:bottom-4 z-30 flex items-center gap-2 font-extrabold text-[#0b2b3b] text-xs sm:text-sm">
          <span className="opacity-95">TASTE:</span>
          <div className="border-b-2 border-[#0b2b3b]/90 pb-[1px] sm:pb-[2px]">{taste}</div>
        </div>

        {/* Floating TAP button — rendered inside the card when mobile so it stays within this section */}
        {isMobile ? (
          <div
            ref={floatingRef}
            className="absolute z-50 right-4 bottom-4"
            style={{
              pointerEvents: "auto",
            }}
          >
            <button
              onClick={handleTap}
              className="font-extrabold text-[#0b2b3b] w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.18)] relative overflow-hidden"
              style={{
                background: contrastBtnColor(playlist[index].bg),
                border: "4px solid rgba(11,43,59,0.06)",
                cursor: "pointer",
              }}
            >
              <span style={{ position: "relative", zIndex: 2 }}>TAP</span>
              {rippleActive && (
                <span
                  className="absolute inset-0 rounded-full bg-white/60"
                  style={{ animation: "ripple 520ms ease-out forwards" }}
                />
              )}
            </button>
          </div>
        ) : null}
      </div>

      {/* Floating TAP for desktop — keep original fixed-following behavior */}
      {!isMobile ? (
        <div
          ref={floatingRef}
          className="fixed z-50 pointer-events-none"
          style={{
            top: 0,
            left: 0,
            transform: "translate3d(-9999px,-9999px,0)",
            opacity: hoverActive ? 1 : 0,
            transition: "opacity 180ms ease",
          }}
        >
          <button
            onClick={handleTap}
            className="font-extrabold text-[#0b2b3b] w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.18)] relative overflow-hidden"
            style={{
              background: contrastBtnColor(playlist[index].bg),
              border: "4px solid rgba(11,43,59,0.06)",
              cursor: "pointer",
            }}
          >
            <span style={{ position: "relative", zIndex: 2 }}>TAP</span>
            {rippleActive && (
              <span
                className="absolute inset-0 rounded-full bg-white/60"
                style={{ animation: "ripple 520ms ease-out forwards" }}
              />
            )}
          </button>
        </div>
      ) : null}

      <style>{`
        @keyframes ripple {
          0% { transform: scale(0.6); opacity: 0.9; }
          60% { transform: scale(1.08); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        @keyframes bgPulse {
          0% { clip-path: circle(0% at 50% 50%); opacity: 0.95; filter: blur(20px); }
          50% { clip-path: circle(80% at 50% 50%); opacity: 1; filter: blur(8px); }
          100% { clip-path: circle(200% at 50% 50%); opacity: 1; filter: blur(0px); }
        }

        .w-900 > .absolute.inset-0 {
          pointer-events: none;
        }

        @media (max-width: 640px) {
          .w-900 {
            border-radius: 30px;
          }
        }
      `}</style>
    </div>
  );
}
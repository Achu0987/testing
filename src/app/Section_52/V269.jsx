// V269.jsx
import React, { useEffect, useState, useRef } from "react";

const FEATURES = [
  "Vegan",
  "Gelatin Free",
  "Gluten Free",
  "Dairy Free",
  "Keto Friendly",
  "Halal",
];

// map each feature index to a pair of image keys [left, right]
const PAIRS = {
  0: ["a", "b"],
  1: ["b", "c"],
  2: ["c", "d"],
  3: ["d", "a"],
  4: ["a", "c"],
  5: ["b", "d"],
};

const IMAGES = {
  a: {
    src:
      "https://cdn.sanity.io/images/krc73rcv/production/1c427a4101297341e9ad5c8c38bbfd6897091118-840x587.png?w=300&auto=format&dpr=2",
    alt: "Product A",
    style: { transform: "rotate(-22deg) scale(.95)" },
  },
  b: {
    src:
      "https://cdn.sanity.io/images/krc73rcv/production/7dbaf862008dfa551e13976a42a113a1ee492ee5-840x587.png?w=300&auto=format&dpr=2",
    alt: "Product B",
    style: { transform: "rotate(6deg) scale(.92)" },
  },
  c: {
    src:
      "https://cdn.sanity.io/images/krc73rcv/production/13331e1820e7654a8dca0241779f151f897bf16e-841x587.png?w=320&auto=format&dpr=2",
    alt: "Product C",
    style: { transform: "rotate(12deg) scale(.95)" },
  },
  d: {
    src:
      "https://cdn.sanity.io/images/krc73rcv/production/a0172fb6e0f6aaa4236cd5d71f681fe57180b764-840x587.png?w=320&auto=format&dpr=2",
    alt: "Product D",
    style: { transform: "rotate(-6deg) scale(.92)" },
  },
};

// decorative scalloped SVGs (the 4 you provided)
const BG_SVGS = {
  a: "https://cdn.sanity.io/images/krc73rcv/production/5899d257d1890da7d5f04281bff8091dc0a0e1f3-30x31.svg?w=30&auto=format&dpr=2",
  b: "https://cdn.sanity.io/images/krc73rcv/production/7911366576ad2a3d4f2b7ae53a464d37caf249cf-30x31.svg?w=30&auto=format&dpr=2",
  c: "https://cdn.sanity.io/images/krc73rcv/production/c22909d6552d32026a64ba1fde1c09dcf0c43d4c-29x31.svg?w=30&auto=format&dpr=2",
  d: "https://cdn.sanity.io/images/krc73rcv/production/d8514648efc4d3e249bc2764b844a384ed414c7e-30x31.svg?w=30&auto=format&dpr=2",
};

export default function V269() {
  const [active, setActive] = useState(0);
  const popTimeouts = useRef([]);
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [popLeft, setPopLeft] = useState(false);
  const [popRight, setPopRight] = useState(false);
  const [leftKey, setLeftKey] = useState(PAIRS[0][0]);
  const [rightKey, setRightKey] = useState(PAIRS[0][1]);
  // flipped controls the alternating corner layout:
  // false -> leftKey shows bottom-left, rightKey shows top-right (default)
  // true  -> leftKey shows top-left, rightKey shows bottom-right (flipped)
  const [flipped, setFlipped] = useState(false);

  // inject Anton font for headings
  useEffect(() => {
    const id = "v269-anton-font";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Anton&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  function clearAllTimeouts() {
    popTimeouts.current.forEach((t) => clearTimeout(t));
    popTimeouts.current = [];
  }

  function hideDecor() {
    clearAllTimeouts();
    setPopLeft(false);
    setPopRight(false);
    setVisibleLeft(false);
    setVisibleRight(false);
  }

  function showPairForIndex(index) {
    clearAllTimeouts();
    const idx = typeof index === "number" ? index : 0;
    const pair = PAIRS[idx] || PAIRS[0];
    setLeftKey(pair[0]);
    setRightKey(pair[1]);

    // set flipped based on odd/even index: even(0) -> standard, odd -> flipped
    setFlipped(idx % 2 === 1);

    setVisibleLeft(true);
    const t1 = setTimeout(() => setPopLeft(true), 50);
    popTimeouts.current.push(t1);

    setVisibleRight(true);
    const t2 = setTimeout(() => setPopRight(true), 140);
    popTimeouts.current.push(t2);
  }

  useEffect(() => {
    setActive(0);
    showPairForIndex(0);
    return () => clearAllTimeouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // responsive: hide on small screens
  useEffect(() => {
    function sync() {
      if (window.innerWidth <= 720) {
        hideDecor();
      } else {
        showPairForIndex(active >= 0 ? active : 0);
      }
    }
    window.addEventListener("resize", sync);
    sync();
    return () => window.removeEventListener("resize", sync);
  }, [active]);

  function activate(i) {
    setActive(i);
    showPairForIndex(i);
  }
  function leave() {
    setActive(0);
    showPairForIndex(0);
  }
  function clickActivate(i) {
    activate(i);
    setTimeout(() => leave(), 1200);
  }

  // use a CSS variable for responsive background size (bigger than product)
  const wrapperStyle = {
    ["--bg-size"]: "clamp(220px, 24vw, 360px)",
  };

  // compute container positions depending on flipped state
  const bottomLeftContainerStyle = flipped
    ? {
        position: "absolute",
        left: -550,
        top: -90, // moved to top-left when flipped
        width: "var(--bg-size)",
        height: "var(--bg-size)",
      }
    : {
        position: "absolute",
        left: -550,
        bottom: -90, // default bottom-left
        width: "var(--bg-size)",
        height: "var(--bg-size)",
      };

  const topRightContainerStyle = flipped
    ? {
        position: "absolute",
        right: -480,
        bottom: -90, // moved to bottom-right when flipped
        width: "var(--bg-size)",
        height: "var(--bg-size)",
      }
    : {
        position: "absolute",
        right: -480,
        top: -90, // default top-right
        width: "var(--bg-size)",
        height: "var(--bg-size)",
      };

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#fbfaf9]"
      aria-label="Highlighted Features"
      style={wrapperStyle}
    >
      <style>{`
        /* continuous full-rotation animations (360deg linear) */
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spinRev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }

        /* entrance animations for product */
        @keyframes imageEnterLeft {
          0% { transform: translate(-36px, 36px) scale(0.9); opacity: 0; }
          60% { transform: translate(6px, -6px) scale(1.08); opacity: 1; }
          100% { transform: translate(0,0) scale(1.06); opacity: 1; }
        }
        @keyframes imageEnterRight {
          0% { transform: translate(36px, -36px) scale(0.9); opacity: 0; }
          60% { transform: translate(-6px, 6px) scale(1.08); opacity: 1; }
          100% { transform: translate(0,0) scale(1.06); opacity: 1; }
        }

        /* SVG bg image sizing - we render as <img> so keep it crisp and scalable */
        .v269-bg-img {
          width: var(--bg-size);
          height: var(--bg-size);
          object-fit: contain;
          pointer-events: none;
          user-select: none;
          display: block;
        }
      `}</style>

      <div className="w-full max-w-[1100px] px-6 md:px-8 grid grid-cols-1 md:grid-cols-[18%_64%_18%] gap-5 items-center relative">
        <div className="hidden md:block" />

        <div
          className="col-span-1 md:col-span-1 relative flex items-center justify-center py-2"
          role="list"
          aria-label="Feature list"
        >
          <div className="text-center inline-block text-12xl max-w-[700px] leading-[0.88]">
            {FEATURES.map((t, i) => {
              const isActive = i === active;
              return (
                <span
                  key={t}
                  role="listitem"
                  tabIndex={0}
                  onMouseEnter={() => activate(i)}
                  onFocus={() => activate(i)}
                  onMouseLeave={() => leave()}
                  onBlur={() => leave()}
                  onClick={() => clickActivate(i)}
                  className={`block cursor-pointer select-none outline-none transition-colors transition-transform duration-150 ease-linear uppercase ${isActive ? "text-[#e75e0f]" : "text-[#0b0b0b]"}`}
                  style={{
                    fontFamily: "'Anton', Arial, sans-serif",
                    fontSize: "clamp(32px, 7vw, 88px)",
                    padding: "6px 0",
                    letterSpacing: "0.02em",
                    transform: isActive ? "translateY(-2px)" : "translateY(0)",
                  }}
                >
                  {t}
                </span>
              );
            })}
          </div>

          {/* decorative area (hidden on small screens) */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {/* Group A: either bottom-left (default) or top-left (flipped) */}
            <div className="hidden md:block" style={bottomLeftContainerStyle}>
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                {/* scalloped SVG behind product - now spins 360° clockwise */}
                <img
                  src={BG_SVGS[leftKey]}
                  alt=""
                  className="v269-bg-img"
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    zIndex: 10,
                    opacity: visibleLeft ? 1 : 0,
                    transformOrigin: "50% 50%",
                    transform: popLeft ? "scale(1) rotate(-8deg)" : visibleLeft ? "scale(1.06) rotate(-6deg)" : "scale(0.9) rotate(-6deg)",
                    transition: "transform 100ms ease, opacity 100ms ease",
                    filter: "saturate(0.5)",
                    animation: visibleLeft ? "spin 20s linear infinite" : "none",
                  }}
                />

                {/* product image above the scallop */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 6,
                  }}
                >
                  <div
                    className="w-full h-full rounded-lg overflow-hidden"
                    style={{
                      borderRadius: 12,
                      opacity: visibleLeft ? 1 : 0,
                      pointerEvents: visibleLeft ? "auto" : "none",
                      animation: visibleLeft ? "imageEnterLeft 360ms cubic-bezier(.2,.9,.2,1) forwards" : "none",
                      transform: popLeft ? "translateZ(0) scale(1.12) rotate(0deg)" : visibleLeft ? "translateZ(0) scale(1.06) rotate(0deg)" : "translateZ(0) scale(0.92)",
                      transition: "transform 260ms ease, opacity 260ms ease",
                      ...(IMAGES[leftKey] ? IMAGES[leftKey].style : {}),
                    }}
                  >
                    <img
                      src={IMAGES[leftKey].src}
                      alt={IMAGES[leftKey].alt}
                      className="w-full h-full object-contain block"
                      style={{ borderRadius: 12 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Group B: either top-right (default) or bottom-right (flipped) */}
            <div className="hidden md:block" style={topRightContainerStyle}>
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                {/* scalloped SVG behind product - now spins 360° counter-clockwise */}
                <img
                  src={BG_SVGS[rightKey]}
                  alt=""
                  className="v269-bg-img"
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    zIndex: 10,
                    opacity: visibleRight ? 1 : 0,
                    transformOrigin: "50% 50%",
                    transform: popRight ? "scale(1.12) rotate(8deg)" : visibleRight ? "scale(1.06) rotate(6deg)" : "scale(0.9) rotate(6deg)",
                    transition: "transform 280ms ease, opacity 260ms ease",
                    filter: "saturate(1.06)",
                    animation: visibleRight ? "spinRev 20s linear infinite" : "none",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 6,
                    
                  }}
                >
                  <div
                    className="w-full h-full rounded-lg overflow-hidden"
                    style={{
                      borderRadius: 12,
                      opacity: visibleRight ? 1 : 0,
                      pointerEvents: visibleRight ? "auto" : "none",
                      animation: visibleRight ? "imageEnterRight 360ms cubic-bezier(.2,.9,.2,1) forwards" : "none",
                      transform: popRight ? "translateZ(0) scale(1.12) rotate(0deg)" : visibleRight ? "translateZ(0) scale(1.06) rotate(0deg)" : "translateZ(0) scale(0.92)",
                      transition: "transform 260ms ease, opacity 260ms ease",
                      ...(IMAGES[rightKey] ? IMAGES[rightKey].style : {}),
                    }}
                  >
                    <img
                      src={IMAGES[rightKey].src}
                      alt={IMAGES[rightKey].alt}
                      className="w-full h-full object-contain block"
                      style={{ borderRadius: 12 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* small black circular badge bottom-right */}
         
        </div>

        <div className="hidden md:block" />
      </div>
    </section>
  );
}
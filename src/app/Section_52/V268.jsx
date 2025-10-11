// V269.jsx
import React, { useEffect, useRef, useState } from "react";

const FEATURES = [
  "Vegan",
  "Gelatin Free",
  "Gluten Free",
  "Dairy Free",
  "Keto Friendly",
  "Halal",
];

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
    src: "https://cdn.sanity.io/images/krc73rcv/production/1c427a4101297341e9ad5c8c38bbfd6897091118-840x587.png?w=300&auto=format&dpr=2",
    alt: "Product A",
    style: { transform: "rotate(-12deg) scale(.95)" },
  },
  b: {
    src: "https://cdn.sanity.io/images/krc73rcv/production/7dbaf862008dfa551e13976a42a113a1ee492ee5-840x587.png?w=300&auto=format&dpr=2",
    alt: "Product B",
    style: { transform: "rotate(8deg) scale(.92)" },
  },
  c: {
    src: "https://cdn.sanity.io/images/krc73rcv/production/13331e1820e7654a8dca0241779f151f897bf16e-841x587.png?w=320&auto=format&dpr=2",
    alt: "Product C",
    style: { transform: "rotate(6deg) scale(.94)" },
  },
  d: {
    src: "https://cdn.sanity.io/images/krc73rcv/production/a0172fb6e0f6aaa4236cd5d71f681fe57180b764-840x587.png?w=320&auto=format&dpr=2",
    alt: "Product D",
    style: { transform: "rotate(-6deg) scale(.94)" },
  },
};

const BG_SVGS = {
  a: "https://cdn.sanity.io/images/krc73rcv/production/5899d257d1890da7d5f04281bff8091dc0a0e1f3-30x31.svg?w=120&auto=format&dpr=2",
  b: "https://cdn.sanity.io/images/krc73rcv/production/7911366576ad2a3d4f2b7ae53a464d37caf249cf-30x31.svg?w=120&auto=format&dpr=2",
  c: "https://cdn.sanity.io/images/krc73rcv/production/c22909d6552d32026a64ba1fde1c09dcf0c43d4c-29x31.svg?w=120&auto=format&dpr=2",
  d: "https://cdn.sanity.io/images/krc73rcv/production/d8514648efc4d3e249bc2764b844a384ed414c7e-30x31.svg?w=120&auto=format&dpr=2",
};

const AUTOPLAY_INTERVAL = 2500;

export default function V268() {
  const [active, setActive] = useState(0);
  const popTimeouts = useRef([]);
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [popLeft, setPopLeft] = useState(false);
  const [popRight, setPopRight] = useState(false);
  const [leftKey, setLeftKey] = useState(PAIRS[0][0]);
  const [rightKey, setRightKey] = useState(PAIRS[0][1]);
  const [flipped, setFlipped] = useState(false);

  const autoplayRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 720);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  function showPair(index) {
    const pair = PAIRS[index] || PAIRS[0];
    setLeftKey(pair[0]);
    setRightKey(pair[1]);
    setFlipped(index % 2 === 1);

    setVisibleLeft(true);
    setVisibleRight(true);
    setTimeout(() => setPopLeft(true), 60);
    setTimeout(() => setPopRight(true), 120);
    setTimeout(() => {
      setPopLeft(false);
      setPopRight(false);
    }, 900);
  }

  useEffect(() => {
    showPair(0);
    autoplayRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % FEATURES.length;
        showPair(next);
        return next;
      });
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(autoplayRef.current);
  }, []);

  const wrapperStyle = {
    ["--mobile-bg-size"]: "clamp(170px, 24vw, 160px)",
  };

  const mobileTopLeft = { position: "fixed", left: -10, top: 80 };
  const mobileTopRight = { position: "fixed", right: -10, top: 80 };
  const mobileBottomLeft = { position: "fixed", left: -10, bottom: 10 };
  const mobileBottomRight = { position: "fixed", right: -10, bottom: 10 };

  function MobileCard({ imgKey, visible, pop, styleOverride }) {
    if (!imgKey) return null;
    return (
      <div
        style={{
          ...styleOverride,
          zIndex: 20,
          width: "var(--mobile-bg-size)",
          height: "var(--mobile-bg-size)",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <img
            src={BG_SVGS[imgKey]}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: visible ? 1 : 0,
              transform: pop
                ? "scale(1.05) rotate(-4deg)"
                : visible
                ? "scale(1.02)"
                : "scale(0.9)",
              transition: "all 0.3s ease",
              filter: "invert(1) brightness(0.4) contrast(0.9)",
              mixBlendMode: "multiply",
              animation: visible ? "spin 20s linear infinite" : "none",
            }}
          />
          <img
            src={IMAGES[imgKey].src}
            alt={IMAGES[imgKey].alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: visible ? 1 : 0,
              transition: "all 0.4s ease",
              transform: pop
                ? "scale(1.06)"
                : visible
                ? "scale(1.02)"
                : "scale(0.9)",
              ...IMAGES[imgKey].style,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center relative bg-[#fbfaf9] overflow-hidden px-6"
      style={wrapperStyle}
    >
      <style>{`
        @keyframes spin { from {transform: rotate(0deg);} to {transform: rotate(360deg);} }

        .feature-text {
          font-family: 'Anton', sans-serif;
          font-size: clamp(28px, 9vw, 48px);
          line-height: 1;
          text-transform: uppercase;
          color: #0b0b0b;
          text-align: center;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .feature-active {
          color: #e75e0f;
          transform: scale(1.06);
        }

        .mobile-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          justify-content: center;
          align-items: center;
          animation: fadein 0.6s ease;
        }

        @keyframes fadein {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="mobile-container">
        {FEATURES.map((f, i) => (
          <div
            key={f}
            className={`feature-text ${
              i === active ? "feature-active" : ""
            }`}
          >
            {f}
          </div>
        ))}
      </div>

      {/* mobile image positions */}
      {isMobile && (
        <>
          {!flipped ? (
            <>
              <MobileCard
                imgKey={leftKey}
                visible={visibleLeft}
                pop={popLeft}
                styleOverride={mobileTopLeft}
              />
              <MobileCard
                imgKey={rightKey}
                visible={visibleRight}
                pop={popRight}
                styleOverride={mobileBottomRight}
              />
            </>
          ) : (
            <>
              <MobileCard
                imgKey={leftKey}
                visible={visibleLeft}
                pop={popLeft}
                styleOverride={mobileTopRight}
              />
              <MobileCard
                imgKey={rightKey}
                visible={visibleRight}
                pop={popRight}
                styleOverride={mobileBottomLeft}
              />
            </>
          )}
        </>
      )}
    </section>
  );
}

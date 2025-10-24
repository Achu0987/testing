'use client';


import React, { useState, useEffect, useRef } from "react";

export default function V323() {
  const [stage, setStage] = useState(0);
  const [touched, setTouched] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const rootRef = useRef(null);

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (rootRef.current) {
        const rect = rootRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const rootElement = rootRef.current;
    if (rootElement) {
      rootElement.addEventListener('mousemove', handleMouseMove);
      return () => rootElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleClick = () => {
    // Trigger quick move toward right
    setTouched(true);

    // Return to normal after short delay
    setTimeout(() => {
      setTouched(false);
    }, 250);

    // Proceed through stages (limit to 3)
    if (stage < 3) setStage((s) => s + 1);
  };

  // Mouse movement calculations for left panel elements
  const mouseX = mousePosition.x * 2 - 1; // -1 to 1 range
  const mouseY = mousePosition.y * 2 - 1; // -1 to 1 range

  // Globe movement (subtle rotation and position)
  const globeRotation = mouseX * 5 + mouseY * 3;
  const globeTranslateX = mouseX * 20;
  const globeTranslateY = mouseY * 15;

  // Card movement (more pronounced)
  const cardMoveX = mouseX * 40;
  const cardMoveY = mouseY * 30;
  const cardRotate = mouseX * 2 + mouseY * 1;

  // Parallax elements movement
  const parallax1MoveX = mouseX * 15;
  const parallax1MoveY = mouseY * 10;
  const parallax2MoveX = mouseX * 25;
  const parallax2MoveY = mouseY * 18;
  const parallax3MoveX = mouseX * 35;
  const parallax3MoveY = mouseY * 25;

  // Overlay animation stages
  const overlayStages = [
    { opacity: 0, blur: 0 },
    { opacity: 0.5, blur: 6 },
    { opacity: 0.8, blur: 10 },
    { opacity: 0, blur: 0 },
  ];

  // Wedge sizes
  const wedgeStages = [
    { scale: 0, opacity: 0 }, // Initial
    { scale: 2.2, opacity: 1 }, // 1st click
    { scale: 1.0, opacity: 1 }, // 2nd click
    { scale: 0.0, opacity: 0 }, // 3rd click
  ];

  // Card motion base stage
  const baseCardStages = [
    { x: 0, y: 0, scale: 1 },
    { x: 0, y: 0, scale: 1 },
    { x: 0, y: 0, scale: 1 },
    { x: 0, y: 0, scale: 1 },
  ];

  // Overlay and wedge data
  const overlay = overlayStages[stage];
  const wedge = wedgeStages[stage];
  const cardPose = baseCardStages[stage];

  // Apply mouse movement to card when not touched
  const cardTransform = touched
    ? `translate(calc(-63.5% + 200px), calc(-50.5% + ${cardPose.y}px)) scale(${cardPose.scale})`
    : `translate(calc(-50% + ${cardPose.x + cardMoveX}px), calc(-50% + ${cardPose.y + cardMoveY}px)) scale(${cardPose.scale}) rotate(${cardRotate}deg)`;

  // Globe transform with mouse movement
  const globeTransform = `translate(${globeTranslateX}px, ${globeTranslateY}px) rotate(${globeRotation}deg)`;

  return (
    <div className="v305-root" ref={rootRef}>
      {/* LEFT PANEL */}
      <div className="panel left">
        {/* Parallax Background Layer 1 */}
        <div 
          className="parallax-layer parallax-1"
          style={{
            transform: `translate(${parallax1MoveX}px, ${parallax1MoveY}px)`,
            transition: "transform 0.1s ease-out"
          }}
        >
          <div className="parallax-element element-1"></div>
        </div>

        {/* Parallax Background Layer 2 */}
        <div 
          className="parallax-layer parallax-2"
          style={{
            transform: `translate(${parallax2MoveX}px, ${parallax2MoveY}px)`,
            transition: "transform 0.12s ease-out"
          }}
        >
          <div className="parallax-element element-2"></div>
        </div>

        {/* Parallax Background Layer 3 */}
        <div 
          className="parallax-layer parallax-3"
          style={{
            transform: `translate(${parallax3MoveX}px, ${parallax3MoveY}px)`,
            transition: "transform 0.15s ease-out"
          }}
        >
          <div className="parallax-element element-3"></div>
        </div>

        <div 
          className="globe"
          style={{
            transform: globeTransform,
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          <svg viewBox="0 0 600 600" className="globe-svg">
            <circle
              cx="300"
              cy="300"
              r="280"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              style={{
                transform: `rotate(${mouseX * 2}deg)`,
                transformOrigin: "center",
                transition: "transform 0.4s ease"
              }}
            />
            <ellipse
              cx="300"
              cy="300"
              rx="280"
              ry="140"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              opacity="0.6"
              style={{
                transform: `rotate(${mouseY * 3}deg)`,
                transformOrigin: "center",
                transition: "transform 0.4s ease"
              }}
            />
          </svg>
        </div>

        {/* Click to Break Card */}
        <div
          className="card"
          onClick={handleClick}
          style={{
            transform: cardTransform,
            transition: touched 
              ? "transform 0.6s cubic-bezier(0.4, 1.6, 0.4, 1), opacity 0.6s ease"
              : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease",
            opacity: stage === 3 ? 0 : 1,
            height: 700,
            backgroundImage:
              "url('https://cdn.prod.website-files.com/5e3884b717ebc5d2e8c8691b/5e3884b717ebc53774c8697b_ill-bar-breaker.svg')",
          }}
        >
          <div 
            className="card-text"
            style={{
              transform: `translate(${mouseX * 10}px, ${mouseY * 8}px)`,
              transition: "transform 0.3s ease"
            }}
          >
            <div className="small">Click to</div>
            <div className="big">Break</div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        className="panel right"
        style={{
          background:
            stage === 3
              ? "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)"
              : "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
          transition: "background 1.2s ease",
        }}
      >
        {/* overlay */}
        <div
          className="overlay"
          style={{
            opacity: overlay.opacity,
            backdropFilter: `blur(${overlay.blur}px)`,
          }}
        />

        {/* wedge */}
        <div
          className="wedge"
          style={{
            transform: `scaleX(${wedge.scale})`,
            opacity: wedge.opacity,
          }}
        />

        {/* content (always visible) */}
        <div
          className="content visible"
          style={{
            opacity: 1,
            transform: "translateY(0)",
            color: stage === 3 ? "#1e1b4b" : "#ffffff",
          }}
        >
          <h1 className="title">
            the <span className="muted">language</span> barrier
          </h1>
          <p className="subtitle">
            Make your Webflow site multilingual, without code
          </p>
          <div
            className="badge"
            style={{
              background: stage === 3 ? "#2f6bff" : "#fff",
              color: stage === 3 ? "#fff" : "#1e1b4b",
            }}
          >
            NO CODE
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap");
        .v305-root {
          font-family: "Inter", sans-serif;
          display: flex;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          cursor: none;
        }

        .panel {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .left {
          background: linear-gradient(135deg, #efe8ff 0%, #f3edff 100%);
          overflow: hidden;
        }

        .right {
          overflow: hidden;
          position: relative;
        }

        /* Parallax Layers */
        .parallax-layer {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .parallax-1 {
          z-index: 1;
        }

        .parallax-2 {
          z-index: 2;
        }

        .parallax-3 {
          z-index: 3;
        }

        .parallax-element {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .element-1 {
          width: 200px;
          height: 200px;
          top: 10%;
          right: 20%;
          opacity: 0.3;
        }

        .element-2 {
          width: 150px;
          height: 150px;
          top: 60%;
          left: 15%;
          opacity: 0.4;
          background: rgba(255, 255, 255, 0.15);
        }

        .element-3 {
          width: 100px;
          height: 100px;
          top: 30%;
          right: 10%;
          opacity: 0.2;
          background: rgba(255, 255, 255, 0.1);
        }

        /* globe */
        .globe {
          position: absolute;
          left: 8%;
          top: 8%;
          width: 1000px;
          height: 1000px;
          opacity: 0.3;
          pointer-events: none;
          z-index: 4;
        }

        .globe-svg {
          width: 100%;
          height: 100%;
        }

        /* Card */
        .card {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 500px;
          height: 500px;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          filter: drop-shadow(0 18px 42px rgba(6, 12, 40, 0.32));
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          cursor: pointer;
          z-index: 5;
          transform-origin: center center;
        }

        .card-text {
          text-align: center;
          transition: opacity 0.6s ease;
          color: #0b1033;
          z-index: 6;
        }
        .small {
          font-size: 42px;
          font-weight: 700;
        }
        .big {
          font-size: 108px;
          font-weight: 900;
          line-height: 0.95;
        }

        /* Overlay */
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(79, 119, 255, 0.4);
          z-index: 10;
          transition: opacity 1s cubic-bezier(0.2, 0.9, 0.2, 1),
            backdrop-filter 1s cubic-bezier(0.2, 0.9, 0.2, 1);
        }

        /* Wedge */
        .wedge {
          position: absolute;
          top: 45%;
          left: 0;
          height: 120px;
          width: 100%;
          transform-origin: left center;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 1)
          );
          clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
          z-index: 15;
          transition: transform 1s cubic-bezier(0.2, 0.9, 0.2, 1),
            opacity 1s ease;
          filter: drop-shadow(0 18px 40px rgba(79, 119, 255, 0.25));
        }

        /* Content */
        .content {
          position: relative;
          z-index: 20;
          max-width: 600px;
          padding: 40px;
          opacity: 1;
          transform: translateY(0);
          transition: transform 1s cubic-bezier(0.2, 0.9, 0.2, 1),
            opacity 1s cubic-bezier(0.2, 0.9, 0.2, 1);
        }

        .title {
          font-size: 72px;
          font-weight: 900;
          margin: 0;
        }
        .muted {
          opacity: 0.4;
        }
        .subtitle {
          font-size: 32px;
          font-weight: 700;
          margin-top: 10px;
        }

        .badge {
          position: absolute;
          right: 8%;
          top: 12%;
          font-weight: 800;
          padding: 8px 14px;
          border-radius: 6px;
          transform: translateY(0) scale(1);
          box-shadow: 0 10px 30px rgba(244, 244, 244, 0.16);
          transition: all 0.6s ease;
        }

        @media (max-width: 900px) {
          .v305-root {
            flex-direction: column;
          }
          .card {
            width: 400px;
            height: 400px;
          }
          .small {
            font-size: 32px;
            font-weight: 700;
          }
          .big {
            font-size: 78px;
            font-weight: 900;
            line-height: 0.95;
          }
          .title {
            font-size: 44px;
          }
          .subtitle {
            font-size: 22px;
          }
          
          /* Adjust parallax elements for mobile */
          .element-1 {
            width: 120px;
            height: 120px;
          }
          .element-2 {
            width: 90px;
            height: 90px;
          }
          .element-3 {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </div>
  );
}
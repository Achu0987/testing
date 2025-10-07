import React, { useEffect, useRef, useState } from "react";

/**
 * V257.jsx (updated)
 * - Adds an intro splash (dark brown screen with title, location, signature)
 *   that shows on page load and then transitions to the grid.
 * - Clicking/tapping the intro will skip it immediately.
 * - All original grid, overlay, and flip-card behavior preserved.
 *
 * Usage: import V257 from './V257'; then <V257 />
 */

const V257 = () => {
  const items = [
    {name:'Grant Bedside Table', cat:'Sleep', url:'https://cdn.sanity.io/images/ld3h3xvm/production/08c5b2f0c55459cccfd20a364b4c2e31c490ef2e-2962x2962.jpg'},
    {name:'Grant Armless Chaise', cat:'Live', url:'https://cdn.sanity.io/images/ld3h3xvm/production/7402c3e0ef2e22d4382fb2308e138119aa8d7f94-2960x2960.jpg'},
    {name:'Lulu Lounge Chair', cat:'Live', url:'https://cdn.sanity.io/images/ld3h3xvm/production/98e7ab196b46e155a18600f377d851e16591cd95-2962x2962.jpg'},
    {name:'Grant Lounge Chair', cat:'Live', url:'https://cdn.sanity.io/images/ld3h3xvm/production/4f51f4e7620236091b0b3e8e07d68c134dca2b7b-2962x2962.jpg'},
    {name:'Pierpont Bed', cat:'Sleep', url:'https://cdn.sanity.io/images/ld3h3xvm/production/6eb48f4eb6a1ce45989263822019bcdb4db07f2e-2962x2962.jpg'},
    {name:'Grant Bench', cat:'Sleep', url:'https://cdn.sanity.io/images/ld3h3xvm/production/3940ad212f29cb023bae440369b0c70e0ecc34aa-2962x2962.jpg'},
    {name:'Marmont Dining Table', cat:'Eat', url:'https://cdn.sanity.io/images/ld3h3xvm/production/76b2aad7306e2a24a2462cd892f518a5f14ae97e-2962x2962.jpg'},
    {name:'Marmont Dining Chair', cat:'Eat', url:'https://cdn.sanity.io/images/ld3h3xvm/production/4bec5f387ebc9658f945a0f8f0edb5178ce37eaf-2962x2962.jpg'},
    {name:'Grant Counter Stool', cat:'Eat', url:'https://cdn.sanity.io/images/ld3h3xvm/production/a68bc2edbb359b9489bad0acdf1e76e575f7c8c7-2960x2962.jpg'},
    {name:'Grant Desk', cat:'Work', url:'https://cdn.sanity.io/images/ld3h3xvm/production/b50091124f4d10b92ae92ae0d7f148bc5629b30b-2964x2964.jpg'},
    {name:'Harlow Coffee Table', cat:'Live', url:'https://cdn.sanity.io/images/ld3h3xvm/production/96d296fa01a5456731231b774582c8f2323a80b8-2962x2962.jpg'},
    {name:'Rumi Cocktail Tables', cat:'Live', url:'https://cdn.sanity.io/images/ld3h3xvm/production/b9ea11458f644b148abae59e2a986e126c361c42-2962x2962.jpg'},
    {name:'Grant Bookshelf', cat:'Work', url:'https://cdn.sanity.io/images/ld3h3xvm/production/ac638e016dc45c0843a5f4262ef2bad13da0ca3c-2960x2962.jpg'}
  ];

  const GRID_COLS = 12;
  const ITEM_SIZE = 140;
  const GAP = 180;

  const gridWrapRef = useRef(null);
  const viewportRef = useRef(null);
  const rafRef = useRef(null);
  const timeoutFlipRef = useRef(null);
  const introTimeoutRef = useRef(null);
  const enterTimeoutRef = useRef(null);

  const txRef = useRef(0);
  const tyRef = useRef(0);
  const speedXRef = useRef(0);
  const speedYRef = useRef(0);
  const lastMouseXRef = useRef(null);
  const lastMouseYRef = useRef(null);
  const lastTimeRef = useRef(null);

  const [scale, setScale] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");
  const [overlayActive, setOverlayActive] = useState(false);
  const [overlayItem, setOverlayItem] = useState(null);
  const [flipped, setFlipped] = useState(false);

  // Intro + reveal states
  const [introActive, setIntroActive] = useState(true); // show splash on load
  const [entered, setEntered] = useState(false); // grid revealed

  const gridSize = GRID_COLS * (ITEM_SIZE + GAP);

  const css = `
    :root {
      --bg: #f7f4ef;
      --fg: #2f2318;
      --accent: #bc9b7c;
      --gap: ${GAP}px;
      --grid-cols: ${GRID_COLS};
      --item-size: ${ITEM_SIZE}px;
    }
  

  

    .viewport {
      position: relative;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      cursor: default;
    }
    .grid-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      will-change: transform;
      user-select: none;
      transform-origin: center center;
      transition: opacity 800ms cubic-bezier(.2,.9,.2,1), transform 800ms cubic-bezier(.2,.9,.2,1);
      opacity: 1;
    }
    /* hidden until intro finishes */
    .grid-wrap.hidden {
      opacity: 0;
      transform: scale(0.985) translate(calc(-50% + 0px), calc(-50% + 0px));
      pointer-events: none;
    }

    .grid {
      position: relative;
      width: calc(var(--grid-cols) * (var(--item-size) + var(--gap)));
      height: calc(var(--grid-cols) * (var(--item-size) + var(--gap)));
    }
    .item {
      position: absolute;
      width: var(--item-size);
      height: var(--item-size);
      border-radius: 8px;
      overflow: hidden;
      background: linear-gradient(180deg, rgba(255,255,255,0.85), rgba(250,250,250,0.85));
      box-shadow: 0 6px 18px rgba(0,0,0,0.10);
      border: 3px solid rgba(0,0,0,0.04);
      transition: transform 0.28s cubic-bezier(.2,.9,.2,1), box-shadow 0.28s, border-color 0.28s, opacity 0.3s;
      cursor: pointer;
      display: block;
      overflow: hidden;
      opacity: 1;
      transform-origin: center center;
    }
    /* entrance stagger (applies when entered state is true) */
    .item.entering {
      transform: translateY(8px) scale(0.98);
      opacity: 0;
    }
    .item.entered {
      transform: translateY(0) scale(1);
      opacity: 1;
      transition: transform 520ms cubic-bezier(.2,.9,.2,1), opacity 520ms ease;
    }

    .item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transform-origin: center center;
      transition: transform 0.8s ease;
    }
    .item:hover {
      transform: translateY(-8px) scale(1.06);
      box-shadow: 0 28px 60px rgba(0,0,0,0.22);
      border-color: rgba(188,155,124,0.8);
      z-index: 10;
    }
    .item:hover img { transform: scale(1.08) rotate(-1deg); }

    .item.hidden {
      opacity: 0.08;
      pointer-events: none;
      transform: scale(0.95);
    }

    .controls {
      position: fixed;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 1rem;
      font-size: 0.9rem;
      color: var(--fg);
      user-select: none;
      font-weight: 400;
      z-index: 12;
      align-items: center;
    }
    .filters { display: flex; gap: 1rem; }
    .filters button {
      background: none;
      border: none;
      color: var(--fg);
      cursor: pointer;
      font-style: italic;
      font-weight: 400;
      opacity: 0.6;
      transition: opacity 0.2s ease, transform 0.15s;
    }
    .filters button.active,
    .filters button:hover {
      opacity: 1;
      font-weight: 600;
      transform: translateY(-2px);
    }

    .zoom-controls {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    .zoom-controls button {
      background: none;
      border: 1px solid var(--fg);
      border-radius: 8px;
      width: 40px;
      height: 36px;
      font-weight: 700;
      cursor: pointer;
      color: var(--fg);
      font-size: 1.2rem;
      line-height: 1;
      user-select: none;
    }
    .zoom-percent {
      font-style: italic;
      opacity: 0.6;
      padding-left: 0.6rem;
      min-width: 56px;
      text-align: center;
    }

    /* Overlay / Flip Card */
    .overlay {
      position: fixed;
      top:0; left:0; right:0; bottom:0;
      display: none;
      justify-content: center;
      align-items: center;
      background: rgba(12,12,12,0.6);
      z-index: 100;
      perspective: 1500px;
      transition: background 0.25s ease;
      backdrop-filter: blur(6px);
    }
    .overlay.active { display: flex; }

    .flip-card {
      width: 44vw;
      max-width: 720px;
      height: 56vh;
      max-height: 680px;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.9s cubic-bezier(.2,.9,.25,1);
      border-radius: 14px;
      box-shadow: 0 40px 120px rgba(0,0,0,0.6);
      transform-origin: center center;
      will-change: transform;
    }

    .flip-card .front,
    .flip-card .back {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 14px;
      backface-visibility: hidden;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    /* FRONT */
    .flip-card .front img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 14px;
      display: block;
      transform-origin: center center;
      transition: transform 0.9s cubic-bezier(.2,.9,.25,1);
      filter: saturate(1.05) contrast(1.02);
    }

    /* animated vignette and subtle shine (front) */
    .flip-card .front::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(60% 60% at 10% 10%, rgba(255,255,255,0.06), transparent 12%),
                  linear-gradient(120deg, rgba(0,0,0,0.08), rgba(0,0,0,0.18));
      mix-blend-mode: multiply;
    }

    /* BACK: animated background + frosted panel for text */
    .flip-card .back {
      transform: rotateY(180deg);
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 0;
    }

    /* animated layered background */
    .flip-card .back .animated-bg {
      position: absolute;
      inset: 0;
      border-radius: 14px;
      overflow: hidden;
      z-index: 0;
    }

    /* layer 1: slow rotating conic gradient */
    .bg-layer.conic {
      position: absolute;
      inset: -40%;
      transform-origin: 50% 50%;
      background: conic-gradient(from 0deg, rgba(188,155,124,0.18), rgba(80,58,43,0.12), rgba(188,155,124,0.18));
      filter: blur(40px) saturate(1.05);
      animation: rotateConic 24s linear infinite;
      opacity: 0.95;
    }

    /* layer 2: diagonal moving stripes for motion */
    .bg-layer.stripes {
      position: absolute;
      inset: 0;
      background-image: linear-gradient(120deg, rgba(255,255,255,0.035) 0 25%, rgba(0,0,0,0.02) 25% 50%, rgba(255,255,255,0.02) 50% 75%, rgba(0,0,0,0.01) 75% 100%);
      background-size: 220% 220%;
      mix-blend-mode: overlay;
      animation: moveStripes 9s linear infinite;
      opacity: 0.9;
      pointer-events: none;
    }

    /* layer 3: faint floating dots */
    .bg-layer.dots {
      position: absolute;
      inset: 0;
      background-image:
        radial-gradient(circle at 10% 20%, rgba(255,255,255,0.06) 0 2px, transparent 3px),
        radial-gradient(circle at 80% 40%, rgba(255,255,255,0.05) 0 2px, transparent 3px),
        radial-gradient(circle at 50% 80%, rgba(255,255,255,0.03) 0 3px, transparent 4px);
      animation: subtleFloat 18s ease-in-out infinite;
      mix-blend-mode: screen;
      opacity: 0.85;
    }

    /* frosted content panel */
    .back .panel {
      position: relative;
      z-index: 2;
      width: calc(100% - 4rem);
      margin: 1.2rem auto;
      max-width: 520px;
      background: linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.64));
      border-radius: 12px;
      padding: 22px 26px;
      text-align: center;
      box-shadow: 0 10px 40px rgba(22,16,12,0.18);
      backdrop-filter: blur(6px) saturate(1.05);
      border: 1px solid rgba(255,255,255,0.35);
      transform: translateZ(30px);
    }

    .back h2 { margin: 0; font-size: 1.6rem; color: var(--fg); letter-spacing: 0.2px; }
    .back p { margin: 0.6rem 0 1rem 0; font-size: 1rem; color: rgba(47,35,24,0.9); opacity: 0.95; }
    .back .meta {
      display:flex;
      justify-content:center;
      gap:10px;
      align-items:center;
      opacity:0.85;
      margin-bottom: 0.8rem;
      font-style: italic;
      font-size: 0.9rem;
    }

    .back .actions {
      display:flex;
      justify-content:center;
      gap:12px;
      margin-top: 0.6rem;
    }

    .back .actions button {
      position: relative;
      overflow: hidden;
      border: none;
      cursor: pointer;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 700;
      letter-spacing: 0.2px;
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }

    .btn-primary {
      background: linear-gradient(90deg, rgba(188,155,124,1), rgba(160,126,97,1));
      color: white;
      box-shadow: 0 8px 30px rgba(160,120,78,0.24), inset 0 -2px 0 rgba(0,0,0,0.06);
    }
    .btn-primary:hover { transform: translateY(-4px) scale(1.01); box-shadow: 0 18px 46px rgba(160,120,78,0.30); }

    /* subtle animated sheen on button */
    .btn-primary::after {
      content: "";
      position: absolute;
      inset: 0;
      transform: translateX(-120%) skewX(-12deg);
      background: linear-gradient(90deg, rgba(255,255,255,0.35), rgba(255,255,255,0.06), rgba(255,255,255,0.0));
      transition: transform 0.9s cubic-bezier(.2,.9,.25,1);
      pointer-events: none;
    }
    .btn-primary:hover::after { transform: translateX(120%) skewX(-12deg); }

    .btn-muted {
      background: rgba(255,255,255,0.92);
      color: var(--fg);
      border: 1px solid rgba(0,0,0,0.06);
    }
    .btn-muted:hover { transform: translateY(-3px); }

    .overlay .close-btn {
      position: absolute;
      top: 1.6rem;
      right: 1.6rem;
      font-size: 1.8rem;
      font-weight: 700;
      color: #fff;
      background: rgba(0,0,0,0.34);
      border-radius: 50%;
      width: 44px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 105;
      transition: background 0.2s ease, transform 0.18s;
    }
    .overlay .close-btn:hover { background: rgba(0,0,0,0.62); transform: scale(1.05); }

    @keyframes rotateConic {
      from { transform: rotate(0deg) translateZ(0); }
      to { transform: rotate(360deg) translateZ(0); }
    }
    @keyframes moveStripes {
      0% { background-position: 0% 0%; }
      100% { background-position: 100% 100%; }
    }
    @keyframes subtleFloat {
      0% { transform: translateY(0) scale(1); opacity:0.95; }
      50% { transform: translateY(-6px) scale(1.015); opacity:0.98; }
      100% { transform: translateY(0) scale(1); opacity:0.95; }
    }

    /* Intro Splash (mimics uploaded video look) */
    .intro {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 12px;
      background: #3b2417; /* dark brown */
      color: white;
      z-index: 60;
      transition: opacity 480ms ease, transform 480ms ease;
      opacity: 1;
      cursor: pointer;
    }
    .intro.hidden {
      opacity: 0;
      pointer-events: none;
      transform: scale(0.995);
    }
    .intro .title {
      font-size: 2.2rem;
      font-weight: 700;
      letter-spacing: 0.6px;
      text-align: center;
    }
    .intro .location {
      font-size: 1rem;
      opacity: 0.9;
      font-style: italic;
    }
    .intro .signature {
      margin-top: 6px;
      font-family: "Brush Script MT", "Pacifico", cursive;
      opacity: 0.9;
      font-size: 1.05rem;
    }

    /* Small responsiveness */
    @media (max-width: 920px) {
      :root { --item-size: 120px; --gap: 120px; }
      .flip-card { width: 88vw; height: 68vh; max-width: 680px; max-height: 760px; }
      .intro .title { font-size: 1.6rem; }
    }
    @media (max-width: 520px) {
      :root { --item-size: 92px; --gap: 90px; }
      header { font-size: 0.9rem; }
      .flip-card { width: 92vw; height: 74vh; }
      .back .panel { width: calc(100% - 2rem); padding: 14px; }
      .back h2 { font-size: 1.2rem; }
      .intro .title { font-size: 1.4rem; }
    }
  `;

  const applyTransform = () => {
    const el = gridWrapRef.current;
    if (!el) return;
    const txx = txRef.current;
    const tyy = tyRef.current;
    el.style.transform = `translate(calc(-50% + ${txx}px), calc(-50% + ${tyy}px)) scale(${scale})`;
  };

  const zoomIn = () => setScale(prev => Math.min(prev * 1.3, 1));
  const zoomOut = () => setScale(prev => Math.max(prev / 1.3, 0.44));

  useEffect(() => { applyTransform(); }, [scale]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onMouseMove = (e) => {
      const now = performance.now();
      if (lastMouseXRef.current !== null && lastMouseYRef.current !== null && lastTimeRef.current !== null) {
        const dt = now - lastTimeRef.current;
        if (dt > 0) {
          speedXRef.current = (lastMouseXRef.current - e.clientX) / dt * 16;
          speedYRef.current = (lastMouseYRef.current - e.clientY) / dt * 16;
        }
      }
      lastTimeRef.current = now;
      lastMouseXRef.current = e.clientX;
      lastMouseYRef.current = e.clientY;
    };

    const onMouseLeave = () => {
      speedXRef.current = 0;
      speedYRef.current = 0;
      lastMouseXRef.current = null;
      lastMouseYRef.current = null;
      lastTimeRef.current = null;
    };

    viewport.addEventListener("mousemove", onMouseMove);
    viewport.addEventListener("mouseleave", onMouseLeave);

    return () => {
      viewport.removeEventListener("mousemove", onMouseMove);
      viewport.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      txRef.current += speedXRef.current;
      tyRef.current += speedYRef.current;

      if (txRef.current > gridSize / 2) txRef.current -= gridSize;
      if (txRef.current < -gridSize / 2) txRef.current += gridSize;
      if (tyRef.current > gridSize / 2) tyRef.current -= gridSize;
      if (tyRef.current < -gridSize / 2) tyRef.current += gridSize;

      applyTransform();
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cells = [];
  for (let y = 0; y < GRID_COLS; y++) {
    for (let x = 0; x < GRID_COLS; x++) {
      const i = (y * GRID_COLS + x) % items.length;
      const it = items[i];
      const posX = x * (ITEM_SIZE + GAP);
      const posY = y * (ITEM_SIZE + GAP);
      const key = `cell-${x}-${y}`;
      cells.push({ key, left: posX, top: posY, data: it });
    }
  }

  const onFilterClick = (cat) => setActiveFilter(cat);

  const onItemClick = (data) => {
    setOverlayItem(data);
    setOverlayActive(true);
    setFlipped(false);
    if (timeoutFlipRef.current) clearTimeout(timeoutFlipRef.current);
    // small delay before flip for drama
    timeoutFlipRef.current = setTimeout(() => setFlipped(true), 900);
  };

  const closeOverlay = () => {
    setOverlayActive(false);
    setFlipped(false);
    if (timeoutFlipRef.current) { clearTimeout(timeoutFlipRef.current); timeoutFlipRef.current = null; }
  };

  const shopNow = () => {
    if (overlayItem) {
      window.alert("Redirect to Shop Now page for: " + overlayItem.name);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutFlipRef.current) clearTimeout(timeoutFlipRef.current);
      if (introTimeoutRef.current) clearTimeout(introTimeoutRef.current);
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    };
  }, []);

  // Intro behavior: show introActive on load, then fade and reveal grid
  useEffect(() => {
    // Duration chosen to reflect the sample (brief splash then grid).
    // 2200ms splash then start reveal.
    introTimeoutRef.current = setTimeout(() => {
      setIntroActive(false);
      // small delay before starting item entrance to allow opacity/transform to settle
      enterTimeoutRef.current = setTimeout(() => setEntered(true), 160);
    }, 2200);

    return () => {
      if (introTimeoutRef.current) clearTimeout(introTimeoutRef.current);
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    };
  }, []);

  // allow clicking intro to skip immediately
  const skipIntro = () => {
    if (introTimeoutRef.current) clearTimeout(introTimeoutRef.current);
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    setIntroActive(false);
    setEntered(true);
  };

  return (
    
    <div style={{ height: "100vh", width: "100vw" }}>
      <style>{css}</style>

      <header>
        <div className="menu mr-350">☰ Home</div>
        {/* <div className="location">254 Los Angeles</div> */}
      </header>

      <div
        className="viewport"
        id="viewport"
        ref={viewportRef}
      >
        {/* Intro splash (mimics uploaded video look). click to skip */}
        <div
          className={`intro${introActive ? "" : " hidden"}`}
          role="dialog"
          aria-label="Intro"
          onClick={skipIntro}
        >
          <div className="title">An architectural approach to design</div>
          <div className="location">Los Angeles, CA</div>
          <div className="signature">— Signature</div>
        </div>

        <div
          className={`grid-wrap${introActive ? " hidden" : ""}`}
          id="gridWrap"
          ref={gridWrapRef}
          style={{
            transform: `translate(calc(-50% + ${txRef.current}px), calc(-50% + ${tyRef.current}px)) scale(${scale})`
          }}
        >
          <div className="grid" id="grid" style={{ width: gridSize, height: gridSize }}>
            {cells.map((cell, idx) => {
              const isHidden = activeFilter !== "all" && cell.data.cat !== activeFilter;
              // for entrance effect apply classes depending on entered state
              const entClass = entered && !isHidden ? "entered" : (!entered && !isHidden ? "entering" : "");
              return (
                <a
                  key={cell.key}
                  className={`item ${entClass}${isHidden ? " hidden" : ""}`}
                  title={cell.data.name}
                  onClick={() => !isHidden && onItemClick(cell.data)}
                  style={{ left: `${cell.left}px`, top: `${cell.top}px` }}
                >
                  <img src={cell.data.url} alt={cell.data.name} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="controls">
        <div className="filters" id="filters">
          {["all","Sleep","Live","Eat","Work"].map(cat => (
            <button
              key={cat}
              onClick={() => onFilterClick(cat)}
              className={activeFilter === cat ? "active" : ""}
              data-cat={cat}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>

        <div style={{ width: 24 }} />

        <div className="zoom-controls">
          <button id="zoomOut" onClick={zoomOut}>−</button>
          <button id="zoomIn" onClick={zoomIn}>+</button>
          <div className="zoom-percent" id="zoomPercent">{Math.round(scale * 100)}%</div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`overlay${overlayActive ? " active" : ""}`}
        id="overlay"
        onClick={(e) => {
          // close when clicking outside the flip-card
          if (e.target === e.currentTarget) closeOverlay();
        }}
      >
        <div className="close-btn" id="closeBtn" onClick={closeOverlay}>×</div>

        <div
          className="flip-card"
          id="flipCard"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          onClick={(e) => { /* prevent overlay from closing when clicking inside card */ e.stopPropagation(); }}
        >
          <div className="front">
            {overlayItem?.url ? (
              <img id="overlayImg" src={overlayItem.url} alt={overlayItem?.name || ""} />
            ) : null}
          </div>

          <div className="back">
            <div className="animated-bg" aria-hidden>
              <div className="bg-layer conic" />
              <div className="bg-layer stripes" />
              <div className="bg-layer dots" />
            </div>

            <div className="panel" role="dialog" aria-label={overlayItem?.name || "Product details"}>
              <div className="meta">{overlayItem?.cat || "Category"}</div>
              <h2 id="productTitle">{overlayItem?.name || "Product Title"}</h2>
              <p id="productDesc">{overlayItem ? `A beautiful ${overlayItem.cat} piece — ${overlayItem.name}` : "Category + Name"}</p>

              <div className="actions">
                <button className="btn-primary" id="shopBtn" onClick={shopNow}>Shop Now</button>
                <button className="btn-muted" onClick={() => { navigator.clipboard?.writeText(overlayItem?.name || "") }}>Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default V257;
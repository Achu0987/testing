import React, { useEffect, useRef, useState } from "react";

/**
 * HomeProductPanningDemo.jsx
 * Recreates the uploaded video look and the DOM structure/inline transforms you pasted.
 *
 * - Title card (dark brown) visible for 2s
 * - Grid fades in with scale container set to 1.8
 * - gridInner initial transform matches the example (translate3d + tiny scale)
 * - Items have small scale (1.0001) and opacity
 * - Scripted fake cursor moves to specific items at 5s, 6s, 7s, 9s, 12s and shows labels
 */

const PRODUCTS = [
  { title: "Grant Bedside Table", href: "/products/grant-bedside-table", category: "Sleep", imageUrl: "https://cdn.sanity.io/images/ld3h3xvm/production/08c5b2f0c55459cccfd20a364b4c2e31c490ef2e-2962x2962.jpg?w=1920&q=75&fit=clip&auto=format" },
  { title: "Grant Armless Chaise", href: "/products/grant-armless-chaise", category: "Live", imageUrl: "https://cdn.sanity.io/images/ld3h3xvm/production/7402c3e0ef2e22d4382fb2308e138119aa8d7f94-2960x2960.jpg?w=1920&q=75&fit=clip&auto=format" },
  { title: "Lulu Lounge Chair", href: "/products/lulu-lounge-chair", category: "Live", imageUrl: "https://cdn.sanity.io/images/ld3h3xvm/production/98e7ab196b46e155a18600f377d851e16591cd95-2962x2962.jpg?w=1920&q=75&fit=clip&auto=format" },
  { title: "Grant Lounge Chair", href: "/products/grant-lounge-chair", category: "Live", imageUrl: "https://cdn.sanity.io/images/ld3h3xvm/production/4f51f4e7620236091b0b3e8e07d68c134dca2b7b-2962x2962.jpg?w=1920&q=75&fit=clip&auto=format" },
  { title: "Pierpont Bed", href: "/products/pierpont-bed", category: "Sleep", imageUrl: "https://cdn.sanity.io/images/ld3h3xvm/production/6eb48f4eb6a1ce45989263822019bcdb4db07f2e-2962x2962.jpg?w=1920&q=75&fit=clip&auto=format" },
  { title: "Grant Bench", href: "/products/grant-bench", category: "Sleep", imageUrl: "https://cdn.sanity.io/images/ld3h3xvm/production/3940ad212f29cb023bae440369b0c70e0ecc34aa-2962x2962.jpg?w=1920&q=75&fit=clip&auto=format" },
  { title: "Marmont Dining Table", href: "/products/marmont-dining-table", category: "Eat", imageUrl: "https://cdn.sanity.io/images/ld3h3xvm/production/76b2aad7306e2a24a2462cd892f518a5f14ae97e-2962x2962.jpg?w=1920&q=75&fit=clip&auto=format" },
  { title: "Marmont Dining Chair", href: "/products/marmont-dining-chair", category: "Eat", imageUrl: "https://cdn.sanity.io/images/ld3h3xvm/production/4bec5f387ebc9658f945a0f8f0edb5178ce37eaf-2962x2962.jpg?w=1920&q=75&fit=clip&auto=format" },
  { title: "Grant Counter Stool", href: "/products/grant-counter-stool", category: "Eat", imageUrl: "https://cdn.sanity.io/images/ld3h3xvm/production/a68bc2edbb359b9489bad0acdf1e76e575f7c8c7-2960x2962.jpg?w=1920&q=75&fit=clip&auto=format" },
  { title: "Grant Desk", href: "/products/grant-desk", category: "Work", imageUrl: "https://cdn.sanity.io/images/ld3h3xvm/production/b50091124f4d10b92ae92ae0d7f148bc5629b30b-2964x2964.jpg?w=1920&q=75&fit=clip&auto=format" },
  { title: "Grant Mirror", href: "/products/grant-mirror", category: "Live", imageUrl: "https://cdn.sanity.io/images/ld3h3xvm/production/b630b39116dbaf91ae004e0104c40f3578c91321-2960x2962.jpg?w=1920&q=75&fit=clip&auto=format" },
  { title: "Harlow Coffee Table", href: "/products/harlow-coffee-table", category: "Live", imageUrl: "https://cdn.sanity.io/images/ld3h3xvm/production/96d296fa01a5456731231b774582c8f2323a80b8-2962x2962.jpg?w=1920&q=75&fit=clip&auto=format" },
  { title: "Rumi Cocktail Tables", href: "/products/rumi-cocktail-tables", category: "Live", imageUrl: "https://cdn.sanity.io/images/ld3h3xvm/production/b9ea11458f644b148abae59e2a986e126c361c42-2962x2962.jpg?w=1920&q=75&fit=clip&auto=format" },
  { title: "Grant Bookshelf", href: "/products/grant-bookshelf", category: "Work", imageUrl: "https://cdn.sanity.io/images/ld3h3xvm/production/ac638e016dc45c0843a5f4262ef2bad13da0ca3c-2960x2962.jpg?w=1920&q=75&fit=clip&auto=format" },
  { title: "Grant Bed", href: "/products/grant-bed", category: "Sleep", imageUrl: "https://cdn.sanity.io/images/ld3h3xvm/production/cdb2bd24d9e9c46988842a6e8a156a2f63ee2569-2962x2962.jpg?w=1920&q=75&fit=clip&auto=format" },
];

export default function HomeProductPanningDemo() {
  const containerRef = useRef(null);
  const gridInnerRef = useRef(null);
  const cursorRef = useRef(null);
  const [showTitle, setShowTitle] = useState(true);
  const [gridVisible, setGridVisible] = useState(false);
  const cursorTarget = useRef({ x: -60, y: -60 });
  const [cursorPos, setCursorPos] = useState({ x: -60, y: -60 });
  const labelShownRef = useRef(null);
  const [labelShownId, setLabelShownId] = useState(null);
  const rafRef = useRef(null);
  const timeouts = useRef([]);

  // Smooth cursor lerp
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      setCursorPos((prev) => {
        const nx = lerp(prev.x, cursorTarget.current.x, 0.22);
        const ny = lerp(prev.y, cursorTarget.current.y, 0.22);
        if (Math.abs(nx - cursorTarget.current.x) < 0.4 && Math.abs(ny - cursorTarget.current.y) < 0.4) {
          return { x: cursorTarget.current.x, y: cursorTarget.current.y };
        }
        return { x: nx, y: ny };
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // timeline (title -> grid -> cursor moves)
  useEffect(() => {
    // 2s: hide title -> show grid
    timeouts.current.push(setTimeout(() => {
      setShowTitle(false);
      timeouts.current.push(setTimeout(() => {
        setGridVisible(true);
      }, 420));
    }, 2000));

    // schedule cursor moves to match video timestamps
    const schedule = (ms, id, dur = 360) => {
      timeouts.current.push(setTimeout(async () => {
        const el = document.getElementById(id);
        if (!el) return;
        // hide previous label
        setLabelShownId(null);
        // move cursor target to element center
        const r = el.getBoundingClientRect();
        cursorTarget.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        // after dur-ish, show label for this element
        timeouts.current.push(setTimeout(() => setLabelShownId(id), dur - 60));
      }, ms));
    };

    schedule(5000, "item-table", 380);
    schedule(6000, "item-bed", 300);
    schedule(7000, "item-bedside", 300);
    schedule(9000, "item-desk-1", 360);
    schedule(12000, "item-desk-2", 360);

    // hide label after 14s
    timeouts.current.push(setTimeout(() => setLabelShownId(null), 14000));

    return () => {
      timeouts.current.forEach((t) => clearTimeout(t));
      timeouts.current = [];
    };
  }, []);

  // allow user mouse to slightly nudge the cursor (non-destructive)
  useEffect(() => {
    const onMove = (e) => {
      // only nudge when grid visible (so script still runs)
      if (!gridVisible) return;
      // gentle offset toward mouse, not overriding scripted target
      const dx = (e.clientX - cursorTarget.current.x) * 0.04;
      const dy = (e.clientY - cursorTarget.current.y) * 0.04;
      cursorTarget.current = { x: cursorTarget.current.x + dx, y: cursorTarget.current.y + dy };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [gridVisible]);

  // While rendering items assign ids for targets: marmont->item-table, grant bed->item-bed, bedside->item-bedside, grant desk occurrences->item-desk-1 / -2
  let deskCount = 0;

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", position: "relative", overflow: "hidden", fontFamily: "Inter, system-ui, Arial" }}>
      <style>{`
        /* Title */
        .titleCard {
          position: absolute; inset: 0; display:flex; flex-direction:column; align-items:center; justify-content:center;
          background:#3a261f; color:#fff; z-index:1000; transition: opacity .42s ease, transform .42s ease;
        }
        .titleCard.hidden { opacity:0; transform: scale(.98); pointer-events:none; }
        .titleCard h1 { margin:0; font-size: clamp(20px, 3.2vw, 40px); letter-spacing: 0.6px; }
        .titleCard .sub { margin-top:8px; opacity:.95; }
        .signature { margin-top:18px; font-family: "Brush Script MT", cursive; font-size:26px; opacity:.95; }

        /* Container & scale - matches "scaleContainerInner" */
        .HomeProductPanningContainer_scaleContainerInner__LFCU6 {
          position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
          z-index:200;
          transform-origin:center;
        }

        /* grid wrapper with ratio and explicit width/height variables (as in pasted HTML) */
        .HomeProductPanningContainer_grid__rSr8r {
          --ratio: 1.73913;
          --height: 585px;
          --width: 1017.391304347826px;
          width: min(1100px, 92%);
          max-width: calc(var(--width));
          height: var(--height);
          display:block;
          position:relative;
        }

        /* gridInner — we preserve the translate3d and tiny scale inline style (JS sets it) */
        .HomeProductPanningContainer_gridInner__tVydw {
          display:grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 18px;
          padding: 16px;
          box-sizing:border-box;
          justify-items:stretch;
          align-items:stretch;
          will-change: transform;
        }

        .HomeProductPanningContainer_gridItem__ngGrK {
          border-radius:8px;
          overflow:hidden;
          position:relative;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          box-shadow: 0 6px 18px rgba(0,0,0,0.45);
          transition: transform .35s ease, opacity .35s;
          transform: scale(1.0001);
          opacity: 1;
          min-height: 120px;
        }
        .HomeProductPanningContainer_gridItem__ngGrK img {
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
          transform: scale(1.0001);
        }

        /* tooltip label */
        .tile-label {
          position:absolute;
          left:50%;
          transform:translateX(-50%);
          bottom:-44px;
          background: rgba(255,255,255,0.98);
          color:#111;
          padding:8px 12px;
          border-radius:6px;
          font-weight:700;
          font-size:13px;
          white-space:nowrap;
          opacity:0;
          transition: opacity .18s, transform .18s;
          transform-origin:center top;
        }
        .tile-label.show { opacity:1; transform: translateX(-50%) translateY(-6px); bottom: -32px; }

        /* fake cursor */
        .fake-cursor {
          position: absolute;
          width:30px; height:30px; border-radius:50%;
          background: linear-gradient(180deg,#fff,#eee);
          box-shadow: 0 6px 14px rgba(0,0,0,0.35);
          z-index:1200;
          pointer-events:none;
          transform: translate(-50%,-50%);
        }
        .fake-cursor .triangle {
          position:absolute; width:0; height:0;
          border-left:8px solid transparent; border-right:8px solid transparent; border-top:12px solid rgba(0,0,0,0.9);
          transform: translate(7px,7px) rotate(35deg);
        }

        /* show/hide grid scene */
        .grid-scene { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; z-index:200; opacity:0; transition: opacity .42s ease; }
        .grid-scene.visible { opacity:1; }

        /* subtle grid background lines */
        .grid-scene::before {
          content:"";
          position:absolute; inset:0;
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.01) 1px, transparent 1px);
          background-size: 120px 120px, 120px 120px;
          pointer-events:none;
        }
      `}</style>

      {/* Title */}
      <div className={`titleCard ${showTitle ? "" : "hidden"}`}>
        <h1>An architectural approach to design</h1>
        <div className="sub">Los Angeles, CA</div>
        <div className="signature">— Atelier Marmont</div>
      </div>

      {/* Scale container inner: transform scale(1.8) to match pasted inline style */}
      <div
        className="HomeProductPanningContainer_scaleContainerInner__LFCU6"
        style={{ transform: "scale(1.8, 1.8)" }}
      >
        {/* Grid wrapper */}
        <div className={`grid-scene ${gridVisible ? "visible" : ""}`} aria-hidden={!gridVisible}>
          <div className="HomeProductPanningContainer_grid__rSr8r" style={{ "--height": "585px" }}>
            {/* gridInner: initial transform matches your pasted style */}
            <div
              id="gridInner"
              ref={gridInnerRef}
              className="HomeProductPanningContainer_gridInner__tVydw"
              style={{
                transform: `translate3d(51.1112px, 386.667px, 0px) scale(1.00001, 1.00001)`,
                touchAction: "none",
                cursor: "grab",
                userSelect: "none",
                zIndex: 1005,
              }}
            >
              {PRODUCTS.map((p, idx) => {
                // assign ids for target items
                let id;
                if (p.title === "Marmont Dining Table") id = "item-table";
                else if (p.title === "Grant Bed") id = "item-bed";
                else if (p.title === "Grant Bedside Table") id = "item-bedside";
                else if (p.title === "Grant Desk") {
                  deskCount += 1;
                  id = deskCount === 1 ? "item-desk-1" : "item-desk-2";
                }
                // Some titles duplicate in list; keep id undefined for duplicates not needed
                return (
                  <div
                    key={idx}
                    id={id || undefined}
                    className="HomeProductPanningContainer_gridItem__ngGrK"
                    data-box-index={idx}
                    data-count={idx}
                    data-lifestyle-category={p.category}
                    style={{
                      transform: "scale(1.0001, 1.0001)",
                      opacity: 1,
                      touchAction: "none",
                      zIndex: 1,
                    }}
                  >
                    <a
                      className="HomeProductPanningContainer_gridItem__imageContainer__NIhVE"
                      href={p.href}
                      aria-label={`Learn more about ${p.title}`}
                      style={{ display: "block", width: "100%", height: "100%", touchAction: "none" }}
                    >
                      <img
                        alt=""
                        src={p.imageUrl}
                        width="100%"
                        height="100%"
                        style={{
                          color: "transparent",
                          transform: "scale(1.0001, 1.0001)",
                          opacity: 1,
                          touchAction: "none",
                        }}
                        draggable={false}
                      />
                    </a>

                    <div className={`tile-label ${labelShownId === id ? "show" : ""}`}>
                      {p.title.replace(/\s*\(2\)$/, "")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Fake cursor */}
      <div
        ref={cursorRef}
        className="fake-cursor"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          display: gridVisible ? "block" : "none",
        }}
        aria-hidden
      >
        <div className="triangle" />
      </div>
    </div>
  );
}
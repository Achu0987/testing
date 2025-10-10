import React, { useEffect, useRef, useState } from "react";

export default function V263() {
  // ensure fonts are loaded (Anton + Montserrat)
  useEffect(() => {
    const id1 = "gf-anton-montserrat";
    if (!document.getElementById(id1)) {
      const link = document.createElement("link");
      link.id = id1;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@300;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const designs = {
    latest: {
      colorClass: "bg-[#ffc629]",
      image:
        "https://cdn.sanity.io/images/krc73rcv/production/cb538319cb184b21bc86099c9581d41b75f46636-1920x1080.jpg?w=1200&auto=format&dpr=2",
      date: "August 5, 2025",
      headline: "OUR SMALL STORY WINS BIG AT THE MARKETING AWARDS",
      excerpt:
        'The "Growing With You" campaign, highlighting the importance of family and connection, earned Silver and Bronze recognitions.',
      readMore: {
        title: "Our Small Story Wins Big At the Marketing Awards",
        image:
          "https://cdn.abacus.ai/images/2fae999f-3752-445e-9bc0-7266d93b4380.png",
        desc:
          'Full story: The "Growing With You" campaign highlights family and connection and won Silver and Bronze at the Marketing Awards.',
      },
    },
    company: {
      colorClass: "bg-[#3bb3e3]",
      image:
        "https://cdn.sanity.io/images/krc73rcv/production/a23e4092364f82e65bd626365b88055e27f3d1fe-2752x1850.jpg?w=1200&auto=format&dpr=2",
      date: "July 4, 2025",
      headline: "HELPING MORE KIDDOS TAKE THEIR FIRST STEPS",
      excerpt:
        "Brar’s and Trexo Robotics partner up to donate pediatric mobility devices to clinics in Toronto and BC, marking the start of a long-term effort.",
      readMore: {
        title: "Helping More Kiddos Take Their First Steps",
        image:
          "https://cdn.abacus.ai/images/b61f9749-4afb-4b7c-8f38-00e617aee534.png",
        desc:
          "Brar’s and Trexo Robotics partnered to donate pediatric mobility devices to clinics in Toronto and BC as the beginning of a long-term effort.",
      },
    },
    product: {
      colorClass: "bg-[#c5b4e2]",
      image:
        "https://cdn.sanity.io/images/krc73rcv/production/fea7c5c0ab1ff688059fa57d6787286ae089f011-1000x1778.jpg?w=2000&auto=format",
      date: "August 5, 2025",
      headline: "BRAR'S X VIKAS KHANNA",
      excerpt:
        "Brar’s partners with Chef Vikas Khanna to spotlight how its traditional ghee complements modern cuisine, celebrating quality and authenticity.",
      readMore: {
        title: "Brar's X Vikas Khanna",
        image:
          "https://cdn.sanity.io/images/krc73rcv/production/fea7c5c0ab1ff688059fa57d6787286ae089f011-1000x1778.jpg?w=2000&auto=format",
        desc:
          "Brar’s partners with Chef Vikas Khanna to spotlight quality and authenticity. This collaboration celebrates traditional ghee in modern kitchens.",
      },
    },
  };

  const [activeKey, setActiveKey] = useState("latest");
  const [prevKey, setPrevKey] = useState("latest");
  const [direction, setDirection] = useState("right"); // 'left' | 'right'
  const [animateKey, setAnimateKey] = useState(0); // used to remount main card to retrigger animation
  const [overlayOpen, setOverlayOpen] = useState(false);
  const readMoreBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const photoRef = useRef(null);

  // helper to change active with direction detection
  function setActiveWithDirection(key) {
    if (key === activeKey) return;
    const order = ["latest", "company", "product"];
    const oldIdx = order.indexOf(activeKey);
    const newIdx = order.indexOf(key);
    setDirection(newIdx > oldIdx ? "right" : "left");
    setPrevKey(activeKey);
    setActiveKey(key);
    // bump animateKey to remount and trigger enter animation
    setAnimateKey((k) => k + 1);
    // scroll into view after small delay
    setTimeout(() => {
      const el = document.getElementById("main-card");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  }

  // keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
        const order = ["latest", "company", "product"];
        const idx = order.indexOf(activeKey);
        let next = idx;
        if (e.key === "ArrowLeft") next = Math.max(0, idx - 1);
        if (e.key === "ArrowRight") next = Math.min(order.length - 1, idx + 1);
        if (next !== idx) {
          setActiveWithDirection(order[next]);
        }
      }
      if (e.key === "Escape" && overlayOpen) {
        closeOverlay();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeKey, overlayOpen]);

  // image pointer parallax handlers
  function handlePointerMove(e) {
    const el = photoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rx = (px - 0.5) * 12; // rotate range
    const ry = (py - 0.5) * -12;
    // set CSS vars for smooth transform in CSS
    el.style.setProperty("--px", px.toString());
    el.style.setProperty("--py", py.toString());
    el.style.setProperty("--rx", rx.toFixed(2));
    el.style.setProperty("--ry", ry.toFixed(2));
  }
  function handlePointerLeave() {
    const el = photoRef.current;
    if (!el) return;
    el.style.setProperty("--px", "0.5");
    el.style.setProperty("--py", "0.5");
    el.style.setProperty("--rx", "0");
    el.style.setProperty("--ry", "0");
  }

  function openOverlay() {
    setOverlayOpen(true);
    setTimeout(() => closeBtnRef.current?.focus(), 50);
  }
  function closeOverlay() {
    setOverlayOpen(false);
    setTimeout(() => readMoreBtnRef.current?.focus(), 50);
  }

  function handleKeyActivate(e, key) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveWithDirection(key);
    }
  }

  const orders = (() => {
    if (activeKey === "company") {
      return { latest: 1, company: 2, main: 3, product: 4 };
    }
    if (activeKey === "product") {
      return { latest: 1, company: 2, product: 3, main: 4 };
    }
    return { latest: 1, main: 2, company: 3, product: 4 };
  })();

  const mainNudgeClass =
    activeKey === "company" || activeKey === "product" ? "md:-ml-1" : "";

  const bgClass = designs[activeKey].colorClass;

  return (
    <main
      className="min-h-screen bg-[#fcfbfa] text-[#111]"
      style={{
        fontFamily:
          "'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      {/* Inline CSS for enhanced animations */}
      <style>{`
        /* FLOATING PILLS */
        @keyframes floaty {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        .side-pill { 
          transition: transform .26s cubic-bezier(.2,.9,.2,1), box-shadow .26s, opacity .22s;
          animation: floaty 3.8s ease-in-out infinite;
        }
        .side-pill:nth-child(1) { animation-delay: 0s; }
        .side-pill:nth-child(2) { animation-delay: 0.16s; }
        .side-pill:nth-child(3) { animation-delay: 0.32s; }
        .side-pill.selected { 
          transform: translateY(-8px) scale(1.08);
          animation-duration: 2.6s;
          box-shadow: 0 24px 52px rgba(2,6,23,.18);
        }

        /* directional card enter */
        @keyframes slideInFromRight { from { transform: translateX(48px) scale(.99); opacity: 0 } to { transform: translateX(0) scale(1); opacity: 1 } }
        @keyframes slideInFromLeft  { from { transform: translateX(-48px) scale(.99); opacity: 0 } to { transform: translateX(0) scale(1); opacity: 1 } }
        .card-anim-right { animation: slideInFromRight .46s cubic-bezier(.18,.9,.26,1) both; }
        .card-anim-left  { animation: slideInFromLeft  .46s cubic-bezier(.18,.9,.26,1) both; }

        /* subtle animated gradient overlay for depth */
        .main-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(120deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02) 20%, transparent 45%, rgba(0,0,0,0.03) 100%);
          mix-blend-mode: overlay;
          transition: opacity .4s;
          border-radius: inherit;
        }
        /* a moving glossy sheen */
        .main-card::after {
          content: "";
          position: absolute;
          left: -40%;
          top: -40%;
          width: 180%;
          height: 180%;
          background: linear-gradient(60deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,0.0) 100%);
          transform: rotate(15deg) translateX(var(--sheen, 0%));
          transition: transform 1.4s cubic-bezier(.2,.9,.2,1);
          filter: blur(18px);
          pointer-events: none;
        }
        .main-card:hover::after { transform: rotate(15deg) translateX(20%); }

        /* photo parallax -- controlled by CSS vars set by mouse */
        .photo {
          perspective: 1200px;
        }
        .photo .inner {
          transition: transform 0.9s cubic-bezier(.2,.9,.2,1);
          transform-style: preserve-3d;
        }
        .photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          transition: transform .9s cubic-bezier(.2,.9,.2,1), box-shadow .35s;
          will-change: transform;
          /* reactive transform using vars */
          transform: translateZ(0) rotateX(calc(var(--ry, 0) * 0.08deg)) rotateY(calc(var(--rx, 0) * 0.08deg)) scale(1);
          box-shadow: 0 12px 30px rgba(6,10,30,0.12);
        }
        .photo:hover img {
          transform: translateZ(0) rotateX(calc(var(--ry, 0) * 0.06deg)) rotateY(calc(var(--rx, 0) * 0.06deg)) scale(1.03);
          box-shadow: 0 28px 68px rgba(6,10,30,0.18);
        }

        /* staggered content reveal */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .content > * {
          opacity: 0;
          transform: translateY(8px);
          animation: fadeUp .48s cubic-bezier(.2,.9,.2,1) both;
        }
        /* delay each child for a stagger */
        .content > *:nth-child(1) { animation-delay: .06s; } /* date */
        .content > *:nth-child(2) { animation-delay: .14s; } /* headline */
        .content > *:nth-child(3) { animation-delay: .22s; } /* excerpt */
        .content > *:nth-child(4) { animation-delay: .30s; } /* actions */

        /* button micro-interactions */
        .btn-ghost {
          transition: transform .18s cubic-bezier(.2,.9,.2,1), box-shadow .18s;
        }
        .btn-ghost:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(2,6,23,0.12); }

        /* focus styles */
        .focus-ring:focus { outline: 3px solid rgba(0,0,0,0.10); outline-offset: 4px; }

        /* overlay pop */
        @keyframes overlayPop { from { opacity: 0; transform: translateY(8px) scale(.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
        .overlay-open { animation: overlayPop .18s cubic-bezier(.2,.9,.2,1) both; }

        /* responsive tweaks */
        @media (max-width: 768px) {
          h1 { font-size: 48px !important; letter-spacing: 2px !important; }
          .content { padding: 1.25rem !important; }
        }
      `}</style>

      <div className="max-w-[2000px] mx-auto py-20 px-8">
        <div className="text-center text-base font-extrabold tracking-widest mb-6">
          WHAT'S NEW
        </div>

        <h1
          className="text-center leading-[0.9] mb-6 text-[140px]"
          style={{
            fontFamily: "'Anton'",
            letterSpacing: "6px",
          }}
        >
          THE WORLD OF
          <br />
          BRAR'S
        </h1>

        <a
          className="inline-block mx-auto mb-10 bg-black text-white px-8 py-4 rounded-xl font-bold text-lg w-auto text-center shadow-lg hover:bg-[#222]"
          href="/news"
        >
          View More →
        </a>

        {/* Hero section */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-3">
          {["latest", "company", "product"].map((key) => (
            <div
              key={key}
              role="button"
              tabIndex={0}
              onClick={() => setActiveWithDirection(key)}
              onKeyDown={(e) => handleKeyActivate(e, key)}
              aria-pressed={activeKey === key}
              className={`flex-shrink-0 flex items-center justify-center rounded-full md:w-[60px] md:h-[600px] w-auto h-16 px-6 ${designs[key].colorClass} shadow-2xl transform transition-transform duration-200 cursor-pointer side-pill ${activeKey === key ? "selected" : ""} focus-ring`}
              style={{ order: orders[key], transition: "order 220ms" }}
            >
              <div className="hidden md:block -rotate-90 font-bold text-[20px] tracking-wide text-[#111] whitespace-nowrap">
                {key.toUpperCase()} NEWS
              </div>
              <div className="md:hidden font-bold text-[18px] tracking-wide text-[#111]">
                {key.toUpperCase()} NEWS
              </div>
            </div>
          ))}

          {/* Main Card - remount on animateKey so we always re-trigger enter animation */}
          <article
            id="main-card"
            key={animateKey}
            className={`${bgClass} relative main-card flex flex-col md:flex-row rounded-3xl overflow-hidden md:w-[1200px] w-full md:h-[600px] shadow-2xl transition-all duration-300 ${mainNudgeClass} card-anim-${direction}`}
            style={{ order: orders.main }}
            aria-live="polite"
          >
            <div
              className="photo flex-shrink-0 md:flex-[0_0_52%] p-6 md:p-8"
              ref={photoRef}
              onMouseMove={handlePointerMove}
              onMouseLeave={handlePointerLeave}
              // initialize CSS vars
              style={{ ["--px"]: 0.5, ["--py"]: 0.5, ["--rx"]: 0, ["--ry"]: 0 }}
            >
              <div className="inner" style={{ transform: "translateZ(0)" }}>
                <img
                  className="w-full h-[400px] md:h-full rounded-2xl object-cover"
                  src={designs[activeKey].image}
                  alt={designs[activeKey].headline}
                  onLoad={(e) => {
                    // trigger a subtle settle effect after load
                    const img = e.currentTarget;
                    img.style.opacity = "1";
                  }}
                  style={{
                    // expose rx/ry to CSS via photoRef style variables
                    transform: `rotateX(calc(var(--ry, 0) * 0.08deg)) rotateY(calc(var(--rx, 0) * 0.08deg))`,
                  }}
                />
              </div>
            </div>

            <div className="content flex-1 p-10 flex flex-col text-left justify-center gap-5">
              <div className="text-lg font-semibold text-[#222] opacity-90">
                {designs[activeKey].date}
              </div>

              <div
                className="uppercase"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: "52px",
                  lineHeight: 1,
                }}
              >
                {designs[activeKey].headline}
              </div>

              <div className="text-lg text-[#050505] opacity-90 max-w-[700px] leading-relaxed">
                {designs[activeKey].excerpt}
              </div>

              <div className="flex items-center gap-3">
                <button
                  ref={readMoreBtnRef}
                  className="inline-flex items-left justify-left w-50 gap-3 bg-white text-[#111] px-5 py-3 rounded-xl font-bold text-lg shadow-md hover:bg-[#f0f0f0] btn-ghost focus-ring"
                  onClick={openOverlay}
                >
                  Read More →
                </button>

                {/* small next/prev quick controls for UX */}
                <div className="ml-2 flex gap-2">
                  <button
                    aria-label="Previous"
                    onClick={() => {
                      const orderArr = ["latest", "company", "product"];
                      const idx = orderArr.indexOf(activeKey);
                      if (idx > 0) setActiveWithDirection(orderArr[idx - 1]);
                    }}
                    className="px-3 py-2 rounded-lg bg-white shadow-sm hover:bg-[#f7f7f7] focus-ring"
                  >
                    ◀
                  </button>
                  <button
                    aria-label="Next"
                    onClick={() => {
                      const orderArr = ["latest", "company", "product"];
                      const idx = orderArr.indexOf(activeKey);
                      if (idx < orderArr.length - 1)
                        setActiveWithDirection(orderArr[idx + 1]);
                    }}
                    className="px-3 py-2 rounded-lg bg-white shadow-sm hover:bg-[#f7f7f7] focus-ring"
                  >
                    ▶
                  </button>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${overlayOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        aria-hidden={!overlayOpen}
      >
        <div
          className={`absolute inset-0 bg-black transition-opacity ${overlayOpen ? "opacity-50" : "opacity-0"}`}
          onClick={closeOverlay}
        />

        <div
          className={`relative w-[94%] max-w-[1200px] bg-white rounded-2xl p-8 shadow-2xl max-h-[92vh] overflow-auto transition-all ${overlayOpen ? "scale-100 opacity-100 overlay-open" : "scale-95 opacity-0"
            }`}
          role="dialog"
          aria-modal="true"
        >
          <img
            className="w-full h-[600px] object-cover rounded-xl"
            src={designs[activeKey].readMore.image}
            alt={designs[activeKey].readMore.title}
          />
          <h2
            className="mt-5"
            style={{ fontFamily: "'Anton', sans-serif", fontSize: "48px" }}
          >
            {designs[activeKey].readMore.title}
          </h2>
          <p className="mt-3 text-lg text-[#222] leading-8">
            {designs[activeKey].readMore.desc}
          </p>

          <button
            ref={closeBtnRef}
            className="mt-6 inline-flex items-left gap-2 bg-black text-white px-5 py-3 rounded-xl font-bold text-lg hover:bg-[#222] focus-ring"
            onClick={closeOverlay}
          >
            ← Back
          </button>
        </div>
      </div>
    </main>
  );
}
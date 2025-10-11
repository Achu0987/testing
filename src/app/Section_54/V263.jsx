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
        "https://cdn.sanity.io/images/krc73rcv/production/cb538319cb184b21bc86099c9581d41b75f46636-1920x1080.jpg?w=1200&auto=format&dpr=2",
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
  const [direction, setDirection] = useState("right");
  const [animateKey, setAnimateKey] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const readMoreBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const photoRef = useRef(null);

  // change active with direction detection
  function setActiveWithDirection(key) {
    if (key === activeKey) return;
    const order = ["latest", "company", "product"];
    const oldIdx = order.indexOf(activeKey);
    const newIdx = order.indexOf(key);
    setDirection(newIdx > oldIdx ? "right" : "left");
    setPrevKey(activeKey);
    setActiveKey(key);
    setAnimateKey((k) => k + 1);
  }

  // keyboard nav
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && overlayOpen) closeOverlay();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [overlayOpen]);

  // parallax
  function handlePointerMove(e) {
    const el = photoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (px - 0.5) * 12;
    const ry = (py - 0.5) * -12;
    el.style.setProperty("--rx", rx.toFixed(2));
    el.style.setProperty("--ry", ry.toFixed(2));
  }
  function handlePointerLeave() {
    const el = photoRef.current;
    if (!el) return;
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

  const orders = (() => {
    if (activeKey === "company") return { latest: 1, company: 2, main: 3, product: 4 };
    if (activeKey === "product") return { latest: 1, company: 2, product: 3, main: 4 };
    return { latest: 1, main: 2, company: 3, product: 4 };
  })();

  const bgClass = designs[activeKey].colorClass;

  return (
    <main
      className="min-h-screen bg-[#fcfbfa] text-[#111]"
      style={{
        fontFamily:
          "'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      <style>{`
        /* Smooth fade-slide combo */
        @keyframes smoothSlideRight {
          0% { opacity: 0; transform: translateX(60px) scale(.98); }
          50% { opacity: 0.7; transform: translateX(15px) scale(1.01); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes smoothSlideLeft {
          0% { opacity: 0; transform: translateX(-60px) scale(.98); }
          50% { opacity: 0.7; transform: translateX(-15px) scale(1.01); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .card-anim-right { animation: smoothSlideRight .7s cubic-bezier(.16,.8,.24,1) both; }
        .card-anim-left  { animation: smoothSlideLeft  .7s cubic-bezier(.16,.8,.24,1) both; }

        .side-pill { 
          transition: transform .26s cubic-bezier(.2,.9,.2,1), box-shadow .26s, opacity .22s;
          animation: floaty 3.8s ease-in-out infinite;
        }
        @keyframes floaty { 0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)} }
        .side-pill.selected { transform: translateY(-8px) scale(1.08); box-shadow:0 24px 52px rgba(2,6,23,.18); }

        .photo img {
          transition: transform .8s cubic-bezier(.2,.9,.2,1), box-shadow .35s;
          transform: rotateX(calc(var(--ry, 0) * 0.06deg)) rotateY(calc(var(--rx, 0) * 0.06deg));
        }
        .photo:hover img { transform: rotateX(calc(var(--ry, 0) * 0.04deg)) rotateY(calc(var(--rx, 0) * 0.04deg)) scale(1.03); }

        .btn-ghost { transition: transform .18s cubic-bezier(.2,.9,.2,1), box-shadow .18s; }
        .btn-ghost:hover { transform: translateY(-4px); box-shadow:0 12px 30px rgba(2,6,23,.12); }

        @keyframes overlayPop { from {opacity:0; transform:translateY(8px) scale(.98)} to {opacity:1; transform:translateY(0) scale(1)} }
        .overlay-open { animation: overlayPop .25s cubic-bezier(.2,.9,.2,1) both; }

        @media (max-width:768px){
          h1{font-size:48px!important}
        }
      `}</style>

      <div className="max-w-[2000px] mx-auto py-20 px-8">
        <div className="text-center text-base font-extrabold tracking-widest mb-6">
          WHAT'S NEW
        </div>

        <h1
          className="text-center leading-[0.9] mb-6 text-[140px]"
          style={{ fontFamily: "'Anton'", letterSpacing: "6px" }}
        >
          THE WORLD OF <br /> BRAR'S
        </h1>

        <a
          className="inline-block mx-auto mb-10 bg-black text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#222]"
          href="/news"
        >
          View More →
        </a>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-3">
          {["latest", "company", "product"].map((key) => (
            <div
              key={key}
              role="button"
              tabIndex={0}
              onClick={() => setActiveWithDirection(key)}
              aria-pressed={activeKey === key}
              className={`flex-shrink-0 flex items-center justify-center rounded-full md:w-[60px] md:h-[600px] w-auto h-16 px-6 ${designs[key].colorClass} shadow-2xl cursor-pointer side-pill ${activeKey === key ? "selected" : ""}`}
              style={{ order: orders[key] }}
            >
              <div className="hidden md:block -rotate-90 font-bold text-[20px] tracking-wide text-[#111] whitespace-nowrap">
                {key.toUpperCase()} NEWS
              </div>
              <div className="md:hidden font-bold text-[18px] tracking-wide text-[#111]">
                {key.toUpperCase()} NEWS
              </div>
            </div>
          ))}

          {/* Main Card */}
          <article
            id="main-card"
            key={animateKey}
            className={`${bgClass} relative main-card flex flex-col md:flex-row rounded-3xl overflow-hidden md:w-[1200px] w-full md:h-[600px] shadow-2xl card-anim-${direction}`}
            style={{ order: orders.main }}
          >
            <div
              className="photo flex-shrink-0 md:flex-[0_0_52%] p-6 md:p-8"
              ref={photoRef}
              onMouseMove={handlePointerMove}
              onMouseLeave={handlePointerLeave}
            >
              <img
                className="w-full h-[200px] md:h-full rounded-2xl object-cover"
                src={designs[activeKey].image}
                alt={designs[activeKey].headline}
              />
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

              <div>
                <button
                  ref={readMoreBtnRef}
                  className="inline-flex items-left justify-left w-50 gap-3 bg-white text-[#111] px-5 py-3 rounded-xl font-bold text-lg shadow-md hover:bg-[#f0f0f0] btn-ghost"
                  onClick={openOverlay}
                >
                  Read More →
                </button>
              </div>
            </div>
          </article>
        </section>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          overlayOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black transition-opacity ${
            overlayOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={closeOverlay}
        />
        <div
          className={`relative w-[94%] max-w-[1200px] bg-white rounded-2xl p-8 shadow-2xl max-h-[92vh] overflow-auto transition-all ${
            overlayOpen
              ? "scale-100 opacity-100 overlay-open"
              : "scale-95 opacity-0"
          }`}
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
            className="mt-6 inline-flex items-left gap-2 bg-black text-white px-5 py-3 rounded-xl font-bold text-lg hover:bg-[#222]"
            onClick={closeOverlay}
          >
            ← Back
          </button>
        </div>
      </div>
    </main>
  );
}

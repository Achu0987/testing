// app/components/V39.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * CountUp: simple number counter that animates when `play` is true
 * Respects prefers-reduced-motion: if user prefers reduced motion, it jumps to `end`.
 */
function CountUp({ end = 0, duration = 1200, play = false, formatFn }) {
  const [value, setValue] = useState(play ? end : 0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!play) {
      setValue(0);
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setValue(end);
      return;
    }

    const start = performance.now();
    const from = 0;
    const to = end;

    const animate = (time) => {
      const t = Math.min(1, (time - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const current = Math.round(from + (to - from) * eased);
      setValue(current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration, play]);

  const out = formatFn
    ? formatFn(value)
    : value.toLocaleString("en-US"); // ✅ fixed locale
  return <>{out}</>;
}

export default function V39() {
  const containerRef = useRef(null);
  const [inViewOnce, setInViewOnce] = useState(new Set());
  const [playCounters, setPlayCounters] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const nodes = containerRef.current.querySelectorAll(".animate-on-scroll");
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      nodes.forEach((n) => n.classList.add("in-view"));
      setPlayCounters(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add("in-view");
            setInViewOnce((prev) => {
              const copy = new Set(prev);
              copy.add(el);
              return copy;
            });
            if (el.dataset.counter === "true") {
              setPlayCounters(true);
            }
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    nodes.forEach((n) => obs.observe(n));

    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-12">
      {/* Inline styles for custom keyframes + utility overrides */}
      <style>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(18px) scale(.995);
          transition: opacity 700ms cubic-bezier(.2,.9,.2,1), transform 700ms cubic-bezier(.2,.9,.2,1), box-shadow 300ms;
          will-change: transform, opacity;
        }
        .animate-on-scroll.in-view {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .animate-on-scroll[data-delay] {
          transition-delay: var(--delay, 0ms);
        }
        .card-hover {
          transition: transform 300ms cubic-bezier(.2,.9,.2,1), box-shadow 300ms, border-color 300ms;
          transform-origin: center;
        }
        .card-hover:hover,
        .card-hover:focus-within {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
        }
        .card-hover:active {
          transform: translateY(-2px) scale(1.005);
        }
        .image-object {
          transition: transform 700ms cubic-bezier(.2,.9,.2,1), filter 400ms;
        }
        .card-hover:hover .image-object {
          transform: translateY(-6px) scale(1.03);
        }
        @keyframes float-slow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        .float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-on-scroll, .card-hover, .image-object, .float-slow {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <div className="px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="rounded-2xl p-8">
            <div className="max-w-[980px] mx-auto" ref={containerRef}>
              {/* Tag */}
              <div
                className="flex justify-center animate-on-scroll"
                data-delay="0"
                style={{ "--delay": "0ms" }}
              >
                <div className="inline-block bg-white border border-emerald-200 text-emerald-700 rounded-full px-3 py-1 text-sm font-medium card-hover">
                  Features
                </div>
              </div>

              {/* Title */}
              <h2
                className="text-center text-3xl md:text-4xl font-semibold text-slate-900 mt-6 leading-tight animate-on-scroll"
                data-delay="80"
                style={{ "--delay": "80ms" }}
              >
                <span className="inline-block">Powerful</span>{" "}
                <span className="inline-block">Features</span>
                <br />
                <span className="inline-block">To</span>{" "}
                <span className="inline-block">Drive</span>{" "}
                <span className="inline-block">Your</span>{" "}
                <span className="inline-block">Success</span>
              </h2>

              {/* Features grid */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-9">
                {/* Left card */}
                <div
                  className="bg-gray-100 rounded-2xl p-8 flex flex-col items-start gap-6 shadow-sm card-hover animate-on-scroll"
                  data-delay="160"
                  style={{ "--delay": "160ms" }}
                >
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                      Comprehensive Dashboard
                    </h3>
                    <p className="text-sm text-slate-600">
                      Gain instant access to visual insights on sales trends, customer engagement, and product performance.
                    </p>
                  </div>
                  <div className="w-full flex-shrink-0 mt-4">
                    <div className="rounded-lg overflow-hidden bg-gray-100 flex items-end justify-center relative">
                      <img
                        src="https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3yzih8f10bc93db87473aa241493319620d89?orig=true"
                        alt="Comprehensive Dashboard"
                        loading="lazy"
                        className="inline-block align-middle max-w-[360px] md:max-w-[420px] w-full h-[220px] md:h-[260px] object-contain image-object"
                        style={{ objectPosition: "center bottom", willChange: "transform" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right card */}
                <div
                  className="bg-gray-100 rounded-2xl p-8 flex flex-col justify-between shadow-sm card-hover animate-on-scroll"
                  data-delay="240"
                  style={{ "--delay": "240ms" }}
                >
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-3">Customer Management</h3>
                    <p className="text-sm text-slate-600 mb-6">
                      Keep track of customer interactions, preferences, and engagement to build stronger relationships.
                    </p>

                    <div
                      className="bg-gray-50 border border-gray-100 rounded-xl p-5 shadow-sm animate-on-scroll"
                      data-delay="320"
                      style={{ "--delay": "320ms" }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs text-slate-400">Customers</div>
                          <div className="text-3xl md:text-4xl font-bold text-slate-900 mt-1">
                            <CountUp end={6523} duration={1200} play={playCounters} />
                          </div>
                          <div className="text-xs text-slate-500 mt-2">
                            Your last month customer growth rate is going up faster than other months.
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-3">
                          <div className="text-xs bg-emerald-100 text-emerald-700 px-5 py-1 rounded-full font-medium">
                            Fast Growing
                          </div>
                          <div className="w-9 h-9 border border-emerald-200 rounded-full flex items-center justify-center text-emerald-600">
                            ↗
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="mt-5 bg-white rounded-lg p-4 shadow-sm animate-on-scroll"
                      data-delay="400"
                      style={{ "--delay": "400ms" }}
                    >
                      <div className="text-xs text-slate-400">Revenue</div>
                      <div className="text-lg font-bold text-slate-900">
                        $
                        <CountUp
                          end={124200}
                          duration={1200}
                          play={playCounters}
                          formatFn={(v) => v.toLocaleString("en-US")} // ✅ fixed
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-sm text-slate-500">
                    <button className="text-emerald-600 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-200 rounded">
                      View details →
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom card */}
              <div
                className="mt-8 bg-gray-200 rounded-2xl p-8 shadow-sm animate-on-scroll"
                data-delay="480"
                style={{ "--delay": "480ms" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                      Global Performance Tracking
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Monitor sales, revenue, and customer metrics across the globe with real-time data
                      insights, empowering you to identify opportunities and trends in every market.
                    </p>
                    <ul className="text-sm text-slate-600 space-y-2">
                      <li>• Real-time dashboards and alerts</li>
                      <li>• Cross-region comparisons and breakdowns</li>
                      <li>• Actionable insights and forecasting</li>
                    </ul>
                  </div>

                  <div className="relative">
                    <div className="w-full h-56 rounded-lg overflow-hidden bg-gray-50 flex items-start justify-end float-slow card-hover">
                      <img
                        src="https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3yzihc337628a48134bb9834427647fb63dcc?orig=true"
                        alt="World map"
                        loading="lazy"
                        className="inline-block align-middle max-w-full h-auto object-contain image-object"
                        style={{ objectPosition: "top right" }}
                      />
                    </div>

                    <div className="absolute top-4 right-4 bg-white border border-gray-100 rounded-lg p-2 text-xs shadow animate-on-scroll" data-counter="true">
                      <div className="text-slate-400">Active Regions</div>
                      <div className="font-bold text-slate-900 text-sm">
                        <CountUp end={12} duration={900} play={playCounters} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

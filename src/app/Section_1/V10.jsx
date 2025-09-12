"use client";

const cards = [
  {
    icon: "🌍",
    title: "Global Reach",
    desc: `Deploy worldwide in minutes with edge-enabled routing and multi-region support for blazing-fast delivery.`
  },
  {
    icon: "⚙️",
    title: "Automated Workflows",
    desc: `Create, schedule, and monitor complex workflows with visual tools and robust retry strategies.`
  },
  {
    icon: "🔬",
    title: "Realtime Analytics",
    desc: `Instant dashboards, anomaly detection, and live funnels so you can react to trends as they happen.`
  },
  {
    icon: "🧩",
    title: "Modular Integrations",
    desc: `Plug into popular services or build custom adapters — modular connectors that keep things maintainable.`
  },
  {
    icon: "🛡️",
    title: "Enterprise-Grade Security",
    desc: `End-to-end encryption, RBAC, audit logs, and SOC-ready controls for peace of mind at scale.`
  },
  {
    icon: "⚡",
    title: "Performance Tuning",
    desc: `Auto-scaling, intelligent caching, and latency optimizations so your product feels instantly responsive.`
  }
];

export default function V9() {
  return (
    <section
      id="3"
      className="w-full py-16 px-6 bg-white flex flex-col items-center text-left "
    >
      <div className="max-w-6xl w-full mx-auto">
        <header className="mb-8 text-center md:text-left">
          {/* optional header */}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div
              key={i}
              className="group relative rounded-2xl p-[2px] bg-gradient-to-r from-rose-200 via-amber-100 to-cyan-100 transition-transform duration-300 ease-out hover:scale-[1.02]"
            >
              {/* Inner card — background reveals pastel gradient border */}
              <article className="relative bg-white rounded-xl p-6 h-full shadow-sm flex flex-col justify-between transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:rounded-3xl">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl bg-rose-50 text-rose-600 transition-transform duration-300 group-hover:scale-110">
                      {c.icon}
                    </div>
                  </div>

                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-semibold text-gray-900 font-serif">{c.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-400 to-amber-300 text-white text-sm font-medium shadow-md hover:shadow-lg transform transition duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-rose-100"
                    aria-label={`Explore ${c.title}`}
                  >
                    Explore
                    <span className="text-white/90">→</span>
                  </button>
                </div>

                {/* subtle hover glow (pastel) */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-3xl blur-xl opacity-30 bg-gradient-to-r from-rose-50/60 via-amber-50/40 to-cyan-50/40" />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// V441.jsx
import React from "react";

export default function V441() {
  // fallback src for missing images
  const svgPlaceholder = (label = "Img") =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='%23E5E7EB'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-size='20'>${label}</text></svg>`
    )}`;

  return (
    <div id="app" className="w-full bg-white text-base antialiased">
      <div className="flex min-h-screen flex-col size-full">
        {/* Fixed top header */}
        <header
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex w-full items-center justify-center md:top-10"
          style={{ transform: "none", opacity: 1 }}
        >
          <div className="cursor-pointer">
            <a className="active" href="/" aria-current="page">
              <h2 className="flex h-6 items-start justify-start">
                <span className="text-[24px] leading-none">OpenPurpose</span>
                <span className="font-light text-[14px] leading-none">®</span>
              </h2>
            </a>
          </div>
        </header>

        {/* Background hero / canvas area */}
        <div
          className="fixed inset-0 z-0 flex items-center justify-center"
          style={{ opacity: 1 }}
        >
          <div className="absolute inset-0 z-0">
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "585.333px",
                overflow: "hidden",
                pointerEvents: "auto",
                touchAction: "none",
              }}
            >
              <div style={{ width: "100%", height: "100%" }}>
                {/* Placeholder three.js canvas - swap with your three.js React component */}
                <canvas
                  data-engine="three.js r169"
                  width="1263"
                  height="878"
                  style={{
                    display: "block",
                    width: "842px",
                    height: "585.333px",
                    touchAction: "pan-y",
                  }}
                />
              </div>
            </div>
          </div>

          {/* subtle overlay (transparent here to match your markup) */}
          <div
            className="fixed inset-0 z-0 bg-black pointer-events-none"
            style={{ opacity: 0 }}
          />

          {/* Floating help (?) button centered near bottom of hero */}
          <div className="inline-block">
            <div
              className="inline-flex relative items-center justify-center rounded-full bg-black/40 text-white size-14 -translate-x-1/2 absolute bottom-[calc(48px+40px)] left-1/2 z-[1] md:bottom-[calc(48px+80px)]"
              style={{ backdropFilter: "blur(32px)", opacity: 1 }}
            >
              <span>?</span>
            </div>
          </div>
        </div>

        {/* Spacer to ensure content is below hero visual */}
        <div className="pointer-events-none relative min-h-[calc(100dvh-48px)] w-full" />

        {/* Foreground centered white card / panel */}
        <div
          className="relative z-10 mx-auto flex min-h-[calc(100dvh-48px)] w-[calc(100%-24px)] max-w-3xl flex-col items-center gap-10 overflow-visible rounded-t-2xl bg-white px-4 pt-4 pb-44 text-center shadow-[0_-4px_16px_0_rgba(0,0,0,0.08)] md:w-full md:rounded-t-3xl md:px-6 cursor-pointer"
          style={{ opacity: 1, transform: "none" }}
        >
          <p className="mb-10 cursor-pointer text-xs uppercase text-gray-500 tracking-wider">
            About
          </p>

          <header className="sticky top-6 md:top-10">
            <h2 className="flex h-6 items-start justify-start">
              <span className="text-[24px] leading-none">OpenPurpose</span>
              <span className="font-light text-[14px] leading-none">®</span>
            </h2>
          </header>

          <p className="leading-relaxed">
            Welcome to The Creative Circle. <br />
            A curated membership club for designers, <br />
            founders and engineers.
          </p>

          {/* Main hero video section */}
          <div className="mt-10 w-full">
            <video
              src="/homepage/home.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-2xl border border-gray-200 object-contain"
            />
          </div>

          {/* Trusted by logos */}
          <div className="mt-10 flex flex-col gap-6 w-full">
            <p className="text-xs uppercase text-gray-500">Trusted by</p>
            <div className="flex w-full items-center justify-center gap-4 overflow-x-hidden">
              {[
                "/logos/bird.png",
                "/logos/zora.png",
                "/logos/nothing.png",
                "/logos/o.png",
                "/logos/amie.png",
              ].map((src, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center w-14 h-14 rounded-full border border-gray-200"
                  style={{ opacity: 1 }}
                >
                  <img
                    src={src}
                    alt={`Brand-${idx}`}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = svgPlaceholder("Logo");
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Memberships section */}
          <div className="mt-20 flex flex-col gap-20 w-full">
            <h2 className="text-xs uppercase text-gray-500">Memberships</h2>

            <div className="flex flex-col gap-12 w-full">
              {/* Tourists */}
              <div className="flex flex-col items-center gap-6 w-full">
                <div className="flex flex-col items-center gap-4">
                  <img
                    src="/levels/tourist.png"
                    alt="tourist"
                    className="w-28 h-28 object-contain"
                    onError={(e) => (e.currentTarget.src = svgPlaceholder("Tourist"))}
                  />
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-xs uppercase text-gray-500">Tourists</h3>
                    <p className="text-center">
                      Everyone can join as a <br />
                      Tourist at $20/month.
                    </p>
                  </div>
                </div>

                <div className="w-full mt-4">
                  <video
                    src="/homepage/profile.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full rounded-2xl border border-gray-200 object-contain"
                  />
                  <p className="mt-3 text-sm text-gray-600">
                    Access your OP Passports to <br />
                    showcase your projects, <br />
                    taste and ideas.
                  </p>
                </div>
              </div>

              {/* Residents */}
              <div className="flex flex-col items-center gap-6 w-full">
                <div className="flex flex-col items-center gap-4">
                  <img
                    src="/levels/resident.png"
                    alt="resident"
                    className="w-28 h-28 object-contain"
                    onError={(e) => (e.currentTarget.src = svgPlaceholder("Resident"))}
                  />
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-xs uppercase text-gray-500">Residents</h3>
                    <p className="text-center">
                      Qualified members are invited to <br />
                      become Residents at $80/month.
                    </p>
                  </div>
                </div>

                <div className="w-full mt-4">
                  <video
                    src="/homepage/update.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full rounded-2xl border border-gray-200 object-contain"
                  />
                  <p className="mt-3 text-sm text-gray-600">
                    Residents have access to OP Services, <br />
                    where projects run for 1, 2, or 3 months <br />
                    at a standard monthly rate of $20,000.
                  </p>
                </div>
              </div>

              {/* Citizens */}
              <div className="flex flex-col items-center gap-6 w-full">
                <div className="flex flex-col items-center gap-4">
                  <img
                    src="/levels/citizen.png"
                    alt="citizen"
                    className="w-28 h-28 object-contain"
                    onError={(e) => (e.currentTarget.src = svgPlaceholder("Citizen"))}
                  />
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-xs uppercase text-gray-500">Citizens</h3>
                    <p className="text-center">
                      Reserved for a small circle of <br />
                      creative influencers each quarter. <br />
                      Membership begins at $3,000/month.
                    </p>
                  </div>
                </div>

                <img
                  src="/embassy.webp"
                  alt="embassy"
                  className="w-full mt-4 rounded-2xl object-cover"
                  onError={(e) => (e.currentTarget.src = svgPlaceholder("Embassy"))}
                />
                <p className="mt-3 text-sm text-gray-600">
                  With access to the OP Embassy <br />
                  at City Walk, Dubai.
                </p>
              </div>
            </div>
          </div>

          {/* Subscribe form */}
          <div className="mt-20">
            <form id="email-form" className="relative inline-block h-10 text-center">
              <span className="invisible absolute whitespace-nowrap text-base outline-none">Subscribe</span>
              <div className="relative inline-block">
                <div
                  className="relative h-10 overflow-hidden rounded-full border transition-colors border-gray-200 focus-within:border-black hover:border-black"
                  style={{ width: "calc(109px)" }}
                >
                  <input
                    type="email"
                    placeholder="Subscribe"
                    name="email"
                    className="w-[109px] px-4 py-2 bg-transparent text-center text-base outline-none placeholder:text-gray-400"
                    style={{ padding: 16 }}
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Social links */}
          <div className="mt-20 flex gap-4">
            <a
              href="https://x.com/openpurpose"
              target="_blank"
              rel="noreferrer nofollow"
              className="inline-flex items-center justify-center bg-white rounded-full text-black border border-gray-200 w-12 h-12 hover:bg-black hover:text-white"
            >
              X
            </a>
            <a
              href="https://instagram.com/openpurpose"
              target="_blank"
              rel="noreferrer nofollow"
              className="inline-flex items-center justify-center bg-white rounded-full text-black border border-gray-200 w-12 h-12 hover:bg-black hover:text-white"
            >
              IG
            </a>
            <a
              href="https://www.youtube.com/@openpurpose"
              target="_blank"
              rel="noreferrer nofollow"
              className="inline-flex items-center justify-center bg-white rounded-full text-black border border-gray-200 w-12 h-12 hover:bg-black hover:text-white"
            >
              YT
            </a>
          </div>

          {/* OP SVG badge */}
          <div className="mt-20">
            <svg
              width="46"
              height="24"
              viewBox="0 0 45 24"
              fill="none"
              className="h-6 w-[46px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M45,12C45,18.623 39.623,24 33,24L12,24C5.377,24 0,18.623 0,12C0,5.377 5.377,0 12,0L33,0C39.623,0 45,5.377 45,12Z"
                fill="transparent"
              />
              <path
                d="M18.558,12.466C18.558,16.408 16.2,19.234 12.438,19.234C8.676,19.234 6.318,16.408 6.318,12.466C6.318,8.524 8.676,5.716 12.438,5.716C16.2,5.716 18.558,8.524 18.558,12.466Z"
                fill="currentColor"
              />
              <path
                d="M31.942,9.751C31.942,11.749 33.445,13.117 35.317,13.117C37.18,13.117 38.683,11.749 38.683,9.751C38.683,7.735 37.18,6.358 35.317,6.358C33.445,6.358 31.942,7.735 31.942,9.751Z"
                fill="white"
              />
            </svg>
          </div>

          {/* Join OP copy */}
          <div className="mt-6 flex flex-col items-center gap-4">
            <p className="text-xs uppercase text-gray-500">Join OP®</p>
            <p>
              It’s time to start. <br />
              Join The Creative Circle.
            </p>
          </div>
        </div>

        {/* Bottom floating controls (avatar + left arrow) */}
        <div
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center bg-transparent"
          aria-hidden
        >
          <div className="absolute -left-16 top-1/2 -translate-y-1/2">
            <button className="inline-flex items-center justify-center rounded-full bg-white text-black w-10 h-10 border border-gray-200 hover:bg-black hover:text-white">
              <svg width="16" height="16" viewBox="0 0 16 16" className="rotate-90">
                <path
                  d="M4.18566 8.85176L8.47676 13.1429L7.4161 14.2035L1.84467 8.63209C1.55178 8.3392 1.55178 7.86432 1.84467 7.57143L7.4161 2L8.47676 3.06066L4.18566 7.35176H14.375V8.85176H4.18566Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          <a
            href="/"
            className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full transition-transform duration-150 hover:scale-105 w-28 h-28"
          >
            <div className="w-[112px] h-[112px] rounded-full overflow-hidden">
              {/* small canvas placeholder */}
              <canvas
                data-engine="three.js r169"
                width="224"
                height="224"
                style={{ display: "block", width: "112px", height: "112px" }}
              />
            </div>
          </a>
        </div>
      </div>

      {/* Live region for notifications (keeps structure like the original) */}
      <section aria-label="Notifications alt+T" tabIndex={-1} aria-live="polite" aria-relevant="additions text" aria-atomic="false" />
    </div>
  );
}
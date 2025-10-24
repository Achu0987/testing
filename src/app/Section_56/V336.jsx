'use client';
import React, { useEffect } from "react";

/**
 * V336.jsx
 *
 * React component that reproduces the layout/behavior you provided:
 * - Fixed hero ("149€/month & not a single worry") visually stable in the viewport
 * - A scrollable "tabs" section that overlays / passes above the fixed hero (overlay effect)
 * - Left column with stacked content blocks that fade in/out based on scroll
 * - Right column with videos that fade/translate in/out based on scroll
 *
 * Notes:
 * - This uses Tailwind utility classes via `className` for all styling.
 * - A couple of per-element inline styles are used where Tailwind cannot directly express
 *   dynamic values (exact top offset and negative margin-top in vh). Those are inline styles,
 *   not a separate stylesheet.
 * - Make sure Tailwind is configured in your app (this file assumes tailwind classes work).
 */

export default function V336() {
  useEffect(() => {
    // Grab the elements (like the original plain JS)
    const sections = Array.prototype.slice.call(
      document.querySelectorAll(".tabs_let-content")
    );
    const videos = Array.prototype.slice.call(
      document.querySelectorAll(".tabs_video")
    );
    const lastSectionIndex = sections.length - 1;
    const count = Math.min(sections.length, videos.length);

    // Initial state
    for (let i = 0; i < count; i++) {
      if (i === 0) {
        sections[i].style.opacity = "1";
        videos[i].style.opacity = "1";
        videos[i].style.transform = "translateY(0)";
      } else {
        sections[i].style.opacity = "0";
        videos[i].style.opacity = "0";
        videos[i].style.transform = "translateY(100%)";
      }
      // add will-change for smoother animation
      sections[i].style.willChange = "opacity";
      videos[i].style.willChange = "opacity, transform";
    }

    function onScroll() {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight + 550; // same fudge as original

      sections.forEach(function (section, index) {
        const start = index * windowHeight;
        const end = (index + 1) * windowHeight;

        if (scrollPosition >= start && scrollPosition < end) {
          section.style.opacity = "1";
          if (videos[index]) {
            videos[index].style.opacity = "1";
            videos[index].style.transform = "translateY(0)";
          }
        } else {
          if (index !== lastSectionIndex) {
            section.style.opacity = "0";
            if (videos[index]) {
              videos[index].style.opacity = "0";
              videos[index].style.transform = "translateY(100%)";
            }
          }
        }
      });

      if (scrollPosition > lastSectionIndex * windowHeight) {
        sections[lastSectionIndex].style.opacity = "1";
        if (videos[lastSectionIndex]) {
          videos[lastSectionIndex].style.opacity = "1";
          videos[lastSectionIndex].style.transform = "translateY(0)";
        }
      } else {
        if (scrollPosition <= lastSectionIndex * windowHeight) {
          sections[lastSectionIndex].style.opacity = "0";
          if (videos[lastSectionIndex]) {
            videos[lastSectionIndex].style.opacity = "0";
            videos[lastSectionIndex].style.transform = "translateY(100%)";
          }
        }
      }
    }

    // rAF throttle
    let ticking = false;
    const onScrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScrollHandler, { passive: true });

    // call once
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScrollHandler);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white antialiased text-gray-700">
      {/* Intro / Hero (fixed) */}
      <div className="relative h-[110vh] bg-gray-100 overflow-hidden">
        <div className="flex items-center justify-center h-full relative">
          {/* Fixed hero centered. Using inline style for exact top offset */}
          <div
            id="js-pin"
            className="fixed left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[30rem] text-center z-10 transition-opacity transition-transform"
            style={{ top: 50 }}
          >
            <div className="mt-[7rem] px-4">
              <h2 className="text-[2.8125rem] leading-none font-medium tracking-tight text-gray-900">
                <span className="inline-block" >
                  149€/month
                </span>{" "}
                &amp; 
                <br />
                not a single 
                <br />
                worry
              </h2>
            </div>

            <p className="text-[1.115rem] text-[120%] text-gray-500 mt-[2rem]">
              We take care of registration, insurance, and maintenance to ensure
              you have a hassle-free ride!
              <sup className="align-baseline text-[75%] mt-[7rem]">
                <br />
                *including theft coverage under certain conditions.
              </sup>
            </p>
          </div>
        </div>
      </div>

      {/* Tabs section (pulled up with negative margin so it overlays the fixed hero) */}
      <section
        className="relative rounded-2xl bg-[#292929] z-20 mt-[10rem]"
        style={{ marginTop: "-35vh" }} // negative margin to create overlay effect
      >
        <div className="pt-28 pb-28 relative">
          <div className="h-[550vh]">
            {/* sticky wrapper */}
            <div className="h-screen sticky top-[5vh]">
              <div className="mx-auto max-w-[120rem] w-full">
                <div className="h-[90vh] flex gap-6 px-[3.3%]">
                  {/* LEFT */}
                  <div
                    className="flex-[0_0_30%] mt-[4rem] rounded-2xl bg-[#3b3b3b] flex flex-col p-8 min-h-[500px] text-center"
                  >
                    <div className="relative h-full">
                      {/* stacked content blocks - centered & padded to match image */}
                      <div
                        className="tabs_let-content absolute inset-0 flex flex-col justify-center items-center text-center transition-opacity duration-500 px-6"
                        data-index="0"
                        style={{ opacity: 1 }}
                      >
                        <div className="w-full">
                          <h2 className="text-[2.125rem] font-medium leading-[1.05] text-white tracking-tight">
                            Reinventing micro-mobility with{" "}
                            <span >Award winning</span>{" "}
                            design
                          </h2>
                          <div className="w-[70%] mx-auto h-px bg-[#6b6b6b] my-4" />
                          <p className="text-sm text-[#bfbfbf] m-0 max-w-[22rem] mx-auto">
                            Our mission is to close the gap between a scooter and
                            a bike. Yoda is the lightest vehicle of its category,
                            designed to be agile and fun for everyone to ride.
                          </p>
                        </div>
                      </div>

                      <div
                        className="tabs_let-content absolute inset-0  flex flex-col justify-center items-center text-center transition-opacity duration-500 px-6"
                        data-index="1"
                        style={{ opacity: 0 }}
                      >
                        <div className="w-full">
                          <h2 className="text-[2.125rem] font-medium  leading-[1.05] text-white tracking-tight">
                            Best in class energy management for{" "}
                            <span >optimal autonomy</span>
                          </h2>
                          <div className="w-[70%] mx-auto h-px bg-[#6b6b6b] my-4" />
                          <p className="text-sm text-[#bfbfbf] m-0 max-w-[22rem] mx-auto">
                            3 riding modes: eco, normal & boost - that offer up to 80 km range on one single charge with a swappable battery.
                          </p>
                        </div>
                      </div>

                      <div
                        className="tabs_let-content absolute inset-0 flex flex-col justify-center items-center text-center transition-opacity duration-500 px-6"
                        data-index="2"
                        style={{ opacity: 0 }}
                      >
                        <div className="w-full">
                          <h2 className="text-[2.125rem] font-medium leading-[1.05] text-white tracking-tight">
                            Durable and <br /> effortless, <span>all the way</span>
                          </h2>
                          <div className="w-[70%] mx-auto h-px bg-[#6b6b6b] my-4" />
                          <p className="text-sm text-[#bfbfbf] m-0 max-w-[22rem] mx-auto">
                            We spent years crafting Yoda, stripping away unnecessary components to deliver a{" "}
                            <strong className="text-white">simple</strong> and{" "}
                            <strong className="text-white">efficient</strong> mobility experience.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                      <a
                        href="#"
                        className="mx-auto w-full max-w-[18rem] inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 uppercase tracking-wider text-white bg-transparent border-2 border-[#61ffc9] relative"
                        style={{ boxShadow: "0 0 0 1px rgba(97,255,201,0.06)" }}
                      >
                        <span className="relative z-10">ORDER TODAY</span>
                        <span className="w-[1.25rem] h-[1.25rem] rounded-full flex items-center justify-center relative overflow-hidden ml-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M4.66699 11.3332L11.3337 4.6665" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M4.66699 4.6665H11.3337V11.3332" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* RIGHT (videos) */}
                  <div className="flex-[0_0_68%]  h-[600] mt-[4rem] rounded-xl relative overflow-hidden">
                    <div
                      className="tabs_video absolute inset-0 rounded-xl transition-all duration-500"
                      data-index="0"
                      style={{ opacity: 1, transform: "translateY(0%)", background: "#000" }}
                    >
                      <video
                        id="video-1"
                        src="https://assets-global.website-files.com/65ae37af356fab4845432048/65be0fdac914d702e08f70ed_Yoda-Helmet_1-transcode.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover block"
                      />
                      <img
                        src="https://assets-global.website-files.com/65ae37af356fab4845432048/65b0dc37d226a551affbf2ea_GDA24_HO_WINNER_MC_RGB.webp"
                        alt="GDA badge"
                        className="w-20 object-cover relative z-20 m-6 float-right"
                      />
                    </div>

                    <div
                      className="tabs_video absolute inset-0 rounded-xl transition-all duration-500"
                      data-index="1"
                      style={{ opacity: 0, transform: "translateY(100%)", background: "#000" }}
                    >
                      <video
                        id="video-2"
                        src="https://assets-global.website-files.com/65ae37af356fab4845432048/65ae37af356fab48454320ae_BatteryRemoval_Pingpong_001-transcode.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover block"
                      />
                    </div>

                    <div
                      className="tabs_video absolute inset-0 rounded-xl transition-all duration-500"
                      data-index="2"
                      style={{ opacity: 0, transform: "translateY(100%)", background: "#000" }}
                    >
                      <video
                        id="video-3"
                        src="https://assets-global.website-files.com/65ae37af356fab4845432048/65be104f9aba74d774b7f4a3_Yoda-Exploded-50-transcode.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover block"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* spacer */}
      <div className="h-[30vh]" />
    </div>
  );
}
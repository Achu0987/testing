"use client";
import React, { useState } from "react";

const sections = [
  {
    title: "LATEST NEWS",
    color: "bg-yellow-400",
    image:
      "https://cdn.sanity.io/images/krc73rcv/production/cb538319cb184b21bc86099c9581d41b75f46636-1920x1080.jpg?w=1200&auto=format&dpr=2",
    date: "Aug 5, 2025",
    heading: "OUR SMALL STORY WINS BIG AT THE MARKETING AWARDS",
    description:
      "The 'Growing With You' campaign highlighting the importance of family and connection brought home top honors at the 2025 Marketing Awards.",
    fullText:
      "This award recognizes our commitment to authentic storytelling and creativity. The campaign resonated with audiences worldwide and became a symbol of togetherness.",
  },
  {
    title: "COMPANY UPDATES",
    color: "bg-sky-400",
    image:
      "https://cdn.sanity.io/images/krc73rcv/production/a23e4092364f82e65bd626365b88055e27f3d1fe-2752x1850.jpg?w=1200&auto=format&dpr=2",
    date: "Sep 12, 2025",
    heading: "HELPING MORE KIDDOS TAKE THEIR FIRST STEPS",
    description:
      "With new partnerships and rapid growth in digital transformation, company continues to empower clients around the globe.",
    fullText:
      "Our team now spans multiple regions, bringing innovation and skill to every project. This expansion marks a key milestone in our journey toward a smarter, more connected world.",
  },
  {
    title: "PRODUCT NEWS",
    color: "bg-purple-300",
    image:
      "https://cdn.sanity.io/images/krc73rcv/production/cb538319cb184b21bc86099c9581d41b75f46636-1920x1080.jpg?w=1200&auto=format&dpr=2",
    date: "Oct 2, 2025",
    heading: "INTRODUCING OUR NEXT-GEN AUTOMATION SUITE",
    description:
      "The latest update brings advanced AI features to streamline your business processes and boost productivity.",
    fullText:
      "The Next-Gen Automation Suite simplifies workflows through intelligent triggers, voice integration, and predictive analytics, helping teams achieve more with less effort.",
  },
];

export default function V262() {
  const [active, setActive] = useState(0);
  const [openReadMore, setOpenReadMore] = useState(null);

  const toggle = (i) => setActive(active === i ? null : i);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 font-[Montserrat]">
      <h1 className="text-6xl font-black text-center mb-4 font-[Anton]">
        THE WORLD OF BRAR'S
      </h1>
      <button className="bg-black text-white font-semibold py-2 px-6 rounded-full mb-6">
        View More
      </button>

      {/* Accordion */}
      <div className="w-full max-w-md text-left space-y-4">
        {sections.map((sec, i) => (
          <div key={i}>
            {/* Header */}
            <button
              onClick={() => toggle(i)}
              className={`w-full flex justify-between items-center px-4 py-3 rounded-2xl ${sec.color} font-bold transition-all duration-300 hover:brightness-95`}
            >
              <span>{sec.title}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  active === i ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="black"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Expanded Content */}
            <div
              className={`transition-all duration-500 overflow-hidden ${
                active === i ? "max-h-[700px] mt-3" : "max-h-0"
              }`}
            >
              <div
                className={`rounded-2xl p-4 ${sec.color} text-black space-y-3`}
              >
                <img
                  src={sec.image}
                  alt={sec.title}
                  className="rounded-2xl w-full h-48 object-cover"
                />
                <p className="text-sm font-semibold">{sec.date}</p>
                <h3 className="font-black text-xl leading-tight">
                  {sec.heading}
                </h3>
                <p className="text-sm">{sec.description}</p>
                <button
                  onClick={() => setOpenReadMore(sec)}
                  className="bg-white text-black font-semibold px-4 py-2 rounded-full mt-2 flex items-center gap-1"
                >
                  Read More
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="black"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overlay for Read More */}
      {openReadMore && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl overflow-hidden p-4 text-center relative animate-fadeIn">
            <button
              onClick={() => setOpenReadMore(null)}
              className="absolute top-3 right-4 text-xl font-bold"
            >
              ✕
            </button>
            <img
              src={openReadMore.image}
              alt="details"
              className="rounded-2xl w-full h-48 object-cover mb-3"
            />
            <h3 className="font-black text-xl mb-2">{openReadMore.heading}</h3>
            <p className="text-sm text-gray-700">{openReadMore.fullText}</p>
            <button
              onClick={() => setOpenReadMore(null)}
              className="bg-black text-white px-6 py-2 rounded-full mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

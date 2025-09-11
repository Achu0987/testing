"use client";

import { useState } from "react";
import Image from "next/image";

export default function Section() {
  const [active, setActive] = useState("Section 1");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-56 bg-[#0d1526] text-white flex flex-col justify-between p-4">
        <div>
          <h2 className="font-bold text-lg mb-6">Menu</h2>
          <nav className="flex flex-col space-y-3">
            {["Section 1", "Section 2"].map((section) => (
              <button
                key={section}
                onClick={() => setActive(section)}
                className={`text-left px-3 py-2 rounded-md transition ${
                  active === section ? "bg-gray-700" : "hover:bg-gray-800"
                }`}
              >
                {section}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex justify-center">
          <button className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg">
            N
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-6 bg-white">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Image */}
          <div className="w-full">
            <Image
              src="https://img.freepik.com/free-photo/guy-left-side-talking-colleagues-is-listening-him-group-young-freelancers-office-have-conversation-smiling_146671-13632.jpg"
              alt="Pay on the Go"
              className="rounded-md object-cover w-full h-auto"
              width={100}
    height={100}
            />
          </div>

          {/* Right: Text Content */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-purple-600 text-2xl">💼</span>
              <h2 className="text-2xl font-semibold text-gray-800">
                Pay on the Go
              </h2>
            </div>
            <p className="text-gray-600 text-base leading-relaxed">
              Truly it was a great journey, and in it I met with many, whom to
              know was to love; but whom never could I see again. It seems to me
              that a view of the heavenly bodies through a fine telescope
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}



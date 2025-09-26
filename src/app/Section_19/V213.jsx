import React, { useRef, useState, useEffect } from "react";

export default function V213({
  beforeSrc = "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/66ceeefc924e7b59534c17fd_10513.avif",
  afterSrc = "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/66ceef567ca5dcceb74af196_13362.avif",
}) {
  const containerRef = useRef(null);
  const [percent, setPercent] = useState(50); // divider position (0-100)
  const [dragging, setDragging] = useState(false);

  // Dragging: pointer/touch listeners attached to window while dragging
  useEffect(() => {
    function handlePointerMove(e) {
      if (!dragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
      let newPercent = ((x - rect.left) / rect.width) * 100;
      newPercent = Math.max(0, Math.min(100, newPercent));
      setPercent(newPercent);
    }
    function handlePointerUp() {
      if (dragging) setDragging(false);
    }

    if (dragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("touchmove", handlePointerMove, { passive: false });
      window.addEventListener("touchend", handlePointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [dragging]);

  // Prevent default image drag
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const preventDrag = (e) => e.preventDefault();
    node.addEventListener("dragstart", preventDrag);
    return () => node.removeEventListener("dragstart", preventDrag);
  }, []);

  // When hovering (mouse move) update percent — but only if NOT dragging
  function handleMouseMove(e) {
    if (dragging) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX;
    let newPercent = ((x - rect.left) / rect.width) * 100;
    newPercent = Math.max(0, Math.min(100, newPercent));
    setPercent(newPercent);
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start gap-10">
          {/* Left: before/after slider */}
          <div
            ref={containerRef}
            className={`relative w-full md:w-1/2 max-w-2xl select-none ${dragging ? "cursor-grabbing" : "cursor-pointer"}`}
            style={{ touchAction: "none" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              // keep current position on leave; remove this handler if you prefer snapping back
            }}
            onPointerDown={(e) => {
              // If user clicks anywhere on the image (not just the handle), start dragging so they can adjust
              e.preventDefault();
              setDragging(true);
            }}
            onTouchStart={(e) => {
              // prevent default to ensure pointer handlers work
              e.preventDefault();
              setDragging(true);
            }}
          >
            <div className="relative bg-white shadow-sm overflow-hidden rounded-sm" >
              {/* Container height responsive: small screens smaller, larger screens taller */}
              <div className="w-full h-96 md:h-[520px] relative">
                {/* BEFORE image (full) */}
                <img
                  src={beforeSrc}
                  alt="Before"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  draggable={false}
                />

                {/* AFTER image clipped from left by 'percent' so right side is visible */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: `inset(0 0 0 ${percent}%)`,
                  }}
                >
                  <img
                    src={afterSrc}
                    alt="After"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </div>

                {/* Vertical divider / handle */}
                <div
                  role="slider"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(percent)}
                  className="absolute top-0 bottom-0 -translate-x-1/2 flex items-center justify-center"
                  style={{ left: `${percent}%`, width: 44 }}
                >
                  {/* thin line */}
                  <div className="h-full w-[2px] bg-white shadow" />

                  {/* round knob */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ top: "50%", left: "50%" }}
                  >
                    <div className="w-3 h-3 bg-white rounded-full shadow" />
                  </div>
                </div>

                {/* "Before" label top-left */}
                <div className="absolute left-4 top-4 bg-white text-gray-800 text-sm font-medium px-3 py-2 rounded-md shadow">
                  Before
                </div>

                {/* "After" label bottom-right */}
                <div className="absolute right-6 bottom-6 bg-white text-gray-800 text-sm font-medium px-3 py-2 rounded-md shadow">
                  After
                </div>
              </div>
            </div>

            
          </div>

          {/* Right: content */}
          <div className="w-full md:w-1/2 text-left mt-20">
            <div className="max-w-xl">
              <div className="inline-block bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-sm">
                Mix &amp; Match
              </div>

              <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
                Add layers with carefully crafted pieces
              </h2>

              <p className="mt-6 text-gray-500 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
                tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
              </p>

              <a
                href="/shop"
                className="inline-block mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded shadow"
                aria-label="Buy Now"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
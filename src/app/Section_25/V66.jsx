import React from "react";

/**
 * V66.jsx
 * Custom grid layout applied (8 cols × 6 rows).
 * Image titles shown directly on images (no caption box).
 * Each image now has rounded corners (rounded-lg).
 */

export default function V66() {
  const bgUrl =
    "https://us.zohocommercecdn.com/stock-images/fashion-zs200002/zcstock-images-20.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com";

  const items = [
    { title: "Wedding", href: "/collections/5317960000000109413/wedding", src: "	https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3yzihd637e65478ae45b6a6d2036cca0737a6?orig=true" },
    { title: "Party", href: "/collections/5317960000000109421/party", src: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3yziha62976fd12cd479a90e663625f11914a?orig=true" },
    { title: "Pongal", href: "/collections/5317960000000109829/pongal", src: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3yzih173109be755f4d309d2829847fe19dfa?orig=true" },
    { title: "Vacation", href: "/collections/5317960000000109457/vacation", src: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3yzih6fa2fd124cf84c34b8904cd13b1e12e7?orig=true" },
    { title: "Onam", href: "/collections/5317960000000109835/onam", src: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3yzihc7e0f01173cc4dcd82cb164330e0e644?orig=true" },
    { title: "Diwali", href: "/collections/5317960000000109823/diwali", src: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3yzih92c7ca0dc2824428b7549deeacf48146?orig=true" },
  ];

  return (
    <section
      className="pt-20 pb-20 bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundRepeat: "no-repeat",
      }}
      aria-label="Occasion gallery section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Make a fashion statement every season
          </h2>
          <h3 className="text-gray-500 text-lg sm:text-xl font-semibold mt-4">
            Shop for the occasion you need!
          </h3>
        </div>

        {/* Custom Grid */}
        <div className="grid grid-cols-8 grid-rows-6 gap-4">
          {/* item[0] Wedding */}
          <div className="col-span-2 row-span-4 col-start-1 row-start-2">
            <div className="mt-10 max-w-[500px] overflow-hidden relative rounded-lg">
              <a href={items[0].href} title={items[0].title} className="block w-full h-full group">
                <img src={items[0].src} alt={items[0].title} className="w-full h-full object-cover transform transition-transform duration-300 ease-out group-hover:scale-110" />
                <div
                  className="absolute left-3 bottom-3 text-white text-sm font-semibold select-none pointer-events-none z-10"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.85)" }}
                >
                  {items[0].title}
                </div>
              </a>
            </div>
          </div>

          {/* item[1] Party */}
          <div className="col-span-2 row-span-3 col-start-3 row-start-1">
            <div className="w-full h-full overflow-hidden relative rounded-lg">
              <a href={items[1].href} title={items[1].title} className="block w-full h-full group">
                <img src={items[1].src} alt={items[1].title} className="w-full h-full object-cover transform transition-transform duration-300 ease-out group-hover:scale-110" />
                <div
                  className="absolute left-3 bottom-3 text-white text-sm font-semibold select-none pointer-events-none z-10"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.85)" }}
                >
                  {items[1].title}
                </div>
              </a>
            </div>
          </div>

          {/* item[2] Pongal */}
          <div className="col-span-2 row-span-3 col-start-3 row-start-4">
            <div className="w-full h-full overflow-hidden relative rounded-lg">
              <a href={items[2].href} title={items[2].title} className="block w-full h-full group">
                <img src={items[2].src} alt={items[2].title} className="w-full h-full object-cover transform transition-transform duration-300 ease-out group-hover:scale-110" />
                <div
                  className="absolute left-3 bottom-3 text-white text-sm font-semibold select-none pointer-events-none z-10"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.85)" }}
                >
                  {items[2].title}
                </div>
              </a>
            </div>
          </div>

          {/* item[3] Vacation */}
          <div className="col-span-2 row-span-3 col-start-5 row-start-1">
            <div className="w-full h-full overflow-hidden relative rounded-lg">
              <a href={items[3].href} title={items[3].title} className="block w-full h-full group">
                <img src={items[3].src} alt={items[3].title} className="w-full h-full object-cover transform transition-transform duration-300 ease-out group-hover:scale-110" />
                <div
                  className="absolute left-3 bottom-3 text-white text-sm font-semibold select-none pointer-events-none z-10"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.85)" }}
                >
                  {items[3].title}
                </div>
              </a>
            </div>
          </div>

          {/* item[4] Onam */}
          <div className="col-span-2 row-span-3 col-start-5 row-start-4">
            <div className="w-full h-full overflow-hidden relative rounded-lg">
              <a href={items[4].href} title={items[4].title} className="block w-full h-full group">
                <img src={items[4].src} alt={items[4].title} className="w-full h-full object-cover transform transition-transform duration-300 ease-out group-hover:scale-110" />
                <div
                  className="absolute left-3 bottom-3 text-white text-sm font-semibold select-none pointer-events-none z-10"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.85)" }}
                >
                  {items[4].title}
                </div>
              </a>
            </div>
          </div>

          {/* item[5] Diwali */}
          <div className="col-span-2 row-span-4 col-start-7 row-start-2">
            <div className="mt-10 max-w-[500px] overflow-hidden relative rounded-lg">
              <a href={items[5].href} title={items[5].title} className="block w-full h-full group">
                <img src={items[5].src} alt={items[5].title} className="w-full h-full object-cover transform transition-transform duration-300 ease-out group-hover:scale-110" />
                <div
                  className="absolute left-3 bottom-3 text-white text-sm font-semibold select-none pointer-events-none z-10"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.85)" }}
                >
                  {items[5].title}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
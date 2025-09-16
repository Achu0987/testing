import React from "react";

/**
 * V66.jsx
 * Responsive grid (mobile 2-col, desktop custom 8x6) — upload icon removed
 */

export default function V65() {
  
   

  const items = [
    {
      title: "Wedding",
      href: "/collections/5317960000000109413/wedding",
      src: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3yzihd637e65478ae45b6a6d2036cca0737a6?orig=true",
    },
    {
      title: "Party",
      href: "/collections/5317960000000109421/party",
      src: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3yziha62976fd12cd479a90e663625f11914a?orig=true",
    },
    {
      title: "Pongal",
      href: "/collections/5317960000000109829/pongal",
      src: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3yzih173109be755f4d309d2829847fe19dfa?orig=true",
    },
    {
      title: "Vacation",
      href: "/collections/5317960000000109457/vacation",
      src: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3yzih6fa2fd124cf84c34b8904cd13b1e12e7?orig=true",
    },
    {
      title: "Onam",
      href: "/collections/5317960000000109835/onam",
      src: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3yzihc7e0f01173cc4dcd82cb164330e0e644?orig=true",
    },
    {
      title: "Diwali",
      href: "/collections/5317960000000109823/diwali",
      src: "	https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3yzih92c7ca0dc2824428b7549deeacf48146?orig=true",
    },
  ];

  return (
    <section
      className="rounded-[1px] pt-10 pb-10 bg-cover bg-center"
      style={{
        
        backgroundRepeat: "no-repeat",
      }}
      aria-label="Occasion gallery section"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
            Make a fashion statement every season
          </h2>
          <h3 className="text-gray-500 text-sm sm:text-lg font-semibold mt-3">
            Shop for the occasion you need!
          </h3>
        </div>

        {/* Responsive Grid:
            - mobile: 2 columns
            - md+: original custom 8x6 grid using responsive classes
        */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-8 md:grid-rows-6">
          {/* item[0] Wedding */}
          <div className="md:col-span-2 md:row-span-4 md:col-start-1 md:row-start-2">
            <Card item={items[0]} />
          </div>

          {/* item[1] Party */}
          <div className="md:col-span-2 md:row-span-3 md:col-start-3 md:row-start-1">
            <Card item={items[1]} />
          </div>

          {/* item[2] Pongal */}
          <div className="md:col-span-2 md:row-span-3 md:col-start-3 md:row-start-4">
            <Card item={items[2]} />
          </div>

          {/* item[3] Vacation */}
          <div className="md:col-span-2 md:row-span-3 md:col-start-5 md:row-start-1">
            <Card item={items[3]} />
          </div>

          {/* item[4] Onam */}
          <div className="md:col-span-2 md:row-span-3 md:col-start-5 md:row-start-4">
            <Card item={items[4]} />
          </div>

          {/* item[5] Diwali */}
          <div className="md:col-span-2 md:row-span-4 md:col-start-7 md:row-start-2">
            <Card item={items[5]} />
          </div>
        </div>
      </div>
    </section>
    
  );
}

/**
 * Card component: keeps aspect ratio using padding-bottom trick and absolute img.
 * Upload control removed.
 */
function Card({ item }) {
  return (
    <div className="w-full h-0 pb-[125%] relative overflow-hidden rounded-lg shadow-md">
      <a
        href={item.href}
        title={item.title}
        className="block absolute inset-0 group"
        aria-label={item.title}
      >
        <img
          src={item.src}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-300 ease-out group-hover:scale-110"
        />
        {/* caption */}
        <div className="absolute left-3 bottom-3 text-white font-semibold text-sm bg-black/40 px-2 py-1 rounded">
          {item.title}
        </div>
 <br />
      
      </a>
     
    </div>
  );


}
import React, { useState } from "react";

export default function V291() {
  const [activeTab, setActiveTab] = useState("cans");
  const [modalData, setModalData] = useState(null);

  const products = {
    cans: [
      {
        name: "Cassis",
        desc: "0 sugar — Refreshing blackcurrant flavour.",
        bgColor: "#E6D2F0",
        bgImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/674dd38b3d902e72d8ed92e6_1.avif",
        img: "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/6745a05384ef1bcfb3f5a3bd_Charlies%20Organics%20330ml%20Can%20Black%20Currant.avif",
        modalImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/674dce37d6d8621624939f5f_Scherm%C2%ADafbeelding%202024-12-02%20om%2016.11.35.avif",
      },
      {
        name: "Passionfruit",
        desc: "0 sugar — Vibrant tropical passionfruit.",
        bgColor: "#FBE7A1",
        bgImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/674dd393fce26526cd14b91d_2.avif",
        img: "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/6745a009e86eb7e0cb4d45e8_Charlies%20Organics%20330ml%20Can%20Passionfruit.avif",
        modalImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/674dce41d67204faff454185_Scherm%C2%ADafbeelding%202024-12-02%20om%2016.11.27.avif",
      },
      {
        name: "Orange & Mandarin",
        desc: "0 sugar — Citrus with mandarin notes.",
        bgColor: "#FFE3C1",
        bgImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/674dd39afdc91f5b02a248b2_3.avif",
        img: "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/66dae210037e3f34eaf3eb57_Charlies%20Organics%20330ml%20Can%20Orange%20Mandarin%20Orange%20HR.avif",
        modalImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/674dce819566939e6ccef074_Scherm%C2%ADafbeelding%202024-12-02%20om%2014.39.13.avif",
      },
      {
        name: "Raspberry & Lime",
        desc: "0 sugar — Raspberries meet fresh lime.",
        bgColor: "#FFD6DE",
        bgImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/674dd3b037d0fa566a22528e_10.avif",
        img: "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/66dae1d7e2fdbb07d0b4eeca_Charlies%20Organics%20330ml%20Can%20Raspberry%20%26%20Lime.avif",
        modalImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/674dce4b89bfc1086224f3df_Scherm%C2%ADafbeelding%202024-12-02%20om%2016.11.20.avif",
      },
      {
        name: "Grapefruit",
        desc: "0 sugar — Light bitter grapefruit flavour.",
        bgColor: "#FFD9C8",
        bgImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/674dd3a115d5d982e77c61f3_8.avif",
        img: "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/6745a09f7810e476037a3cc2_Charlies%20Organics%20330ml%20Can%20Grapefruit.avif",
        modalImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/674dce535c28ffb645d95bd1_Scherm%C2%ADafbeelding%202024-12-02%20om%2016.11.07.avif",
      },
      {
        name: "Lemon",
        desc: "0 sugar — Classic zesty lemon.",
        bgColor: "#FFF7B0",
        bgImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/674dd3a9c1e5b9e20004bcc8_9.avif",
        img: "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/66dad9f9da8ca070ebd27542_Charlies%20Organics%20330ml%20Can%20Lemon.avif",
        modalImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/674dce5ae390c4b274fad4e4_Scherm%C2%ADafbeelding%202024-12-02%20om%2016.10.54.avif",
      },
    ],

    bottles: [
      {
        name: "Lemon",
        desc: "0 sugar — Crisp and zesty lemon flavour.",
        bgColor: "#CBE7F4",
        bgImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/674dd393fce26526cd14b91d_2.avif",
        imgNormal:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/679b991f938856f07fb40e94_Glass%20Bottle%20Lemon-1.avif",
        imgHover:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/679b992728d2a4bf3b73ad9d_Charlies%20Glass%20Bottles%2024%20Display%20Lemon%20open%203-4.avif",
        modalImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/679b992728d2a4bf3b73ad9d_Charlies%20Glass%20Bottles%2024%20Display%20Lemon%20open%203-4.avif",
      },
      {
        name: "Currant",
        desc: "0 sugar — Rich blackcurrant freshness.",
        bgColor: "#E6D2F0",
        bgImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/674dd38b3d902e72d8ed92e6_1.avif",
        imgNormal:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/679b9c59f0e5e32c4ea64970_Glass%20Bottle%20Currant-1.avif",
        imgHover:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/679b9c5c71c53f6a4e4bd5d3_Charlies%20Glass%20Bottles%2024%20Display%20Currant%20open%203-4.avif",
        modalImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/679b9c5c71c53f6a4e4bd5d3_Charlies%20Glass%20Bottles%2024%20Display%20Currant%20open%203-4.avif",
      },
      {
        name: "Orange",
        desc: "0 sugar — Juicy orange and mandarin twist.",
        bgColor: "#FFE3C1",
        bgImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/674dd39afdc91f5b02a248b2_3.avif",
        imgNormal:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/679b9c37fc7b5e98857b5f51_Glass%20Bottle%20Orange-1.avif",
        imgHover:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/679b9c3d72ecfa6ecb3ce383_Charlies%20Glass%20Bottles%2024%20Display%20Orange%20open%203-4.avif",
        modalImg:
          "https://cdn.prod.website-files.com/66dabe4fe2fdbb07d092f829/679b9c3d72ecfa6ecb3ce383_Charlies%20Glass%20Bottles%2024%20Display%20Orange%20open%203-4.avif",
      },
    ],
  };

  const openModal = (item) => setModalData(item);
  const closeModal = () => setModalData(null);

  return (
    <div className="min-h-screen bg-[#f3efe6] bg-[radial-gradient(rgba(12,30,34,0.02)_1px,transparent_1px)] bg-[size:18px_18px] text-[#0b3742] font-[Montserrat]">
      <div className="max-w-[1200px] mx-auto px-7 py-9">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-7">
          <h1 className="font-[Bebas Neue] text-[44px] sm:text-[64px] tracking-[2px] text-[#214f57] leading-none pl-[6px]">
            PRODUCTS
          </h1>

          {/* Tabs */}
          <div className="flex gap-2 mt-2">
            {["cans", "bottles"].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-2 rounded-md border-2 font-bold cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#0f515f] text-white border-transparent"
                    : "bg-transparent text-[#214f57] border-[rgba(11,55,66,0.15)]"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products[activeTab].map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-xl p-7 min-h-[500px] flex flex-col items-center justify-start shadow-[0_8px_20px_rgba(10,20,30,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(10,20,30,0.12)]"
              style={{
                backgroundColor: item.bgColor,
                backgroundImage: `url(${item.bgImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Texture Overlay */}
              <div
                className="absolute inset-0 opacity-30 mix-blend-multiply rounded-xl pointer-events-none"
                style={{
                  backgroundImage:
                    "url('https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/66dadc75a87cf9914f4539d7_Mask%20Group%20119-p-2000.png')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />

              {/* Info Button */}
              <button
                onClick={() => openModal(item)}
                className="absolute top-3 right-3 w-[38px] h-[38px] rounded-full bg-white shadow-[0_8px_18px_rgba(10,20,30,0.06)] flex items-center justify-center font-bold text-[#274b53]"
              >
                i
              </button>

              {/* Product Image */}
              <div className="relative w-[220px] h-[260px] mt-8 flex items-center justify-center group">
                {activeTab === "bottles" ? (
                  <>
                    <img
                      src={item.imgNormal}
                      alt={item.name}
                      onClick={() => openModal(item)}
                      className="absolute w-[100px] cursor-pointer transform transition duration-300 group-hover:opacity-0"
                    />
                    <img
                      src={item.imgHover}
                      alt={item.name}
                      onClick={() => openModal(item)}
                      className="absolute w-[900px] h-[200px] cursor-pointer transform transition duration-300 opacity-0 group-hover:opacity-100"
                    />
                  </>
                ) : (
                  <img
                    src={item.img}
                    alt={item.name}
                    onClick={() => openModal(item)}
                    className="w-[180px] cursor-pointer transform transition duration-300 hover:translate-x-5 hover:-translate-y-1 hover:rotate-[6deg] drop-shadow-[0_12px_18px_rgba(20,40,40,0.12)]"
                  />
                )}
              </div>

              {/* Product Info */}
              <div className="text-center mt-20 z-10">
                <h4 className="text-[18px] font-bold text-[#123b43] uppercase tracking-wide">
                  {item.name}
                </h4>
                <p className="text-[12px] font-semibold text-[#123b43]/80 uppercase tracking-[0.6px]">
                  0 SUGAR
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal (Updated Bigger Design) */}
      {modalData && (
        <div
          className="fixed inset-0 bg-[rgba(10,20,20,0.6)] z-[1200] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="relative bg-white rounded-2xl p-6 shadow-[0_24px_60px_rgba(10,20,30,0.3)] transform transition-all duration-500 scale-105 hover:scale-110">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 bg-[#0f515f] text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-lg"
            >
              ✕
            </button>
            <img
              src={
                modalData.modalImg ||
                modalData.imgHover ||
                modalData.img ||
                modalData.imgNormal
              }
              alt={modalData.name}
              className="w-[90vw] max-w-[600px] h-auto rounded-xl transition-transform duration-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}

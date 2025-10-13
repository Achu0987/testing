import React from "react";

export default function V274() {
  return (
    <div className="min-h-screen bg-[#231f20] text-white flex flex-col font-sans antialiased">
      {/* 🔶 Top Orange Band */}
      <div className="relative w-full h-[160px] bg-[#ff4500] flex items-center justify-center overflow-visible">
        <img
          src="https://www.brars.com/images/footer/mandala-spin.svg"
          alt="mandala"
          className="absolute left-1/2 top-4 -translate-x-1/2 w-[420px] sm:w-[520px] opacity-90 pointer-events-none"
        />
      </div>

      {/* 📨 Newsletter Card */}
      <div className="relative flex justify-center -mt-24 mb-12 px-4 sm:px-6">
        <div className="relative w-full max-w-[1000px] bg-[#cfb7ea] rounded-2xl p-8 sm:p-12 md:p-16 text-center shadow-[0_18px_48px_rgba(0,0,0,0.45)]">
          {/* Badges */}
          <img
            src="https://www.brars.com/images/footer/since-1986.svg"
            alt="since 1986"
            className="absolute -left-6 -top-8 w-20 sm:w-24 rotate-[-6deg] pointer-events-none"
          />
          <img
            src="https://www.brars.com/images/footer/new-improved.svg"
            alt="new improved"
            className="absolute -right-6 -top-10 w-16 sm:w-[80px] pointer-events-none"
          />

          {/* Heading */}
          <h1 className="text-[#231f20] font-extrabold text-[36px] sm:text-[50px] md:text-[68px] leading-[1] uppercase tracking-tight">
            Spice Up Your Inbox
          </h1>

          {/* Subtext */}
          <p className="text-[#221b1b] text-[14px] sm:text-[16px] max-w-[680px] mx-auto mt-4 mb-8 font-medium leading-relaxed">
            Get special offers, the latest products, recipes, and news delivered straight to your inbox.
          </p>

          {/* Form */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-5">
            <input
              type="text"
              placeholder="Full Name*"
              className="w-full sm:w-[260px] md:w-[300px] px-4 py-3 rounded-xl bg-white text-[#111] text-[14px] font-medium outline-none placeholder:text-[#777]"
            />
            <input
              type="email"
              placeholder="Email Address*"
              className="w-full sm:w-[260px] md:w-[300px] px-4 py-3 rounded-xl bg-white text-[#111] text-[14px] font-medium outline-none placeholder:text-[#777]"
            />
            <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-[#231f20] text-white font-extrabold text-[14px] hover:bg-black transition-all">
              Submit
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-white text-[#231f20] font-extrabold">
                ›
              </span>
            </button>
          </div>

          {/* Legal Note */}
          <div className="flex items-start gap-3 mt-5 max-w-[740px] mx-auto text-[#221b1b] text-[12px] leading-snug text-left">
            <div className="w-4 h-4 border-[2px] border-black rounded-sm mt-0.5 shrink-0"></div>
            <div>
              *Yes, I would like to receive updates, promotions, and offers from Brar’s Retail &amp; Restaurants. I
              understand I can unsubscribe at any time.
            </div>
          </div>

          {/* Badge bottom-right */}
          <img
            src="https://www.brars.com/images/footer/made-in-canada.svg"
            alt="made in canada"
            className="absolute -right-6 -bottom-8 w-[100px] sm:w-[130px] pointer-events-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
          />
        </div>
      </div>

      {/* 🌑 Main Dark Footer */}
      <footer className="bg-[#231f20] px-6 sm:px-10 pt-12 pb-16">
        <div className="max-w-[1200px] mx-auto space-y-12">
          {/* Logo + Tagline */}
          <div className="text-center">
            <img
              alt="Brar's logo"
              src="https://cdn.sanity.io/images/krc73rcv/production/26fab2e70d6dd82eef0f22a10b3682347b638e7b-151x40.svg"
              className="mx-auto h-10 sm:h-12 mb-4"
            />
            <div className="text-[#caa86d] font-extrabold text-[34px] sm:text-[48px] uppercase tracking-tight leading-none">
              #VegetarianDoneBetter
            </div>
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-center md:text-left">
            {/* 🧭 Left Links */}
            <div className="flex flex-col items-center md:items-start space-y-3">
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
                <ul className="text-[13px] font-extrabold uppercase leading-[2] space-y-1">
                  <li><a className="hover:text-[#caa86d]" href="/">Home</a></li>
                  <li><a className="hover:text-[#caa86d]" href="/products">Products</a></li>
                  <li><a className="hover:text-[#caa86d]" href="/where-to-buy">Where to Buy</a></li>
                  <li><a className="hover:text-[#caa86d]" href="/recipes">Recipes</a></li>
                </ul>
                <ul className="text-[13px] font-extrabold uppercase leading-[2] space-y-1">
                  <li><a className="hover:text-[#caa86d]" href="/about">About Us</a></li>
                  <li><a className="hover:text-[#caa86d]" href="/news">News</a></li>
                  <li><a className="hover:text-[#caa86d]" href="/contact">Contact Us</a></li>
                  <li><a className="hover:text-[#caa86d]" href="/terms-of-use">Terms of Use</a></li>
                  <li><a className="hover:text-[#caa86d]" href="/privacy-policy">Privacy Policy</a></li>
                </ul>
              </div>
            </div>

            {/* ✉️ Center Subscribe */}
            <div className="max-w-[420px] mx-auto">
              <div className="font-extrabold uppercase mb-2 text-[15px]">Subscribe</div>
              <div className="text-[14px] opacity-90 mb-6">
                Sign up for the latest updates and exclusive offers from Brar's.
              </div>

              <div className="flex flex-col gap-4">
                <input
                  placeholder="Full Name*"
                  className="bg-transparent border-b-[2px] border-white/35 focus:border-[#caa86d] py-2 px-2 text-white placeholder-white text-[14px] outline-none transition-all"
                />
                <div className="flex items-center gap-3">
                  <input
                    placeholder="Email Address*"
                    className="flex-1 bg-transparent border-b-[2px] border-white/35 focus:border-[#caa86d] py-2 px-2 text-white placeholder-white text-[14px] outline-none transition-all"
                  />
                  <button className="w-9 h-9 rounded-md bg-white text-[#231f20] flex items-center justify-center font-extrabold hover:bg-[#caa86d] transition-all">
                    ›
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 text-[12px] opacity-90 leading-tight mt-4 text-left">
                <div className="w-4 h-4 border-[2px] border-white/40 rounded-sm mt-0.5 shrink-0"></div>
                <div>
                  *Yes, I would like to receive updates, promotions, and offers from Brar’s Retail &amp; Restaurants.
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex justify-center md:justify-start gap-5 mt-6">
                {[
                  ["https://www.instagram.com/brarsfoodculture/?hl=en", "https://cdn.sanity.io/images/krc73rcv/production/43456ba135968ae754d6a4cf1c30a87009bd3eb0-19x20.svg?auto=format", "Instagram"],
                  ["https://www.facebook.com/BrarsFoodCulture/", "https://cdn.sanity.io/images/krc73rcv/production/e21bcb4cfb6c541065e63421aaa62666988b696e-19x20.svg?auto=format", "Facebook"],
                  ["https://www.tiktok.com/@brars.foodculture", "https://cdn.sanity.io/images/krc73rcv/production/79052bfba58196ef9b9f1ccb0d437f8e347c6baa-18x20.svg?auto=format", "TikTok"],
                ].map(([link, icon, label]) => (
                  <a
                    key={label}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:opacity-80 transition"
                  >
                    <img src={icon} alt={label} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* 📍 Right Contact */}
            <div className="flex flex-col items-center md:items-start space-y-6">
              <div>
                <div className="font-extrabold uppercase mb-2 text-[15px]">Contact Us</div>
                <div className="text-[14px] leading-[1.7] opacity-90">
                  <a className="block text-white hover:text-[#caa86d]" href="tel:+1.905.502.7277">
                    +1.905.502.7277
                  </a>
                  <a className="block text-white hover:text-[#caa86d]" href="mailto:info@oicfoods.com">
                    info@oicfoods.com
                  </a>
                  <a className="block text-white hover:text-[#caa86d]" href="mailto:sales@oicfoods.com">
                    sales@oicfoods.com
                  </a>
                </div>
              </div>

              <div>
                <div className="font-extrabold uppercase mb-2 text-[15px]">Head Office</div>
                <div className="text-[14px] leading-[1.7] opacity-90">
                  <div>Ontario Impex of Canada</div>
                  <div>190 Statesman Drive</div>
                  <div>Mississauga, Ontario L5S 1X7</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ⚫ Bottom Bar */}
      <div className="bg-[#1c1818] text-white/70 py-4 text-center text-[13px] px-4 leading-snug">
        © {new Date().getFullYear()} Brar's / Ontario Impex of Canada — Proud family recipe • Vegetarian-first
      </div>
    </div>
  );
}

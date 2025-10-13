import React from "react";

export default function V275() {
  return (
    <div className="min-h-screen bg-[#231f20] text-white antialiased flex flex-col">
      {/* 🔶 Top orange band */}
      <div className="relative w-full h-[180px] bg-[#ff4500] flex items-center justify-center overflow-visible">
        <img
          src="https://www.brars.com/images/footer/mandala-spin.svg"
          alt="mandala"
          className="absolute left-1/2 top-4 -translate-x-1/2 w-[520px] opacity-90 pointer-events-none"
        />
      </div>

      {/* 📨 Newsletter Card */}
      <div className="relative flex justify-center -mt-28 mb-14 px-4">
        <div className="relative w-full max-w-[1100px] bg-[#cfb7ea] rounded-2xl p-[60px_80px] shadow-[0_18px_48px_rgba(0,0,0,0.45)]">
          {/* badges */}
          <img
            src="https://www.brars.com/images/footer/since-1986.svg"
            alt="since 1986"
            className="absolute -left-10 -top-10 w-28 rotate-[-6deg] pointer-events-none"
          />
          <img
            src="https://www.brars.com/images/footer/new-improved.svg"
            alt="new improved"
            className="absolute -right-10 -top-12 w-[90px] pointer-events-none"
          />

          {/* Heading */}
          <h1 className="text-center text-[#231f20] font-extrabold text-[68px] leading-[0.95] uppercase tracking-tight">
            SPICE UP YOUR
            <br />
            INBOX
          </h1>

          {/* Subtext */}
          <p className="text-center text-[#221b1b] text-[16px] max-w-[740px] mx-auto mt-5 mb-9 font-medium leading-relaxed">
            Get special offers and all the latest products, recipes, and news delivered straight to your inbox.
          </p>

          {/* Form */}
          <div className="flex flex-wrap justify-center items-center gap-5">
            <input
              type="text"
              placeholder="Full Name*"
              className="w-[300px] px-4 py-3 rounded-xl bg-white text-[#111] text-[14px] font-medium ring-0 outline-none shadow-inner placeholder:text-[#777]"
            />
            <input
              type="email"
              placeholder="Email Address*"
              className="w-[300px] px-4 py-3 rounded-xl bg-white text-[#111] text-[14px] font-medium ring-0 outline-none shadow-inner placeholder:text-[#777]"
            />
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#231f20] text-white font-extrabold text-[14px] hover:bg-black transition-all">
              Submit
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-white text-[#231f20] font-extrabold">
                ›
              </span>
            </button>
          </div>

          {/* Legal note */}
          <div className="flex gap-3 items-start max-w-[780px] mx-auto mt-5 text-[#221b1b] text-[12px] leading-snug">
            <div className="w-4 h-4 border-[2px] border-black rounded-sm mt-0.5"></div>
            <div>
              *Yes, I would like to receive updates, promotions, and offers from Brar’s Retail &amp; Restaurants. I
              understand I can unsubscribe at any time.
            </div>
          </div>

          {/* Badge bottom-right */}
          <img
            src="https://www.brars.com/images/footer/made-in-canada.svg"
            alt="made in canada"
            className="absolute -right-10 -bottom-10 w-[150px] pointer-events-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>

      {/* 🌑 Main dark footer */}
      <div className="bg-[#231f20] py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Logo + Hashtag */}
          <div className="text-center mb-12">
            <img
              alt="Brar's logo"
              src="https://cdn.sanity.io/images/krc73rcv/production/26fab2e70d6dd82eef0f22a10b3682347b638e7b-151x40.svg"
              className="mx-auto h-12 mb-3"
            />
            <div className="text-[#caa86d] font-extrabold text-[54px] uppercase tracking-tight leading-[1]">
              #VEGETARIANDONEBETTER
            </div>
          </div>

          {/* Footer Grid */}
          <div className="grid md:grid-cols-3 gap-12 items-start justify-between">
            {/* 🧭 Left links */}
            <div className="space-y-2">
              <div className="flex gap-8">
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
            <div className="max-w-[480px] mx-auto">
              <div className="font-extrabold uppercase mb-2 text-[15px]">Subscribe</div>
              <div className="text-[14px] opacity-90 mb-5">
                Sign up for the latest updates and exclusive offers from Brar's.
              </div>

              <div className="mb-4">
                <label className="block text-[13px] mb-2 font-bold">Full Name*</label>
                <input
                  className="w-full bg-transparent border-b-[2px] border-white/35 focus:border-[#caa86d] py-2 px-1 text-white placeholder-white outline-none transition-all"
                  placeholder="Your Name"
                />
              </div>

              <div className="flex items-end gap-3 mb-4">
                <div className="flex-1">
                  <label className="block text-[13px] mb-2 font-bold">Email Address*</label>
                  <input
                    className="w-full bg-transparent border-b-[2px] border-white/35 focus:border-[#caa86d] py-2 px-1 text-white placeholder-white outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <button className="w-9 h-9 rounded-md bg-white text-[#231f20] flex items-center justify-center font-extrabold hover:bg-[#caa86d] transition-all">
                  ›
                </button>
              </div>

              <div className="flex items-start gap-3 text-[12px] opacity-90 leading-tight mb-4">
                <div className="w-4 h-4 border-[2px] border-white/40 rounded-sm mt-0.5"></div>
                <div>
                  *Yes, I would like to receive updates, promotions, and offers from Brar’s Retail &amp; Restaurants. I
                  understand I can unsubscribe at any time.
                </div>
              </div>

              {/* Socials */}
              <div className="flex gap-4 mt-4">
                <a
                  href="https://www.instagram.com/brarsfoodculture/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <img
                    src="https://cdn.sanity.io/images/krc73rcv/production/43456ba135968ae754d6a4cf1c30a87009bd3eb0-19x20.svg?auto=format"
                    alt="Instagram"
                    className="w-5 h-5"
                  />
                </a>
                <a
                  href="https://www.facebook.com/BrarsFoodCulture/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <img
                    src="https://cdn.sanity.io/images/krc73rcv/production/e21bcb4cfb6c541065e63421aaa62666988b696e-19x20.svg?auto=format"
                    alt="Facebook"
                    className="w-5 h-5"
                  />
                </a>
                <a
                  href="https://www.tiktok.com/@brars.foodculture"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <img
                    src="https://cdn.sanity.io/images/krc73rcv/production/79052bfba58196ef9b9f1ccb0d437f8e347c6baa-18x20.svg?auto=format"
                    alt="TikTok"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>

            {/* 📍 Right Contact */}
            <div className="space-y-5">
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
      </div>

      {/* ⚫ Bottom bar */}
      <div className="bg-[#1c1818] text-white/70 py-4 text-center text-[13px]">
        © {new Date().getFullYear()} Brar's / Ontario Impex of Canada — Proud family recipe • Vegetarian-first
      </div>
    </div>
  );
}

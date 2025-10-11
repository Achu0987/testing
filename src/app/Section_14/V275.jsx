import React from "react";

export default function V275() {
  return (
    <div className="min-h-screen bg-[#231f20] text-white antialiased">
      {/* Top orange band */}
      <div className="relative w-full h-[170px] bg-[#ff4500] overflow-visible">
        <img
          src="https://www.brars.com/images/footer/mandala-spin.svg"
          alt="mandala"
          className="absolute left-1/2 top-3 -translate-x-1/2 w-[520px] pointer-events-none"
        />
      </div>

      {/* Newsletter card */}
      <div className="flex justify-center relative -mt-28 mb-10 px-3">
        <div className="w-full max-w-[1100px] bg-[#cfb7ea] rounded-[12px] p-[54px_74px] relative shadow-[0_18px_48px_rgba(0,0,0,0.45)] box-border">
          {/* since badge */}
          <img
            src="https://www.brars.com/images/footer/since-1986.svg"
            alt="since 1986"
            className="absolute -left-12 -top-12 w-28 rotate-[-6deg] pointer-events-none"
          />

          {/* new-improved badge */}
          <img
            src="https://www.brars.com/images/footer/new-improved.svg"
            alt="new improved"
            className="absolute -right-11 -top-14 w-[96px] pointer-events-none"
          />

          {/* Heading */}
          <h1 className="text-center text-[#231f20] font-extrabold text-[72px] leading-[0.95] uppercase tracking-tight">
            SPICE UP YOUR
            <br />
            INBOX
          </h1>

          {/* Subtext */}
          <p className="text-center text-[#221b1b] text-[15px] max-w-[820px] mx-auto mt-4 mb-8">
            Get special offers and all the latest products, recipes, and news delivered to your inbox!
          </p>

          {/* Form row */}
          <div className="flex flex-wrap justify-center items-center gap-5">
            <input
              type="text"
              placeholder="Full Name*"
              className="w-[320px] px-4 py-3 rounded-xl bg-white text-[#111] text-[14px] ring-0 outline-none shadow-inner"
            />
            <input
              type="email"
              placeholder="Email Address*"
              className="w-[320px] px-4 py-3 rounded-xl bg-white text-[#111] text-[14px] ring-0 outline-none shadow-inner"
            />
            <button className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#231f20] text-white font-extrabold text-[14px] cursor-pointer">
              Submit
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-white text-[#231f20] font-extrabold">
                ›
              </span>
            </button>
          </div>

          {/* checkbox + legal */}
          <div className="flex gap-3 items-start max-w-[820px] mx-auto mt-4 text-[#221b1b] text-[11px]">
            <div className="w-3.5 h-3.5 border-[2px] border-black rounded-sm"></div>
            <div className="leading-[1.25]">
              *Yes, I would like to receive updates, promotions, and offers from Brar's Retail &amp; Restaurants. I understand I can unsubscribe at any time.
            </div>
          </div>

          {/* made in canada badge */}
          <img
            src="https://www.brars.com/images/footer/made-in-canada.svg"
            alt="made in canada"
            className="absolute -right-12 -bottom-12 w-[150px] pointer-events-none shadow-[0_14px_30px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>

      {/* Main dark footer area */}
      <div className="bg-[#231f20] pb-[110px] pt-9 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Logo + hashtag */}
          <div className="text-center mb-7">
            <img
              alt="Brar's logo"
              src="https://cdn.sanity.io/images/krc73rcv/production/26fab2e70d6dd82eef0f22a10b3682347b638e7b-151x40.svg"
              className="mx-auto h-12 mb-2"
            />
            <div className="text-[#caa86d] font-extrabold text-[56px] uppercase tracking-tight">
              #VEGETARIANDONEBETTER
            </div>
          </div>

          {/* Footer grid */}
          <div className="flex flex-wrap gap-10 justify-between items-start">
            {/* Left links */}
            <div className="flex-0 flex-shrink-0 w-[260px] min-w-[180px]">
              <div className="flex gap-7">
                <ul className="list-none p-0 m-0 text-[13px] leading-[2] font-extrabold uppercase">
                  <li><a className="text-white opacity-95" href="/">Home</a></li>
                  <li><a className="text-white opacity-95" href="/products">Products</a></li>
                  <li><a className="text-white opacity-95" href="/where-to-buy">Where to Buy</a></li>
                  <li><a className="text-white opacity-95" href="/recipes">Recipes</a></li>
                </ul>
                <ul className="list-none p-0 m-0 text-[13px] leading-[2] font-extrabold uppercase">
                  <li><a className="text-white opacity-95" href="/about">About Us</a></li>
                  <li><a className="text-white opacity-95" href="/news">News</a></li>
                  <li><a className="text-white opacity-95" href="/contact">Contact Us</a></li>
                  <li><a className="text-white opacity-95" href="/terms-of-use">Terms of Use</a></li>
                  <li><a className="text-white opacity-95" href="/privacy-policy">Privacy Policy</a></li>
                </ul>
              </div>
            </div>

            {/* Center subscribe */}
            <div className="flex-1 min-w-[260px] max-w-[520px]">
              <div className="font-extrabold uppercase mb-2">Subscribe</div>
              <div className="text-[14px] opacity-95 mb-4 max-w-[420px]">
                Sign up for the latest updates and exclusive offers from Brar's.
              </div>

              <div className="mb-4">
                <label className="block text-[13px] mb-2 font-bold">Full Name*</label>
                <input className="w-full bg-transparent outline-none border-none border-b-[2px] border-white/35 py-2 px-1 text-white placeholder-white" />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1">
                  <label className="block text-[13px] mb-2 font-bold">Email Address*</label>
                  <input className="w-full bg-transparent outline-none border-none border-b-[2px] border-white/35 py-2 px-1 text-white placeholder-white" />
                </div>
                <div className="w-9 h-9 rounded-md bg-white text-[#231f20] flex items-center justify-center font-extrabold cursor-pointer">›</div>
              </div>

              <div className="flex items-start gap-3 text-[12px] opacity-90 mb-4">
                <div className="w-4 h-4 border-[2px] border-white/40 rounded-sm"></div>
                <div className="max-w-[360px]">
                  *Yes, I would like to receive updates, promotions, and offers from Brar’s Retail &amp; Restaurants. I understand I can unsubscribe at any time.
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <a href="https://www.instagram.com/brarsfoodculture/?hl=en" target="_blank" rel="noreferrer">
                  <img src="https://cdn.sanity.io/images/krc73rcv/production/43456ba135968ae754d6a4cf1c30a87009bd3eb0-19x20.svg?auto=format" alt="ig" className="w-4.5 h-4.5" />
                </a>
                <a href="https://www.facebook.com/BrarsFoodCulture/" target="_blank" rel="noreferrer">
                  <img src="https://cdn.sanity.io/images/krc73rcv/production/e21bcb4cfb6c541065e63421aaa62666988b696e-19x20.svg?auto=format" alt="fb" className="w-4.5 h-4.5" />
                </a>
                <a href="https://www.tiktok.com/@brars.foodculture" target="_blank" rel="noreferrer">
                  <img src="https://cdn.sanity.io/images/krc73rcv/production/79052bfba58196ef9b9f1ccb0d437f8e347c6baa-18x20.svg?auto=format" alt="tt" className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

            {/* Right contact */}
            <div className="flex-0 flex-shrink-0 w-[260px] min-w-[200px]">
              <div className="font-extrabold uppercase mb-2">Contact Us</div>
              <div className="text-[14px] opacity-95 mb-4 leading-[1.6]">
                <div><a className="text-white" href="tel:+1.905.502.7277">+1.905.502.7277</a></div>
                <div><a className="text-white" href="mailto:info@oicfoods.com">info@oicfoods.com</a></div>
                <div><a className="text-white" href="mailto:sales@oicfoods.com">sales@oicfoods.com</a></div>
              </div>

              <div className="font-extrabold uppercase mb-2">Head Office</div>
              <div className="text-[14px] opacity-95 leading-[1.6]">
                <div>Ontario Impex of Canada</div>
                <div>190 Statesman Drive</div>
                <div>Mississauga, Ontario L5S 1X7</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom small bar */}
      <div className="bg-[#201b1b] text-white/70 py-3 px-6 text-center text-[13px]">
        © {new Date().getFullYear()} Brar's / Ontario Impex of Canada — Proud family recipe • Vegetarian-first
      </div>
    </div>
  );
}
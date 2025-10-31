import { asImageSrc } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import { Logo } from "@/app/Section_62/component/Logo";
import { WideLogo } from "./WideLogo";
import { InteractiveSkateboard } from "./InteractiveSkateboard";
import { Bounded } from "@/app/Section_62/component/Bounded";

const DEFAULT_DECK_TEXTURE = "/skateboard/Deck.webp";
const DEFAULT_WHEEL_TEXTURE = "/skateboard/SkateWheel1.png";
const DEFAULT_TRUCK_COLOR = "#6F6E6A";
const DEFAULT_BOLT_COLOR = "#6F6E6A";

/* ---------------- RibbonButton ---------------- */
const RibbonButton = ({ href, text, icon, bg = "#ff7f45" }) => (
  <Link
    href={href}
    className="relative inline-flex items-center gap-3 font-bold text-zinc-900"
    style={{
      background: bg,
      color: "#ffffffff",
      padding: "0.8rem 1.6rem",
      boxShadow: "5px 5px 0 #000",
      borderRadius: "4px",
      textDecoration: "none",
    }}
  >
    {icon && <span className="flex-shrink-0">{icon}</span>}
    <span className="tracking-wide">{text}</span>

    {/* Torn right edge */}
    <span
      aria-hidden
      className="absolute right-0 top-0 h-full w-2 bg-[rgba(0,0,0,0.3)] rotate-1 origin-left"
      style={{
        clipPath: "polygon(0 0, 100% 10%, 100% 90%, 0 100%)",
      }}
    />
  </Link>
);

/* ---------------- Hero Section ---------------- */
const Hero = ({ slice }) => {
  const deckTextureURL =
    asImageSrc(slice.primary.skateboard_deck_texture) || DEFAULT_DECK_TEXTURE;
  const wheelTextureURL =
    asImageSrc(slice.primary.skateboard_wheel_texture) || DEFAULT_WHEEL_TEXTURE;
  const truckColor = slice.primary.skateboard_truck_color || DEFAULT_TRUCK_COLOR;
  const boltColor = slice.primary.skateboard_bolt_color || DEFAULT_BOLT_COLOR;

  const cartCount = 1;
  const bgImage = asImageSrc(slice.primary.background_texture) || null;

  return (
    <Bounded
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: bgImage
          ? `url(${bgImage})`
          : "url(/textures/bg-texture-pink.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#eac7d0",
      }}
    >
      {/* Header */}
      <header className="absolute top-13 inset-x-0 z-50 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8">
          {/* Left: Logo */}
          <Logo className="h-16 w-auto text-brand-purple" />

          {/* Center: Nav */}
          <nav className="hidden md:flex gap-10 font-mono text-[30px] text-zinc-900">
            <Link href="/team" className="hover:text-brand-purple">
              Team
            </Link>
            <Link href="/build" className="hover:text-brand-purple">
              Customizer
            </Link>
            <Link href="/about" className="hover:text-brand-purple">
              About
            </Link>
          </nav>

          {/* Right: Cart Button */}
          <RibbonButton
            href="/cart"
            text={`Cart (${cartCount})`}
            bg="#4b1733"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45a1 1 0 0 0 .9 1.46h9v-2h-8.1l.6-1.1L19 6H6.2l-.2-2z" />
              </svg>
            }
          />
        </div>
      </header>

      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <WideLogo className="w-full max-w-7xl text-brand-purple" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-start justify-start text-left px-6 mt-32 space-y-10 w-full max-w-7xl mx-auto">
        {/* Headline */}
        <h1 className="font-extrabold text-zinc-900 text-3xl md:text-7xl lg:text-[100px] tracking-tight leading-tight text-left">
          ESCAPE THE
          <br />
          CUL-DE-SAC
        </h1>

        {/* Skateboard */}
        <div className="w-full max-w-5xl -mt-4">
          <InteractiveSkateboard
            deckTextureURL={deckTextureURL}
            wheelTextureURL={wheelTextureURL}
            truckColor={truckColor}
            boltColor={boltColor}
          />
        </div>

        {/* Subtext */}
        <p className="max-w-xl font-mono text-base md:text-lg text-zinc-900 leading-relaxed text-left">
          Not just a board, <em>your</em> board. Build a board that's as real as
          the places you take it.
        </p>

        {/* CTA Button */}
        <div className="self-end">
          <RibbonButton
            href="/build"
            text="Build Your Board"
            bg="#ff7f45"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 6h18v2H3zM4 10h16v2H4zM5 14h14v2H5z" />
              </svg>
            }
          />
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;

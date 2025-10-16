import React, { useEffect, useRef } from "react";

export default function V295() {
  const labelRef = useRef(null);
  const copyRef = useRef(null);
  const btnRef = useRef(null);
  const svgRef = useRef(null);
  const imgRef = useRef(null);
  const leftColRef = useRef(null);

  useEffect(() => {
    const label = labelRef.current;
    const copy = copyRef.current;
    const btn = btnRef.current;
    const svg = svgRef.current;
    const img = imgRef.current;
    const leftCol = leftColRef.current;

    if (!label || !copy || !btn || !svg || !img || !leftCol) return;

    try {
      label.animate(
        [
          { transform: "translateY(18px)", opacity: 0 },
          { transform: "translateY(0px)", opacity: 1 },
        ],
        {
          duration: 420,
          easing: "cubic-bezier(.22,.9,.3,1)",
          fill: "forwards",
          delay: 120,
        }
      );

      copy.animate(
        [
          { transform: "translateY(22px)", opacity: 0 },
          { transform: "translateY(0px)", opacity: 1 },
        ],
        {
          duration: 520,
          easing: "cubic-bezier(.22,.9,.3,1)",
          fill: "forwards",
          delay: 260,
        }
      );

      btn.animate(
        [
          { transform: "translateY(26px)", opacity: 0 },
          { transform: "translateY(0px)", opacity: 1 },
        ],
        {
          duration: 480,
          easing: "cubic-bezier(.22,.9,.3,1)",
          fill: "forwards",
          delay: 420,
        }
      );

      svg.animate(
        [
          { transform: "rotate(-15deg) translateY(8px) scale(0.92)", opacity: 0 },
          { transform: "rotate(-15deg) translateY(0px) scale(1.06)", opacity: 1 },
        ],
        { duration: 720, easing: "cubic-bezier(.2,.9,.25,1)", fill: "forwards", delay: 320 }
      );

      // button hover pulse
      const onBtnEnter = () => {
        btn.animate(
          [
            { transform: "scale(1)", filter: "brightness(1)" },
            { transform: "scale(1.08)", filter: "brightness(1.08)" },
            { transform: "scale(1.04)", filter: "brightness(1.04)" },
            { transform: "scale(1)", filter: "brightness(1)" },
          ],
          { duration: 520, easing: "cubic-bezier(.34,.1,.64,.99)" }
        );
      };
      btn.addEventListener("mouseenter", onBtnEnter);

      // left column "magnetic" subtle movement
      const onLeftMove = (e) => {
        const rect = leftCol.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        leftCol.style.transform = `translate3d(${dx * 6}px, ${dy * 6}px, 0)`;
      };
      const onLeftLeave = () => {
        leftCol.style.transform = "translate3d(0,0,0)";
      };
      leftCol.addEventListener("mousemove", onLeftMove);
      leftCol.addEventListener("mouseleave", onLeftLeave);

      return () => {
        btn.removeEventListener("mouseenter", onBtnEnter);
        leftCol.removeEventListener("mousemove", onLeftMove);
        leftCol.removeEventListener("mouseleave", onLeftLeave);
      };
    } catch (err) {
      console.warn("Animation error or WAAPI not supported:", err);
    }
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden  items-center font-sans"
      style={{
        backgroundColor: "#f6efe4",
        color: "#113f47",
      }}
    >
      <style>
        {`
          /* Import headline + label fonts */
          @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Montserrat:wght@700;800&display=swap');

          /* meet-img rules with clip-path */
          .meet-img {
            box-sizing: border-box;
            vertical-align: baseline;
            object-fit: cover;
            object-position: 50% 50%;
            height: 100%;
            margin-bottom: 0;
            display: inline-block;
            overflow: clip;
            width: 100%;
            height: 100%;
            will-change: transform;
            transform-origin: 50% 50%;
            aspect-ratio: 1;
            -webkit-clip-path: polygon(62.087% 0%, 89.733% 0%, 89.733% 36.14%, 89.733% 36.14%, 89.031% 44.829%, 86.999% 53.072%, 83.747% 60.761%, 79.387% 67.783%, 74.029% 74.029%, 67.783% 79.387%, 60.761% 83.747%, 53.072% 86.999%, 44.829% 89.031%, 36.14% 89.733%, 0% 89.733%, 0% 62.087%, 0% 62.087%, .813% 52.022%, 3.167% 42.472%, 6.934% 33.565%, 11.986% 25.429%, 18.194% 18.194%, 25.429% 11.986%, 33.565% 6.934%, 42.472% 3.167%, 52.022% .813%, 62.087% 0%);
            clip-path: polygon(62.087% 0%, 89.733% 0%, 89.733% 36.14%, 89.733% 36.14%, 89.031% 44.829%, 86.999% 53.072%, 83.747% 60.761%, 79.387% 67.783%, 74.029% 74.029%, 67.783% 79.387%, 60.761% 83.747%, 53.072% 86.999%, 44.829% 89.031%, 36.14% 89.733%, 0% 89.733%, 0% 62.087%, 0% 62.087%, .813% 52.022%, 3.167% 42.472%, 6.934% 33.565%, 11.986% 25.429%, 18.194% 18.194%, 25.429% 11.986%, 33.565% 6.934%, 42.472% 3.167%, 52.022% .813%, 62.087% 0%);
          }

          .meet-image-wrapper {
            will-change: transform;
            transform-style: preserve-3d;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            rotate:10deg;
          }

          /* make svg responsive but constrained */
          .right-svg {
            width: 100%;
            height: 100%;
            max-width: 1100px;
            max-height: 1000px;
            display: block;
            overflow: visible;
            transform-origin: 50% 50%;
          }

          /* initial gentle vertical offset for the image; tuned for desktop */
          .meet-img-inner {
            transform: translate3d(0px, -2.5rem, 0px) scale3d(1,1,1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
            transform-style: preserve-3d;
            transition: transform 320ms cubic-bezier(.2,.8,.2,1);
          }

          /* --- TYPOGRAPHY & ALIGNMENT CHANGES --- */

          /* left column wrapper: vertical centering with generous left padding like screenshot */
          #leftCol {
            display: flex;
            flex-direction: column;
            justify-content: center; /* vertically center the text block */
            padding-left: 80px; /* bigger left offset */
            box-sizing: border-box;
          }

          /* small uppercase label */
          .label-small {
            font-family: 'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
            font-weight: 800;
            letter-spacing: 2px;
            font-size: 13px;
            color: #1e5964;
            text-transform: uppercase;
          }

          /* decorative headline (handwritten / script) to match screenshot */
          .headline {
            font-family: 'Pacifico', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
            font-size: 36px;
            line-height: 1.35;
            color: #163b44;
            margin: 0;
            max-width: 520px; /* keeps line length similar to screenshot */
            text-align: left;
            font-weight: 400;
          }

          /* emphasis (strong) appears taller/heavier */
          .headline strong {
            font-weight: 800;
            font-family: 'Montserrat', sans-serif;
            letter-spacing: 0.6px;
          }

          /* underline accent for the "organic" word */
          .underline-accent {
            display: inline-block;
            padding-bottom: 4px;
            border-bottom: 4px solid #ef6b6b;
          }

          /* button style to match screenshot's small rounded box */
          .cta {
            display: inline-block;
            background: #1f5666;
            color: #fff;
            padding: 10px 18px;
            border-radius: 6px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 800;
            font-size: 13px;
            margin-top: 20px;
            box-shadow: 0 6px 14px rgba(31,86,102,0.12);
            text-decoration: none;
          }

          /* smaller screens */
          @media (max-width: 900px) {
            #leftCol { padding-left: 16px; align-items: flex-start; justify-content: flex-start; }
            .headline { font-size: 22px; max-width: 100%; }
            .right-svg { max-width: 720px; max-height: 680px; }
          }
        `}
      </style>

      <div
        className="max-1200 max-w-[1400px] w-[96%] mx-auto my-9 h-[880px] flex items-center justify-between box-border two-col"
        role="region"
        aria-label="Meet Charlie hero"
      >
        {/* LEFT TEXT */}
        <div
          id="leftCol"
          ref={leftColRef}
          className="w-[48%] pl-20 box-border"
          style={{ transition: "transform 220ms ease" }}
        >
          {/* Label row */}
          <div
            id="labelRow"
            ref={labelRef}
            className="flex items-center gap-3 mb-4 opacity-0 translate-y-[18px]"
            aria-hidden="false"
          >
            <img
              src="https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/6745ca6cec81ee7fac907794_drip.svg"
              alt="drip"
              width="44"
              height="44"
              className="flex-none w-11 h-11"
            />
            <div className="label-small">Meet Charlie</div>
          </div>

          {/* Paragraph main */}
          <div
            id="copy"
            ref={copyRef}
            className="opacity-0 translate-y-[22px] transition-all duration-200"
          >
            <p className="headline">
              Charlie cares about healthy people on a healthy planet.
              Inspiring others to do the same.
              Charlie is transparent about what is in the can:{" "}
              <strong>SPARKLING WATER</strong> with a squeeze of{" "}
              <span className="underline-accent">
                organic
              </span>{" "}
              fruit.
            </p>
          </div>

          <a
            id="buyBtn"
            ref={btnRef}
            href="/store-finder"
            role="button"
            className="cta opacity-0 translate-y-[26px] w-50 "
          >
            WHERE TO BUY
          </a>
        </div>

        {/* RIGHT IMAGE (leaf / petal) */}
        <div
          className="w-[48%] h-full mt-80 ml-50 right-col relative"
          aria-hidden="false"
        >
          <div className="bubble tiny" style={{ left: "74%", top: "6%", opacity: 0.95 }} />
          <div className="bubble small" style={{ left: "82%", top: "10%", opacity: 0.9 }} />
          <div className="bubble" style={{ left: "28%", top: "14%", opacity: 0.9 }} />

          <svg
            id="leafSVG"
            ref={svgRef}
            viewBox="0 0 700 700"
            className="right-svg -rotate-[-4deg] -translate-y-[6px] opacity-0"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            style={{ transformOrigin: "50% 50%" }}
            width="100%"
            height="100%"
          >
            <rect x="0" y="0" width="700" height="700" fill="transparent" />

            <g className="meet-image-wrapper">
              <image
                id="leafImage"
                ref={imgRef}
                href={"https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/68a497999fe4aa483d5d00b6_IMG_4011_crop.jpg"}
                x="0"
                y="0"
                width="700"
                height="700"
                preserveAspectRatio="xMidYMid slice"
                className="meet-img meet-img-inner"
                style={{
                  transformStyle: "preserve-3d",
                }}
              />
            </g>
          </svg>

          <div
            style={{ transform: "rotate(-8deg)" }}
            className="absolute left-[24%] bottom-[8%] w-[180px] h-[56px] bg-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
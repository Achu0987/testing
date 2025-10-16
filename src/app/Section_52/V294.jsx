import React, { useEffect, useRef } from "react";

export default function V294() {
  const labelRef = useRef(null);
  const copyRef = useRef(null);
  const btnRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const label = labelRef.current;
    const copy = copyRef.current;
    const btn = btnRef.current;
    const svg = svgRef.current;

    if (!label || !copy || !btn || !svg) return;

    try {
      label.animate(
        [
          { transform: "translateY(18px)", opacity: 0 },
          { transform: "translateY(0px)", opacity: 1 },
        ],
        { duration: 420, easing: "cubic-bezier(.22,.9,.3,1)", fill: "forwards", delay: 120 }
      );

      copy.animate(
        [
          { transform: "translateY(22px)", opacity: 0 },
          { transform: "translateY(0px)", opacity: 1 },
        ],
        { duration: 520, easing: "cubic-bezier(.22,.9,.3,1)", fill: "forwards", delay: 260 }
      );

      btn.animate(
        [
          { transform: "translateY(26px)", opacity: 0 },
          { transform: "translateY(0px)", opacity: 1 },
        ],
        { duration: 480, easing: "cubic-bezier(.22,.9,.3,1)", fill: "forwards", delay: 420 }
      );

      svg.animate(
        [
          { transform: "translateY(20px) scale(0.9)", opacity: 0 },
          { transform: "translateY(0px) scale(1)", opacity: 1 },
        ],
        { duration: 720, easing: "cubic-bezier(.2,.9,.25,1)", fill: "forwards", delay: 320 }
      );

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

      return () => btn.removeEventListener("mouseenter", onBtnEnter);
    } catch (err) {
      console.warn("Animation error or WAAPI not supported:", err);
    }
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden font-sans"
      style={{
        backgroundColor: "#f6efe4",
        color: "#113f47",
        padding: "40px 0 60px",
      }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Montserrat:wght@700;800&display=swap');

          .meet-img {
            object-fit: cover;
            object-position: 50% 50%;
            width: 90%;
            height: auto;
            border-radius: 24px;
            aspect-ratio: 1;
            box-shadow: 0 12px 24px rgba(0,0,0,0.1);
            transform: scale(1.05);
            
          }

          .right-svg {
            width: 100%;
            height: auto;
            max-width: 600px;
            display: block;
            margin: 0 auto;
          }

          .label-small {
            font-family: 'Montserrat', sans-serif;
            font-weight: 800;
            letter-spacing: 2px;
            font-size: 13px;
            color: #1e5964;
            text-transform: uppercase;
          }

          .headline {
            font-family: 'Pacifico', sans-serif;
            font-size: 26px;
            line-height: 1.5;
            color: #163b44;
            margin: 18px 0;
            text-align: center;
            max-width: 90%;
          }

          .headline strong {
            font-weight: 800;
            font-family: 'Montserrat', sans-serif;
            letter-spacing: 0.6px;
          }

          .underline-accent {
            border-bottom: 3px solid #ef6b6b;
          }

          .cta {
            display: inline-block;
            background: #1f5666;
            color: #fff;
            padding: 12px 28px;
            border-radius: 8px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 800;
            font-size: 14px;
            margin-top: 26px;
            box-shadow: 0 6px 14px rgba(31,86,102,0.15);
            text-decoration: none;
            transition: all 0.2s ease;
          }

          .cta:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 18px rgba(31,86,102,0.25);
          }

          .content-wrapper {
            text-align: center;
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            max-width: 680px;
            margin-top: 40px;
          }

          .label-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 10px;
          }

          @media (min-width: 900px) {
            .right-svg {
              max-width: 680px;
            }
            .headline {
              font-size: 38px;
              line-height: 1.4;
              text-align: left;
              max-width: 600px;
            }
            .content-wrapper {
              text-align: left;
              align-items: flex-start;
              margin-top: 50px;
            }
            .label-row {
              justify-content: flex-start;
            }
          }
        `}
      </style>

      {/* IMAGE SECTION */}
      <div className="w-full flex justify-center ml-20">
        <svg
          ref={svgRef}
          viewBox="0 0 700 700"
          className="right-svg opacity-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <image
            href="https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/68a497999fe4aa483d5d00b6_IMG_4011_crop.jpg"
            width="700"
            height="700"
            className="meet-img"
          />
        </svg>
      </div>

      {/* CONTENT SECTION */}
      <div className="content-wrapper">
        <div ref={labelRef} className="label-row opacity-0">
          <img
            src="https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/6745ca6cec81ee7fac907794_drip.svg"
            alt="drip"
            width="40"
            height="40"
            className="w-10 h-10"
          />
          <div className="label-small">Meet Charlie</div>
        </div>

        <div ref={copyRef} className="opacity-0 ml-10">
          <p className="headline">
            Charlie cares about healthy people on a healthy planet. Inspiring others to do the same.
            Charlie is transparent about what is in the can:{" "}
            <strong>SPARKLING WATER</strong> with a squeeze of{" "}
            <span className="underline-accent">organic</span> fruit.
          </p>
        </div>

        <a ref={btnRef} href="/store-finder" role="button" className="cta opacity-0">
          WHERE TO BUY
        </a>
      </div>
    </div>
  );
}

    import React, { useState, useEffect, useRef } from "react";

    export default function V322() {
    const [stage, setStage] = useState(0);
    const [touched, setTouched] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const rootRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
        if (rootRef.current) {
            const rect = rootRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            setMousePosition({ x, y });
        }
        };

        const rootElement = rootRef.current;
        if (rootElement) {
        rootElement.addEventListener("mousemove", handleMouseMove);
        return () => rootElement.removeEventListener("mousemove", handleMouseMove);
        }
    }, []);

    const handleClick = () => {
        setTouched(true);
        setTimeout(() => setTouched(false), 300);
        if (stage < 3) setStage((s) => s + 1);
    };

    const mouseX = mousePosition.x * 2 - 1;
    const mouseY = mousePosition.y * 2 - 1;

    const globeRotation = mouseX * 5 + mouseY * 3;
    const globeTranslateX = mouseX * 18;
    const globeTranslateY = mouseY * 12;

    const cardMoveX = mouseX * 30;
    const cardMoveY = mouseY * 22;
    const cardRotate = mouseX * 2 + mouseY * 1;

    const parallax1MoveX = mouseX * 12;
    const parallax1MoveY = mouseY * 8;
    const parallax2MoveX = mouseX * 20;
    const parallax2MoveY = mouseY * 14;
    const parallax3MoveX = mouseX * 28;
    const parallax3MoveY = mouseY * 20;

    const overlayStages = [
        { opacity: 0, blur: 0 },
        { opacity: 0.5, blur: 6 },
        { opacity: 0.8, blur: 10 },
        { opacity: 0, blur: 0 },
    ];

    const wedgeStages = [
        { scale: 0, opacity: 0 },
        { scale: 2.2, opacity: 1 },
        { scale: 1.0, opacity: 1 },
        { scale: 0.0, opacity: 0 },
    ];

    const baseCardStages = [
        { x: 0, y: 0, scale: 1 },
        { x: 0, y: 0, scale: 1 },
        { x: 0, y: 0, scale: 1 },
        { x: 0, y: 0, scale: 1 },
    ];

    const overlay = overlayStages[stage];
    const wedge = wedgeStages[stage];
    const cardPose = baseCardStages[stage];

    const cardTransform = touched
        ? `translate(calc(-50% + ${cardPose.x}px), calc(-43.2% + ${cardPose.y}px)) scale(${cardPose.scale})`
        : `translate(calc(-50% + ${cardPose.x + cardMoveX}px), calc(-50% + ${cardPose.y + cardMoveY}px)) scale(${cardPose.scale}) rotate(${cardRotate}deg)`;

    const globeTransform = `translate(${globeTranslateX}px, ${globeTranslateY}px) rotate(${globeRotation}deg)`;

    return (
        <div className="v305-root" ref={rootRef}>
        <div className="panel left">
            <div
            className="parallax-layer parallax-1"
            style={{
                transform: `translate(${parallax1MoveX}px, ${parallax1MoveY}px)`,
                transition: "transform 0.1s ease-out",
            }}
            >
            <div className="parallax-element element-1"></div>
            </div>

            <div
            className="parallax-layer parallax-2"
            style={{
                transform: `translate(${parallax2MoveX}px, ${parallax2MoveY}px)`,
                transition: "transform 0.12s ease-out",
            }}
            >
            <div className="parallax-element element-2"></div>
            </div>

            <div
            className="parallax-layer parallax-3"
            style={{
                transform: `translate(${parallax3MoveX}px, ${parallax3MoveY}px)`,
                transition: "transform 0.15s ease-out",
            }}
            >
            <div className="parallax-element element-3"></div>
            </div>

            <div
            className="globe"
            style={{
                transform: globeTransform,
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            >
            <svg viewBox="0 0 600 600" className="globe-svg" aria-hidden>
                <circle
                cx="300"
                cy="300"
                r="280"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                style={{
                    transform: `rotate(${mouseX * 2}deg)`,
                    transformOrigin: "center",
                    transition: "transform 0.4s ease",
                }}
                />
                <ellipse
                cx="300"
                cy="300"
                rx="280"
                ry="140"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                opacity="0.6"
                style={{
                    transform: `rotate(${mouseY * 3}deg)`,
                    transformOrigin: "center",
                    transition: "transform 0.4s ease",
                }}
                />
            </svg>
            </div>

            <div
            className="card"
            onClick={handleClick}
            style={{
                transform: cardTransform,
                transition: touched
                ? "transform 0.6s cubic-bezier(0.4, 1.6, 0.4, 1), opacity 0.6s ease"
                : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease",
                opacity: stage === 3 ? 0 : 1,
                backgroundImage:
                "url('https://cdn.prod.website-files.com/5e3884b717ebc5d2e8c8691b/5e3884b717ebc53774c8697b_ill-bar-breaker.svg')",
            }}
            >
            <div
                className="card-text"
                style={{
                transform: `translate(${mouseX * 8}px, ${mouseY * 6}px)`,
                transition: "transform 0.3s ease",
                }}
            >
                <div className="small">Click to</div>
                <div className="big">Break</div>
            </div>
            </div>
        </div>

        <div
            className="panel right"
            style={{
            background:
                stage === 3
                ? "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)"
                : "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
            transition: "background 1.2s ease",
            }}
        >
            <div
            className="overlay"
            style={{
                opacity: overlay.opacity,
                backdropFilter: `blur(${overlay.blur}px)`,
            }}
            />

            <div
            className="wedge"
            style={{
                transform: `scaleX(${wedge.scale})`,
                opacity: wedge.opacity,
            }}
            />

            <div
            className="content visible"
            style={{
                opacity: 1,
                transform: "translateY(0)",
                color: stage === 3 ? "#1e1b4b" : "#ffffff",
            }}
            >
            <h1 className="title">
                the <span className="muted">language</span> barrier
            </h1>
            <p className="subtitle">Make your Webflow site multilingual, without code</p>
            <div
                className="badge"
                style={{
                background: stage === 3 ? "#2f6bff" : "#fff",
                color: stage === 3 ? "#fff" : "#1e1b4b",
                }}
            >
                NO CODE
            </div>
            </div>
        </div>

        <style jsx>{`
            @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap");
            .v305-root {
            font-family: "Inter", sans-serif;
            display: flex;
            width: 100%;
            min-height: 100vh;
            overflow: hidden;
            cursor: none;
            align-items: stretch;
            }

            .panel {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            }

            .panel.left,
            .panel.right {
            flex: 1;
            }

            .left {
            background: linear-gradient(135deg, #efe8ff 0%, #f3edff 100%);
            overflow: hidden;
            position: relative;
            }

            .right {
            overflow: hidden;
            position: relative;
            }

            .parallax-layer {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            }
            .parallax-1 { z-index: 1; }
            .parallax-2 { z-index: 2; }
            .parallax-3 { z-index: 3; }

            .parallax-element {
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .element-1 { width: 200px; height: 200px; top: 10%; right: 20%; opacity: 0.3; }
            .element-2 { width: 150px; height: 150px; top: 60%; left: 15%; opacity: 0.4; background: rgba(255,255,255,0.15); }
            .element-3 { width: 100px; height: 100px; top: 30%; right: 10%; opacity: 0.2; background: rgba(255,255,255,0.1); }

            .globe {
            position: absolute;
            left: 5%;
            top: 5%;
            width: 800px;
            height: 800px;
            opacity: 0.28;
            pointer-events: none;
            z-index: 4;
            max-width: 90vw;
            max-height: 90vh;
            }

            .globe-svg { 
            width: 100%; 
            height: 100%; 
            }

            .card {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 400px;
            height: 400px;
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
            filter: drop-shadow(0 18px 42px rgba(6, 12, 40, 0.32));
            display: flex;
            align-items: center;
            justify-content: center;
            user-select: none;
            cursor: pointer;
            z-index: 5;
            transform-origin: center center;
            max-width: 80vw;
            max-height: 80vh;
            }

            .card-text { 
            text-align: center; 
            transition: opacity 0.6s ease; 
            color: #0b1033; 
            z-index: 6; 
            pointer-events: none;
            }
            .small { font-size: 36px; font-weight: 700; }
            .big { font-size: 96px; font-weight: 900; line-height: 0.95; }

            .overlay {
            position: absolute;
            inset: 0;
            background: rgba(79, 119, 255, 0.4);
            z-index: 10;
            transition: opacity 1s cubic-bezier(0.2, 0.9, 0.2, 1),
                backdrop-filter 1s cubic-bezier(0.2, 0.9, 0.2, 1);
            }

            .wedge {
            position: absolute;
            top: 45%;
            left: 0;
            height: 120px;
            width: 100%;
            transform-origin: left center;
            background: linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,1));
            clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
            z-index: 15;
            transition: transform 1s cubic-bezier(0.2, 0.9, 0.2, 1), opacity 1s ease;
            filter: drop-shadow(0 18px 40px rgba(79,119,255,0.25));
            }

            .content {
            position: relative;
            z-index: 20;
            max-width: 600px;
            padding: 40px;
            opacity: 1;
            transform: translateY(0);
            transition: transform 1s cubic-bezier(0.2, 0.9, 0.2, 1), opacity 1s cubic-bezier(0.2, 0.9, 0.2, 1);
            }

            .title { font-size: 72px; font-weight: 900; margin: 0; }
            .muted { opacity: 0.4; }
            .subtitle { font-size: 32px; font-weight: 700; margin-top: 10px; }

            .badge {
            position: absolute;
            right: 8%;
            top: 12%;
            font-weight: 800;
            padding: 8px 14px;
            border-radius: 6px;
            transform: translateY(0) scale(1);
            box-shadow: 0 10px 30px rgba(244,244,244,0.16);
            transition: all 0.6s ease;
            }

            /* ===== MOBILE-LIKE: keep side-by-side but scale down sizes ===== */
            @media (max-width: 900px) {
            .v305-root {
                flex-direction: row;
                min-height: 780px;
            }

            /* narrower left column and slightly wider right to match poster */
            .panel.left { flex: 0 0 40%; max-width: 40%; }
            .panel.right { flex: 0 0 60%; max-width: 60%; }

            /* globe scaled down and contained */
            .globe {
                left: 2%;
                top: 4%;
                width: 400px;
                height: 400px;
                opacity: 0.26;
                max-width: 85vw;
                max-height: 85vh;
            }

            /* card shrunk and repositioned to sit over the triangle */
            .card {
                width: 220px;
                height: 220px;
                left: 50%;
                top: 50%;
                background-size: 70%;
                filter: drop-shadow(0 10px 28px rgba(6, 12, 40, 0.28));
                max-width: 75vw;
                max-height: 75vh;
            }

            .small { font-size: 24px; }
            .big { font-size: 40px; }

            .element-1 { width: 110px; height: 110px; top: 8%; right: 14%; opacity: 0.28; }
            .element-2 { width: 80px; height: 80px; top: 62%; left: 6%; opacity: 0.36; }
            .element-3 { width: 56px; height: 56px; top: 30%; right: 6%; opacity: 0.18; }

            .wedge { top: 47%; height: 84px; filter: drop-shadow(0 10px 28px rgba(79,119,255,0.18)); }

            .content { padding: 22px; max-width: 320px; }
            .title { font-size: 38px; line-height: 1.02; }
            .subtitle { font-size: 16px; font-weight: 700; margin-top: 14px; }

            .badge {
                right: 6%;
                top: 8%;
                padding: 6px 12px;
                font-size: 12px;
            }
            }

            /* Very small phones: further shrinking */
            @media (max-width: 420px) {
            .v305-root { min-height: 720px; }
            .panel.left { flex-basis: 42%; max-width: 42%; }
            .panel.right { flex-basis: 58%; max-width: 58%; }

            .globe { 
                width: 320px; 
                height: 320px; 
                left: 1%; 
                top: 5%; 
                opacity: 0.24; 
                max-width: 80vw;
                max-height: 80vh;
            }
            
            .card { 
                width: 180px; 
                height: 180px; 
                left: 59%; 
                top: 50%; 
                background-size: 65%; 
                max-width: 70vw;
                max-height: 70vh;
            }
            
            .small { font-size: 20px; }
            .big { font-size: 30px; }
            .title { font-size: 34px; }
            .subtitle { font-size: 14px; }
            .wedge { height: 72px; top: 48%; }
            }

            /* Extra small screens */
            @media (max-width: 320px) {
            .globe { 
                width: 280px; 
                height: 280px; 
                left: 0%; 
                top: 3%; 
            }
            
            .card { 
                width: 160px; 
                height: 160px; 
                background-size: 60%; 
            }
            
            .small { font-size: 18px; }
            .big { font-size: 38px; }
            }
        `}</style>
        </div>
    );
    }
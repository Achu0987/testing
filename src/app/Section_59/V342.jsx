
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { EdgesGeometry, LineSegments, Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function prepareDraw(el) {
  if (!el) return 0;
  let len;
  const tag = el.tagName.toLowerCase();
  if (tag === "circle") {
    const r = el.getAttribute("r") || 0;
    len = 2 * Math.PI * parseFloat(r);
  } else if (tag === "line") {
    const x1 = parseFloat(el.getAttribute("x1") || 0);
    const y1 = parseFloat(el.getAttribute("y1") || 0);
    const x2 = parseFloat(el.getAttribute("x2") || 0);
    const y2 = parseFloat(el.getAttribute("y2") || 0);
    len = Math.hypot(x2 - x1, y2 - y1);
  } else {
    try {
      len = el.getTotalLength();
    } catch (e) {
      len = 0;
    }
  }
  el.style.strokeDasharray = len;
  el.style.strokeDashoffset = len;
  // store for later
  el.__drawLength = len;
  return len;
}

class SceneWrapper {
  constructor(container, model) {
    this.container = container;
    this.views = [
      { bottom: 0, height: 1 },
      { bottom: 0, height: 0 }, // second view used for edge overlay (like original)
    ];

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // append to container div (React ref)
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    for (let ii = 0; ii < this.views.length; ++ii) {
      const view = this.views[ii];
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        2000
      );
      camera.position.fromArray([0, 0, 180]);
      camera.layers.disableAll();
      camera.layers.enable(ii);
      view.camera = camera;
      camera.lookAt(new THREE.Vector3(0, 5, 0));
    }

    // lighting
    this.light = new THREE.PointLight(0xffffff, 0.75);
    this.light.position.z = 150;
    this.light.position.x = 70;
    this.light.position.y = -20;
    this.scene.add(this.light);

    this.softLight = new THREE.AmbientLight(0xffffff, 1.5);
    this.scene.add(this.softLight);

    // create edge lines from model geometry (first child assumed)
    const modelChild = model.children && model.children[0] ? model.children[0] : null;
    let edges;
    if (modelChild && modelChild.geometry) {
      edges = new EdgesGeometry(modelChild.geometry);
    } else {
      edges = new EdgesGeometry(new THREE.BoxGeometry(1, 1, 1));
    }
    const line = new LineSegments(edges);
    line.material.depthTest = false;
    line.material.opacity = 0.5;
    line.material.transparent = true;
    line.position.x = 0.5;
    line.position.z = -1;
    line.position.y = 0.2;

    this.modelGroup = new Group();

    model.traverse((c) => {
      // ensure each mesh casts/receives shadows where appropriate
      if (c.isMesh) {
        c.castShadow = true;
        c.receiveShadow = true;
      }
    });

    model.layers.set(0);
    line.layers.set(1);

    this.modelGroup.add(model);
    this.modelGroup.add(line);
    this.scene.add(this.modelGroup);

    this.onResize = this.onResize.bind(this);
    window.addEventListener("resize", this.onResize, false);
    this.onResize();
  }

  render = () => {
    for (let ii = 0; ii < this.views.length; ++ii) {
      const view = this.views[ii];
      const camera = view.camera;

      const bottom = Math.floor(this.h * view.bottom);
      const height = Math.floor(this.h * view.height);

      this.renderer.setViewport(0, 0, this.w, this.h);
      this.renderer.setScissor(0, bottom, this.w, height);
      this.renderer.setScissorTest(true);

      camera.aspect = this.w / this.h;
      this.renderer.render(this.scene, camera);
    }
  };

  onResize() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    for (let ii = 0; ii < this.views.length; ++ii) {
      const view = this.views[ii];
      const camera = view.camera;
      camera.aspect = this.w / this.h;
      const camZ = screen.width - this.w / 1;
      // keep a minimum camera Z similar to original
      camera.position.z = camZ < 180 ? 180 : camZ;
      camera.updateProjectionMatrix();
    }

    this.renderer.setSize(this.w, this.h);
    this.render();
  }

  dispose() {
    try {
      window.removeEventListener("resize", this.onResize, false);
      this.renderer.forceContextLoss();
      this.renderer.dispose();
    } catch (e) {
      // swallow
    }
  }
}

export default function V342() {
  const mountRef = useRef(null);
  const svgRef = useRef(null);
  const lineRef = useRef(null);
  const wingRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    let sceneWrapper = null;
    let masterScrollTriggers = []; // to allow cleanup
    let modelObject = null;

    // prepare svg draws
    const lineEl = lineRef.current;
    const wingEl = wingRef.current;
    const circleEl = circleRef.current;

    [lineEl, wingEl, circleEl].forEach((el) => {
      try {
        prepareDraw(el);
      } catch (e) {
        // ignore
      }
    });

    function onModelLoaded(object) {
      // apply material to all children meshes like original
      object.traverse(function (child) {
        if (child.isMesh) {
          const mat = new THREE.MeshPhongMaterial({
            color: 0x171511,
            specular: 0xd0cbc7,
            shininess: 5,
            flatShading: true,
          });
          child.material = mat;
        }
      });

      setupAnimation(object);
    }

    function loadModel() {
      const manager = new THREE.LoadingManager(() => {
        // when all loaded
        if (modelObject) onModelLoaded(modelObject);
      });
      manager.onProgress = (item, loaded, total) => {
        // console.log(item, loaded, total);
      };

      const loader = new OBJLoader(manager);
      loader.load(
        "https://assets.codepen.io/557388/1405+Plane_1.obj",
        function (obj) {
          modelObject = obj;
          // if manager already finished (maybe), call onModelLoaded
          // otherwise onModelLoaded will be triggered by manager's final callback in this simple flow
          if (manager.isLoading === false) {
            onModelLoaded(modelObject);
          } else {
            // manager callback will call onModelLoaded
          }
        },
        undefined,
        function (err) {
          console.error("OBJ load error", err);
        }
      );
    }

    function setupAnimation(model) {
      if (!mountRef.current) return;
      sceneWrapper = new SceneWrapper(mountRef.current, model);
      const planeGroup = sceneWrapper.modelGroup;

      // show canvas (fade-in)
      gsap.set(sceneWrapper.renderer.domElement, { autoAlpha: 0, x: "50%" });
      gsap.to(sceneWrapper.renderer.domElement, { duration: 1, x: "0%", autoAlpha: 1 });

      // Make svg visible
      if (svgRef.current) {
        gsap.set(svgRef.current, { autoAlpha: 1 });
      }

      // set initial transforms like original
      const tau = Math.PI * 2;
      gsap.set(planeGroup.rotation, { y: tau * -0.25 });
      gsap.set(planeGroup.position, { x: 80, y: -32, z: -60 });

      // ensure initial render
      sceneWrapper.render();

      // Parallax for ground and clouds (using class selectors, keep elements present in DOM)
      masterScrollTriggers.push(
        gsap.to(".ground", {
          y: "30%",
          scrollTrigger: {
            trigger: ".ground-container",
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        })
      );

      masterScrollTriggers.push(
        gsap.from(".clouds", {
          y: "25%",
          scrollTrigger: {
            trigger: ".ground-container",
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        })
      );

      // SVG draw animations (we animate strokeDashoffset)
      const makeDrawTo = (el, opts) => {
        const len = el.__drawLength || prepareDraw(el) || 1;
        // animate strokeDashoffset to 0 when scrolling in
        return gsap.to(el.style, {
          strokeDashoffset: 0,
          ease: opts.ease || "none",
          scrollTrigger: opts.scrollTrigger,
          duration: opts.duration || 1,
        });
      };
      const makeDrawOut = (el, opts) => {
        const len = el.__drawLength || prepareDraw(el) || 1;
        return gsap.to(el.style, {
          strokeDashoffset: len,
          ease: opts.ease || "none",
          scrollTrigger: opts.scrollTrigger,
          duration: opts.duration || 1,
        });
      };

      masterScrollTriggers.push(
        makeDrawTo(lineEl, {
          scrollTrigger: {
            trigger: ".length",
            scrub: true,
            start: "top bottom",
            end: "top top",
          },
        })
      );

      masterScrollTriggers.push(
        makeDrawTo(wingEl, {
          scrollTrigger: {
            trigger: ".wingspan",
            scrub: true,
            start: "top 25%",
            end: "bottom 50%",
          },
        })
      );

      masterScrollTriggers.push(
        makeDrawTo(circleEl, {
          scrollTrigger: {
            trigger: ".phalange",
            scrub: true,
            start: "top 50%",
            end: "bottom 100%",
          },
        })
      );

      masterScrollTriggers.push(
        makeDrawOut(lineEl, {
          scrollTrigger: {
            trigger: ".length",
            scrub: true,
            start: "top top",
            end: "bottom top",
          },
        })
      );

      masterScrollTriggers.push(
        makeDrawOut(wingEl, {
          scrollTrigger: {
            trigger: ".wingspan",
            scrub: true,
            start: "top top",
            end: "bottom top",
          },
        })
      );

      masterScrollTriggers.push(
        makeDrawOut(circleEl, {
          scrollTrigger: {
            trigger: ".phalange",
            scrub: true,
            start: "top top",
            end: "bottom top",
          },
        })
      );

      // Views animation for 'blueprint' splitting effect
      masterScrollTriggers.push(
        gsap.fromTo(
          sceneWrapper.views[1],
          { height: 1, bottom: 0 },
          {
            height: 0,
            bottom: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".blueprint",
              scrub: true,
              start: "bottom bottom",
              end: "bottom top",
            },
          }
        )
      );

      masterScrollTriggers.push(
        gsap.fromTo(
          sceneWrapper.views[1],
          { height: 0, bottom: 0 },
          {
            height: 1,
            bottom: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".blueprint",
              scrub: true,
              start: "top bottom",
              end: "top top",
            },
          }
        )
      );

      // main timeline driving 3D model transforms
      const sectionDuration = 1;
      const tl = gsap.timeline({
        onUpdate: sceneWrapper.render,
        scrollTrigger: {
          trigger: ".content",
          scrub: true,
          start: "top top",
          end: "bottom bottom",
        },
        defaults: { duration: sectionDuration, ease: "power2.inOut" },
      });

      let delay = 0;
      tl.to(".scroll-cta", { duration: 0.25, opacity: 0 }, delay);
      tl.to(planeGroup.position, { x: -10, ease: "power1.in" }, delay);

      delay += sectionDuration;
      tl.to(
        planeGroup.rotation,
        { x: tau * 0.25, y: 0, z: -tau * 0.05, ease: "power1.inOut" },
        delay
      );
      tl.to(planeGroup.position, { x: -40, y: 0, z: -60, ease: "power1.inOut" }, delay);

      delay += sectionDuration;
      tl.to(
        planeGroup.rotation,
        { x: tau * 0.25, y: 0, z: tau * 0.05, ease: "power3.inOut" },
        delay
      );
      tl.to(planeGroup.position, { x: 40, y: 0, z: -60, ease: "power2.inOut" }, delay);

      delay += sectionDuration;
      tl.to(
        planeGroup.rotation,
        { x: tau * 0.2, y: 0, z: -tau * 0.1, ease: "power3.inOut" },
        delay
      );
      tl.to(planeGroup.position, { x: -40, y: 0, z: -30, ease: "power2.inOut" }, delay);

      delay += sectionDuration;
      tl.to(planeGroup.rotation, { x: 0, z: 0, y: tau * 0.25 }, delay);
      tl.to(planeGroup.position, { x: 0, y: -10, z: 50 }, delay);

      delay += sectionDuration;
      delay += sectionDuration;

      tl.to(
        planeGroup.rotation,
        { x: tau * 0.25, y: tau * 0.5, z: 0, ease: "power4.inOut" },
        delay
      );
      tl.to(planeGroup.position, { z: 30, ease: "power4.inOut" }, delay);

      delay += sectionDuration;
      tl.to(
        planeGroup.rotation,
        { x: tau * 0.25, y: tau * 0.5, z: 0, ease: "power4.inOut" },
        delay
      );
      tl.to(planeGroup.position, { z: 60, x: 30, ease: "power4.inOut" }, delay);

      delay += sectionDuration;
      tl.to(
        planeGroup.rotation,
        { x: tau * 0.35, y: tau * 0.75, z: tau * 0.6, ease: "power4.inOut" },
        delay
      );
      tl.to(planeGroup.position, { z: 100, x: 20, y: 0, ease: "power4.inOut" }, delay);

      delay += sectionDuration;
      tl.to(
        planeGroup.rotation,
        { x: tau * 0.15, y: tau * 0.85, z: -tau * 0, ease: "power1.in" },
        delay
      );
      tl.to(planeGroup.position, { z: -150, x: 0, y: 0, ease: "power1.inOut" }, delay);

      delay += sectionDuration;
      tl.to(
        planeGroup.rotation,
        {
          duration: sectionDuration,
          x: -tau * 0.05,
          y: tau,
          z: -tau * 0.1,
          ease: "none",
        },
        delay
      );
      tl.to(
        planeGroup.position,
        { duration: sectionDuration, x: 0, y: 30, z: 320, ease: "power1.in" },
        delay
      );

      tl.to(sceneWrapper.light.position, { duration: sectionDuration, x: 0, y: 0, z: 0 }, delay);
    }

    loadModel();

    // Cleanup on unmount
    return () => {
      try {
        masterScrollTriggers.forEach((t) => {
          try {
            if (t.scrollTrigger) t.scrollTrigger.kill();
            t.kill && t.kill();
          } catch (e) {}
        });
        ScrollTrigger.getAll().forEach((st) => st.kill());
        gsap.killTweensOf("*");
        if (sceneWrapper) {
          sceneWrapper.dispose();
          sceneWrapper = null;
        }
      } catch (e) {
        // silent
      }
    };
  }, []);

  // Inline styles (mirrors original CSS but inline)
  const rootStyles = {
    margin: 0,
    minHeight: "100vh",
    minWidth: "100vw",
    fontFamily: "'Libre Baskerville', serif",
    backgroundColor: "#D0CBC7",
    fontWeight: 400,
    fontSize: "16px",
    overflowX: "hidden",
    position: "relative",
  };

  const contentStyle = { position: "relative", zIndex: 1 };

  const sectionBase = {
    position: "relative",
    padding: "10vmin",
    width: "calc(100vw - 20vmin)",
    height: "calc(100vh - 20vmin)",
    margin: "0 auto",
    zIndex: 2,
    boxSizing: "border-box",
  };

  const blueprintStyle = {
    position: "relative",
    backgroundColor: "#131C2A",
    overflow: "visible",
    // keep backgrounds via inline backgroundImage as in original CSS
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
    backgroundSize: "100px 100px,100px 100px,20px 20px,20px 20px",
    backgroundPosition: "-2px -2px,-2px -2px,-1px -1px,-1px -1px",
    backgroundAttachment: "fixed",
  };

  const groundContainerStyle = { position: "relative", overflow: "hidden" };

  const parallaxBase = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "-100px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    backgroundSize: "cover",
    transformOrigin: "top center",
  };

  const groundStyle = {
    ...parallaxBase,
    zIndex: -1,
    backgroundImage: 'url("https://assets.codepen.io/557388/background-reduced.jpg")',
  };

  const cloudsStyle = {
    ...parallaxBase,
    zIndex: 2,
    backgroundImage: 'url("https://assets.codepen.io/557388/clouds.png")',
  };

  const planeCanvasContainerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: 20,
  };

  const svgStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    stroke: "white",
    pointerEvents: "none",
    zIndex: 30,
    visibility: "visible",
    opacity: 1,
  };

  const headingLarge = {
    fontSize: "8vw",
    margin: "0 0 2vmin 0",
    fontWeight: 700,
    display: "inline",
  };

  const h2Style = { fontSize: "8vw", margin: "0 0 2vmin 0", fontWeight: 700, display: "inline" };

  const sectionDark = { color: "white", backgroundColor: "black" };

  const sunsetStyle = {
    background: 'url("https://assets.codepen.io/557388/sunset-reduced.jpg") no-repeat top center',
    backgroundSize: "cover",
  };

  const creditsStyle = { position: "absolute", bottom: "10vmin" };

  // Render JSX with inline styles
  return (
    <div style={rootStyles}>
      {/* Three.js canvas will be appended inside this div */}
      <div
        ref={mountRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 25,
        }}
        aria-hidden="true"
      />

      <div style={contentStyle} className="content">
        <div className="section" style={sectionBase}>
          <h1 style={headingLarge}>Airplanes.</h1>
          <h3 style={{ fontSize: "4vw", fontWeight: 400, margin: 0 }}>The beginners guide.</h3>
          <p>You've probably forgotten what these are.</p>
          <div className="scroll-cta" style={{ fontSize: "4vw", opacity: 0 }}>
            Scroll
          </div>
        </div>

        <div className="section right" style={{ ...sectionBase, textAlign: "right" }}>
          <h2 style={h2Style}>They're kinda like buses...</h2>
        </div>

        <div className="ground-container" style={groundContainerStyle}>
          <div className="parallax ground" style={groundStyle} />

          <div className="section right" style={{ ...sectionBase, textAlign: "right" }}>
            <h2 style={h2Style}>..except they leave the ground.</h2>
            <p>Saaay what!?.</p>
          </div>

          <div className="section" style={sectionBase}>
            <h2 style={h2Style}>They fly through the sky.</h2>
            <p>For realsies!</p>
          </div>

          <div className="section right" style={{ ...sectionBase, textAlign: "right" }}>
            <h2 style={h2Style}>Defying all known physical laws.</h2>
            <p>It's actual magic!</p>
          </div>

          <div className="parallax clouds" style={cloudsStyle} />
        </div>

        <div className="blueprint" style={blueprintStyle}>
          <svg
            ref={svgRef}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            id="bp-svg"
            aria-hidden="true"
            style={svgStyle}
          >
            <line
              id="line-length"
              ref={lineRef}
              x1="10"
              y1="80"
              x2="90"
              y2="80"
              strokeWidth="0.5"
              stroke="white"
              fill="transparent"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="line-wingspan"
              ref={wingRef}
              d="M10 50 L40 35 M60 35 L90 50"
              strokeWidth="0.5"
              stroke="white"
              fill="transparent"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              id="circle-phalange"
              ref={circleRef}
              cx="60"
              cy="60"
              r="15"
              strokeWidth="0.5"
              stroke="white"
              fill="transparent"
            />
          </svg>

          <div className="section dark" style={{ ...sectionBase, ...sectionDark }}>
            <h2 style={{ margin: 0 }}>The facts and figures.</h2>
            <p>Lets get into the nitty gritty...</p>
          </div>

          <div className="section dark length" style={{ ...sectionBase, ...sectionDark }}>
            <h2 style={{ margin: 0 }}>Length.</h2>
            <p>Long.</p>
          </div>

          <div className="section dark wingspan" style={{ ...sectionBase, ...sectionDark }}>
            <h2 style={{ margin: 0 }}>Wing Span.</h2>
            <p>I dunno, longer than a cat probably.</p>
          </div>

          <div className="section dark phalange" style={{ ...sectionBase, ...sectionDark }}>
            <h2 style={{ margin: 0 }}>Left Phalange</h2>
            <p>Missing</p>
          </div>

          <div className="section dark" style={{ ...sectionBase, ...sectionDark }}>
            <h2 style={{ margin: 0 }}>Engines</h2>
            <p>Turbine funtime</p>
          </div>
        </div>

        <div className="sunset" style={sunsetStyle}>
          <div className="section" style={sectionBase} />
          <div className="section end" style={{ ...sectionBase }}>
            <h2 style={{ marginBottom: "50vh" }}>Fin.</h2>
            <ul className="credits" style={creditsStyle}>
              <li>
                Plane model by{" "}
                <a
                  href="https://poly.google.com/view/8ciDd9k8wha"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  Google
                </a>
              </li>
              <li>
                Animated using{" "}
                <a
                  href="https://greensock.com/scrolltrigger/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  GSAP ScrollTrigger
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

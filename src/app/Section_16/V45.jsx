import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

// V45.jsx
// Full React component that reproduces the 3D globe / fullscreen lightbox design
// Added: Previous / Next arrows in the lightbox + keyboard navigation

export default function V45() {
  const containerRef = useRef(null);
  const controllerRef = useRef(null);
  const joystickRef = useRef(null);
  const lightboxRef = useRef(null);
  const lbImgRef = useRef(null);
  const lbTitleRef = useRef(null);
  const lbDescRef = useRef(null);
  const lbLinkRef = useRef(null);
  const lbPrevRef = useRef(null);
  const lbNextRef = useRef(null);

  useEffect(() => {
    // === SETTINGS & DOM refs ===
    const container = containerRef.current;
    const controller = controllerRef.current;
    const joystick = joystickRef.current;
    const lightbox = lightboxRef.current;
    const lbImg = lbImgRef.current;
    const lbTitle = lbTitleRef.current;
    const lbDesc = lbDescRef.current;
    const lbLink = lbLinkRef.current;
    const lbPrev = lbPrevRef.current;
    const lbNext = lbNextRef.current;

    const CSS = getComputedStyle(document.documentElement);
    const R = parseFloat(CSS.getPropertyValue("--radius")) || 420;
    const CARD_W = parseFloat(CSS.getPropertyValue("--card-w")) || 120;
    const CARD_H = parseFloat(CSS.getPropertyValue("--card-h")) || 90;
    const N = 100;

    // image urls (same as original)
    const imageUrls = [
      "https://openpurpose.com/gravity/nothing/preview/10.webp",
      "https://openpurpose.com/gravity/nothing/preview/9.webp",
      "https://openpurpose.com/gravity/nothing/preview/8.webp",
      "https://openpurpose.com/gravity/nothing/preview/7.webp",
      "https://openpurpose.com/gravity/nothing/preview/6.webp",
      "https://openpurpose.com/gravity/nothing/preview/5.webp",
      "https://openpurpose.com/gravity/nothing/preview/4.webp",
      "https://openpurpose.com/gravity/nothing/preview/3.webp",
      "https://openpurpose.com/gravity/nothing/preview/2.webp",
      "https://openpurpose.com/gravity/nothing/preview/1.webp",
      "https://openpurpose.com/gravity/nothing/preview/20.webp",
      "https://openpurpose.com/gravity/nothing/preview/19.webp",
      "https://openpurpose.com/gravity/nothing/preview/18.webp",
      "https://openpurpose.com/gravity/nothing/preview/17.webp",
      "https://openpurpose.com/gravity/nothing/preview/16.webp",
      "https://openpurpose.com/gravity/nothing/preview/15.webp",
      "https://openpurpose.com/gravity/nothing/preview/14.webp",
      "https://openpurpose.com/gravity/nothing/preview/13.webp",
      "https://openpurpose.com/gravity/nothing/preview/12.webp",
      "https://openpurpose.com/gravity/nothing/preview/11.webp",
      "https://openpurpose.com/gravity/nothing/preview/30.webp",
      "https://openpurpose.com/gravity/nothing/preview/29.webp",
      "https://openpurpose.com/gravity/nothing/preview/28.webp",
      "https://openpurpose.com/gravity/nothing/preview/27.webp",
      "https://openpurpose.com/gravity/nothing/preview/26.webp",
      "https://openpurpose.com/gravity/nothing/preview/25.webp",
      "https://openpurpose.com/gravity/nothing/preview/24.webp",
      "https://openpurpose.com/gravity/nothing/preview/24.webp",
      "https://openpurpose.com/gravity/nothing/preview/23.webp",
      "https://openpurpose.com/gravity/nothing/preview/22.webp",
      "https://openpurpose.com/gravity/nothing/preview/21.webp",
      "https://openpurpose.com/gravity/nothing/preview/40.webp",
      "https://openpurpose.com/gravity/nothing/preview/39.webp",
      "https://openpurpose.com/gravity/nothing/preview/38.webp",
      "https://openpurpose.com/gravity/nothing/preview/37.webp",
      "https://openpurpose.com/gravity/nothing/preview/36.webp",
      "https://openpurpose.com/gravity/nothing/preview/35.webp",
      "https://openpurpose.com/gravity/nothing/preview/34.webp",
      "https://openpurpose.com/gravity/nothing/preview/33.webp",
      "https://openpurpose.com/gravity/nothing/preview/32.webp",
      "https://openpurpose.com/gravity/nothing/preview/31.webp",
      "https://openpurpose.com/gravity/nothing/preview/50.webp",
      "https://openpurpose.com/gravity/nothing/preview/49.webp",
      "https://openpurpose.com/gravity/nothing/preview/48.webp",
      "https://openpurpose.com/gravity/nothing/preview/47.webp",
      "https://openpurpose.com/gravity/nothing/preview/46.webp",
      "https://openpurpose.com/gravity/nothing/preview/45.webp",
      "https://openpurpose.com/gravity/nothing/preview/44.webp",
      "https://openpurpose.com/gravity/nothing/preview/43.webp",
      "https://openpurpose.com/gravity/nothing/preview/42.webp",
      "https://openpurpose.com/gravity/nothing/preview/41.webp",
      "https://openpurpose.com/gravity/nothing/preview/60.webp",
      "https://openpurpose.com/gravity/nothing/preview/59.webp",
      "https://openpurpose.com/gravity/nothing/preview/58.webp",
      "https://openpurpose.com/gravity/nothing/preview/57.webp",
      "https://openpurpose.com/gravity/nothing/preview/56.webp",
      "https://openpurpose.com/gravity/nothing/preview/55.webp",
      "https://openpurpose.com/gravity/nothing/preview/54.webp",
      "https://openpurpose.com/gravity/nothing/preview/53.webp",
      "https://openpurpose.com/gravity/nothing/preview/52.webp",
      "https://openpurpose.com/gravity/nothing/preview/51.webp",
      "https://openpurpose.com/gravity/nothing/preview/70.webp",
      "https://openpurpose.com/gravity/nothing/preview/69.webp",
      "https://openpurpose.com/gravity/nothing/preview/68.webp",
      "https://openpurpose.com/gravity/nothing/preview/67.webp",
      "https://openpurpose.com/gravity/nothing/preview/66.webp",
      "https://openpurpose.com/gravity/nothing/preview/65.webp",
      "https://openpurpose.com/gravity/nothing/preview/64.webp",
      "https://openpurpose.com/gravity/nothing/preview/63.webp",
      "https://openpurpose.com/gravity/nothing/preview/62.webp",
      "https://openpurpose.com/gravity/nothing/preview/61.webp",
      "https://openpurpose.com/gravity/nothing/preview/80.webp",
      "https://openpurpose.com/gravity/nothing/preview/79.webp",
      "https://openpurpose.com/gravity/nothing/preview/78.webp",
      "https://openpurpose.com/gravity/nothing/preview/77.webp",
      "https://openpurpose.com/gravity/nothing/preview/76.webp",
      "https://openpurpose.com/gravity/nothing/preview/75.webp",
      "https://openpurpose.com/gravity/nothing/preview/74.webp",
      "https://openpurpose.com/gravity/nothing/preview/73.webp",
      "https://openpurpose.com/gravity/nothing/preview/72.webp",
      "https://openpurpose.com/gravity/nothing/preview/71.webp",
      "https://openpurpose.com/gravity/nothing/preview/90.webp",
      "https://openpurpose.com/gravity/nothing/preview/89.webp",
    ];

    // Build metadata for each image (title, description, link).
    const imageData = imageUrls.map((u, i) => ({
      uri: u,
      title: `Artwork ${i + 1}`,
      description: `This is a short description for artwork ${i + 1}. Replace with a real description if available.`,
      link: u,
    }));

    // === THREE.JS SETUP ===
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 10000);
    camera.position.set(0, 0, R * 6);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    const globe = new THREE.Group();
    scene.add(globe);

    const loader = new THREE.TextureLoader();

    // === CARDS ===
    const items = [];
    let loadedCount = 0;

    function createCards(n) {
      const geom = new THREE.PlaneGeometry(CARD_W, CARD_H);
      for (let i = 0; i < n; i++) {
        const meta = imageData[i % imageData.length];
        const imageUrl = meta.uri;
        const mat = new THREE.MeshBasicMaterial({
          color: 0x666666,
          transparent: true,
          side: THREE.DoubleSide,
        });
        const m = new THREE.Mesh(geom, mat);
        m.userData.index = i;
        m.userData.imageUrl = imageUrl;
        m.userData.title = meta.title;
        m.userData.description = meta.description;
        m.userData.link = meta.link;
        globe.add(m);
        items.push({ mesh: m, uri: imageUrl, title: meta.title, description: meta.description, link: meta.link });

        loader.load(
          imageUrl,
          (texture) => {
            texture.minFilter = THREE.LinearFilter;
            mat.map = texture;
            mat.color.set(0xffffff);
            mat.needsUpdate = true;
            loadedCount++;
          },
          undefined,
          (err) => console.warn("texture failed", err)
        );
      }
      placeOnSphere();
    }

    function placeOnSphere() {
      const N = items.length;
      const gapFactor = 1.08;
      for (let i = 0; i < N; i++) {
        const k = i + 0.5;
        const phi = Math.acos(1 - 2 * k / N);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const x = R * gapFactor * Math.sin(phi) * Math.cos(theta);
        const y = R * gapFactor * Math.cos(phi);
        const z = R * gapFactor * Math.sin(phi) * Math.sin(theta);
        const m = items[i].mesh;
        m.position.set(x, y, z);
        m.lookAt(0, 0, 0);
        m.rotateY(Math.PI);
      }
    }

    // resize
    function onResize() {
      const w = container.clientWidth,
        h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", onResize);
    onResize();

    // rotation state
    let rot = { x: -10 * Math.PI / 180, y: 0 };
    let target = { x: rot.x, y: rot.y };
    let dragging = false;
    let last = { x: 0, y: 0, t: 0 };
    let vel = { x: 0, y: 0 };
    let isInteracting = false;

    // pointer/drag handlers (named so we can remove them)
    function onControllerPointerDown(e) {
      e.stopPropagation();
      dragging = true;
      isInteracting = true;
      last = { x: e.clientX, y: e.clientY, t: performance.now() };
      controller.setPointerCapture && controller.setPointerCapture(e.pointerId);
    }

    let jsDragging = false;
    let jsStart = { x: 0, y: 0 };
    function onJoystickPointerDown(e) {
      e.stopPropagation();
      jsDragging = true;
      isInteracting = true;
      jsStart = { x: e.clientX, y: e.clientY };
      joystick.setPointerCapture && joystick.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e) {
      if (dragging) {
        const now = performance.now();
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        const dt = Math.max(1, now - last.t);
        target.y += dx * 0.006;
        target.x += dy * 0.004;
        target.x = Math.max(Math.min(target.x, Math.PI * 60 / 180), -Math.PI * 60 / 180);
        vel.x = dx / dt;
        vel.y = dy / dt;
        last = { x: e.clientX, y: e.clientY, t: now };
      } else if (jsDragging) {
        const dx = e.clientX - jsStart.x;
        const dy = e.clientY - jsStart.y;
        target.y += dx * 0.004;
        target.x += dy * 0.004;
        target.x = Math.max(Math.min(target.x, Math.PI * 60 / 180), -Math.PI * 60 / 180);
        jsStart = { x: e.clientX, y: e.clientY };
      }
    }

    function onPointerUp(e) {
      if (dragging) {
        dragging = false;
        isInteracting = false;
        gsap.to(target, {
          duration: 1.6,
          y: "+=" + vel.x * 600 * 0.006,
          x: "+=" + vel.y * 600 * 0.004,
          ease: "power3.out",
          onComplete: () => {
            isInteracting = false;
          },
        });
      }
      if (jsDragging) {
        jsDragging = false;
        isInteracting = false;
      }
    }

    // auto-rotation
    const autoSpeed = 0.0001;
    let lastTime = performance.now();

    function markFront() {
      const camDir = new THREE.Vector3(0, 0, -1).applyMatrix4(new THREE.Matrix4().extractRotation(camera.matrixWorld));
      let best = null,
        bestZ = -Infinity;
      items.forEach((it) => {
        const v = it.mesh.position.clone().sub(camera.position);
        const z = v.dot(camDir);
        if (z > bestZ) {
          bestZ = z;
          best = it;
        }
      });
      items.forEach((it) => {
        if (it === best) gsap.to(it.mesh.scale, { x: 1.12, y: 1.12, duration: 0.25 });
        else gsap.to(it.mesh.scale, { x: 1, y: 1, duration: 0.25 });
      });
    }

    function getFrontItem() {
      const camDir = new THREE.Vector3(0, 0, -1).applyMatrix4(new THREE.Matrix4().extractRotation(camera.matrixWorld));
      let best = null,
        bestZ = -Infinity;
      items.forEach((it) => {
        const wp = new THREE.Vector3();
        it.mesh.getWorldPosition(wp);
        const v = wp.clone().sub(camera.position);
        const z = v.dot(camDir);
        if (z > bestZ) {
          bestZ = z;
          best = it;
        }
      });
      return best;
    }

    // overlay zoom
    let overlayMesh = null;
    let zoomedOut = false;

    function onControllerClick(e) {
      e.stopPropagation();
      if (overlayMesh) {
        const original = overlayMesh.userData.original;
        if (original) {
          gsap.to(overlayMesh.position, { x: original.pos.x, y: original.pos.y, z: original.pos.z, duration: 0.6, ease: "power2.out" });
          gsap.to(overlayMesh.scale, { x: original.scale.x, y: original.scale.y, z: original.scale.z, duration: 0.6, ease: "power2.out" });
          const startQ = overlayMesh.quaternion.clone();
          const endQ = original.quat.clone();
          const qt = { t: 0 };
          gsap.to(qt, {
            t: 1,
            duration: 0.6,
            ease: "power2.out",
            onUpdate: () => {
              overlayMesh.quaternion.copy(startQ).slerp(endQ, qt.t);
            },
            onComplete: () => {
              scene.remove(overlayMesh);
              try {
                overlayMesh.geometry.dispose && overlayMesh.geometry.dispose();
                overlayMesh.material.dispose && overlayMesh.material.dispose();
              } catch (err) {}
              overlayMesh = null;
            },
          });
        } else {
          scene.remove(overlayMesh);
          overlayMesh = null;
        }
        zoomedOut = false;
        return;
      }

      const front = getFrontItem();
      if (!front) return;

      const source = front.mesh;
      const geom = source.geometry;
      const mat = source.material.clone();
      mat.depthTest = false;
      mat.depthWrite = false;
      mat.side = THREE.DoubleSide;

      overlayMesh = new THREE.Mesh(geom, mat);
      overlayMesh.frustumCulled = false;

      const origPos = new THREE.Vector3();
      const origQuat = new THREE.Quaternion();
      const origScale = new THREE.Vector3();
      source.getWorldPosition(origPos);
      source.getWorldQuaternion(origQuat);
      source.getWorldScale(origScale);

      overlayMesh.position.copy(origPos);
      overlayMesh.quaternion.copy(origQuat);
      overlayMesh.scale.copy(origScale);

      overlayMesh.userData.original = { pos: origPos.clone(), quat: origQuat.clone(), scale: origScale.clone() };
      scene.add(overlayMesh);

      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      const distance = Math.max(R * 1.2, camera.near + 2);
      const targetPos = camera.position.clone().add(dir.clone().multiplyScalar(distance));

      const fovRad = camera.fov * Math.PI / 180;
      const visibleHeight = 2 * distance * Math.tan(fovRad / 2);
      const scaleFactor = (visibleHeight / CARD_H) * 0.98;

      gsap.to(overlayMesh.position, { x: targetPos.x, y: targetPos.y, z: targetPos.z, duration: 0.6, ease: "power2.out" });
      gsap.to(overlayMesh.scale, { x: scaleFactor, y: scaleFactor, z: scaleFactor, duration: 0.6, ease: "power2.out" });

      const startQ = overlayMesh.quaternion.clone();
      const endQ = camera.quaternion.clone();
      const qt = { t: 0 };
      gsap.to(qt, {
        t: 1,
        duration: 0.2,
        ease: "power2.out",
        onUpdate: () => {
          overlayMesh.quaternion.copy(startQ).slerp(endQ, qt.t);
        },
      });

      zoomedOut = true;
    }

    controller.addEventListener("pointerdown", onControllerPointerDown);
    controller.addEventListener("click", onControllerClick);
    joystick.addEventListener("pointerdown", onJoystickPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // lightbox / raycaster
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    function onCanvasClick(ev) {
      if (Math.abs(vel.x) > 0.02 || Math.abs(vel.y) > 0.02) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(globe.children);
      if (hits.length) {
        const mesh = hits[0].object;
        openLightbox(mesh.userData.index);
      }
    }

    renderer.domElement.addEventListener("click", onCanvasClick);

    // current lightbox index
    let currentIndex = null;

    function showIndex(i) {
      if (!items.length) return;
      const idx = ((i % items.length) + items.length) % items.length; // wrap
      currentIndex = idx;
      const data = items[idx];
      if (!data) return;
      if (lbImg) lbImg.src = data.uri;
      if (lbTitle) lbTitle.textContent = data.title || "";
      if (lbDesc) lbDesc.textContent = data.description || "";
      if (lbLink) {
        lbLink.href = data.link || "#";
        lbLink.textContent = "Open source / view original";
        lbLink.target = "_blank";
        lbLink.rel = "noopener noreferrer";
      }
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    }

    function openLightbox(idx) {
      showIndex(idx);
    }

    function closeLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      if (lbImg) lbImg.src = "";
      currentIndex = null;
    }

    // named handler so we can remove listener later
    function onLightboxClick(e) {
      if (e.target === lightbox) closeLightbox();
    }
    lightbox.addEventListener("click", onLightboxClick);

    // navigation handlers
    function onPrevClick(e) {
      e.stopPropagation();
      if (currentIndex === null) return;
      showIndex(currentIndex - 1);
    }
    function onNextClick(e) {
      e.stopPropagation();
      if (currentIndex === null) return;
      showIndex(currentIndex + 1);
    }

    lbPrev && lbPrev.addEventListener("click", onPrevClick);
    lbNext && lbNext.addEventListener("click", onNextClick);

    function onKeyDown(e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (currentIndex !== null) showIndex(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (currentIndex !== null) showIndex(currentIndex + 1);
      }
    }
    window.addEventListener("keydown", onKeyDown);

    // animate loop
    let rafId = null;
    function animate() {
      const now = performance.now();
      const dt = Math.min(now - lastTime, 100);
      lastTime = now;

      if (!dragging && !jsDragging && !isInteracting) {
        target.y += autoSpeed * dt;
      }

      rot.x += (target.x - rot.x) * 0.08;
      rot.y += (target.y - rot.y) * 0.08;
      globe.rotation.x = rot.x;
      globe.rotation.y = rot.y;

      markFront();

      // place controller center
      const screenX = container.clientWidth / 2;
      const screenY = container.clientHeight / 2;
      controller.style.left = `${screenX}px`;
      controller.style.top = `${screenY}px`;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }

    // initial zoom
    gsap.set(camera.position, { x: 0, y: 0, z: R * 60 });
    gsap.to(camera.position, {
      z: R * 0.5,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => camera.lookAt(0, 0, 0),
    });

    // init
    createCards(N);
    animate();

    // log progress
    const progressTimer = setInterval(() => {
      if (loadedCount < N) {
        // eslint-disable-next-line no-console
        console.log(`Loading progress: ${loadedCount}/${N} images`);
      }
    }, 2000);

    // cleanup
    return () => {
      clearInterval(progressTimer);
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("keydown", onKeyDown);
      controller.removeEventListener("pointerdown", onControllerPointerDown);
      controller.removeEventListener("click", onControllerClick);
      joystick.removeEventListener("pointerdown", onJoystickPointerDown);
      renderer.domElement.removeEventListener("click", onCanvasClick);
      lightbox.removeEventListener("click", onLightboxClick);
      lbPrev && lbPrev.removeEventListener("click", onPrevClick);
      lbNext && lbNext.removeEventListener("click", onNextClick);
      try {
        container.removeChild(renderer.domElement);
      } catch (e) {}
      // dispose three
      scene.traverse((o) => {
        if (o.isMesh) {
          o.geometry && o.geometry.dispose();
          if (o.material) {
            if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose && m.dispose());
            else o.material.dispose && o.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative", overflow: "hidden" }}>
      <div ref={containerRef} id="container" style={{ width: "100%", height: "100%" }} />
      <div ref={controllerRef} id="controller" className="controller" role="button" tabIndex={0}>
        <div className="sphere" />
        <div className="outer_shadow" />
        <div className="scrolling_text_container">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i}>START</span>
          ))}
        </div>
        <div className="inner_shadow" />
      </div>

      <div ref={joystickRef} id="joystick" className="joystick" />

      <div ref={lightboxRef} className="lightbox" aria-hidden="true">
        <div className="lightbox-content" role="dialog" aria-label="Image details">
          <button
            className="close-btn"
            onClick={() => {
              const lb = lightboxRef.current;
              lb.classList.remove("open");
              lb.setAttribute("aria-hidden", "true");
              if (lbImgRef.current) lbImgRef.current.src = "";
            }}
            aria-label="Close"
          >
            &times;
          </button>

          {/* Prev / Next arrows */}
          <button ref={lbPrevRef} className="nav prev" aria-label="Previous image">‹</button>
          <button ref={lbNextRef} className="nav next" aria-label="Next image">›</button>

          <div className="lightbox-body">
            <div className="image-wrap">
              <img ref={lbImgRef} id="lbImg" alt="Full image" />
            </div>
            <div className="meta">
              <h2 ref={lbTitleRef} className="meta-title" />
              <p ref={lbDescRef} className="meta-desc" />
              <a ref={lbLinkRef} className="meta-link" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        :root{ --radius:420; --card-w:120; --card-h:90; --sphereSize: 120px; --textSpeed: 10s; --textGap: 15px; }
        html,body,#root{height:100%;}
        body{margin:0;font-family:Inter,system-ui,Roboto,Arial;background:#fafafa;}
        #container{touch-action:none}
        .controller{ position:absolute; width:var(--sphereSize); height:var(--sphereSize); border-radius:50%; z-index:50; cursor:pointer; user-select:none; pointer-events:auto; overflow:hidden; transform:translate(-50%,-50%); }
        .scrolling_text_container{ position:absolute; top:50%; left:0; transform:translateY(-50%); width:200%; height:auto; display:flex; white-space:nowrap; animation: scrollText var(--textSpeed) linear infinite; }
        .scrolling_text_container span{ font-size:1.1em; font-weight:bold; color:#fff; padding-right:var(--textGap); display:inline-block; }
        @keyframes scrollText{ from{ transform:translateY(-50%) translateX(0%);} to{ transform:translateY(-50%) translateX(-50%);} }
        .sphere{ position:absolute; left:0; top:0; width:var(--sphereSize); height:var(--sphereSize); border-radius:50%; background: radial-gradient(circle, #000 0%, #000 100%); box-shadow: 0 0 20px rgba(56,140,222,0.5);} 
        .outer_shadow{ position:absolute; width:var(--sphereSize); height:var(--sphereSize); top:calc(var(--sphereSize) - 1rem); background-repeat:no-repeat; background-size:cover; }
        .outer_shadow{ background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwIiB2aWV3Qm94PSIwIDAgMjAwIDMwIj4NCjxkZWZzPg0KICA8cmFkaWFsR3JhZGllbnQgaWQ9InJnIiBjeD0iMjM1Mi4wNzUyIiBjeT0iLTY1MzQuODA1NyIgcj0iNDIuMTI2MiIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgyLjM3MzUgMCAwIDAuMzU2MSAtNTQ4Mi43NTI5IDIzNDIuMTU2NSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4NCgkJPHN0b3Agb2Zmc2V0PSIwIiAgICAgIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMSIvPg0KCQk8c3RvcCBvZmZzZXQ9IjAuMDg1NSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjc4Ii8+DQoJCTxzdG9wIG9mZnNldD0iMC4xNzAxIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAuNTkiLz4NCgkJPHN0b3Agb2Zmc2V0PSIwLjI1ODEiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC40MyIvPg0KCQk8c3RvcCBvZmZzZXQ9IjAuMzUwMyIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjI5Ii8+DQoJCTxzdG9wIG9mZnNldD0iMC40NDc5IiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAuMTgiLz4NCgkJPHN0b3Agb2Zmc2V0PSIwLjU1MjYiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC4xMCIvPg0KCQk8c3RvcCBvZmZzZXQ9IjAuNjY4IiAgIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC4wNCIvPg0KCQk8c3RvcCBvZmZzZXQ9IjAuODAyMSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjAxIi8+DQoJCTxzdG9wIG9mZnNldD0iMSIgICAgICBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAiLz4NCiAgPC9yYWRpYWxHcmFkaWVudD4NCjxlbGxpcHNlIGZpbGw9InVybCgjcngpIiBvcGFjaXR5PSIwLjg1IiBjeD0iMTAwIiBjeT0iMTUiIHJ4PSIxMDAiIHJ5PSIxNSIvPg0KPC9zdmc+");
        }
        .inner_shadow{ position:absolute; width:var(--sphereSize); height:var(--sphereSize); background-repeat:no-repeat; background-size:cover; }
        .inner_shadow{ background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiPg0KPHJhZGlhbEdyYWRpZW50IGlkPSJyZyIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iMTAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+DQoJPHN0b3Agb2Zmc2V0PSIwLjg1IiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAiLz4NCgk8c3RvcCBvZmZzZXQ9IjEiICAgIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMSIvPg0KPC9yYWRpYWxHcmFkaWVudD4NCjxjaXJjbGUgZmlsbD0idXJsKCNyZykiIG9wYWNpdHk9IjAuMSIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iMTAwIi8+DQo8L3N2Zz4NCg=="); }
        .lightbox{ position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.75); opacity:0; pointer-events:none; z-index:9999; transition:opacity .28s ease; }
        .lightbox.open{ opacity:1; pointer-events:auto; }
        .lightbox-content{ position:relative; width:90%; max-width:1100px; margin:24px; outline:none; }
        .lightbox-body{ display:flex; gap:20px; align-items:center; justify-content:center; background:transparent; color:#fff; }
        .image-wrap{ flex:1 1 60%; display:flex; align-items:center; justify-content:center; }
        .image-wrap img{ max-width:100%; max-height:80vh; object-fit:contain; display:block; border-radius:6px; box-shadow: 0 10px 30px rgba(0,0,0,0.6); }
        .meta{ flex: 0 0 35%; max-width:35%; padding:12px; box-sizing:border-box; text-align:left; }
        .meta-title{ margin:0 0 8px 0; font-size:20px; color:#fff; }
        .meta-desc{ margin:0 0 12px 0; color:#ddd; line-height:1.4; }
        .meta-link{ color:#88c7ff; text-decoration:underline; display:inline-block; margin-top:6px; }
        .close-btn{ position:absolute; right:18px; top:18px; background:transparent; border:none; color:#fff; font-size:28px; cursor:pointer; z-index:10000; }

        /* Prev/Next nav buttons */
        .nav{ position:absolute; top:50%; transform:translateY(-50%); background:rgba(0,0,0,0.45); border:none; color:#fff; font-size:32px; width:52px; height:72px; display:flex; align-items:center; justify-content:center; cursor:pointer; border-radius:6px; z-index:10001; }
        .nav.prev{ left: -18px; } /* nudge outside left edge of modal */
        .nav.next{ right: -18px; } /* nudge outside right edge */
        .nav:focus{ outline:2px solid rgba(136,199,255,0.6); }

        .joystick{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:70px; height:70px; border-radius:50%; background:transparent; cursor:grab; z-index:60; }
        @media (max-width: 720px) {
          .lightbox-body{ flex-direction:column; }
          .meta{ max-width:100%; width:100%; }
          .nav.prev{ left:6px; top:auto; bottom:12px; transform:none; right:auto; }
          .nav.next{ right:6px; top:auto; bottom:12px; transform:none; left:auto; }
        }
      `}</style>
    </div>
  );
}
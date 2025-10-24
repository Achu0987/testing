"use client";

import React, { useEffect, useRef, useState } from "react";

export function Eye({ className = "", isRightEye = false }) {
  const eyeRef = useRef(null);
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });

  // Default offsets to match the design (relative to center)
  const defaultPosition = isRightEye
    ? { x: 17.032, y: 15.787 } // right eye offset from center
    : { x: -27.1728, y: -23.6816 }; // left eye offset from center

  useEffect(() => {
    setPupilPosition({ x: defaultPosition.x, y: defaultPosition.y });
  }, [defaultPosition.x, defaultPosition.y]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!eyeRef.current) return;
      const eyeRect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const eyeRadius = eyeRect.width / 2;
      const pupilRadius = 38; // matches 76px diameter
      const maxMovement = Math.max(eyeRadius - pupilRadius - 6, 0);

      if (distance < 1) {
        setPupilPosition({ x: defaultPosition.x, y: defaultPosition.y });
        return;
      }

      const nx = dx / distance;
      const ny = dy / distance;

      let moveX = Math.min(distance, maxMovement) * nx;
      let moveY = Math.min(distance, maxMovement) * ny;

      moveX += defaultPosition.x;
      moveY += defaultPosition.y;

      const totalDistance = Math.sqrt(
        Math.pow(moveX - defaultPosition.x, 2) + Math.pow(moveY - defaultPosition.y, 2)
      );

      if (totalDistance > maxMovement && totalDistance > 0) {
        const scale = maxMovement / totalDistance;
        moveX = defaultPosition.x + (moveX - defaultPosition.x) * scale;
        moveY = defaultPosition.y + (moveY - defaultPosition.y) * scale;
      }

      setPupilPosition({ x: moveX, y: moveY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [defaultPosition.x, defaultPosition.y]);

  return (
    <div
      ref={eyeRef}
      className={`relative flex items-center justify-center rounded-full overflow-hidden ${className}`}
      style={{ width: 204, height: 204, backgroundColor: "var(--cream-background)" }}
      data-name="eye"
    >
      {/* pupil */}
      <div
        style={{
          position: "absolute",
          width: 76,
          height: 76,
          borderRadius: "50%",
          backgroundColor: "#000",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        }}
        id="Pupil"
      />
    </div>
  );
}
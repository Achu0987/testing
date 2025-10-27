"use client";

import { forwardRef } from "react";
import { Float } from "@react-three/drei";
import { SodaCan } from "@/components/SodaCan";
const FloatingCan = forwardRef(({
  flavor = "blackCherry",
  floatSpeed = 1.5,
  rotationIntensity = 1,
  floatIntensity = 1,
  floatingRange = [-0.1, 0.1],
  children,
  ...props
}, ref) => {
  return <group ref={ref} {...props}>
        <Float speed={floatSpeed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity} floatingRange={floatingRange}>
          {children}
          <SodaCan flavor={flavor} />
        </Float>
      </group>;
});
FloatingCan.displayName = "FloatingCan";
export default FloatingCan;
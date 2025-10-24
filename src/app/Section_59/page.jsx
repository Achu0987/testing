import React from "react";
import EyeCard from "./EyeCard";

export default function Page() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--cookie-monster-blue)" }}>
      <EyeCard />
    </main>
  );
}
import React from "react";
import { Eye } from "./Eye";

export default function EyeCard() {
  return (
    <div
      className="mx-auto"
      style={{
        maxWidth: 600,
        
        padding: 20,
        backgroundColor: "var(--cream-background)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Inner blue panel */}
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          backgroundColor: "var(--cookie-monster-blue)",
          padding: 36,
          boxSizing: "border-box",
        }}
      >
        {/* Eyes row */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 32 }}>
          <Eye isRightEye={false} />
          <Eye isRightEye={true} />
        </div>

        {/* bottom label area (polaroid style) */}
        <div
          style={{
            marginTop: 18,
            background: "var(--cream-background)",
            color: "#000",
            padding: "18px 12px 6px",
            textAlign: "left",
            fontWeight: 700,
            
          }}
        >
          <div style={{ fontSize: 72, lineHeight: 0.9 }}>#0062AD</div>
          <div style={{ fontSize: 18, marginTop: 6, fontWeight: 500 }}>Cookie Monster</div>
        </div>
      </div>
    </div>
  );
}
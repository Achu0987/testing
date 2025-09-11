"use client";

import { useEffect } from "react";


import V9 from "./V9";



export default function Page() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div>
      <div id="V9" style={{ padding: "50px 0" ,textAlign:'center'}}>
        <label>Section_1 - V9</label>
        <V9 />
        
       
        
      </div>
      
         
      </div>
    
  );
}

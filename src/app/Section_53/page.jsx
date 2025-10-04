"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V209 from "./V209";
import V208 from "./V208";
import V222 from "./V222";
import V220 from "./V220";
import V241 from "./V241";
import V240 from "./V240";
import V441 from "./V441";





export default function Section_53() {
  const titleText = "Moon Light";
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
    <div id="section15-container">
     <div id="V209" style={{ padding: "0 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_53 - V295</label>
         
      <V209 />
      </div>

   <div id="V208" style={{ padding: "0 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_53 - V208</label>
         
      <V208 />
      </div>
       
         <div id="V222" style={{ padding: "0 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_53 - V222</label>
         
      <V222 />
      </div>

       <div id="V220" style={{ padding: "0 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_53 - V220</label>
         
      <V220 />
      </div>

       
       <div id="V241" style={{ padding: "0 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_53 - V241</label>
         
      <V241 />
      </div>
 
       
        <div id="V240" style={{ padding: "0 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_53 - V240</label>
         
      <V240 />
      </div>

      
        <div id="V441" style={{ padding: "0 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_53 - V441</label>
         
      <V441 />
      </div>

    </div>
  );
}
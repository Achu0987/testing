"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";

import V198 from "./V198";
import V199 from "./V199";
 

export default function Section_16() {
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
    <div id="section1-container">

    <div id="V198" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_16 - V198</label>
         
      <V198 />
      </div>


        <div id="V199" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_16 - V199</label>
         
      <V199 />
      </div>
      
      </div>
  );
}
"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";

import V255 from "./V255";
import V254 from "./V254";

 

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

    <div id="V255" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_56 - V255</label>
         
      <V255 />
      </div>

       <div id="V254" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_56 - V254</label>
         
      <V254 />
      </div>

      </div>
  );
}
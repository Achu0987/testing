"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V203 from "./V203";
import V202 from "./V202";


 

export default function Section_55() {
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

    <div id="V203" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_55 - V203</label>
         
      <V203 />

     
      </div>

       <div id="V202" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_55 - V202</label>
         
     

      <V202 />
      </div>
      

      </div>
  );
}
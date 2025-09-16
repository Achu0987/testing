"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V39 from "./V39";
import V40 from "./V40";





export default function Section_17() {
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

           <div id="V39" style={{ padding: "50px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
     <div >
        <br />
        
      <V39 />
      </div>
      
      </div>

        <div id="V40" style={{ padding: "50px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
     <div >
        <br />
        
      <V40 />
      </div>
      
      </div>
   

    </div>
  );
}
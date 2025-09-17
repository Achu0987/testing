"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";

// import V136 from "./V136";
import V140 from "./V140";
import V142 from "./V142";






export default function Section_8() {
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
     <div id="V140" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_8 - V140</label>
         
      <V140 />
      </div>
      
       <div id="V142" style={{ padding: "100px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_8 - V142</label>
      <V142 />
       
      {/* <V136 /> */}

      <br />
      <br />
      <br />
      <br />
      </div>
    

    </div>
  );
}
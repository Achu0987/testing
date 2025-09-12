"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";

import V9 from "./V9";
import V10 from "./V10";
import V13 from "./V13";
import V17 from "./V17";



export default function Section_1() {
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
     <div id="V9" style={{ padding: "100px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_1 - V9</label>
      <V9 />
      </div>
        <div id="V10" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_1 - V10</label>
        <br></br>
         <br></br>
      <V10/>
      </div>
            <div id="V13" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_1 - V13</label>
        <br></br>
         <br></br>
      <V13/>

       </div>
            <div id="V17" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_1 - V17</label>
        <br></br>
         <br></br>
      <V17/>
     
    

      </div>
    </div>
  );
}
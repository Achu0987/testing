"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";

import V198 from "./V198";
import V199 from "./V199";
import V217 from "./V217";
import V216 from "./V216";
import V249 from "./V249";
import V248 from "./V248";
import V45 from "./V45";

 

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

    {/* <div id="V198" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_16 - V198</label>
         
      <V198 />
      </div>


        <div id="V199" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_16 - V199</label>
         
      <V199 />
      </div>
      

       <div id="V217" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_16 - V217</label>
         
      <V217/>
      </div>
      

       <div id="V216" style={{ padding: "100px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_16 - V216</label>
         
      <V216/>
      </div>

       <div id="V249" style={{ padding: "100px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_16 - V249</label>
         
      <V249/>
      </div>

      <div id="V248" style={{ padding: "100px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_16 - V248</label>
         
      <V248/>
      </div> */}



         
      <V45/>

  
     

      </div>
  );
}
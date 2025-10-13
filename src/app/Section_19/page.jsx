"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V205 from "./V205";
import V204 from "./V204"
import V213 from "./V213";
import V212 from "./V212";

import V228 from "./V228";
import V229 from "./V229";
import V273 from "./V273";
import V272 from "./V272";



export default function Section_19() {
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
     {/* <div id="V205" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_19 - V205</label>
         
      <V205 />
      </div>


       <div id="V204" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_19 - V204</label>
         
      <V204/>
      </div>



       <div id="V213" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_19 - V213</label>
         
      <V213/>
      </div>

      <div id="V212" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_19 - V212</label>
         
      <V212/>
      </div>
       
     
         <div id="V229" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_19 - V229</label>
         
      <V229/>
      </div>
       
       
        <div id="V228" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_19 - V228</label>
         
      <V228/>
      </div>

       <div id="V273" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_19 - V273</label>
         
      <V273/>
      </div> */}

      <div id="V272" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_19 - V272</label>
         
      <V272/>
      </div>

    </div>
  );
}
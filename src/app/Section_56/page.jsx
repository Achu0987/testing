"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";

import V255 from "./V255";
import V254 from "./V254";
import V257 from "./V257";
import V256 from "./V256";
import V313 from "./V313";
import V314 from "./V314";
import V323 from "./V323";
import V322 from "./V322";


 

export default function Section_56() {
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

        <div id="V257" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_56 - V254</label>
         
      <V257 />
      </div>


       <div id="V256" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_56 - V256</label>
         
     <V256/>
      </div>

      <div id="V313" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_56 - V313</label>
         
     <V313/>
      </div>

      <div id="V314" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_56 - V314</label>

     <V314/>
      </div>


<div id="V323" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_56 - V323</label>

     <V323/>
      </div>
    

<div id="V322" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_56 - V322</label>

     <V322/>
      </div>

      </div>
  );
}
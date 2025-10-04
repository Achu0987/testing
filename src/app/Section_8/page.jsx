"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";

// import V136 from "./V136";
import V140 from "./V140";
import V142 from "./V142";
import V189 from "./V189";
import V190 from "./V190";

import V57 from "./V57";
import V58 from "./V58";
import V231 from "./V231"
import V230 from "./V230";
 





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

   

<div id="V58" style={{ padding: "200px 0 50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_8 - V58</label>
      <V58 />
       </div>


     <div id="V140" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_8 - V140</label>
         
      <V140 />
      </div>
      
       <div id="V142" style={{ padding: "100px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_8 - V142</label>
      <V142 />
       
      

      <br />
    
      </div>

      <div id="V189" style={{ padding: "100px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_8 - V189</label>
      <V189 />
       
    
      <br />
    
      </div>
    

    <div id="V190" style={{ padding: "100px 0 50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_8 - V190</label>
      <V190 />
       
   
    
      </div>


    <div id="V57" style={{ padding: "100px 0 50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_8 - V57</label>
      <V57/>
       
   </div>

   <div id="V231" style={{ padding: "100px 0 50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_8 - V231</label>
      <V231/>
       
   </div>

 <div id="V230" style={{ padding: "100px 0 50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_8 - V230</label>
      <V230/>
       
   </div>
    

    </div>
  );
}
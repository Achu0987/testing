"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V162 from "./V162";
import V160 from "./V160";



export default function Section_15() {
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
     <div id="V162" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_15 - V162</label>
         
      <V162 />
      </div>

       <div id="V160" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_15 - V160</label>
         
      <V160 />
      </div>
      
     
       
       

    </div>
  );
}
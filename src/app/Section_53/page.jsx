"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V209 from "./V209";
import V208 from "./V208";




export default function Section_53() {
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
     <div id="V209" style={{ padding: "0 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_53 - V295</label>
         
      <V209 />
      </div>

   <div id="V208" style={{ padding: "0 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_53 - V208</label>
         
      <V208 />
      </div>
       

    </div>
  );
}
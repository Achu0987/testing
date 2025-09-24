"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V205 from "./V205";



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
     <div id="V205" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_19 - V205</label>
         
      <V205 />
      </div>

       
     
       
       

    </div>
  );
}
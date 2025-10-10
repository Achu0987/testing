"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";

import V263 from "./V263";


 

export default function Section_54() {
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

    <div id="V263" style={{ padding: "70px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_54 - V263</label>
         
      <V263 />
      </div>


     

      </div>
  );
}
"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V40 from "./V40";





export default function Section_18() {
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

const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Guard for SSR
    if (typeof window === 'undefined') return;

    const isMobileDevice = () => {
      const ua = navigator.userAgent || navigator.vendor || window.opera || '';
      const isUserAgentMobile = /android|iphone|ipod|ipad|windows phone|blackberry/i.test(ua);
      const hasTouch = typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 0;
      const smallWidth = window.innerWidth <= 768;
      return isUserAgentMobile || hasTouch || smallWidth;
    };

    // initial
    setIsMobile(isMobileDevice());

    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id="section1-container">
     
      {/* <div id="V22" >
        
     <V22 />
           </div> */}

            <div id="V40" style={{ padding: "50px 0 0 0" ,textAlign:'center',fontWeight:'bold'}}>
                  
                  
                    <br></br>
                 <V40 />
               </div> 

            
    </div>
  );
}
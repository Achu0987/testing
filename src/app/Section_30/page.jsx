"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";


import V56 from "./V56"
import V55 from "./V55";



export default function Section_11() {
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
     
            <div id="V56" style={{ padding: "50px 0 0 0", textAlign:'center',fontWeight:'bold'}}>
                  
                   <br></br>
                   
                 <V56 />
               </div> 

                 <div id="V55" style={{ padding: "50px 0 0 0", textAlign:'center',fontWeight:'bold'}}>
                  
                   <br></br>
                   
                 <V55 />
               </div> 

            
    </div>
  );
}
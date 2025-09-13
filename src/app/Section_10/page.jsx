"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";

// import V18 from "./V18";
import V32 from "./V32";




export default function Section_10() {
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
     {/* <div id="V18" >
        
     <V18/>
      </div> */}
      

           <div id="V32" >
        
     <V32 />
           </div>

           
        

            
    </div>
  );
}
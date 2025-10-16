"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V148 from "./V148";
import V147 from "./V147";
import V269 from "./V269";
import V268 from "./V268";
import V295 from "./V295";
import V294 from "./V294";








export default function Section_52() {
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
     
            <div id="V148" style={{ padding: "100px 0 0",textAlign:'center',fontWeight:'bold'}}>
                    <label>Section_52 - V148</label>
                   <br></br>
                   
                 <V148 />
               </div> 


               <div id="V147" style={{ padding: "100px 0 0",textAlign:'center',fontWeight:'bold'}}>
                    <label>Section_52 - V147</label>
                   <br></br>
                   
                 <V147 />
                 <br />
                 <br />
                 <br />
                 <br />
               </div> 


                 <div id="V269" style={{ padding: "100px 0 0",textAlign:'center',fontWeight:'bold'}}>
                    <label>Section_52 - V269</label>
                   <br></br>
                   
                 <V269 />
               </div>  
               
                <div id="V268" style={{ padding: "100px 0 0",textAlign:'center',fontWeight:'bold'}}>
                    <label>Section_52 - V268</label>
                   <br></br>
                   
                 <V268/>
               </div>

                <div id="V295" style={{ padding: "100px 0 0",textAlign:'center',fontWeight:'bold'}}>
                    <label>Section_52 - V295</label>
                   <br></br>
                   
                 <V295/>
               </div>

               <div id="V294" style={{ padding: "100px 0 0",textAlign:'center',fontWeight:'bold'}}>
                    <label>Section_52 - V294</label>
                   <br></br>
                   
                 <V294/>
               </div>
    </div>
  );
}
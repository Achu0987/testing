'use client';
import { useEffect } from 'react';
import V315 from './V315';
const Section_56_1 = () => {
  useEffect(() => {
    V315();
  }, []);
  return (
    <div className="fixed top-0 left-0 z-2">
      <canvas id="fluid" className="w-screen h-screen" />
    </div>
  );
};
export default Section_56_1;

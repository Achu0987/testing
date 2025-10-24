'use client';
import { useEffect } from 'react';
import V315 from './V315';
const page = () => {
  useEffect(() => {
    V315();
  }, []);
  return (
    <div className="fixed top-0 left-0 z-2">
      <canvas id="fluid" className="w-screen h-screen" />
    </div>
  );
};
export default page;

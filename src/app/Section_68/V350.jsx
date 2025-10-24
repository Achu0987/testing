'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const V350 = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get filter based on scroll progress - one filter at a time
  const getFilter = () => {
    const progress = scrollY;

    if (progress < 0.2) {
      return 'none';
    } else if (progress < 0.3) {
      return 'grayscale(100%)';
    } else if (progress < 0.4) {
      return 'sepia(100%)';
    } else if (progress < 0.5) {
      return 'blur(5px)';
    } else if (progress < 0.6) {
      return 'brightness(1.5)';
    } else if (progress < 0.7) {
      return 'contrast(2)';
    } else if (progress < 0.8) {
      return 'saturate(2)';
    } else {
      return 'hue-rotate(180deg)';
    }
  };

  const getFilterName = () => {
    const progress = scrollY;

    if (progress < 0.2) {
      return 'Original';
    } else if (progress < 0.3) {
      return 'Grayscale';
    } else if (progress < 0.4) {
      return 'Sepia';
    } else if (progress < 0.5) {
      return 'Blur';
    } else if (progress < 0.6) {
      return 'Brightness';
    } else if (progress < 0.7) {
      return 'Contrast';
    } else if (progress < 0.8) {
      return 'Saturate';
    } else {
      return 'Hue Rotate';
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Fixed image with dynamic filter */}
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative max-w-4xl max-h-screen overflow-hidden rounded-lg shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Mountain landscape"
            className="w-full h-full object-cover transition-all duration-300"
            style={{ filter: getFilter() }}
          />
          <div className="absolute bottom-8 left-8 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-1">Filter: {getFilterName()}</h3>
          </div>
        </motion.div>
      </div>

      {/* Spacer for scrolling */}
      <div className="h-screen"></div>
    </div>
  );
};

export default V350;

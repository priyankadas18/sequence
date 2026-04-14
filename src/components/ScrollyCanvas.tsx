'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';

const FRAME_COUNT = 120;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to frame index
  const scrollIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  
  // Add a spring for buttery smooth scrubbing
  const currentIndex = useSpring(scrollIndex, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const preloadImages = () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        // Matching the filename pattern seen in list_dir
        const frameNumber = i.toString().padStart(3, '0');
        img.src = `/sequence/frame_${frameNumber}_delay-0.066s.png`;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === FRAME_COUNT) {
            setIsLoaded(true);
          }
        };
        loadedImages.push(img);
      }
      setImages(loadedImages);
    };

    preloadImages();
  }, []);

  // Update canvas on frame change
  useEffect(() => {
    const unsubscribe = currentIndex.on('change', (latest: number) => {
      renderCanvas(Math.floor(latest));
    });

    // Initial render
    if (isLoaded) {
      renderCanvas(0);
    }

    return () => unsubscribe();
  }, [currentIndex, images, isLoaded]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        renderCanvas(Math.floor(currentIndex.get()));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, isLoaded, currentIndex]);

  const renderCanvas = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = images[index];

    if (canvas && ctx && img) {
      // Logic for object-fit: cover
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const imgWidth = img.width;
      const imgHeight = img.height;
      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, x, y, newWidth, newHeight);
    }
  };

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#121212] z-50">
             <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin" />
                <p className="text-white/50 text-sm font-medium tracking-widest uppercase">Loading Experience</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

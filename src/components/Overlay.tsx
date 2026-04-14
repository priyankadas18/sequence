'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Section = ({ 
  children, 
  scrollRange, 
  align = 'center' 
}: { 
  children: React.ReactNode, 
  scrollRange: [number, number, number], 
  align?: 'left' | 'center' | 'right' 
}) => {
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(
    scrollYProgress, 
    [
      Math.max(0, scrollRange[0] - 0.08), 
      scrollRange[0] + 0.0001, 
      scrollRange[1] + 0.0002, 
      scrollRange[2] + 0.0003, 
      Math.min(1, scrollRange[2] + 0.08)
    ], 
    [0, 1, 1, 1, 0]
  );
  
  const y = useTransform(
    scrollYProgress, 
    [scrollRange[0] - 0.1, scrollRange[2] + 0.1], 
    [100, -100]
  );

  const alignStyles = {
    left: 'items-start text-left pl-12 md:pl-32',
    center: 'items-center text-center',
    right: 'items-end text-right pr-12 md:pr-32'
  };

  return (
    <motion.div 
      style={{ opacity, y }}
      className={`fixed inset-0 flex flex-col justify-center pointer-events-none ${alignStyles[align]}`}
    >
      <div className="max-w-4xl p-8">
        {children}
      </div>
    </motion.div>
  );
};

export default function Overlay() {
  return (
    <div className="relative z-10">
      <div className="h-[300vh] w-full invisible pointer-events-none" />
      
      <Section scrollRange={[0.05, 0.15, 0.25]}>
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-accent-cyan text-sm font-bold tracking-[0.5em] uppercase mb-6 block"
        >
          Software Developer
        </motion.span>
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-4">
          PRIYANKA <span className="text-premium">DAS</span><span className="text-accent-cyan">.</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/40 font-light tracking-widest uppercase">
          Building Scalable & Purposeful Systems
        </p>
      </Section>

      <Section scrollRange={[0.4, 0.5, 0.6]} align="left">
        <div className="space-y-6">
          <h2 className="text-5xl md:text-8xl font-black tracking-tight text-white leading-[0.9]">
            Full-Stack <br />
            <span className="text-premium italic">Excellence.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-lg leading-relaxed font-light">
            Specializing in <span className="text-white">PHP, Node.js, and Database Architecture</span>. 
            Delivering high-performance solutions for enterprise-level portals.
          </p>
        </div>
      </Section>

      <Section scrollRange={[0.75, 0.85, 0.95]} align="right">
        <div className="space-y-6">
          <h2 className="text-5xl md:text-8xl font-black tracking-tight text-white leading-[0.9]">
            3+ Years of <br />
            <span className="text-accent-cyan">Precision.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-lg ml-auto leading-relaxed font-light">
            From government portals to multi-vendor marketplaces, 
            I craft software that is <span className="text-white">functional, scalable, and maintainable</span>.
          </p>
        </div>
      </Section>
    </div>
  );
}

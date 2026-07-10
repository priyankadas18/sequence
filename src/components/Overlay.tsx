'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Server, Database, Settings } from 'lucide-react';

const Section = ({ 
  children, 
  scrollRange, 
  align = 'center',
  maxWidth = 'max-w-4xl'
}: { 
  children: React.ReactNode, 
  scrollRange: [number, number, number], 
  align?: 'left' | 'center' | 'right',
  maxWidth?: string
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
      <div className={`p-8 w-full ${maxWidth}`}>
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

      <Section scrollRange={[0.4, 0.5, 0.6]} align="left" maxWidth="max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-20">
          <div className="space-y-8 lg:w-[45%]">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.2]">
                Things I do for you that <br className="hidden md:block" />
                simply make your <br className="hidden md:block" />
                software better.
              </h2>
              <p className="text-sm md:text-base text-white/50 max-w-md leading-relaxed font-light">
                I specialize in building robust architectures, streamlining deployments, and crafting efficient, maintainable code for modern web applications.
              </p>
            </div>
            
            <button className="px-6 py-2.5 border border-white/20 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors text-white/80 hover:text-white">
              See all services
            </button>
          </div>

          <div className="hidden lg:grid lg:w-[55%] grid-cols-2 gap-4 relative h-full items-center">
            {/* Card 1 - Highlighted */}
            <div className="bg-[#AEE2FF] rounded-3xl p-6 flex flex-col justify-between transform -rotate-3 hover:rotate-0 transition-transform duration-300 shadow-xl z-10 text-[#0A0A0F] h-full min-h-[260px] group cursor-pointer">
              <Code2 className="w-5 h-5 mb-4 text-[#0A0A0F]" />
              <div className="mt-auto">
                <h3 className="font-bold text-lg mb-2">General code</h3>
                <p className="text-xs opacity-80 mb-6 leading-relaxed font-medium">
                  Writing clean, maintainable, and efficient code for modern web applications.
                </p>
                <span className="text-[10px] font-bold uppercase tracking-widest group-hover:underline">Read more</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#121216] border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:border-accent-cyan/40 hover:bg-[#1A1A24] transition-all duration-300 text-white h-full min-h-[260px] group cursor-pointer">
              <Server className="w-5 h-5 mb-4 text-white/40 group-hover:text-accent-cyan transition-colors" />
              <div className="mt-auto">
                <h3 className="font-bold text-lg mb-2 text-white/90 group-hover:text-accent-cyan transition-colors">Code systems</h3>
                <p className="text-xs text-white/40 mb-6 leading-relaxed font-light">
                  Architecting robust enterprise systems ensuring high availability and scalability.
                </p>
                <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest group-hover:text-accent-cyan transition-colors">Read more</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#121216] border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:border-accent-cyan/40 hover:bg-[#1A1A24] transition-all duration-300 text-white h-full min-h-[260px] group cursor-pointer">
              <Settings className="w-5 h-5 mb-4 text-white/40 group-hover:text-accent-cyan transition-colors" />
              <div className="mt-auto">
                <h3 className="font-bold text-lg mb-2 text-white/90 group-hover:text-accent-cyan transition-colors">DevOps</h3>
                <p className="text-xs text-white/40 mb-6 leading-relaxed font-light">
                  Streamlining deployments and building reliable CI/CD pipelines for fast iterations.
                </p>
                <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest group-hover:text-accent-cyan transition-colors">Read more</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#121216] border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:border-accent-cyan/40 hover:bg-[#1A1A24] transition-all duration-300 text-white h-full min-h-[260px] group cursor-pointer">
              <Database className="w-5 h-5 mb-4 text-white/40 group-hover:text-accent-cyan transition-colors" />
              <div className="mt-auto">
                <h3 className="font-bold text-lg mb-2 text-white/90 group-hover:text-accent-cyan transition-colors">Agile consulting</h3>
                <p className="text-xs text-white/40 mb-6 leading-relaxed font-light">
                  Designing complex schemas and optimizing queries for high-performance access.
                </p>
                <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest group-hover:text-accent-cyan transition-colors">Read more</span>
              </div>
            </div>
          </div>
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

          <div className="flex flex-wrap gap-2 justify-end pt-4 max-w-lg ml-auto">
            {['Gov-Tech Platforms', 'Multi-Vendor E-Commerce', 'Secure API Systems', 'Database Optimization'].map((chip) => (
              <span 
                key={chip} 
                className="px-4 py-1.5 glass text-white/60 text-[10px] font-bold tracking-widest uppercase rounded-full border border-white/5 hover:border-accent-cyan/20 hover:text-accent-cyan transition-all"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

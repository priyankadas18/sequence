'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sonali Panda',
    role: 'Project Lead, Sonydig Technology',
    content: 'Working with Priyanka on the Steel & Mines project was an excellent experience. She demonstrated strong technical expertise and delivered scalable, efficient solutions.',
    stars: 5
  },
  {
    name: 'Abhisek Mohanty',
    role: 'Editor In-Chief, OdishaRay News',
    content: 'Priyanka showcased exceptional development skills. Her focus on performance and quality significantly enhanced our digital presence.',
    stars: 5
  },
  {
    name: 'Wonderworld Park Team',
    role: 'Operational Management',
    content: 'Priyanka delivered a visually appealing and highly functional platform. Her ability to translate requirements into a seamless user experience was impressive.',
    stars: 5
  },
  {
    name: 'Ramesh',
    role: 'HealthSquare, Kathmandu',
    content: 'Priyanka played a key role in building a reliable healthcare platform. Her backend expertise ensured a smooth and secure user experience.',
    stars: 5
  },
  {
    name: 'Nayak Consultancy',
    role: 'Multivendor E-Commerce',
    content: 'Priyanka developed a scalable and efficient marketplace solution, handling complex features with ease. Her problem-solving approach added great value.',
    stars: 5
  }
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    filter: 'blur(10px)'
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)'
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    filter: 'blur(10px)'
  })
};

export default function Testimonials() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentIndex = Math.abs(page % testimonials.length);

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, paginate]);

  return (
    <section className="relative z-20 py-32 px-12 md:px-24 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="mb-24 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              CLIENT <span className="text-premium">FEEDBACK</span>
            </motion.h2>
            <p className="text-white/40 max-w-2xl mx-auto leading-relaxed">
              Trusted by industry leaders to deliver high-quality software solutions.
            </p>
        </div>

        <div className="relative min-h-[500px] flex flex-col items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              className="absolute w-full"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div className="glass p-10 md:p-16 flex flex-col relative group max-w-4xl mx-auto">
                <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 text-accent-cyan/10 group-hover:text-accent-cyan/20 transition-colors">
                  <Quote className="w-12 h-12 md:w-24 md:h-24" />
                </div>
                
                <div className="flex gap-1 mb-8">
                  {[...Array(testimonials[currentIndex].stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent-cyan text-accent-cyan" />
                  ))}
                </div>

                <p className="text-2xl md:text-3xl text-white/80 mb-12 leading-relaxed font-light italic">
                  &quot;{testimonials[currentIndex].content}&quot;
                </p>

                <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2">{testimonials[currentIndex].name}</h4>
                    <p className="text-accent-cyan text-sm font-bold tracking-widest uppercase">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute bottom-[-100px] md:bottom-0 left-0 right-0 flex items-center justify-between pointer-events-none md:px-4">
             <button 
               onClick={() => { paginate(-1); setIsAutoPlaying(false); }}
               className="w-14 h-14 glass rounded-full flex items-center justify-center text-white/40 hover:text-accent-cyan hover:scale-110 transition-all pointer-events-auto group"
             >
               <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
             </button>
             
             <div className="flex gap-3 pointer-events-auto">
               {testimonials.map((_, i) => (
                 <button 
                  key={i}
                  onClick={() => {
                    const diff = i - currentIndex;
                    if (diff !== 0) paginate(diff);
                    setIsAutoPlaying(false);
                  }}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === currentIndex ? 'w-12 bg-accent-cyan shadow-[0_0_15px_rgba(76,201,240,0.5)]' : 'w-3 bg-white/10 hover:bg-white/30'
                  }`}
                 />
               ))}
             </div>

             <button 
               onClick={() => { paginate(1); setIsAutoPlaying(false); }}
               className="w-14 h-14 glass rounded-full flex items-center justify-center text-white/40 hover:text-accent-cyan hover:scale-110 transition-all pointer-events-auto group"
             >
               <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>
      </div>
    </section>
  );
}

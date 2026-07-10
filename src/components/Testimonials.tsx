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
    <section className="relative z-20 pt-8 md:pt-16 pb-40 px-6 md:px-24 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-20 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              CLIENT <span className="text-premium">FEEDBACK</span>
            </motion.h2>
            <p className="text-white/40 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              Trusted by industry leaders to deliver high-quality software solutions.
            </p>
        </div>

        <div className="relative min-h-[450px] md:min-h-[400px] flex flex-col items-center justify-center">
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
              className="absolute w-full px-2"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div className="bg-[#121216]/80 backdrop-blur-xl p-8 md:p-14 rounded-3xl border border-white/5 flex flex-col relative group max-w-4xl mx-auto shadow-2xl overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent opacity-50" />
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent-cyan/10 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="absolute top-8 right-8 md:top-12 md:right-12 text-white/5 group-hover:text-white/10 transition-colors pointer-events-none">
                  <Quote className="w-16 h-16 md:w-32 md:h-32 rotate-180" fill="currentColor" />
                </div>
                
                <div className="flex gap-1.5 mb-8 relative z-10">
                  {[...Array(testimonials[currentIndex].stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#F8C70E]" fill="#F8C70E" />
                  ))}
                </div>

                <p className="text-lg md:text-3xl text-white/90 mb-10 md:mb-12 leading-relaxed font-light italic relative z-10">
                  &quot;{testimonials[currentIndex].content}&quot;
                </p>

                <div className="mt-auto pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center gap-4 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-cyan to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0">
                      {testimonials[currentIndex].name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-white mb-1">{testimonials[currentIndex].name}</h4>
                      <p className="text-accent-cyan text-[10px] md:text-xs font-bold tracking-widest uppercase">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute bottom-[-100px] left-0 right-0 flex items-center justify-center gap-6 md:gap-10 pointer-events-none">
             <button 
               onClick={() => { paginate(-1); setIsAutoPlaying(false); }}
               className="w-12 h-12 md:w-14 md:h-14 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all pointer-events-auto group shadow-xl"
             >
               <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
             </button>
             
             <div className="flex gap-2.5 pointer-events-auto items-center">
               {testimonials.map((_, i) => (
                 <button 
                  key={i}
                  onClick={() => {
                    const diff = i - currentIndex;
                    if (diff !== 0) paginate(diff);
                    setIsAutoPlaying(false);
                  }}
                  className={`rounded-full transition-all duration-500 ${
                    i === currentIndex ? 'w-8 h-2 md:w-12 md:h-2 bg-accent-cyan shadow-[0_0_12px_rgba(76,201,240,0.6)]' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                 />
               ))}
             </div>

             <button 
               onClick={() => { paginate(1); setIsAutoPlaying(false); }}
               className="w-12 h-12 md:w-14 md:h-14 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all pointer-events-auto group shadow-xl"
             >
               <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>
      </div>
    </section>
  );
}

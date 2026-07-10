'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Database, Server, Cpu, Globe, Zap, LucideIcon } from 'lucide-react';

const ExperienceItem = ({ title, company, date, description }: { title: string, company: string, date: string, description?: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="mb-12 border-l-2 border-accent-cyan/20 pl-8 relative group"
  >
    <div className="absolute w-4 h-4 bg-[#0A0A0F] border-2 border-accent-cyan rounded-full -left-[9px] top-1 group-hover:scale-125 transition-transform" />
    <span className="text-accent-cyan text-xs font-bold tracking-widest uppercase mb-2 block">{date}</span>
    <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-accent-cyan transition-colors">{title}</h4>
    <p className="text-white/60 font-medium mb-4">{company}</p>
    {description && <p className="text-white/40 text-sm leading-relaxed max-w-xl">{description}</p>}
  </motion.div>
);

const ExpertiseCard = ({ icon: Icon, title, description }: { icon: LucideIcon, title: string, description: string }) => (
  <div className="glass p-8 glass-hover">
    <div className="w-12 h-12 rounded-2xl bg-accent-cyan/10 flex items-center justify-center mb-6">
      <Icon className="w-6 h-6 text-accent-cyan" />
    </div>
    <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
    <p className="text-white/40 text-sm leading-relaxed">{description}</p>
  </div>
);

export default function About() {
  const techStack = [
    { name: 'PHP', level: 90 },
    { name: 'Laravel', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'SQL', level: 90 },
    { name: 'MongoDB', level: 80 },
    { name: 'REST APIs', level: 90 },
    { name: 'System Design', level: 85 }
  ];

  return (
    <section id="about" className="relative z-20 pt-32 pb-16 px-12 md:px-24 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto">
        
        {/* Core Expertise Header */}
        <div className="mb-24 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              CORE <span className="text-premium italic">EXPERTISE</span>
            </motion.h2>
            <p className="text-white/40 max-w-2xl mx-auto leading-relaxed">
              I specialize in building high-performance, scalable web applications with a focus on 
              robust backend architecture and seamless cloud integration.
            </p>
        </div>

        {/* Expertise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          <ExpertiseCard 
            icon={Server} 
            title="Backend Systems" 
            description="Architecting secure and efficient server-side logic using PHP and Node.js." 
          />
          <ExpertiseCard 
            icon={Database} 
            title="Database Design" 
            description="Expertise in SQL and MongoDB for high-availability data storage solutions." 
          />
          <ExpertiseCard 
            icon={Cpu} 
            title="API Architecture" 
            description="Designing clean, scalable REST APIs for complex multi-vendor ecosystems." 
          />
          <ExpertiseCard 
            icon={Globe} 
            title="System Design" 
            description="Building maintainable systems capable of handling enterprise-level traffic." 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Professional Experience */}
          <div>
            <div className="flex items-center gap-4 mb-12">
               <Briefcase className="w-8 h-8 text-accent-cyan" />
               <h3 className="text-3xl font-bold tracking-tight">EXPERIENCE</h3>
            </div>
            
            <ExperienceItem 
              title="Senior Software Developer" 
              company="The UniQue Culture · Bhubaneswar" 
              date="Feb 2025 — Present" 
              description="Leading development of scalable applications, designing system architecture, and optimizing performance for enterprise-level solutions."
            />
            <ExperienceItem 
              title="PHP Developer" 
              company="Visital Technology · Bhubaneswar" 
              date="Jun 2023 — Jan 2025" 
              description="Developed secure and efficient web applications, focusing on backend systems and robust API integrations."
            />
            <ExperienceItem 
              title="Software Developer Executive" 
              company="Typof · Bhubaneswar" 
              date="Oct 2022 — Jun 2023" 
              description="Contributed across the full development lifecycle from coding to deployment in a collaborative environment."
            />
          </div>

          {/* Tech Stack & Bio */}
          <div className="space-y-8">
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-72 h-72 bg-accent-cyan/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-accent-cyan/10 transition-colors duration-700" />
              
              <h3 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 flex items-center gap-3 relative z-10">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-accent-cyan" />
                TECH STACK
              </h3>
              
              <div className="flex flex-wrap gap-2.5 md:gap-4 relative z-10">
                {techStack.map((tech, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    key={tech.name} 
                    className="px-4 py-2.5 md:px-6 md:py-3.5 bg-[#121216] border border-white/5 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 hover:border-accent-cyan/40 hover:bg-[#1A1A24] hover:-translate-y-1 transition-all duration-300 cursor-pointer group/badge shadow-lg"
                  >
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/20 group-hover/badge:bg-accent-cyan group-hover/badge:shadow-[0_0_12px_rgba(76,201,240,0.9)] transition-all duration-300" />
                    <span className="text-xs md:text-sm font-bold tracking-wider text-white/70 group-hover/badge:text-white transition-colors">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-10 md:mt-14 pt-8 md:pt-10 border-t border-white/5 relative z-10">
                <p className="text-white/60 text-base md:text-lg leading-relaxed italic font-light">
                  &quot;I believe great software is not just functional — it&apos;s scalable, maintainable, and built with precision and purpose.&quot;
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

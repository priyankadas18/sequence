'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Shield, Zap, Layout, Globe, LucideIcon } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    title: 'Steel & Mines Portal',
    description: 'Large-scale enterprise platform for managing industrial operations, compliance, and multi-user workflows.',
    tags: ['PHP', 'System Design', 'Security'],
    icon: Shield,
    image: '/images/steelmines.png',
    link: 'https://bhubaneswaroffice.in/steelmining/'
  },
  {
    title: 'WonderWorld Waterpark',
    description: 'Complete booking system handling ticketing, visitor flow, and real-time operational tracking.',
    tags: ['Node.js', 'Real-time', 'MySQL'],
    icon: Zap,
    image: '/images/wonderworld.png',
    link: 'https://wonderworldwaterparkandresort.com/'
  },
  {
    title: 'AgriSoul Platform',
    description: 'Integrating market insights and advisory services to connect farmers with supply chain tools.',
    tags: ['Full-Stack', 'Agriculture', 'APIs'],
    icon: Globe,
    image: '/images/agrisoul.png',
    link: 'https://agrisoul.in/'
  },
  {
    title: 'HealthSquare (Nepal)',
    description: 'Healthcare management platform ensuring secure handling of patient records and reliable appointments.',
    tags: ['Healthcare', 'Security', 'Laravel'],
    icon: Shield,
    image: '/images/healthsquare.png',
    link: 'https://apcagenciesandconsultancy.com/healthsquare/'
  },
  {
    title: 'Lalit Kala Akademi',
    description: 'Official government portal for Odisha, preserving cultural archives and managing massive art events.',
    tags: ['Digital Archive', 'Gov-Tech', 'PHP'],
    icon: Layout,
    image: '/images/lalitkala.png',
    link: 'https://lalitkalaakademi.odisha.gov.in/'
  },
  {
    title: 'Multivendor E-Commerce',
    description: 'Scalable marketplace with vendor dashboards, complex order workflows, and payment integration.',
    tags: ['E-Commerce', 'Scalable', 'MongoDB'],
    icon: Zap,
    image: '/images/nayakpro.png',
    link: 'https://nayakpro.com/'
  },
  {
    title: 'OdishaRay News',
    description: 'High-performance digital news platform delivering real-time multimedia content to a large audience.',
    tags: ['Digital Media', 'Performance', 'Node.js'],
    icon: Globe,
    image: '/images/odisharay.png',
    link: 'https://www.odisharay.com/'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="relative z-20 py-32 px-12 md:px-24 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-6"
            >
              PROJECT <span className="text-premium">SHOWCASE</span>
            </motion.h2>
            <p className="text-white/40 max-w-sm font-light tracking-widest uppercase text-xs">
              Handpicked selection of scalable systems and enterprise solutions.
            </p>
          </div>
          <div className="w-px h-24 bg-white/10 hidden md:block" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
  const Icon = project.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass glass-hover group flex flex-col h-full overflow-hidden relative"
    >
      <div className="relative h-32 md:h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent" />
        <div className="absolute top-2 md:top-4 left-2 md:left-4">
             <div className="w-8 h-8 md:w-10 md:h-10 glass rounded-full flex items-center justify-center text-accent-cyan">
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
             </div>
        </div>
      </div>

      <div className="p-4 md:p-8 flex flex-col flex-grow">
        <h3 className="text-base md:text-2xl font-bold mb-1 md:mb-3 tracking-wide group-hover:text-accent-cyan transition-colors line-clamp-1">{project.title}</h3>
        <p className="text-white/40 mb-4 md:mb-8 flex-grow leading-relaxed text-[10px] md:text-sm font-light line-clamp-2 md:line-clamp-none">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-8">
          {project.tags.slice(0, 2).map((tag: string) => (
            <span 
              key={tag} 
              className="px-2 py-0.5 md:px-3 md:py-1 glass text-white/30 text-[8px] md:text-[10px] font-bold tracking-widest uppercase rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-white/5">
          <div className="flex gap-2 md:gap-4">
             <a href={project.link} target="_blank" rel="noopener noreferrer">
               <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-white/20 hover:text-accent-cyan transition-colors cursor-pointer" />
             </a>
          </div>
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-accent-cyan flex items-center gap-1 md:gap-2 group/btn"
          >
            <span className="hidden sm:inline">View Project</span>
            <span className="sm:hidden">View</span>
            <ArrowUpRight className="w-2 h-2 md:w-3 md:h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

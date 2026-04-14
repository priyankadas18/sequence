import ScrollyCanvas from '@/components/ScrollyCanvas';
import Overlay from '@/components/Overlay';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import { Globe, Code2, Mail } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative bg-[#0A0A0F]">
      {/* Cinematic Scrolly Section */}
      <section className="relative z-0">
        <ScrollyCanvas />
        <Overlay />
      </section>

      {/* About Section */}
      <About />

      {/* Projects Grid Section */}
      <Projects />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="py-24 px-12 md:px-24 border-t border-white/5 bg-[#08080C]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <h4 className="text-2xl font-bold tracking-tighter">Priyanka <span className="text-premium">Das</span></h4>
            <p className="text-white/20 text-[10px] tracking-[0.3em] font-bold uppercase">© 2026 All rights reserved</p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-4 md:gap-12">
            {[
              { label: 'LinkedIn', href: 'https://linkedin.com/in/priyanka-das-398499241', icon: Globe },
              { label: 'GitHub', href: 'https://github.com/priyankadas18', icon: Code2 },
              { label: 'Email', href: 'mailto:daspriyankaa01@gmail.com', icon: Mail }
            ].map((social) => (
              <a 
                key={social.label} 
                href={social.href} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/40 hover:text-accent-cyan transition-colors group shrink-0"
              >
                <social.icon className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:scale-110" />
                <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

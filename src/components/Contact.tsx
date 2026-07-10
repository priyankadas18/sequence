'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Globe, Briefcase, ArrowRight, ExternalLink, CheckCircle2, AlertCircle, LucideIcon } from 'lucide-react';
import { sendEmail } from '@/app/actions/contact';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setStatus('pending');
    setErrorMessage('');

    try {
      const result = await sendEmail(formData);
      if (result.success) {
        setStatus('success');
        formRef.current?.reset();
        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('A network error occurred. Please try again.');
    }
  }

  return (
    <section id="contact" className="relative z-20 pt-12 md:pt-20 pb-16 md:pb-40 px-6 md:px-24 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left Content (Text & Links) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } },
                hidden: {}
              }}
            >
              <motion.h2 
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-tight md:leading-[1.1]"
              >
                LET&apos;S BUILD <br />
                <span className="text-premium">SOMETHING</span> <br />
                IMPACTFUL.
              </motion.h2>
              <motion.p 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-white/50 text-base md:text-lg mb-12 max-w-md leading-relaxed font-light"
              >
                Open to freelance projects, collaborations, and full-time opportunities. 
                Let&apos;s turn your ideas into high-performance digital products.
              </motion.p>
              
              <div className="flex flex-col gap-2">
                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}>
                  <ContactLink icon={MessageSquare} label="Email" value="daspriyankaa01@gmail.com" href="mailto:daspriyankaa01@gmail.com" />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}>
                  <ContactLink icon={Globe} label="GitHub" value="github.com/priyankadas18" href="https://github.com/priyankadas18" />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}>
                  <ContactLink icon={Briefcase} label="LinkedIn" value="linkedin.com/in/priyanka-das" href="https://linkedin.com/in/priyanka-das-398499241" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content (Form) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col justify-end w-full"
            >
              <form 
                ref={formRef}
                action={handleSubmit}
                className="space-y-5 bg-[#121216]/60 backdrop-blur-2xl p-6 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group/form"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none transition-colors duration-700 group-focus-within/form:bg-accent-cyan/20" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                  <FormInput label="Name" name="name" type="text" placeholder="Name" required />
                  <FormInput label="Email" name="email" type="email" placeholder="Email" required />
                </div>
                <div className="relative z-10">
                  <FormInput label="Subject" name="subject" type="text" placeholder="Project Inquiry" required />
                </div>
                <div className="space-y-2 relative z-10">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 ml-1">Message</label>
                  <textarea 
                    name="message"
                    required
                    className="w-full bg-[#0A0A0F]/50 border border-white/10 p-4 md:p-5 rounded-2xl focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 focus:outline-none transition-all duration-300 min-h-[160px] text-white/90 text-sm md:text-base placeholder:text-white/20 resize-none shadow-inner"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-400 text-sm">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <p>Message sent successfully! I&apos;ll get back to you soon.</p>
                      </div>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{errorMessage}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  type="submit"
                  disabled={status === 'pending'}
                  className="w-full relative z-10 bg-white text-[#0A0A0F] font-bold py-4 md:py-5 rounded-2xl hover:bg-accent-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(76,201,240,0.4)]"
                >
                  {status === 'pending' ? 'Sending...' : 'Send Message'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ContactLink = ({ icon: Icon, label, value, href }: { icon: LucideIcon, label: string, value: string, href: string }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 md:gap-5 group p-3 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5 w-fit"
  >
    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#121216] border border-white/5 rounded-2xl flex items-center justify-center text-white/50 group-hover:text-accent-cyan group-hover:bg-accent-cyan/10 group-hover:border-accent-cyan/30 transition-all duration-300 shadow-lg shrink-0">
      <Icon className="w-5 h-5 md:w-6 md:h-6" />
    </div>
    <div>
      <p className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-sm md:text-base text-white/90 font-medium group-hover:text-accent-cyan transition-colors">{value}</p>
        <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-white/20 group-hover:text-accent-cyan transition-colors shrink-0 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 duration-300" />
      </div>
    </div>
  </a>
);

const FormInput = ({ label, name, type, placeholder, required }: { label: string, name: string, type: string, placeholder: string, required?: boolean }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 ml-1">{label}</label>
    <input 
      name={name}
      type={type}
      required={required}
      className="w-full bg-[#0A0A0F]/50 border border-white/10 p-4 md:p-5 rounded-2xl focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 focus:outline-none transition-all duration-300 text-white/90 text-sm md:text-base placeholder:text-white/20 shadow-inner"
      placeholder={placeholder}
    />
  </div>
);

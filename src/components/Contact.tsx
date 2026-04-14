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
    <section id="contact" className="relative z-20 py-32 px-12 md:px-24 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto">
        <div className="glass p-6 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full -mr-48 -mt-48" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-3xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-[0.9]">
                LET&apos;S BUILD <br />
                <span className="text-premium">SOMETHING</span> <br />
                IMPACTFUL.
              </h2>
              <p className="text-white/40 text-lg mb-12 max-w-md leading-relaxed font-light">
                Open to freelance projects, collaborations, and full-time opportunities. 
                Let&apos;s turn your ideas into high-performance digital products.
              </p>
              
              <div className="flex flex-col gap-6">
                <ContactLink 
                  icon={MessageSquare} 
                  label="Email" 
                  value="daspriyankaa01@gmail.com" 
                  href="mailto:daspriyankaa01@gmail.com" 
                />
                <ContactLink 
                  icon={Globe} 
                  label="GitHub" 
                  value="github.com/priyankadas18" 
                  href="https://github.com/priyankadas18" 
                />
                <ContactLink 
                  icon={Briefcase} 
                  label="LinkedIn" 
                  value="linkedin.com/in/priyanka-das" 
                  href="https://linkedin.com/in/priyanka-das-398499241" 
                />
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <form 
                ref={formRef}
                action={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Name" name="name" type="text" placeholder="John Doe" required />
                  <FormInput label="Email" name="email" type="email" placeholder="john@example.com" required />
                </div>
                <FormInput label="Subject" name="subject" type="text" placeholder="Project Inquiry" required />
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-[0.2em] uppercase text-white/40">Message</label>
                  <textarea 
                    name="message"
                    required
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-accent-cyan/50 focus:outline-none transition-colors min-h-[150px] text-white"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400 text-sm"
                    >
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <p>Message sent successfully! I&apos;ll get back to you soon.</p>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p>{errorMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  type="submit"
                  disabled={status === 'pending'}
                  className="w-full bg-accent-cyan text-[#0A0A0F] font-bold py-5 rounded-xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 group"
                >
                  {status === 'pending' ? 'Sending...' : 'Send Message'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
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
    className="flex items-center gap-6 group"
  >
    <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-white/40 group-hover:text-accent-cyan transition-colors">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-white font-medium group-hover:text-accent-cyan transition-colors">{value}</p>
        <ExternalLink className="w-4 h-4 text-white/10 group-hover:text-accent-cyan/40 transition-colors" />
      </div>
    </div>
  </a>
);

const FormInput = ({ label, name, type, placeholder, required }: { label: string, name: string, type: string, placeholder: string, required?: boolean }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold tracking-[0.2em] uppercase text-white/40">{label}</label>
    <input 
      name={name}
      type={type}
      required={required}
      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-accent-cyan/50 focus:outline-none transition-colors text-white"
      placeholder={placeholder}
    />
  </div>
);

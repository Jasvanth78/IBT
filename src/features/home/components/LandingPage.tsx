'use client';

import { motion } from 'framer-motion';
import { FiArrowRight, FiInfo, FiCpu, FiCode, FiActivity, FiTarget } from 'react-icons/fi';
import { SiteButton } from '@/src/shared/ui';
import { HomeSections } from './HomeSections';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function LandingPage() {
  return (
    <div className="relative flex flex-col overflow-hidden bg-white text-(--ui-text) pb-20">
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-(--ui-primary-soft)/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-(--ui-primary-soft)/10 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
           animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
           transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
           className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start"
        >
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } } }}
            className="flex flex-col items-start text-left lg:col-span-6 lg:pt-14"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-(--ui-primary)">
                  DIGITAL TRANSFORMATION COMPANY
                </p>
                <div className="h-1 w-12 bg-(--ui-primary) rounded-full" />
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-[72px] leading-[1.1]">
                  Driving Innovation.<br />
                  Delivering Transformation.<br />
                  <span className="text-(--ui-primary)">Building the Future.</span>
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
                  We empower businesses worldwide with innovative solutions and cutting-edge technologies. 
                  From startups to global enterprises, we help organizations adapt, evolve, and thrive in the digital age.
                </p>
              </div>

              {/* Action Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
                {[
                  { icon: FiCpu, title: "Innovate", desc: "Turning ideas into powerful digital solutions." },
                  { icon: FiCode, title: "Build", desc: "Engineering scalable, secure & high performance products." },
                  { icon: FiActivity, title: "Transform", desc: "Driving business growth with digital transformation." },
                  { icon: FiTarget, title: "Succeed", desc: "Delivering measurable results and long-term success." }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-3 group">
                    <div className="w-12 h-12 rounded-xl bg-(--ui-primary-soft)/10 flex items-center justify-center text-(--ui-primary) group-hover:bg-(--ui-primary) group-hover:text-white transition-all duration-300">
                      <item.icon className="text-2xl" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-5 pt-4">
                <SiteButton
                  href="/contact"
                  size="lg"
                  className="px-10 py-7 text-lg rounded-xl shadow-xl shadow-(--ui-primary-soft)/20"
                >
                  Get Started
                </SiteButton>
                <SiteButton
                  href="/about"
                  variant="secondary"
                  size="lg"
                  className="px-10 py-7 text-lg rounded-xl bg-white border border-slate-200 shadow-sm"
                >
                  Learn More
                </SiteButton>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Collage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hidden lg:block lg:col-span-6 relative h-[500px]"
          >
            {/* Main Central Circle Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full overflow-hidden border-[10px] border-white shadow-2xl z-10">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                alt="City Architecture" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-(--ui-primary)/20 to-transparent mix-blend-overlay" />
            </div>

            {/* Geometric Overlays */}
            {/* Top Right - Hexagon/Diamond */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] z-20 overflow-hidden transform rotate-12 hover:rotate-0 transition-transform duration-700 shadow-xl border-4 border-white" style={{ borderRadius: '35px' }}>
              <img 
                src="https://images.unsplash.com/photo-1522071823991-b9671f9d7f1f?q=80&w=2070&auto=format&fit=crop" 
                alt="Digital Collaboration" 
                className="w-full h-full object-cover -rotate-12 hover:scale-110 transition-all"
              />
              <div className="absolute inset-0 bg-red-900/40 mix-blend-multiply" />
            </div>

            {/* Middle Right - Polygon */}
            <div className="absolute top-[40%] -right-8 w-[150px] h-[150px] z-20 overflow-hidden transform -rotate-6 hover:rotate-0 transition-transform duration-700 shadow-lg border-4 border-white" style={{ borderRadius: '25px' }}>
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                alt="Tech Network" 
                className="w-full h-full object-cover rotate-6 hover:scale-110 transition-all"
              />
            </div>

            {/* Bottom Left - Tablet Context */}
            <div className="absolute bottom-0 left-[10%] w-[280px] h-[180px] z-20 overflow-hidden shadow-2xl border-4 border-white" style={{ borderRadius: '40px 10px 40px 10px' }}>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                alt="Analytics" 
                className="w-full h-full object-cover hover:scale-110 transition-all duration-700"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-0 w-8 h-8 rounded-full bg-(--ui-primary) animate-ping opacity-20" />
            <div className="absolute bottom-1/4 right-[20%] w-4 h-4 rounded-full bg-slate-400 opacity-30" />
          </motion.div>
        </motion.div>
      </main>

      {/* Floating Stats Bar */}
      <div className="absolute bottom-6 left-0 right-0 z-20 px-4 hidden lg:block">
        <div className="mx-auto max-w-7xl">
           <HomeSections isFloating />
        </div>
      </div>
      
      {/* Mobile/Tablet Stats (Always visible in flow) */}
      <div className="lg:hidden px-4 pb-16 relative z-20">
         <HomeSections isFloating={false} />
      </div>
    </div>
  );
}
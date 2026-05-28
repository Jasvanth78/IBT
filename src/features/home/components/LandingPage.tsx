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
    <div className="relative flex flex-col overflow-hidden bg-white text-(--ui-text) pb-10">
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[var(--ui-primary-soft)] rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[var(--ui-muted)]/10 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: 'easeOut' }}
           className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center"
        >
          {/* Left Visual Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex justify-center order-2 lg:order-1"
          >
            <div className="relative w-full max-w-[600px]">
              {/* This is a simplified SVG version of the rocket illustration from the image */}
              <svg viewBox="0 0 500 400" className="w-full h-auto drop-shadow-2xl">
                {/* Screen / Laptop */}
                <rect x="100" y="200" width="300" height="180" rx="10" fill="#1d3557" />
                <rect x="110" y="210" width="280" height="150" rx="5" fill="#457b9d" />
                <circle cx="120" cy="220" r="4" fill="#e63946" />
                <circle cx="135" cy="220" r="4" fill="#ffbd2e" />
                <circle cx="150" cy="220" r="4" fill="#27c93f" />
                
                {/* Person Illustration (simplified) */}
                <path d="M50 380 Q50 250 150 250 T250 380" fill="#1d3557" opacity="0.1" />
                <circle cx="70" cy="280" r="25" fill="#ffdbac" /> {/* Head */}
                <path d="M40 310 Q70 300 100 310 L100 400 L40 400 Z" fill="#e63946" /> {/* Shirt */}
                <path d="M70 280 L90 315 L110 330" stroke="#ffdbac" strokeWidth="8" strokeLinecap="round" fill="none" /> {/* Arm */}
                
                {/* Rocket */}
                <motion.g
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path d="M250 50 L280 150 L220 150 Z" fill="#e63946" /> {/* Rocket Body Top */}
                  <rect x="220" y="150" width="60" height="80" fill="#e63946" /> {/* Rocket Body Middle */}
                  <path d="M220 230 L200 260 L220 260 Z" fill="#0077b6" /> {/* Left Wing */}
                  <path d="M280 230 L300 260 L280 260 Z" fill="#0077b6" /> {/* Right Wing */}
                  <circle cx="250" cy="180" r="15" fill="#fab758" /> {/* Window */}
                  <circle cx="250" cy="180" r="12" fill="#fff" opacity="0.3" />
                  
                  {/* Rocket Smoke/Fire */}
                  <path d="M230 230 Q250 280 270 230" fill="#f58220" />
                  <path d="M240 230 Q250 260 260 230" fill="#ffcc00" />
                </motion.g>

                {/* Floating Elements */}
                <motion.g animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                   <rect x="350" y="100" width="40" height="40" rx="8" fill="#e63946" opacity="0.8" />
                   <path d="M362 120 L378 120 M370 112 L370 128" stroke="white" strokeWidth="3" />
                </motion.g>
                <motion.g animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                   <circle cx="430" cy="180" r="25" fill="#0077b6" opacity="0.9" />
                   <path d="M420 180 L440 180 M430 170 L430 190" stroke="white" strokeWidth="3" opacity="0" />
                   <path d="M422 175 L430 185 L443 172" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </motion.g>
                <motion.g animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                   <rect x="300" y="280" width="120" height="50" rx="10" fill="#457b9d" />
                   <rect x="320" y="295" width="80" height="6" rx="3" fill="white" opacity="0.4" />
                   <rect x="320" y="308" width="50" height="6" rx="3" fill="white" opacity="0.4" />
                </motion.g>
              </svg>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } } }}
            className="flex flex-col items-start text-left order-1 lg:order-2 lg:pl-6"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-[#1d3557] sm:text-5xl lg:text-[56px] leading-[1.15]">
                  Grow Your Business<br />
                  with <span className="text-[#e63946]">Our Solutions.</span>
                </h1>
                <p className="max-w-2xl text-[17px] leading-relaxed text-[#457b9d] font-medium">
                  We help our clients to increase their website traffic, rankings and visibility in search results.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <SiteButton
                  href="/contact"
                  size="lg"
                  className="px-8 py-3.5 text-base font-bold rounded-full bg-[#e63946] text-white hover:bg-[#c1121f] shadow-lg shadow-red-200 transition-all duration-300"
                >
                  Try It For Free
                </SiteButton>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Stats Bar */}
      <div className="pb-10 relative z-20">
         <div className="mx-auto max-w-7xl px-4">
            <HomeSections isFloating={false} />
         </div>
      </div>
    </div>
  );
}
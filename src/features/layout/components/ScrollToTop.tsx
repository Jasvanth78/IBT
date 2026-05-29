'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

/**
 * ScrollToTop Component
 * Modern "Back to Top" button with circular progress indicator
 */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const toggleVisibility = () => {
      // Use both window.pageYOffset and document.documentElement.scrollTop for better coverage
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      if (scrolled > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    // Initial check
    toggleVisibility();
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return isVisible ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 z-[99999] cursor-pointer sm:bottom-28"
      style={{ pointerEvents: 'auto' }}
    >
      <div className="relative h-14 w-14 flex items-center justify-center rounded-full bg-[#e63946] shadow-[0_10px_40px_rgba(230,57,70,0.4)] group">
        {/* Background Circle */}
        <svg className="absolute inset-0 h-full w-full -rotate-90 transform scale-[1.1] transition-transform duration-300 group-hover:scale-[1.15]" viewBox="0 0 100 100">
          <circle
            className="opacity-20"
            strokeWidth="6"
            stroke="white"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
          />
          {/* Progress Circle (White) */}
          <motion.circle
            strokeWidth="6"
            strokeDasharray="263.89"
            style={{ pathLength: scrollYProgress }}
            strokeLinecap="round"
            stroke="white"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
          />
        </svg>
        
        {/* Arrow Icon */}
        <FiArrowUp className="relative z-10 text-2xl text-white transition-transform duration-300 group-hover:-translate-y-1" />
      </div>
    </motion.div>
  ) : null;
}

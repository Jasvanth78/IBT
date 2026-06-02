'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useSocketSettings } from '@/src/providers/SocketSettingsProvider';

interface WhyItem {
  title: string;
  description: string;
}

export function WhyChooseUsSection() {
  const { settings, loading } = useSocketSettings();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Parse why items from settings
  const items = useMemo((): WhyItem[] => {
    const defaultItems = [
      { title: 'Professional Design', description: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum. Praesent commodo cursus magna, vel.' },
      { title: 'Top-Notch Support', description: 'Nililne id dolor id nibh ultricies vehicula ut id elit. Nullam quis risus eget urna mollis ornare sem lacinia quam venenatis.' },
      { title: 'Header and Slider Options', description: 'Etiam porta sem malesuada magna mollis euismod. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.' }
    ];

    if (!settings?.servicesWhyItems) return defaultItems;

    try {
      // Handle the case where the string might not be valid JSON (e.g., plain text or malformed)
      if (typeof settings.servicesWhyItems === 'string') {
        const trimmed = settings.servicesWhyItems.trim();
        // Crude check if it looks like a JSON array or object
        if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
          const parsed = JSON.parse(trimmed);
          return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultItems;
        }
        // If it's a string but doesn't look like JSON, it's probably raw text, treat as fallback
        return defaultItems;
      }
      
      return Array.isArray(settings.servicesWhyItems) && settings.servicesWhyItems.length > 0 
        ? settings.servicesWhyItems 
        : defaultItems;
    } catch (e) {
      console.warn("Failed to parse servicesWhyItems, using defaults.", e);
      return defaultItems;
    }
  }, [settings?.servicesWhyItems]);

  const badge = settings?.servicesWhyBadge || "WHY CHOOSE US?";
  const title = settings?.servicesWhyTitle || "We bring solutions to make life easier for our clients.";

  if (loading && items.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Visual Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
             <div className="relative w-full max-w-[500px]">
                {/* SVG Illustration mimicking the Sandbox style */}
                <svg viewBox="0 0 500 450" className="w-full h-auto drop-shadow-2xl">
                  {/* Background Accents */}
                  <circle cx="450" cy="150" r="15" fill="#e63946" opacity="0.1" />
                  <circle cx="50" cy="350" r="10" fill="#1d3557" opacity="0.1" />
                  
                  {/* Drawing Board / Screen */}
                  <rect x="80" y="80" width="340" height="260" rx="20" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
                  <rect x="100" y="100" width="300" height="220" rx="10" fill="white" className="drop-shadow-sm" />
                  
                  {/* People Characters (Simplified) */}
                  {/* Person 1 - Left */}
                  <g>
                    <path d="M120 400 Q150 250 180 400" fill="#1d3557" />
                    <circle cx="150" cy="280" r="30" fill="#ffdbac" />
                    <rect x="155" cy="330" width="25" height="40" rx="5" fill="#1d3557" transform="rotate(-20 155 330)" />
                  </g>
                  
                  {/* Person 2 - Center */}
                  <g>
                    <path d="M220 420 Q260 230 300 420" fill="#e63946" />
                    <circle cx="260" cy="270" r="35" fill="#f1c27d" />
                    <rect x="235" cy="340" width="50" height="30" rx="8" fill="#e63946" />
                  </g>
                  
                  {/* Person 3 - Right */}
                  <g>
                    <path d="M350 410 Q380 270 410 410" fill="#457b9d" />
                    <circle cx="380" cy="300" r="30" fill="#8d5524" />
                    <rect x="340" y="350" width="40" height="40" rx="5" fill="#1d3557" />
                  </g>

                  {/* UI Elements on the board */}
                  <rect x="120" y="120" width="50" height="50" rx="8" fill="#34d399" opacity="0.8" />
                  <path d="M130 145 L145 155 L160 135" stroke="white" strokeWidth="4" fill="none" />
                  
                  <rect x="180" y="120" width="180" height="10" rx="5" fill="#f1f4f9" />
                  <rect x="180" y="140" width="120" height="10" rx="5" fill="#f1f4f9" />
                  
                  <circle cx="350" cy="180" r="20" fill="#3f78e0" opacity="0.6" />
                  
                  <rect x="120" y="190" width="220" height="110" rx="15" fill="#1d3557" opacity="0.05" />
                  <path d="M140 280 L180 230 L230 260 L300 200" stroke="#1d3557" strokeWidth="3" fill="none" />
                </svg>
             </div>
          </motion.div>

          {/* Right Content Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e63946] mb-3">
                {badge}
              </h3>
              <h2 className="text-[28px] font-bold tracking-tight text-[#1d3557] sm:text-[36px] lg:text-[40px] leading-[1.2] mb-4">
                {title}
              </h2>
              {settings?.servicesWhyDescription && (
                <div 
                   className="text-[16px] text-[#60697b] mb-6 leading-relaxed [&_*]:!whitespace-normal break-words"
                   dangerouslySetInnerHTML={{ __html: settings.servicesWhyDescription }}
                />
              )}
            </div>

            <div className="space-y-4">
              {items.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`border-b border-slate-100 pb-4 transition-all duration-300`}
                >
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                    className="flex items-center justify-between w-full py-2 text-left group focus:outline-none"
                  >
                    <span className={`text-[17px] font-bold transition-colors ${expandedIndex === idx ? 'text-[#e63946]' : 'text-[#1d3557] group-hover:text-[#e63946]'}`}>
                      {item.title}
                    </span>
                    <span className={`flex-shrink-0 ml-4 transition-transform duration-300 ${expandedIndex === idx ? 'rotate-180 text-[#e63946]' : 'text-[#457b9d]'}`}>
                      <FiChevronDown size={20} />
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {expandedIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="py-3 text-[15px] leading-relaxed text-[#60697b]">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

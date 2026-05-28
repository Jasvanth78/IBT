'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { apiClient } from '@/src/api/client';
import { FiCheckCircle } from 'react-icons/fi';

export function SolutionsSection() {
  const [data, setData] = useState<{
    homeSolutionsTitle: string | null;
    homeSolutionsBadge: string | null;
    homeSolutionsDescription: string | null;
    homeSolutionsItems: string[];
  }>({
    homeSolutionsTitle: null,
    homeSolutionsBadge: null,
    homeSolutionsDescription: null,
    homeSolutionsItems: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await apiClient.getSettings();
        
        let items: string[] = [];
        if (settings.homeSolutionsItems) {
           items = Array.isArray(settings.homeSolutionsItems) 
              ? settings.homeSolutionsItems 
              : JSON.parse(settings.homeSolutionsItems);
        }

        setData({
          homeSolutionsTitle: settings.homeSolutionsTitle,
          homeSolutionsBadge: settings.homeSolutionsBadge,
          homeSolutionsDescription: settings.homeSolutionsDescription,
          homeSolutionsItems: items,
        });
      } catch (error) {
        console.error('Failed to fetch solutions settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  if (loading && data.homeSolutionsItems.length === 0) {
    return null;
  }

  const badge = data.homeSolutionsBadge || "OUR SOLUTIONS";
  const title = data.homeSolutionsTitle || "We make your spending stress-free for you to have the perfect control.";
  const description = data.homeSolutionsDescription || "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus.";
  const items = data.homeSolutionsItems.length > 0 ? data.homeSolutionsItems : [
    'Aenean quam ornare. Curabitur blandit.',
    'Etiam porta euismod malesuada mollis.',
    'Nullam quis risus eget urna mollis ornare.',
    'Vivamus sagittis lacus vel augue rutrum.'
  ];

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e63946] mb-3">
              {badge}
            </h3>
            <h2 className="text-[28px] font-bold tracking-tight text-[#1d3557] sm:text-[36px] lg:text-[40px] leading-[1.2] mb-6">
              {title}
            </h2>
            <div 
               className="text-[17px] text-[#60697b] mb-10 leading-relaxed"
               dangerouslySetInnerHTML={{ __html: description }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-[#e63946]/10 flex items-center justify-center">
                       <FiCheckCircle className="text-[#e63946] text-[14px]" />
                    </div>
                  </div>
                  <p className="text-[15px] font-medium text-[#1d3557]">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center order-first lg:order-last"
          >
             <div className="relative w-full max-w-[550px]">
                {/* SVG Illustration - Spending/Control Theme */}
                <svg viewBox="0 0 500 450" className="w-full h-auto drop-shadow-2xl">
                   {/* Background Elements */}
                   <rect x="50" y="50" width="400" height="300" rx="20" fill="#fef2f2" opacity="0.5" />
                   <circle cx="450" cy="200" r="10" fill="#e63946" opacity="0.2" />
                   
                   {/* Main Dashboard UI */}
                   <rect x="100" y="80" width="300" height="240" rx="15" fill="white" shadow="sm" />
                   <rect x="120" y="100" width="40" height="40" rx="10" fill="#1d3557" />
                   <rect x="170" y="110" width="100" height="8" rx="4" fill="#f1f4f9" />
                   <rect x="170" y="125" width="60" height="8" rx="4" fill="#f1f4f9" />
                   
                   {/* Chart Element */}
                   <rect x="120" y="160" width="260" height="140" rx="10" fill="#f8fafc" />
                   <path d="M140 280 L180 220 L240 250 L300 180 L360 210" stroke="#e63946" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                   <motion.circle 
                     animate={{ r: [6, 8, 6] }} 
                     transition={{ duration: 2, repeat: Infinity }}
                     cx="360" cy="210" r="6" fill="#1d3557" 
                   />

                   {/* Characters */}
                   {/* Person 1 - Left gesturing to chart */}
                   <g>
                     <path d="M80 420 Q120 280 150 420" fill="#1d3557" />
                     <circle cx="115" cy="300" r="30" fill="#f1c27d" />
                     <rect x="140" y="320" width="40" height="10" fill="#f1c27d" transform="rotate(-30 140 320)" />
                   </g>

                   {/* Person 2 - Right viewing Dashboard */}
                   <g>
                     <path d="M350 420 Q390 280 430 420" fill="#e63946" />
                     <circle cx="390" cy="300" r="30" fill="#ffdbac" />
                     <rect x="340" y="350" width="60" height="40" rx="10" fill="#1d3557" opacity="0.8" />
                   </g>

                   {/* Floating Chat Bubbles */}
                   <motion.g animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                      <rect x="400" y="100" width="60" height="40" rx="12" fill="#1d3557" />
                      <path d="M415 120 H445" stroke="white" strokeWidth="3" />
                   </motion.g>
                   <motion.g animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}>
                      <rect x="40" y="180" width="50" height="50" rx="10" fill="#e63946" />
                      <path d="M55 205 L65 215 L80 195" stroke="white" strokeWidth="4" fill="none" />
                   </motion.g>
                </svg>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

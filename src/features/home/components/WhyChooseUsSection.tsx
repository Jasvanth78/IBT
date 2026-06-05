'use client';

import { motion } from 'framer-motion';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { SiteButton } from '@/src/shared/ui';

const benefits = [
  {
    title: 'Experienced & Skilled Team',
    description: 'Experts with years of industry experience.'
  },
  {
    title: 'Security First Approach',
    description: 'We follow best practices for top security.'
  },
  {
    title: 'Agile & Transparent Process',
    description: 'We keep you informed at every step.'
  },
  {
    title: 'On-Time Delivery',
    description: 'We value time and commit to deadlines.'
  },
  {
    title: 'AI-Powered Solutions',
    description: 'Leverage AI to drive innovation and growth.'
  },
  {
    title: 'Dedicated Support',
    description: "We're always here when you need us."
  }
];

export function WhyChooseUsSection() {
  return (
    <section className="bg-[#f8faff] py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr_1fr] gap-10 lg:gap-14 xl:gap-20 items-center mx-auto">

          {/* Column 1: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <h3 className="text-[18px] font-bold uppercase tracking-widest !text-red-500 mb-4">
              WHY CHOOSE IBACUS TECH?
            </h3>
            <h2 className="font-black text-[#0f172a] pr-4">
              We Deliver More<br />Than Expectations
            </h2>
            <p className="text-[14px] font-medium text-slate-600 mb-10 max-w-[360px] leading-relaxed">
              We combine technology, creativity and strategy to build solutions that create real impact.
            </p>
            <SiteButton
              href="/about"
              className="bg-[#e63946] text-white rounded-[6px] px-7 py-3.5 font-bold text-[13px] hover:bg-[#c1121f] transition-colors shadow-lg shadow-[#e63946]/20"
            >
              Know More About Us <FiArrowRight className="inline-block ml-1.5" />
            </SiteButton>
          </motion.div>

          {/* Column 2: Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 relative z-10">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-6 h-6 rounded-full bg-[#1d4ed8] flex items-center justify-center">
                      <FiCheckCircle className="text-white text-[14px]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#0f172a] mb-1 leading-tight">{benefit.title}</h4>
                    <p className="text-[12px] font-medium text-slate-500 leading-relaxed max-w-[200px]">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-[420px] mx-auto lg:ml-auto hidden lg:block"
          >
            <svg viewBox="0 0 500 250" className="w-full h-auto drop-shadow-2xl bg-white rounded-2xl overflow-visible">
              {/* Main Dashboard Area */}
              <rect x="20" y="20" width="460" height="210" rx="10" fill="#f8fafc" />

              {/* Sidebar */}
              <rect x="20" y="20" width="80" height="210" rx="10" fill="#1e293b" />
              <circle cx="60" cy="50" r="15" fill="#3b82f6" />
              <rect x="40" y="80" width="40" height="6" rx="3" fill="#334155" />
              <rect x="40" y="100" width="40" height="6" rx="3" fill="#334155" />
              <rect x="40" y="120" width="40" height="6" rx="3" fill="#334155" />

              {/* Header */}
              <rect x="120" y="40" width="150" height="15" rx="5" fill="#e2e8f0" />
              <circle cx="440" cy="47" r="12" fill="#cbd5e1" />

              {/* Chart area */}
              <rect x="120" y="80" width="200" height="120" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="2" />
              <path d="M140 180 L180 130 L220 150 L260 100 L300 120" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

              {/* Donut Chart */}
              <circle cx="390" cy="140" r="40" fill="none" stroke="#e2e8f0" strokeWidth="15" />
              <circle cx="390" cy="140" r="40" fill="none" stroke="#3b82f6" strokeWidth="15" strokeDasharray="180 250" />
              <circle cx="390" cy="140" r="40" fill="none" stroke="#10b981" strokeWidth="15" strokeDasharray="60 250" strokeDashoffset="-180" />

              {/* Characters */}
              {/* Person 1 standing near chart */}
              <path d="M300 190 Q300 130 330 190" fill="#fca5a5" />
              <circle cx="315" cy="110" r="15" fill="#fbbf24" />
              <rect x="305" y="125" width="20" height="40" fill="#f87171" rx="5" />

              {/* Person 2 sitting at desk */}
              <rect x="400" y="170" width="40" height="20" fill="#94a3b8" /> {/* desk */}
              <rect x="410" y="150" width="20" height="15" fill="#64748b" /> {/* laptop */}
              <circle cx="450" cy="130" r="15" fill="#fcd34d" />
              <rect x="440" y="145" width="20" height="45" fill="#3b82f6" rx="5" />
            </svg>
            {/* Floating Checkmark Badge */}
            <div className="absolute top-1/2 -right-4 bg-emerald-500 text-white rounded-full p-1.5 shadow-xl border-4 border-white">
              <FiCheckCircle className="w-5 h-5" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

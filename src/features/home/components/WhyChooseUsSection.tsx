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
    <section className="bg-slate-50 py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_1.6fr_1.1fr] gap-10 lg:gap-16 xl:gap-24 items-center mx-auto">

          {/* Column 1: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#e63946] mb-3">
              WHY CHOOSE IBACUS TECH?
            </h3>
            <h2 className="text-3xl md:text-[36px] font-extrabold text-[#0f172a] tracking-tight leading-[1.2] mb-5">
              We Deliver More<br />Than Expectations
            </h2>
            <p className="text-sm font-medium text-slate-500 mb-8 max-w-sm leading-relaxed">
              We combine technology, creativity and strategy to build solutions that create real impact.
            </p>
            <SiteButton
              href="/about"
              className="bg-[#e63946] text-white rounded-lg px-6 py-3 font-semibold text-xs hover:bg-[#c1121f] transition-colors shadow-lg shadow-red-500/20"
            >
              Know More About Us <FiArrowRight className="inline-block ml-1" />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 relative z-10">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 rounded-full bg-[#1e40af] flex items-center justify-center">
                      <FiCheckCircle className="text-white text-[12px]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-extrabold text-[#0f172a] mb-0.5">{benefit.title}</h4>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed max-w-[200px]">{benefit.description}</p>
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
            className="relative w-full max-w-[400px] mx-auto lg:ml-auto bg-[#eff6ff] rounded-2xl p-4 hidden lg:block border border-blue-50/50"
          >
              <svg viewBox="0 0 500 250" className="w-full h-auto drop-shadow-lg bg-white rounded-xl">
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

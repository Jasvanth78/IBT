'use client';

import { motion } from 'framer-motion';
import { FiSearch, FiFileText, FiLayout, FiCode, FiCheckSquare, FiSend, FiLifeBuoy, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const steps = [
  {
    id: '01',
    title: 'Discovery',
    description: 'Understanding your business and goals',
    icon: <FiSearch className="w-6 h-6 text-blue-600" />,
    textColor: 'text-blue-600',
    borderColor: 'border-blue-400',
    bgColor: 'bg-blue-50/70',
  },
  {
    id: '02',
    title: 'Planning',
    description: 'Strategy, requirements and roadmap',
    icon: <FiFileText className="w-6 h-6 text-rose-500" />,
    textColor: 'text-rose-500',
    borderColor: 'border-rose-400',
    bgColor: 'bg-rose-50/70',
  },
  {
    id: '03',
    title: 'Design',
    description: 'UI/UX design and prototyping',
    icon: <FiLayout className="w-6 h-6 text-emerald-500" />,
    textColor: 'text-emerald-500',
    borderColor: 'border-emerald-400',
    bgColor: 'bg-emerald-50/70',
  },
  {
    id: '04',
    title: 'Development',
    description: 'Building with clean and scalable code',
    icon: <FiCode className="w-6 h-6 text-purple-500" />,
    textColor: 'text-purple-500',
    borderColor: 'border-purple-400',
    bgColor: 'bg-purple-50/70',
  },
  {
    id: '05',
    title: 'Testing',
    description: 'Quality testing for bug-free delivery',
    icon: <FiCheckSquare className="w-6 h-6 text-orange-500" />,
    textColor: 'text-orange-500',
    borderColor: 'border-orange-400',
    bgColor: 'bg-orange-50/70',
  },
  {
    id: '06',
    title: 'Deployment',
    description: 'Launching and going live',
    icon: <FiSend className="w-6 h-6 text-indigo-500" />,
    textColor: 'text-indigo-500',
    borderColor: 'border-indigo-400',
    bgColor: 'bg-indigo-50/70',
  },
  {
    id: '07',
    title: 'Support',
    description: 'Continuous support and maintenance',
    icon: <FiLifeBuoy className="w-6 h-6 text-teal-500" />,
    textColor: 'text-teal-500',
    borderColor: 'border-teal-400',
    bgColor: 'bg-teal-50/70',
  }
];

export function HowWeWorkSection() {
  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden border-t border-slate-100">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-16">
          <h3 className="text-[18px] font-bold uppercase tracking-widest !text-red-500 mb-3">
            OUR PROCESS
          </h3>
          <h2 className="font-black tracking-tight text-[#0f172a]">
            How We Work
          </h2>
        </div>

        {/* Timeline Carousel Area */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-slate-400 hover:text-slate-800 hidden md:flex  lg:hidden">
            <FiChevronLeft size={20} />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-slate-400 hover:text-slate-800 hidden md:flex lg:hidden">
            <FiChevronRight size={20} />
          </button>

          <div className="overflow-x-auto pb-8 hide-scrollbar">
            <div className="flex min-w-max xl:grid xl:grid-cols-7 gap-6 px-4 md:px-0">
              {/* Connecting Line (Desktop only) */}
              <div className="hidden xl:block absolute top-[32px] left-[7%] right-[7%] h-[2px] border-t-2 border-dashed border-slate-200 -z-0"></div>

              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-[200px] xl:w-auto flex flex-col relative z-10"
                >
                  {/* Icon Node */}
                  <div className="mb-6 flex justify-start xl:justify-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-sm border border-slate-100 ${step.bgColor}`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Step Content with Vertical Colored Bar */}
                  <div className="mt-1 flex flex-col text-left xl:px-2">
                    <div className={`text-[11px] font-black ${step.textColor} mb-1 ml-0.5`}>
                      {step.id}
                    </div>
                    <div className={`border-l-2 ${step.borderColor} pl-3 py-0.5 h-[90px]`}>
                      <h4 className="text-[14px] font-extrabold text-[#0f172a] mb-1.5 leading-tight">
                        {step.title}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-500 leading-relaxed max-w-[140px]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

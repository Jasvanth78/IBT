'use client';

import { motion } from 'framer-motion';
import { FiSearch, FiFileText, FiLayout, FiCode, FiCheckSquare, FiSend, FiLifeBuoy, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const steps = [
  {
    id: '01',
    title: 'Discovery',
    description: 'Understanding your business and goals',
    icon: <FiSearch className="w-5 h-5 text-blue-500" />,
    color: 'border-blue-200 text-blue-500'
  },
  {
    id: '02',
    title: 'Planning',
    description: 'Strategy, requirements and roadmap',
    icon: <FiFileText className="w-5 h-5 text-red-500" />,
    color: 'border-red-200 text-red-500'
  },
  {
    id: '03',
    title: 'Design',
    description: 'UI/UX design and prototyping',
    icon: <FiLayout className="w-5 h-5 text-green-500" />,
    color: 'border-green-200 text-green-500'
  },
  {
    id: '04',
    title: 'Development',
    description: 'Building with clean and scalable code',
    icon: <FiCode className="w-5 h-5 text-purple-500" />,
    color: 'border-purple-200 text-purple-500'
  },
  {
    id: '05',
    title: 'Testing',
    description: 'Quality testing for bug-free delivery',
    icon: <FiCheckSquare className="w-5 h-5 text-orange-500" />,
    color: 'border-orange-200 text-orange-500'
  },
  {
    id: '06',
    title: 'Deployment',
    description: 'Launching and going live',
    icon: <FiSend className="w-5 h-5 text-blue-400" />,
    color: 'border-blue-200 text-blue-400'
  },
  {
    id: '07',
    title: 'Support',
    description: 'Continuous support and maintenance',
    icon: <FiLifeBuoy className="w-5 h-5 text-teal-500" />,
    color: 'border-teal-200 text-teal-500'
  }
];

export function HowWeWorkSection() {
  return (
    <section className="bg-slate-50 py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-16 ml-5">
          <h3 className="text-2xl sm:text-xl font-bold uppercase tracking-widest text-red-500 mb-3">
            OUR PROCESS
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
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
            <div className="flex min-w-max md:grid md:grid-cols-7 gap-4 px-4 md:px-0">
              {/* Connecting Line (Desktop only) */}
              <div className="hidden md:block absolute top-[28px] left-[7%] right-[7%] h-[2px] border-t-2 border-dashed border-slate-200 -z-0"></div>

              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-[200px] md:w-auto flex flex-col relative z-10"
                >
                  {/* Icon Node */}
                  <div className="mb-6 flex justify-start md:justify-center">
                    <div className={`w-14 h-14 rounded-full bg-white border-2 flex items-center justify-center shadow-sm ${step.color}`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex flex-col text-left md:text-center md:items-center px-2 border-l-2 border-slate-200 md:border-l-0 pl-4 md:pl-0 h-full">
                    <span className={`text-[10px] font-black ${step.color.split(' ')[1]} mb-2`}>{step.id}</span>
                    <h4 className="text-base font-bold text-slate-900 mb-2 leading-tight">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-[160px]">
                      {step.description}
                    </p>
                    <span className="absolute -right-10 top-1/2 -translate-y-1/2" style={{ borderRight: '1px solid #ccc' }} />
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

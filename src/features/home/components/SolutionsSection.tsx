'use client';

import { motion } from 'framer-motion';
import { FiMonitor, FiSmartphone, FiCpu, FiDatabase, FiAward, FiBookOpen, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

const services = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Modern, responsive web applications built with latest technologies.',
    icon: <FiMonitor className="w-6 h-6 text-blue-500" />,
    color: 'bg-blue-50',
    link: '/services/web-development'
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'Custom mobile apps for Android & iOS that deliver great user experiences.',
    icon: <FiSmartphone className="w-6 h-6 text-red-500" />,
    color: 'bg-red-50',
    link: '/services/mobile-development'
  },
  {
    id: 3,
    title: 'AI Solutions',
    description: 'AI-powered solutions to automate, analyze and accelerate your business.',
    icon: <FiCpu className="w-6 h-6 text-green-500" />,
    color: 'bg-green-50',
    link: '/services/ai-solutions'
  },
  {
    id: 4,
    title: 'ERP Systems',
    description: 'Powerful ERP systems to streamline your operations and improve efficiency.',
    icon: <FiDatabase className="w-6 h-6 text-purple-500" />,
    color: 'bg-purple-50',
    link: '/services/erp-systems'
  },
  {
    id: 5,
    title: 'Internships',
    description: 'Industry-oriented internship programs with real-world experience.',
    icon: <FiAward className="w-6 h-6 text-orange-500" />,
    color: 'bg-orange-50',
    link: '/internships'
  },
  {
    id: 6,
    title: 'Training & Courses',
    description: 'Practical training programs to build in-demand tech skills.',
    icon: <FiBookOpen className="w-6 h-6 text-blue-500" />,
    color: 'bg-blue-50',
    link: '/courses'
  }
];

export function SolutionsSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <h3 className="text-sm font-bold uppercase tracking-widest text-red-500 mb-3">
            OUR SERVICES
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Solutions That Drive Growth
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-slate-100 bg-white p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6`}>
                {service.icon}
              </div>
              
              <h4 className="text-xl font-bold text-slate-900 mb-4">
                {service.title}
              </h4>
              
              <p className="text-slate-500 mb-8 flex-grow leading-relaxed">
                {service.description}
              </p>
              
              <Link 
                href={service.link}
                className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Learn More <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

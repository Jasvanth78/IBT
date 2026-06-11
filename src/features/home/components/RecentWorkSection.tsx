'use client';

import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

import { useSocketSettings } from '@/src/providers/SocketSettingsProvider';

const fallbackProjects = [
  {
    id: '1',
    title: 'Journey Analytics',
    description: 'Analytics Platform',
    category: 'Web Application',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    badgeClass: 'bg-blue-50 text-blue-600 border border-blue-100',
  },
  {
    id: '2',
    title: 'TechCoach',
    description: 'Learning Management System',
    category: 'Web Application',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    badgeClass: 'bg-blue-50 text-blue-600 border border-blue-100',
  },
  {
    id: '3',
    title: 'MultipliersKart',
    description: 'E-commerce Platform',
    category: 'Web Application',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    badgeClass: 'bg-blue-50 text-blue-600 border border-blue-100',
  },
  {
    id: '4',
    title: 'FIM',
    description: 'Finance Management System',
    category: 'ERP Solution',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    badgeClass: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
  }
];

export function RecentWorkSection() {
  const { settings, loading } = useSocketSettings();

  const title = settings?.homeRecentWorkTitle || 'Some Of Our Recent Work';
  const badge = settings?.homeRecentWorkBadge || 'FEATURED PROJECTS';

  let projects = fallbackProjects;
  if (settings?.homeRecentWorkItems) {
    try {
      const parsed = typeof settings.homeRecentWorkItems === 'string'
        ? JSON.parse(settings.homeRecentWorkItems)
        : settings.homeRecentWorkItems;
      if (Array.isArray(parsed) && parsed.length > 0) {
        projects = parsed;
      }
    } catch (e) {
      console.warn('Failed to parse recent work items:', e);
    }
  }

  if (loading && projects === fallbackProjects) {
    return null; // Avoid flashing fallback if real data is loading
  }

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h3 className="text-[18px] font-bold uppercase tracking-widest !text-red-500 mb-3">
              {badge}
            </h3>
            <h2 className="font-extrabold text-[#0f172a] tracking-tight">
              {title}
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/portfolio" className="inline-flex items-center text-md font-bold text-[#e63946] hover:text-[#d62839] transition-colors">
              View All Projects <FiArrowRight className="ml-1.5" />
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col rounded-2xl overflow-hidden border border-slate-100 bg-white hover:shadow-lg transition-all duration-300"
            >
              {/* Image Area */}
              <div className="h-[200px] w-full relative overflow-hidden bg-slate-50 border-b border-slate-100 p-4 pb-0 flex justify-center items-end">
                <div className="w-full h-[90%] rounded-t-xl overflow-hidden shadow-md transform group-hover:-translate-y-2 transition-transform duration-500">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs font-medium">No Image</div>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 pb-8 bg-white flex flex-col flex-1">
                <h4 className="text-base font-extrabold text-[#0f172a] mb-1">
                  {project.title}
                </h4>
                <p className="text-xs text-slate-500 mb-6 flex-1">
                  {project.description}
                </p>
                <div>
                  <span className={`inline-flex px-3 py-1 text-[10px] font-bold rounded-full ${project.badgeClass} uppercase tracking-wider`}>
                    {project.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

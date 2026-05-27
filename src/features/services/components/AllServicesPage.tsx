'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import {
  FiArrowRight,
  FiAward,
  FiBriefcase,
  FiCheckCircle,
  FiCloud,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGlobe,
  FiLayers,
  FiLayout,
  FiMonitor,
  FiPlay,
  FiSettings,
  FiShield,
  FiSmartphone,
  FiTarget,
  FiUsers,
} from 'react-icons/fi';

import { apiClient, type PublicService } from '@/src/api/client';
import { Loader } from '@/src/shared/ui';

/* =========================================================
   ANIMATION
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: 'easeOut' as any,
    },
  },
};

const stagger = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* =========================================================
   ICONS
========================================================= */

const SERVICE_ICONS = [
  FiMonitor,
  FiCloud,
  FiDatabase,
  FiShield,
  FiCpu,
  FiGlobe,
  FiSmartphone,
  FiCode,
];

/* =========================================================
   CARD DESIGN
========================================================= */

function ServiceCard({
  service,
  index,
}: {
  service: PublicService;
  index: number;
}) {
  const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];

  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex flex-col h-full overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white transition-all duration-500 hover:border-(--ui-primary-soft)/30 hover:shadow-[0_40px_80px_-20px_rgba(220,20,60,0.12)]"
    >
      {/* IMAGE */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {service.imageUrl ? (
          <img
            src={service.imageUrl}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-50">
            <Icon className="text-5xl text-(--ui-primary)/20" />
          </div>
        )}
        
        {/* Overlay for category */}
        <div className="absolute top-4 left-4">
           <span className="rounded-lg bg-white/90 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-sm backdrop-blur-md">
             {(service as any).category || 'Infrastructure'}
           </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-8">
        {/* TOP */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-(--ui-primary) transition-all duration-500 group-hover:bg-(--ui-primary) group-hover:text-white group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-(--ui-primary)/30">
            <Icon className="text-xl" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            SEC-TYP-0{index + 1}
          </p>
        </div>

        {/* TITLE */}
        <h3 className="text-2xl font-black leading-tight tracking-tight text-slate-900 mb-4">
          {service.title}
        </h3>

        {/* DESC */}
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-500 font-medium">
          {service.description?.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ')}
        </p>

        {/* BUTTON */}
        <div className="mt-auto pt-8">
          <Link 
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-(--ui-primary) transition-all hover:gap-5"
          >
            Explore Solution <FiArrowRight className="text-base" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export function AllServicesPage() {
  const [services, setServices] = useState<PublicService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadingRef = useRef(false);

  /* =========================================================
     LOAD SERVICES
  ========================================================= */

  const loadAllServices = useCallback(async () => {
    if (loadingRef.current) return;

    loadingRef.current = true;

    setLoading(true);

    try {
      const result = await apiClient.getServices(1, 100);

      setServices(result.items);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load services'
      );
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAllServices();
  }, [loadAllServices]);

  const hasServices = useMemo(() => services.length > 0, [services]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading && !hasServices) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Loader size="lg" label="Loading Services..." />
      </div>
    );
  }

  /* =========================================================
     MAIN
  ========================================================= */

  return (
    <div className="overflow-hidden bg-white">

      {/* =====================================================
          1. PRECISION HERO SECTION
      ===================================================== */}

      <section className="relative pt-40 pb-24 overflow-hidden border-b border-slate-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-(--ui-primary) mb-8">
                <FiBriefcase size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Industry Solutions</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 leading-[0.9] mb-8">
                Architecting <br />
                <span className="text-(--ui-primary)">Advantages.</span>
              </h1>
              
              <p className="text-xl text-slate-500 leading-relaxed font-medium mb-12 max-w-xl">
                We design, develop and deliver high-performance digital solutions that empower enterprise evolution and secure sustainable market leadership.
              </p>

              <div className="flex flex-wrap gap-8 mb-12">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-(--ui-primary)">
                    <FiCheckCircle size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Execution Excellence</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">98% Success Rate</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-(--ui-primary)">
                    <FiUsers size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Elite Talent</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Architect-led teams</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="h-16 px-12 bg-(--ui-primary) text-white rounded-2xl flex items-center justify-center text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-(--ui-primary)/30 hover:brightness-110 transition-all"
                >
                  START A PROJECT
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative hidden lg:block lg:col-span-5"
            >
              <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-2xl h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Service Architecture" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply" />
              </div>
              {/* Floating Stat Card */}
              <div className="absolute -bottom-10 -left-10 z-20 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] shadow-2xl border border-white/50">
                <div className="text-4xl font-black text-slate-900 mb-1">150+</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Global Implementations</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          2. CORE METHODOLOGY (Technical Rigor Style)
      ===================================================== */}

      <section className="py-24 bg-slate-50/30 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 mb-8">
                <FiPlay size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Our Methodology</span>
              </div>
              <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight mb-8">Engineering with Precision.</h2>
              <p className="text-base text-slate-500 leading-relaxed font-medium mb-12 max-w-lg">
                We believe in a rigorous, phase-based approach to every project. From Initial architectural mapping to final deployment, every step is governed by strict quality standards.
              </p>
              
              <ul className="space-y-8">
                {[
                  { title: "Architectural Blueprinting", desc: "Detailed structural mapping of technical requirements." },
                  { title: "Incremental Development", desc: "Sprint-based delivery with continuous feedback loops." },
                  { title: "Rigor Testing", desc: "Enterprise-grade stress testing and security auditing." }
                ].map((step, i) => (
                  <li key={i} className="flex gap-6 items-start">
                    <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-white text-(--ui-primary) flex items-center justify-center text-sm font-black border border-slate-100 shadow-sm">
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 mb-1">{step.title}</h4>
                      <p className="text-sm font-medium text-slate-500 leading-normal">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000" 
                  alt="High Tech Deployment" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          3. SERVICE SHOWCASE (Solution Grid)
      ===================================================== */}

      <section className="relative bg-white py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-20">
            <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-6">Solution Portfolio</h2>
            <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
              Explore our specialized digital verticals designed to tackle the most complex technological challenges.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-12 rounded-[2rem] bg-red-50 p-6 text-center font-bold text-(--ui-primary) border border-red-100">
              {error}
            </div>
          )}

          {/* SERVICES GRID */}
          {hasServices ? (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                />
              ))}
            </motion.div>
          ) : !loading && (
            <div className="rounded-[3.5rem] border border-dashed border-slate-200 bg-slate-50/50 p-20 text-center">
              <FiLayers className="mx-auto mb-6 text-5xl text-slate-200" />
              <h3 className="text-xl font-black text-slate-900">Zero Active Portfolios</h3>
              <p className="mt-2 text-slate-500 font-medium">We are currently recalibrating our service catalog. Check back shortly.</p>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          4. ARCHITECT BANNER
      ===================================================== */}

      <section className="py-24 bg-slate-50/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 p-16 rounded-[4rem] relative overflow-hidden flex flex-col lg:grid lg:grid-cols-2 items-center gap-12">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-(--ui-primary) mb-8">
                <FiSmartphone size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Enterprise Ready</span>
              </div>
              <h2 className="text-5xl font-black text-white mb-8 leading-tight">Ready to <br /><span className="text-(--ui-primary)">Architect?</span></h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed mb-12">
                Partner with our elite engineering teams to transform your most ambitious visions into high-performance digital realities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="h-16 px-12 bg-(--ui-primary) text-white rounded-2xl flex items-center justify-center text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-(--ui-primary)/30 hover:brightness-110 transition-all"
                >
                  START A CONVERSATION
                </Link>
              </div>
            </div>
            
            <div className="relative z-10 hidden lg:block">
              <div className="p-10 bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10">
                <div className="space-y-8">
                  {[
                    "Strategic Discovery & Mapping",
                    "Elite Technical Execution",
                    "Continuous Performance Scaling"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6">
                      <div className="h-10 w-10 rounded-full bg-(--ui-primary) text-white flex items-center justify-center flex-shrink-0">
                        <FiCheckCircle size={20} />
                      </div>
                      <span className="text-white text-lg font-black">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Background Icon Watermark */}
            <div className="absolute right-[-5%] bottom-[-20%] text-[28rem] text-white/5 rotate-12">
              <FiCpu />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


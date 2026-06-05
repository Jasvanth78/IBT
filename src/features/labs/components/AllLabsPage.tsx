'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { apiClient, type PaginationMeta, type PublicLabProject } from '@/src/api/client';
import { Loader } from '@/src/shared/ui';
import { motion } from 'framer-motion';
import { resolveImageUrl } from '@/src/utils/image';
import {
  FiArrowRight,
  FiLayers,
  FiCheck,
  FiTarget,
  FiUsers,
  FiAward,
  FiZap,
  FiChevronLeft,
  FiChevronRight,
  FiFileText,
  FiBriefcase,
  FiTerminal,
  FiShield,
  FiCpu,
  FiCode
} from 'react-icons/fi';
import {
  FaRocket,
  FaUserGraduate,
  FaLightbulb,
  FaHandshake,
  FaFileAlt,
  FaFlask,
  FaSearch,
  FaCogs,
  FaCheckCircle,
  FaChartLine
} from 'react-icons/fa';

/* =========================================================
   PAGE COMPONENT
========================================================= */

export function AllLabsPage() {
  const [projects, setProjects] = useState<PublicLabProject[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, limit: 6, totalPages: 1, totalItems: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<Record<string, any>>({});

  const loadingRef = useRef(false);

  // Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const updateVisible = () => {
      const w = window.innerWidth;
      if (w >= 1024) setVisibleCount(4);
      else if (w >= 640) setVisibleCount(2);
      else setVisibleCount(1);
    };

    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const loadData = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      const [projectsResult, settingsResult] = await Promise.all([
        apiClient.getProjects(1, 10),
        apiClient.getSettings()
      ]);

      setProjects(projectsResult.items || []);
      setSettings((settingsResult as Record<string, any>) ?? {});
    } catch (err) {
      console.warn("Failed to load lab data", err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  // Fallback / Hardcoded Carousel Items if API is empty
  const defaultCarouselItems = [
    { title: "Predictive Maintenance AI", desc: "AI model to predict machine failures and downtime.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400", tag: "AI / ML" },
    { title: "Smart Energy Monitor", desc: "IoT device for real-time flexibility monitoring.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400", tag: "IoT" },
    { title: "AutoBot Rover", desc: "Autonomous rover for exploration and mapping.", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400", tag: "Robotics" },
    { title: "Cyber Threat Detector", desc: "ML based system to detect network threats.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400", tag: "Cyber Security" },
  ];

  const portfolioItems = projects.length >= 4
    ? projects.map(p => ({
      title: p.title,
      desc: (p.description || '').replace(/<[^>]*>/g, '').slice(0, 60) + '...',
      img: p.imageUrl || defaultCarouselItems[0].img,
      tag: p.techStack?.[0] || 'Research'
    }))
    : defaultCarouselItems;

  const showPrev = () => {
    setCarouselIndex((prev) => (prev <= 0 ? portfolioItems.length - visibleCount : prev - 1));
  };
  const showNext = () => {
    setCarouselIndex((prev) => (prev >= portfolioItems.length - visibleCount ? 0 : prev + 1));
  };

  /* =========================================================
     RENDER
  ========================================================= */

  if (loading && projects.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white">
        <Loader size="lg" label="Loading Lab Data..." />
      </div>
    );
  }

  return (
    <div className="bg-[#f8faff] min-h-screen overflow-hidden font-sans">

      {/* =====================================================
          1. HERO SECTION
      ===================================================== */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 bg-[#f8faff]">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* Left Content */}
            <div className="relative z-10 max-w-xl">


              <h1 className="text-[44px] sm:text-[56px] lg:text-[64px] font-black text-[#0f172a] leading-[1.05] tracking-tight mb-6">
                Precision-led<br />
                <span className="text-[#e63946]">Future<br />Engineering</span>
              </h1>

              <p className="text-[15px] text-slate-500 font-medium leading-relaxed mb-10 max-w-md">
                Empowering the next generation of researchers and engineers through precision-led skill development and forward-thinking technological innovation.
              </p>

              <div className="flex flex-col gap-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 text-[#e63946] flex items-center justify-center shrink-0 border border-red-100">
                    <FiLayers size={20} />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#0f172a] mb-1">Project-Based</h4>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">REAL-WORLD TECHNICAL DELIVERABLES.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 text-[#e63946] flex items-center justify-center shrink-0 border border-red-100">
                    <FiZap size={20} />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#0f172a] mb-1">Pure Skill</h4>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">MENTORSHIP-LED ACQUISITION.</p>
                  </div>
                </div>
              </div>

              <Link
                href="/internship/apply"
                className="inline-flex h-12 sm:h-14 px-8 bg-[#e63946] text-white rounded-lg items-center justify-center text-[14px] font-bold shadow-lg shadow-red-500/20 hover:bg-[#c1121f] transition-colors"
              >
                Apply Now <FiArrowRight className="ml-2" />
              </Link>
            </div>

            {/* Right Image & Badge */}
            <div className="relative z-10 lg:pl-10">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
                  alt="Laboratory Engineering"
                  className="w-full h-[550px] object-cover"
                />
              </div>

              {/* Floating Badge (Left offset) */}
              <div className="absolute top-[60%] -left-12 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-[260px]">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#e63946] flex items-center justify-center mb-4">
                  <FiAward size={24} />
                </div>
                <h4 className="text-[16px] font-bold text-[#0f172a] mb-2">Certification</h4>
                <p className="text-[13px] text-slate-500 font-medium">
                  Accredited recognition of laboratory proficiency.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          2. DARK STATS BAR
      ===================================================== */}
      <section className="relative z-20 pb-16">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0f172a] rounded-[2rem] shadow-2xl py-10 px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-700/50">

            <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
              <FaRocket className="text-white text-3xl opacity-80" />
              <div className="text-center md:text-left">
                <div className="text-[28px] font-black text-white leading-tight">50+</div>
                <div className="text-[12px] font-medium text-slate-300">Research Projects</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 justify-center pt-8 md:pt-0">
              <FaUserGraduate className="text-white text-3xl opacity-80" />
              <div className="text-center md:text-left">
                <div className="text-[28px] font-black text-white leading-tight">100+</div>
                <div className="text-[12px] font-medium text-slate-300">Students Trained</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 justify-center pt-8 md:pt-0">
              <FaLightbulb className="text-white text-3xl opacity-80" />
              <div className="text-center md:text-left">
                <div className="text-[28px] font-black text-white leading-tight">15+</div>
                <div className="text-[12px] font-medium text-slate-300">Live Innovations</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 justify-center pt-8 md:pt-0">
              <FaHandshake className="text-white text-3xl opacity-80" />
              <div className="text-center md:text-left">
                <div className="text-[28px] font-black text-white leading-tight">5+</div>
                <div className="text-[12px] font-medium text-slate-300">Industry Collaborations</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          3. LAB INITIATIVES (Grid)
      ===================================================== */}
      <section className="py-16 bg-[#f8faff]">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-[32px] md:text-[40px] font-black tracking-tight text-[#0f172a] mb-2">
                Lab Initiatives
              </h2>
              <p className="text-[15px] text-slate-500 font-medium">Explore our specialized research and development sectors.</p>
            </div>
            <Link href="/services" className="text-[14px] font-bold text-[#e63946] mt-4 md:mt-0 flex items-center gap-1 hover:underline">
              View All Initiatives <FiArrowRight />
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">

            {/* Left Large Card (Next-Gen Robotics) */}
            <div className="lg:col-span-7 bg-[#0f172a] rounded-[2rem] overflow-hidden relative shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
                alt="Dashboard Data"
                className="w-full h-[450px] object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent" />

              <div className="absolute bottom-0 left-0 p-8 sm:p-10">
                <div className="inline-block bg-[#e63946] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                  ACTIVE RESEARCH
                </div>
                <h3 className="text-[28px] sm:text-[36px] font-black text-white leading-tight mb-3">
                  Next-Gen Robotics<span className="text-[#e63946]">.</span>
                </h3>
                <p className="text-[14px] text-slate-300 font-medium max-w-sm">
                  Developing autonomous systems for precision manufacturing and hazardous environment exploration.
                </p>
              </div>
            </div>

            {/* Right Column (2 Cards stacked) */}
            <div className="lg:col-span-5 flex flex-col gap-6">

              {/* Careersheets Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 h-full hover:shadow-lg transition-shadow">
                <div className="w-full sm:w-1/2 h-40 sm:h-auto rounded-xl overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" alt="Team working" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-[22px] font-black text-[#0f172a] mb-2">Careersheets</h4>
                  <p className="text-[13px] text-slate-500 font-medium mb-4">
                    The ultimate architectural tool for job seekers to track professional growth.
                  </p>
                  <Link href="/services" className="text-[13px] font-bold text-[#e63946] flex items-center gap-1 hover:gap-2 transition-all">
                    Learn More <FiArrowRight />
                  </Link>
                </div>
              </div>

              {/* Join the Lab Ecosystem Card */}
              <div className="bg-gradient-to-br from-[#e63946] to-[#c1121f] rounded-[2rem] p-8 shadow-lg text-white relative overflow-hidden h-full flex flex-col justify-center">
                {/* Floating graphic */}
                <FiZap className="absolute -right-8 -bottom-8 text-[180px] opacity-10 transform -rotate-12" />

                <div className="absolute top-8 left-8 w-12 h-12 bg-white rounded-xl text-[#e63946] flex items-center justify-center shadow-md">
                  <FiFileText size={24} />
                </div>

                <div className="mt-14 relative z-10">
                  <h4 className="text-[24px] font-black mb-2">Join the Lab Ecosystem</h4>
                  <p className="text-[13px] text-red-100 font-medium mb-8 max-w-sm">
                    Collaborate with industry veterans on real-world challenges that define the next decade.
                  </p>
                  <div className="flex gap-4">
                    <button className="bg-white text-[#e63946] text-[12px] font-bold px-5 py-2.5 rounded-lg shadow-sm hover:bg-red-50 transition-colors">
                      Submit Portfolio
                    </button>
                    <button className="bg-transparent border border-red-300 text-white text-[12px] font-bold px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors">
                      Research Papers
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          4. OUR RESEARCH PROCESS (Timeline)
      ===================================================== */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">

          <div className="mb-16">
            <h3 className="text-[18px] font-bold uppercase tracking-widest !text-red-500 mb-3">
              OUR RESEARCH PROCESS
            </h3>
          </div>

          <div className="relative flex items-center">

            {/* Arrows */}
            <button className="absolute left-0 z-20 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 shadow-sm">
              <FiChevronLeft />
            </button>
            <button className="absolute right-0 z-20 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 shadow-sm">
              <FiChevronRight />
            </button>

            {/* Timeline Line */}
            <div className="absolute top-[30px] left-10 right-10 h-[2px] bg-slate-100 z-0" />

            {/* Timeline Steps */}
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-10">

              {[
                { num: '01', title: 'Idea Discovery', desc: 'Identify real-world problems worth solving.', icon: <FaLightbulb />, color: 'text-blue-500 bg-blue-50 border-blue-100' },
                { num: '02', title: 'Research & Analysis', desc: 'Deep research and feasibility analysis.', icon: <FaFileAlt />, color: 'text-red-500 bg-red-50 border-red-100' },
                { num: '03', title: 'Prototype Development', desc: 'Build and design the initial prototypes.', icon: <FiCode />, color: 'text-green-500 bg-green-50 border-green-100' },
                { num: '04', title: 'Testing & Validation', desc: 'Test rigorously and validate the solution.', icon: <FaFlask />, color: 'text-purple-500 bg-purple-50 border-purple-100' },
                { num: '05', title: 'Implementation', desc: 'Deploy and implement in real environments.', icon: <FaRocket />, color: 'text-orange-500 bg-orange-50 border-orange-100' },
                { num: '06', title: 'Impact & Scale', desc: 'Creating scalable impact and innovation.', icon: <FiAward />, color: 'text-teal-500 bg-teal-50 border-teal-100' },
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm border-4 border-white ring-1 ring-slate-100 mb-6 ${step.color}`}>
                    <span className="text-xl">{step.icon}</span>
                  </div>
                  <div className="text-[11px] font-black text-[#e63946] mb-1">{step.num}</div>
                  <h4 className="text-[14px] font-bold text-[#0f172a] mb-2">{step.title}</h4>
                  <p className="text-[12px] text-slate-500 font-medium px-2">{step.desc}</p>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          5. TECHNICAL RIGOR & MENTORSHIP-FIRST
      ===================================================== */}
      <section className="py-20 bg-[#f8faff]">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left Column */}
            <div className="flex flex-col gap-12">
              <div>
                <h2 className="text-[32px] sm:text-[40px] font-black tracking-tight text-[#0f172a] mb-6">
                  Technical Rigor
                </h2>
                <p className="text-[15px] text-slate-500 font-medium leading-relaxed mb-8 max-w-md">
                  Our laboratory environment is built on the principles of mechanical and digital precision. We believe that true innovation happens at the intersection of rigorous testing and creative problem-solving.
                </p>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-red-50 text-[#e63946] flex items-center justify-center text-[12px] font-black shrink-0">01</span>
                    <span className="text-[14px] font-bold text-[#0f172a]">Phase-gate project management systems</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-red-50 text-[#e63946] flex items-center justify-center text-[12px] font-black shrink-0">02</span>
                    <span className="text-[14px] font-bold text-[#0f172a]">Peer-reviewed code and design standards</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-red-50 text-[#e63946] flex items-center justify-center text-[12px] font-black shrink-0">03</span>
                    <span className="text-[14px] font-bold text-[#0f172a]">Iterative prototyping and stress testing</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] overflow-hidden shadow-lg border border-slate-100">
                <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" alt="Laboratory Work" className="w-full h-[350px] object-cover" />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-12">
              <div className="rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 order-last lg:order-first">
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" alt="Circuit Board" className="w-full h-[350px] object-cover" />
              </div>

              <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100">
                <h2 className="text-[32px] sm:text-[40px] font-black tracking-tight text-[#0f172a] mb-6">
                  Mentorship-First
                </h2>
                <p className="text-[15px] text-slate-500 font-medium leading-relaxed mb-8">
                  Every project is guided by industry veterans. This isn't just about learning tools; it's about adopting the mindset of a senior architect. We foster an environment of constant feedback and high-stakes accountability.
                </p>

                {/* Quote block */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 relative">
                  <span className="absolute top-4 left-4 text-4xl text-blue-200 font-serif leading-none">"</span>
                  <p className="text-[14px] font-medium text-slate-600 italic relative z-10 pl-6 pt-2 mb-6">
                    "The laboratory isn't just a place of work; it's a sanctuary for those who pursue technical excellence with religious devotion."
                  </p>
                  <div className="flex items-center gap-4">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Lead Researcher" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 className="text-[14px] font-bold text-[#0f172a]">Lead Researcher</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IBT LABS CORE TEAM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          6. RESEARCH PORTFOLIO
      ===================================================== */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-[32px] md:text-[40px] font-black tracking-tight text-[#0f172a] mb-2">
                Research Portfolio
              </h2>
              <p className="text-[15px] text-slate-500 font-medium">Explore our active laboratory projects.</p>
            </div>
            <Link href="/services" className="text-[14px] font-bold text-[#e63946] mt-4 md:mt-0 flex items-center gap-1 hover:underline">
              View All Projects <FiArrowRight />
            </Link>
          </div>

          <div className="relative">
            <button
              onClick={showPrev}
              className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-6 z-20 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 shadow-md hover:bg-slate-50 transition-colors"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={showNext}
              className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-6 z-20 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 shadow-md hover:bg-slate-50 transition-colors"
            >
              <FiChevronRight />
            </button>

            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-500 ease-out py-2"
                style={{
                  width: `${(portfolioItems.length * 100) / visibleCount}%`,
                  transform: `translateX(-${(carouselIndex * 100) / portfolioItems.length}%)`,
                }}
              >
                {portfolioItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-3"
                    style={{ flex: `0 0 ${100 / portfolioItems.length}%` }}
                  >
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex gap-4 h-full hover:shadow-md transition-shadow">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div>
                          <h4 className="text-[14px] font-bold text-[#0f172a] mb-1 leading-tight">{item.title}</h4>
                          <p className="text-[11px] text-slate-500 font-medium leading-snug line-clamp-2 mb-2">{item.desc}</p>
                        </div>
                        <span className="text-[10px] font-bold text-[#e63946] bg-red-50 px-2 py-0.5 rounded self-start uppercase tracking-wider">{item.tag}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          7. OUR INNOVATION PARTNERS
      ===================================================== */}
      <section className="py-12 bg-white border-t border-slate-100 overflow-hidden">
        <div className="mx-auto max-w-[1300px] text-center relative px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-10 bg-slate-200" />
            <span className="text-[18px] font-bold tracking-[0.2em] text-[#e63946] uppercase">OUR INNOVATION PARTNERS</span>
            <div className="h-px w-10 bg-slate-200" />
          </div>

          <div className="relative flex items-center justify-center gap-8 sm:gap-16 flex-wrap opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Nav arrows just for visual accuracy of mockup */}
            <button className="hidden sm:flex w-8 h-8 rounded-full border border-slate-200 items-center justify-center text-slate-400 shrink-0">
              <FiChevronLeft size={14} />
            </button>

            {/* Fake logos via Typography for accuracy to mockup without needing SVGs */}
            <div className="text-[20px] font-black tracking-tighter text-blue-900 flex items-center gap-1"><FaChartLine className="text-blue-600" /> Journey</div>
            <div className="text-[20px] font-black tracking-tight text-slate-800 flex items-center gap-1"><FaCheckCircle className="text-slate-800" /> TechCoach</div>
            <div className="text-[20px] font-black tracking-tighter text-blue-500 flex items-center gap-1"><FaCogs /> Octosignals</div>
            <div className="text-[20px] font-black tracking-tight text-slate-900">MultipliersKart</div>
            <div className="text-[20px] font-black text-red-600">FIM</div>
            <div className="text-[20px] font-black text-slate-800">X-Mind</div>

            <button className="hidden sm:flex w-8 h-8 rounded-full border border-slate-200 items-center justify-center text-slate-400 shrink-0">
              <FiChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          8. BOTTOM CTA RIBBON
      ===================================================== */}
      <section className="bg-white py-12 lg:py-20 relative overflow-hidden border-t border-slate-100">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center px-8 py-10 md:px-12 md:py-12 gap-8 md:gap-12">

              {/* Left Image / Rocket Placeholder */}
              <div className="hidden md:flex justify-center items-center relative h-full">
                <div className="w-24 h-24 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <FaRocket className="text-white text-5xl opacity-90 transform -rotate-45" />
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center md:text-left z-10">
                <h2 className="text-[24px] sm:text-[32px] font-black text-white leading-tight mb-2">
                  Ready to Innovate<br className="hidden sm:block" /> and Create Impact?
                </h2>
                <p className="text-slate-300 text-[14px] font-medium max-w-sm mx-auto md:mx-0">
                  Join IBT Labs and be a part of a thriving community of innovators.
                </p>
              </div>

              {/* Button */}
              <div className="text-center md:text-right z-10">
                <Link
                  href="/internship/apply"
                  className="inline-flex h-12 bg-white text-[#e63946] rounded-lg px-8 items-center justify-center font-bold text-[14px] hover:bg-slate-50 transition-colors shadow-xl whitespace-nowrap"
                >
                  Apply to Lab <FiArrowRight className="inline-block ml-2" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { apiClient, type PaginationMeta, type PublicLabProject } from '@/src/api/client';
import { Loader, Pagination } from '@/src/shared/ui';
import { motion, type Variants } from 'framer-motion';
import { FiArrowRight, FiCode, FiLayers, FiStar, FiCheck, FiTarget, FiUsers, FiAward, FiZap, FiLayout } from 'react-icons/fi';

type LabProjectStatus = 'ONGOING' | 'COMPLETED' | 'ARCHIVED';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const statusTone: Record<LabProjectStatus, string> = {
  ONGOING: 'bg-amber-50 text-amber-600 border-amber-100',
  COMPLETED: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  ARCHIVED: 'bg-slate-100 text-slate-500 border-slate-200',
};

const statusCopy: Record<LabProjectStatus, { label: string; accent: string }> = {
  ONGOING: { label: 'In Progress', accent: 'from-amber-400 to-orange-500' },
  COMPLETED: { label: 'Shipped', accent: 'from-emerald-400 to-teal-500' },
  ARCHIVED: { label: 'Archived', accent: 'from-slate-400 to-slate-600' },
};

function getProjectStatus(project: PublicLabProject): LabProjectStatus {
  return (project.status ?? 'ONGOING') as LabProjectStatus;
}

function getProjectTags(project: PublicLabProject) {
  const merged = [...(project.techStack ?? []), ...(project.tags ?? [])];
  return merged.slice(0, 4);
}

function getProjectSummary(project: PublicLabProject) {
  const summary = (project.description || '')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .trim();
  return summary.length > 150 ? `${summary.slice(0, 147).trim()}...` : summary;
}

function ProjectCard({ project }: { project: PublicLabProject }) {
  const status = getProjectStatus(project);
  const statusMeta = statusCopy[status];
  const previewTags = getProjectTags(project);
  const href = `/ibt-labs/${project.slug}`;

  return (
    <Link href={href} className="group relative block h-full">
      <motion.article
        variants={itemVariants}
        className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:border-(--ui-primary-soft)/30 hover:shadow-[0_20px_50px_rgba(220,20,60,0.12)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-50">
              <FiCode className="text-5xl text-(--ui-primary)/20 transition-transform duration-700 group-hover:scale-110" />
            </div>
          )}

          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            <div className="flex flex-wrap gap-2">
              <span className={['inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md', statusTone[status]].join(' ')}>
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                {statusMeta.label}
              </span>

              {project.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-(--ui-primary) px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-(--ui-primary)/30">
                  <FiStar size={10} className="fill-current" /> Featured
                </span>
              )}
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-5 pt-12">
            <h3 className="line-clamp-2 text-xl font-black leading-tight text-white drop-shadow-sm">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="line-clamp-3 text-sm leading-relaxed text-slate-500">
            {getProjectSummary(project)}
          </p>

          <div className="mt-auto pt-6 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {previewTags.map((tag) => (
                <span key={`${project.id}-${tag}`} className="rounded-lg bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--ui-primary-soft)/10 text-(--ui-primary) transition-all duration-300 group-hover:bg-(--ui-primary) group-hover:text-white group-hover:shadow-lg group-hover:shadow-(--ui-primary)/40">
              <FiArrowRight className="text-lg" />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export function AllLabsPage() {
  const [projects, setProjects] = useState<PublicLabProject[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, limit: 6, totalPages: 1, totalItems: 0 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<Record<string, any>>({});

  const loadingRef = useRef(false);

  const [spotlightProjects, setSpotlightProjects] = useState<Record<string, PublicLabProject>>({});

  const loadData = useCallback(async (p: number) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const [projectsResult, settingsResult] = await Promise.all([
        apiClient.getProjects(p, 9),
        apiClient.getSettings()
      ]);
      
      const setts = (settingsResult as Record<string, any>) ?? {};
      setProjects(projectsResult.items);
      setMeta(projectsResult.meta ?? {});
      setSettings(setts);
      setPage(p);

      // Fetch all spotlight projects
      const spotlights = (setts.labs_spotlights as Record<string, any>[]) || [];
      const projectMap: Record<string, PublicLabProject> = {};
      
      await Promise.all(spotlights.map(async (s) => {
        if (s.projectSlug) {
          const proj = await apiClient.getProjectBySlug(s.projectSlug).catch(() => null);
          if (proj) {
            projectMap[s.projectSlug] = proj;
          }
        }
      }));
      
      setSpotlightProjects(projectMap);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData(1);
  }, [loadData]);

  const hasProjects = useMemo(() => projects.length > 0, [projects]);
  const totalPages = Math.max(1, meta.totalPages ?? 1);

  // Content Helpers
  const content = {
    heroTitle: settings.labs_hero_title || 'IBT LABS',
    heroSubtitle: settings.labs_hero_subtitle || 'ENGINEERING THE FUTURE',
    heroDescription: settings.labs_hero_description || 'Empowering the next generation of researchers and engineers through precision-led skill development and forward-thinking technological innovation.',
    heroImage: settings.labs_hero_image_url || null,
    heroBtn1: settings.labs_hero_btn1_text || 'EXPLORE PROGRAMS',
    heroBtn2: settings.labs_hero_btn2_text || 'TECHNICAL SPECS',
    
    introTitle: settings.labs_page_title || 'I-BACUS-TECH LABS',
    introSubtitle: settings.labs_page_subtitle || 'Skill Development Program',
    introDescription: settings.labs_intro_description || 'Our intensive, project-based curriculum is designed to bridge the gap between academic theory and industry application, providing a high-rigor environment for aspiring tech professionals.',
    introImage: settings.labs_intro_image_url || null,
    introBtn: settings.labs_intro_btn_text || 'APPLY NOW',
    
    features: [
      { title: settings.labs_intro_feature1_title || 'Project-Based', desc: settings.labs_intro_feature1_desc || 'Real-world challenges and technical deliverables.', icon: <FiTarget /> },
      { title: settings.labs_intro_feature2_title || 'Unpaid Opportunity', desc: settings.labs_intro_feature2_desc || 'Focused on pure skill acquisition and mentorship.', icon: <FiZap /> },
      { title: settings.labs_intro_feature3_title || 'Mentorship', desc: settings.labs_intro_feature3_desc || 'Guided by industry veterans and research leads.', icon: <FiUsers /> },
      { title: settings.labs_intro_feature4_title || 'Certification', desc: settings.labs_intro_feature4_desc || 'Accredited recognition of laboratory proficiency.', icon: <FiAward /> },
    ],
    
    spotlights: ((settings.labs_spotlights as any[]) || []).map((s) => {
      const proj = spotlightProjects[s.projectSlug];
      return {
        id: s.id,
        badge: s.badge || 'INNOVATION SPOTLIGHT',
        title: proj?.title || s.title || 'Strategic Market Traction',
        description: proj?.description || s.description || 'Project description...',
        imageUrl: proj?.imageUrl || s.imageUrl || null,
        list: (s.list || '').split('\n').filter(Boolean),
        slug: proj?.slug || s.projectSlug || null,
      }
    }),
    
    careersTitle: settings.labs_careers_title || 'Careersheets',
    careersDescription: settings.labs_careers_description || 'The ultimate architectural tool for job seekers. Build resumes with engineering precision, track applications, and optimize your professional footprint for high-tech recruitment.',
    careersBtn: settings.labs_careers_btn_text || 'Sign in to Dashboard',
    
    ctaTitle: settings.labs_cta_title || 'Have a Breakthrough Idea?',
    ctaDescription: settings.labs_cta_description || 'IBT Labs is an incubator for intellectual rigor. We invite students and researchers to share their innovative technical concepts for collaborative potential.',
    ctaBtn: settings.labs_cta_btn_text || 'Collaborate',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Precision-led Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-slate-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-(--ui-primary) mb-8">
                <FiZap size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Innovation Spotlight</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[0.9] mb-8">
                Precision-led <br />
                <span className="text-(--ui-primary)">Future Engineering</span>
              </h1>
              
              <div 
                className="text-base text-slate-500 leading-relaxed font-medium mb-12 max-w-xl"
                dangerouslySetInnerHTML={{ __html: content.heroDescription }}
              />

              <div className="flex flex-wrap gap-8 mb-12">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-(--ui-primary)">
                    <FiTarget size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Project-Based</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Real-world technical deliverables.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-(--ui-primary)">
                    <FiZap size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Pure Skill</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Mentorship-led acquisition.</p>
                  </div>
                </div>
              </div>

              <button className="h-14 px-12 bg-(--ui-primary) text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-(--ui-primary)/30 hover:brightness-110 transition-all">
                APPLY NOW
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000" 
                  alt="Engineering" 
                  className="w-full object-cover" 
                />
              </div>
              {/* Floating Certification Card */}
              <div className="absolute -bottom-10 -left-10 z-20 bg-white/90 backdrop-blur p-6 rounded-3xl shadow-2xl border border-white/50 max-w-[240px]">
                <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center text-(--ui-primary) mb-4">
                  <FiAward size={24} />
                </div>
                <h4 className="text-sm font-black text-slate-900 mb-2">Certification</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-bold">Accredited recognition of laboratory proficiency.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Lab Initiatives Grid */}
      <section className="py-24 bg-slate-50/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Lab Initiatives</h2>
              <p className="text-slate-500 font-medium">Explore our specialized research and development sectors.</p>
            </div>
            <Link href="/ibt-labs/all" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-(--ui-primary) hover:gap-3 transition-all">
              View All Initiatives <FiArrowRight />
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured Initiative */}
            <div className="lg:col-span-2 relative group rounded-[2.5rem] overflow-hidden h-[500px] shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
                alt="Next-Gen Robotics" 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <span className="inline-block px-3 py-1 bg-(--ui-primary) text-white text-[10px] font-black uppercase tracking-widest rounded-lg mb-4">
                  Active Research
                </span>
                <h3 className="text-4xl font-black text-white mb-4">Next-Gen Robotics</h3>
                <p className="text-slate-300 text-sm max-w-md font-medium">
                  Developing autonomous systems for precision manufacturing and hazardous environment exploration.
                </p>
              </div>
            </div>

            {/* Side Card: Careersheets */}
            <div className="bg-white p-10 rounded-[2.5rem] flex flex-col shadow-xl border border-slate-100">
              <div className="h-[200px] rounded-2xl overflow-hidden mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800" 
                  alt="Careersheets" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{content.careersTitle}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium mb-8 flex-1">
                The ultimate architectural tool for job seekers to track professional growth.
              </p>
              <Link href="#" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-(--ui-primary) hover:gap-3 transition-all">
                Learn More <FiArrowRight />
              </Link>
            </div>
          </div>

          {/* Bottom Grid for other initiatives */}
          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-100">
              <div className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center text-(--ui-primary) mb-6">
                <FiLayout size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Architectural Precision</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium mb-0">
                Designing structural frameworks that withstand the test of technological evolution.
              </p>
            </div>

            {/* Custom CTA Card */}
            <div className="lg:col-span-2 bg-(--ui-primary) p-10 rounded-[2.5rem] relative overflow-hidden flex items-center">
              <div className="relative z-10 flex-1">
                <h3 className="text-3xl font-black text-white mb-8">Join the Lab Ecosystem</h3>
                <p className="text-white/80 text-sm font-medium mb-8 max-w-md leading-relaxed">
                  Collaborate with industry veterans on real-world challenges that define the next decade.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="h-12 px-8 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                    Submit Portfolio
                  </button>
                  <button className="h-12 px-8 bg-transparent border-2 border-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                    Research Papers
                  </button>
                </div>
              </div>
              {/* Background Icon Watermark */}
              <div className="absolute right-[-5%] bottom-[-10%] text-[20rem] text-white/5 rotate-12">
                <FiZap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Alternating Details: Technical Rigor */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight mb-8">Technical Rigor</h2>
              <p className="text-base text-slate-500 leading-relaxed font-medium mb-12 max-w-lg">
                Our laboratory environment is built on the principles of mechanical and digital precision. We believe that true innovation happens at the intersection of rigorous testing and creative problem-solving.
              </p>
              
              <ul className="space-y-8">
                {[
                  "Phase-gate project management systems",
                  "Peer-reviewed code and design standards",
                  "Iterative prototyping and stress testing"
                ].map((step, i) => (
                  <li key={i} className="flex gap-6 items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 text-(--ui-primary) flex items-center justify-center text-xs font-black border border-(--ui-primary-soft)">
                      {i + 1}
                    </span>
                    <span className="text-sm font-bold text-slate-600 pt-1 leading-normal">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" 
                  alt="High Tech Lab" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-(--ui-primary-soft)/10 mix-blend-multiply" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Mentorship-First Section */}
      <section className="py-24 bg-slate-50/30 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[4rem] bg-slate-200/50 rotate-3 z-0" />
              <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-2xl h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
                  alt="Mentorship" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            <div>
              <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight mb-8">Mentorship-First</h2>
              <p className="text-base text-slate-500 leading-relaxed font-medium mb-10 max-w-lg">
                Every project is guided by industry veterans. This isn't just about learning tools; it's about adopting the mindset of a senior architect. We foster an environment of constant feedback and high-stakes accountability.
              </p>
              
              <div className="p-10 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 relative mt-12">
                <p className="italic text-lg text-slate-600 font-medium leading-relaxed mb-8 relative z-10">
                  "The laboratory isn't just a place of work; it's a sanctuary for those who pursue technical excellence with religious devotion."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-100 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" alt="Researcher" />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-slate-900">Lead Researcher</h5>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">IBT Labs Core Team</p>
                  </div>
                </div>
                {/* Quote Icon watermark */}
                <div className="absolute top-10 left-6 text-6xl text-slate-50 select-none">"</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Projects Grid (at bottom) */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Research Portfolio</h2>
              <p className="text-slate-500 mt-2">Explore our active laboratory projects</p>
            </div>
          </div>

          {loading && !hasProjects ? (
            <div className="flex min-h-64 items-center justify-center">
              <Loader size="lg" />
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-16">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={loadData} disabled={loading} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


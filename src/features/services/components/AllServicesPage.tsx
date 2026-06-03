'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { apiClient, type PublicService } from '@/src/api/client';
import { Loader } from '@/src/shared/ui';
import { useSocketSettings } from '@/src/providers/SocketSettingsProvider';
import { resolveImageUrl } from '@/src/utils/image';
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
  FiPhoneCall,
  FiRefreshCw,
  FiBarChart2,
  FiGrid,
  FiServer,
  FiTerminal,
  FiLock,
  FiSmartphone as FiMobile,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

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

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  FiMonitor,
  FiCloud,
  FiDatabase,
  FiCpu,
  FiSmartphone: FiMobile,
  FiCode,
  FiLayers,
  FiSettings,
  FiGlobe,
  FiShield,
  FiLayout,
  FiBriefcase,
  FiTarget,
  FiUsers,
  FiAward,
  FiCheckCircle,
  FiPlay,
  FiArrowRight,
  FiPhoneCall,
  FiRefreshCw,
  FiBarChart2,
  FiGrid,
  FiServer,
  FiTerminal,
  FiLock,
};

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
    <Link href={`/services/${service.slug}`} className="group block h-full">
      <motion.article
        variants={fadeUp}
        className="flex h-full flex-col overflow-hidden rounded-[0.8rem] bg-white shadow-[0_5px_30px_rgba(30,41,59,0.03)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(30,41,59,0.08)] text-left"
      >
        {/* Image Area */}
        <div className="relative aspect-[16/11] overflow-hidden bg-slate-50">
          {service.imageUrl ? (
            <img
              src={resolveImageUrl(service.imageUrl)}
              alt={service.title}
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-200">
              <Icon className="text-4xl" />
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex flex-1 flex-col px-6 py-7">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#aab0bc] mb-3 group-hover:text-[#3f78e0] transition-colors">
            <span className="w-4 h-[2px] bg-[#aab0bc] opacity-40 group-hover:bg-[#3f78e0]"></span>
            {(service as any).category || 'OUR SERVICE'}
          </p>

          <h3 className="text-[19px] font-bold tracking-tight text-[#343f52] leading-[1.3] transition-colors group-hover:text-[#3f78e0] mb-3">
            {service.title}
          </h3>

          <p className="text-[15px] leading-[1.6] text-[#60697b] line-clamp-3 mb-6">
            {service.description?.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ') || "Specifically designed to meet your business needs and drive growth."}
          </p>

          <div className="mt-auto flex items-center gap-2 text-[13px] font-bold text-[#e63946] group-hover:translate-x-1 transition-transform">
            Explore Details →
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

/* =========================================================
   DEFAULT DATA
========================================================= */

const DEFAULT_SERVICES: PublicService[] = [
  {
    id: '1',
    title: 'Digital Transformation',
    slug: 'digital-transformation',
    description: 'We orchestrate comprehensive digital evolution strategies that modernize legacy systems and integrate cutting-edge cloud technologies.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    title: 'Infrastructure Modernization',
    slug: 'infrastructure',
    description: 'Secure, scalable, and resilient cloud infrastructure designed for high-availability enterprise operations and global performance.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    title: 'Cybersecurity Elite',
    slug: 'cybersecurity',
    description: 'Advanced threat protection and architectural security frameworks that safeguard your digital assets against evolving global risks.',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
  },
];

/* =========================================================
   PAGE
========================================================= */

export function AllServicesPage() {
  const { settings } = useSocketSettings();
  const [services, setServices] = useState<PublicService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hero Section dynamic data
  const heroBadge = settings.servicesHeroBadge || 'Industry Solutions';
  const heroTitle = settings.servicesHeroTitle || 'Architecting Advantages.';
  const heroDescription = settings.servicesHeroDescription || 'We design, develop and deliver high-performance digital solutions that empower enterprise evolution and secure sustainable market leadership.';
  const heroBtn1Text = settings.servicesHeroBtn1Text || 'START A PROJECT';
  const heroBtn1Url = settings.servicesHeroBtn1Url || '/contact';

  const formatHeroHeading = (title: string) => {
    const normalized = title.trim().replace(/\n+/g, ' <br /> ');
    if (normalized.includes('<br')) return normalized;

    const words = normalized.split(' ').filter(Boolean);
    if (words.length <= 1) return normalized;
    if (words.length === 2) return `${words[0]} <br /> ${words[1]}`;

    const splitAt = Math.ceil(words.length / 2);
    return `${words.slice(0, splitAt).join(' ')} <br /> ${words.slice(splitAt).join(' ')}`;
  };

  // What We Do dynamic data
  const whatTitle = settings.servicesWhatTitle || 'What We Do';
  const whatDescription = settings.servicesWhatDescription || 'The full service we are offering is specifically designed to meet your business needs and projects.';
  const whatFeatures = (settings.servicesWhatFeatures && settings.servicesWhatFeatures.length > 0) ? settings.servicesWhatFeatures : [
    { title: "24/7 Support", desc: "Nulla vitae elit libero pharetra augue dapibus.", icon: "FiPhoneCall" },
    { title: "Secure Payments", desc: "Vivamus sagittis lacus augue laoreet vel.", icon: "FiLock" },
    { title: "Daily Updates", desc: "Cras mattis consectetur purus sit amet.", icon: "FiRefreshCw" },
    { title: "Market Research", desc: "Aenean lacinia bibendum nulla sed consectetur.", icon: "FiBarChart2" }
  ];
  const whatImages = (settings.servicesWhatImages && settings.servicesWhatImages.length > 0) ? settings.servicesWhatImages : [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000"
  ];

  // Process Section dynamic data
  const processTitle = settings.servicesProcessTitle || 'How We Do It?';
  const processDescription = settings.servicesProcessDescription || 'We make your project journey stress-free for you to have the perfect control.';
  const processSteps = (settings.servicesProcessSteps && settings.servicesProcessSteps.length > 0) ? settings.servicesProcessSteps : [
    { title: "Concept", desc: "Nulla vitae elit libero elit non porta gravida eget metus cras. Aenean eu leo quam. Pellentesque ornare." },
    { title: "Prepare", desc: "Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis." },
    { title: "Retouch", desc: "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nulla vitae elit libero." },
    { title: "Finalize", desc: "Integer posuere erat, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo." }
  ];

  // CTA dynamic data
  const ctaTitle = settings.servicesCtaTitle || 'Let\'s Talk';
  const ctaDescription = settings.servicesCtaDescription || 'Let\'s make something great together. We are trusted by over 5000+ clients. Join them by using our services and grow your business.';
  const ctaBtn1Text = settings.servicesCtaBtn1Text || 'Join Us';
  const ctaBtn1Url = settings.servicesCtaBtn1Url || '/contact';

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
      console.warn('Failed to load services:', err);
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

  const displayServices = useMemo(() => {
    return services.length > 0 ? services : DEFAULT_SERVICES;
  }, [services]);

  // Carousel state for portfolio (Solution Portfolio)
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

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

  // Ensure carouselIndex remains valid when visibleCount or displayServices change
  useEffect(() => {
    const n = displayServices.length;
    const maxIndex = Math.max(0, n - visibleCount);
    setCarouselIndex((prev) => Math.min(prev, maxIndex));
  }, [visibleCount, displayServices]);

  const visibleServices = useMemo(() => {
    const list = displayServices;
    const n = list.length;
    if (n <= visibleCount) return list;

    const out = [] as typeof list;
    for (let i = 0; i < visibleCount; i++) {
      out.push(list[(carouselIndex + i) % n]);
    }
    return out;
  }, [displayServices, carouselIndex, visibleCount]);

  const showPrev = () => {
    const n = displayServices.length;

    setCarouselIndex((prev) =>
      prev <= 0 ? n - visibleCount : prev - 1
    );
  };

  const showNext = () => {
    const n = displayServices.length;

    setCarouselIndex((prev) =>
      prev >= n - visibleCount ? 0 : prev + 1
    );
  };

  const hasServices = true; // Always true because of fallbacks

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading && services.length === 0) {
    return (
      <div className="flex min-h-full items-center justify-center bg-white">
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

      <section className="relative pt-12 pb-12 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-500 mb-10">
                <FiBriefcase size={16} />
                <span className="text-[11px] font-black uppercase tracking-[0.1em]">{heroBadge}</span>
              </div>

              <h1 className="text-6xl md:text-[84px] font-black tracking-tight text-[#1d2939] leading-[1.05] mb-10"
                dangerouslySetInnerHTML={{ __html: formatHeroHeading(heroTitle) }}
              />

              <p className="text-lg text-slate-500 leading-relaxed font-medium mb-12 max-w-xl">
                {heroDescription}
              </p>

              <div className="grid grid-cols-2 gap-8 mb-14">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-full bg-red-50 flex items-center justify-center text-red-500 shadow-sm">
                    <FiCheckCircle size={28} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#1d2939] mb-1 uppercase tracking-wider">Execution Excellence</h4>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.15em]">98% Success Rate</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-full bg-red-50 flex items-center justify-center text-red-500 shadow-sm">
                    <FiUsers size={28} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#1d2939] mb-1 uppercase tracking-wider">Elite Talent</h4>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.15em]">Architect-led teams</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={heroBtn1Url}
                  className="h-20 px-14 bg-[#ef4444] text-white rounded-2xl flex items-center justify-center text-[13px] font-black uppercase tracking-widest shadow-2xl shadow-red-500/30 hover:scale-[1.02] transition-all"
                >
                  {heroBtn1Text}
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative lg:col-span-6"
            >
              <div className="relative z-10 rounded-[4rem] rounded-br-[0rem] overflow-hidden shadow-2xl h-[520px]">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
                  alt="Service Architecture"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Stat Card */}
              <div className="absolute -bottom-10 -left-10 z-20 bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 min-w-[280px]">
                <div className="text-5xl font-black text-[#1d2939] mb-2">150+</div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 leading-normal">
                  Global <br /> Implementations
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 rounded-full bg-red-50 opacity-50 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          2b. WHAT WE DO SECTION (Dynamic)
      ===================================================== */}

      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content + Feature Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-(--ui-primary) mb-8">
                <FiTarget size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Core Focus</span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.05] mb-6">
                {whatTitle}
              </h2>

              {whatDescription && (
                <p className="text-lg text-slate-500 leading-relaxed font-medium mb-12 max-w-lg"
                  dangerouslySetInnerHTML={{ __html: whatDescription }}
                />
              )}

              {whatFeatures.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {whatFeatures.map((feat, i) => {
                    const IconComp = ICON_MAP[feat.icon] || FiLayers;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="group p-6 rounded-[2rem] border border-slate-100 bg-white hover:border-(--ui-primary-soft)/30 hover:shadow-xl hover:shadow-(--ui-primary)/5 transition-all duration-500"
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 text-(--ui-primary) mb-5 transition-all duration-500 group-hover:bg-(--ui-primary) group-hover:text-white group-hover:shadow-lg group-hover:shadow-(--ui-primary)/30">
                          <IconComp className="text-2xl" />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-2">{feat.title}</h4>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{feat.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* Right: 2×2 Image Collage */}
            {whatImages.filter(Boolean).length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  {whatImages.filter(Boolean).map((url, i) => (
                    <div
                      key={i}
                      className={`overflow-hidden shadow-lg ${i === 0 ? 'rounded-tl-[3rem] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl' :
                        i === 1 ? 'rounded-tr-[3rem] rounded-tl-2xl rounded-bl-2xl rounded-br-2xl mt-8' :
                          i === 2 ? 'rounded-bl-[3rem] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl -mt-8' :
                            'rounded-br-[3rem] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
                        }`}
                    >
                      <img
                        src={resolveImageUrl(url)}
                        alt={`Service showcase ${i + 1}`}
                        className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>
                {/* Decorative accent */}
                <div className="absolute -z-10 -bottom-6 -right-6 w-40 h-40 rounded-full bg-(--ui-primary)/5" />
                <div className="absolute -z-10 -top-6 -left-6 w-24 h-24 rounded-full bg-slate-100" />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          2c. PROCESS SECTION (Horizontal - How We Do It?)
      ===================================================== */}

      <section className="py-20 bg-slate-50/30 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">{processTitle}</h2>
            <div
              className="text-lg text-slate-500 font-medium max-w-2xl mx-auto text-center [&_*]:!whitespace-normal break-words"
              dangerouslySetInnerHTML={{ __html: processDescription }}
            />
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="absolute top-10 left-0 w-full h-px bg-slate-200 hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {processSteps.map((step: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-xl font-black mb-8 transition-all duration-500 shadow-xl ${i === 0 ? 'bg-blue-50 text-blue-600' :
                    i === 1 ? 'bg-blue-600 text-white' :
                      i === 2 ? 'bg-blue-50 text-blue-600' :
                        'bg-blue-50 text-blue-600'
                    }`}>
                    0{i + 1}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{step.title}</h3>
                  <p className="text-base text-slate-500 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          3. SERVICE SHOWCASE (Solution Grid)
      ===================================================== */}
      <section className="relative bg-white py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-20 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl font-black text-[#1d2939] mb-6">
              Solution Portfolio
            </h2>

            <p className="max-w-3xl mx-auto text-center text-lg leading-relaxed text-slate-500 font-medium">
              Innovative digital solutions engineered to empower your business evolution and drive sustainable market leadership.
            </p>
          </div>

          {/* ERROR DISPLAY */}
          {error && services.length === 0 && (
            <div className="mb-12 rounded-[2rem] bg-slate-50 p-12 text-center border border-slate-100">
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-20"></div>
                  <Loader
                    size="lg"
                    label="Connection Issue"
                    className="!border-t-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900">
                    Connection Timeout
                  </h3>

                  <p className="text-sm text-slate-500 font-medium max-w-md mx-auto">
                    {error.includes('taking too long')
                      ? error
                      : "The connection is slow or the server is busy. We're using cached data while we try to reconnect."}
                  </p>
                </div>

                <button
                  onClick={() => void loadAllServices()}
                  className="flex items-center gap-2 px-8 py-3 bg-[#1d2939] text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all"
                >
                  <FiRefreshCw className={loading ? "animate-spin" : ""} />
                  Reconnect Now
                </button>
              </div>
            </div>
          )}

          {/* SERVICES GRID */}
          <div className="relative">
            {/* Arrows: always show when there are multiple services */}
            {displayServices.length > 1 && (
              <>
                {/* LEFT ARROW */}
                <button
                  onClick={showPrev}
                  aria-label="Previous"
                  className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all"
                  style={{ left: -20 }}
                >
                  <FiChevronLeft />
                </button>

                {/* RIGHT ARROW */}
                <button
                  onClick={showNext}
                  aria-label="Next"
                  className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all"
                  style={{ right: -20 }}
                >
                  <FiChevronRight />
                </button>
              </>
            )}

            <div className="overflow-hidden -mx-4 px-4">
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex transition-transform duration-500 ease-out py-4"
                style={{
                  width: `${(displayServices.length * 100) / visibleCount}%`,
                  transform: `translateX(-${(carouselIndex * 100) / displayServices.length}%)`,
                }}
              >
                {displayServices.map((service, idx) => (
                  <div
                    key={service.id}
                    className="px-4"
                    style={{ flex: `0 0 ${100 / displayServices.length}%` }}
                  >
                    <ServiceCard service={service} index={idx} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          4. LET'S TALK SECTION (Join Us Style)
      ===================================================== */}

      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            {/* Left: Image Grid */}
            <div className="relative">
              {/* Decorative dots */}
              <div className="absolute -top-10 -left-10 text-(--ui-primary)/10 -z-10">
                <div className="grid grid-cols-6 gap-4">
                  {[...Array(36)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="pt-12">
                  <div className="rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
                      alt="Team Collaboration"
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-blue-50 p-10 rounded-3xl text-center">
                    <div className="text-5xl font-black text-slate-900 mb-2">5000+</div>
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Satisfied Customers</div>
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
                      alt="Meeting Room"
                      className="w-full h-[250px] object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
                {ctaTitle}
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8 max-w-xl">
                {ctaDescription}
              </p>
              <p className="text-base text-slate-400 font-medium leading-relaxed mb-12 max-w-xl">
                Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus mollis interdum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
              </p>

              <Link
                href={ctaBtn1Url}
                className="inline-flex h-14 px-10 bg-blue-600 text-white rounded-full items-center justify-center text-sm font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
              >
                {ctaBtn1Text}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}


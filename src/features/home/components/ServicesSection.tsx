'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { apiClient, type PaginationMeta, type PublicService } from '@/src/api/client';
import { motion, Variants } from 'framer-motion';
import { FiBriefcase, FiCornerDownRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Loader, SiteButton } from '@/src/shared/ui';
import { resolveImageUrl } from '@/src/utils/image';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function ServicesSection() {
  const [services, setServices] = useState<PublicService[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  const loadingRef = useRef(false);

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

  useEffect(() => {
    const n = services.length;
    const maxIndex = Math.max(0, n - visibleCount);
    setCarouselIndex((prev) => Math.min(prev, maxIndex));
  }, [visibleCount, services]);

  const showPrev = () => {
    const n = services.length;
    setCarouselIndex((prev) =>
      prev <= 0 ? n - visibleCount : prev - 1
    );
  };

  const showNext = () => {
    const n = services.length;
    setCarouselIndex((prev) =>
      prev >= n - visibleCount ? 0 : prev + 1
    );
  };

  const loadServices = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError(null);
    try {
      // Increased to 8 to allow more dynamic cards from admin panel
      const result = await apiClient.getServices(1, 8);
      setServices(result.items);
      setMeta(result.meta ?? {});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load services');
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadServices();
  }, [loadServices]);

  const hasMore = (meta.totalItems ?? 0) > 8 || (meta.totalPages ?? 0) > 1;

  const renderIcon = (idx: number, imageUrl?: string | null) => {
    if (imageUrl) {
      return (
        <img 
          src={resolveImageUrl(imageUrl)} 
          alt="Service Icon" 
          className="w-12 h-12 object-contain"
        />
      );
    }

    // Fallback SVGs based on index
    const iconIndex = idx % 4;
    switch (iconIndex) {
      case 0:
        return (
          <svg viewBox="0 0 500 500" className="w-12 h-12">
            <circle cx="200" cy="200" r="100" stroke="#1d3557" strokeWidth="25" fill="none" />
            <line x1="270" y1="270" x2="400" y2="400" stroke="#1d3557" strokeWidth="40" strokeLinecap="round" />
          </svg>
        );
      case 1:
        return (
          <svg viewBox="0 0 500 500" className="w-12 h-12">
            <rect x="50" y="100" width="400" height="300" rx="20" stroke="#e63946" strokeWidth="25" fill="none" />
            <line x1="50" y1="180" x2="450" y2="180" stroke="#e63946" strokeWidth="25" />
          </svg>
        );
      case 2:
        return (
          <svg viewBox="0 0 500 500" className="w-12 h-12">
            <rect x="100" y="100" width="250" height="200" rx="20" stroke="#34d399" strokeWidth="25" fill="none" />
            <rect x="180" y="180" width="250" height="200" rx="20" stroke="#34d399" strokeWidth="25" fill="white" />
          </svg>
        );
      case 3:
        return (
          <svg viewBox="0 0 500 500" className="w-12 h-12">
            <path d="M100 300 L350 150 L350 450 Z" stroke="#3f78e0" strokeWidth="25" fill="none" />
            <circle cx="380" cy="220" r="20" fill="#3f78e0" />
          </svg>
        );
      default:
        return <FiBriefcase className="text-5xl text-[#3f78e0]" />;
    }
  };

  return (
    <section className="bg-[#FEFAF4] py-12 lg:py-16 relative overflow-hidden">
      {/* Decorative Dots Backdrop */}
      <div className="absolute top-1/4 -left-10 opacity-20 pointer-events-none hidden lg:block">
         <div className="grid grid-cols-5 gap-3">
            {[...Array(25)].map((_, i) => (
               <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#e63946]" />
            ))}
         </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
       <div className="mb-10 text-center">
  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e63946] mb-3">
    WHAT WE DO?
  </h3>

 <h2
  style={{ textAlign: "center", margin: "0 auto" }}
  className="max-w-2xl text-[28px] font-bold text-[#1d3557]"
>
  The service we offer is specifically designed to meet your needs.
</h2>
</div>

        {loading && services.length === 0 && (
          <div className="flex min-h-[400px] items-center justify-center">
            <Loader size="lg" label="Preparing services..." />
          </div>
        )}

        {!loading && error && services.length === 0 && (
          <div className="p-12 text-center text-red-600">
            {error}
          </div>
        )}

        {services.length > 0 && (
          <>
            <div className="relative">
              {services.length > visibleCount && (
                <>
                  {/* LEFT ARROW */}
                  <button
                    onClick={showPrev}
                    aria-label="Previous"
                    className="hidden lg:flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all text-[#1d3557]"
                    style={{ left: -20 }}
                  >
                    <FiChevronLeft size={24} />
                  </button>

                  {/* RIGHT ARROW */}
                  <button
                    onClick={showNext}
                    aria-label="Next"
                    className="hidden lg:flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all text-[#1d3557]"
                    style={{ right: -20 }}
                  >
                    <FiChevronRight size={24} />
                  </button>
                </>
              )}

              <div className="overflow-hidden -mx-4 px-4">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex transition-transform duration-500 ease-out py-4"
                  style={{
                    width: `${(services.length * 100) / visibleCount}%`,
                    transform: `translateX(-${(carouselIndex * 100) / services.length}%)`,
                  }}
                >
                  {services.map((service, idx) => (
                    <div
                      key={service.id}
                      className="px-4"
                      style={{ flex: `0 0 ${100 / services.length}%` }}
                    >
                      <Link href={`/services/${service.slug}`} className="group block h-full">
                        <motion.article
                          variants={itemVariants}
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
                                <FiBriefcase className="text-4xl" />
                              </div>
                            )}
                          </div>

                          {/* Content Area */}
                          <div className="flex flex-1 flex-col px-6 py-7">
                            {/* Sandbox style Category Label */}
                            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#aab0bc] mb-3 group-hover:text-[#3f78e0] transition-colors">
                              <span className="w-4 h-[2px] bg-[#aab0bc] opacity-40 group-hover:bg-[#3f78e0]"></span>
                              OUR SERVICE
                            </p>
                            
                            <h3 className="text-[19px] font-bold tracking-tight text-[#343f52] leading-[1.3] transition-colors group-hover:text-[#3f78e0] mb-3">
                              {service.title}
                            </h3>

                            <p className="text-[15px] leading-[1.6] text-[#60697b] line-clamp-3 mb-6">
                              {service.description || "Specifically designed to meet your business needs and drive growth."}
                            </p>

                            <div className="mt-auto flex items-center gap-2 text-[13px] font-bold text-[#e63946] group-hover:translate-x-1 transition-transform">
                              Explore Details →
                            </div>
                          </div>
                        </motion.article>
                      </Link>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {hasMore && (
              <div className="mt-16 flex justify-center">
                <SiteButton
                  href="/services"
                  variant="secondary"
                  size="lg"
                  className="rounded-2xl border-slate-200"
                  rightIcon={<FiCornerDownRight />}
                >
                  View All Services
                </SiteButton>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
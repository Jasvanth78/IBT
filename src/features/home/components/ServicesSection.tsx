'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { apiClient, type PaginationMeta, type PublicService } from '@/src/api/client';
import { motion, Variants } from 'framer-motion';
import { FiBriefcase, FiCornerDownRight } from 'react-icons/fi';
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

  const loadingRef = useRef(false);

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

  <h2 className="text-[28px] font-bold tracking-tight text-[#1d3557] sm:text-[36px] leading-[1.2] max-w-2xl mx-auto">
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
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-wrap justify-center gap-4"
            >
              {services.map((service, idx) => (
                <motion.article
                  key={service.id}
                  variants={itemVariants}
                  className="group relative flex flex-col items-center bg-white rounded-xl p-7 transition-all duration-300 hover:shadow-[0_0_40px_rgba(30,34,40,0.05)] text-center h-full w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)] min-w-[250px]"
                >
                  <div className="mb-6 w-14 h-14 flex items-center justify-center">
                    {renderIcon(idx, service.imageUrl)}
                  </div>

                  <div className="flex flex-1 flex-col">
                    <h3 className="text-xl font-bold text-[#343f52] mb-4">
                      {service.title}
                    </h3>
                    <p className="text-[17px] leading-relaxed text-[#60697b] mb-6">
                      {service.description || "Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus cras justo."}
                    </p>
                    
                    <div className="mt-auto">
                      <Link 
                        href={`/services/${service.slug}`}
                        className="text-[15px] font-bold text-[#e63946] hover:text-[#c1121f] transition-all flex items-center justify-center gap-1 group/link"
                      >
                        Learn More
                        <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

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
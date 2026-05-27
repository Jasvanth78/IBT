'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { apiClient, type PaginationMeta, type PublicService } from '@/src/api/client';
import { motion, Variants } from 'framer-motion';
import { FiBriefcase, FiCornerDownRight, FiTag } from 'react-icons/fi';
import { Loader, SiteButton } from '@/src/shared/ui';

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
      const result = await apiClient.getServices(1, 6);
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

  const hasMore = (meta.totalItems ?? 0) > 6 || (meta.totalPages ?? 0) > 1;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
              <FiTag className="text-(--ui-primary)" />
              Our Specializations
            </div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Solutions that <span className="text-(--ui-primary)">Scale.</span>
            </h2>
            <p className="mt-6 text-lg text-slate-500 leading-relaxed">
              We provide comprehensive digital solutions tailored to your unique business needs, ensuring quality, security, and exceptional performance.
            </p>
          </div>
          
          {hasMore && (
             <SiteButton
                href="/services"
                variant="secondary"
                size="lg"
                className="hidden md:flex rounded-2xl border-slate-200"
                rightIcon={<FiCornerDownRight />}
              >
                View all Services
              </SiteButton>
          )}
        </div>

        {loading && services.length === 0 && (
          <div className="flex min-h-[400px] items-center justify-center rounded-[2.5rem] bg-slate-50 border border-dashed border-slate-200">
            <Loader size="lg" label="Preparing services..." />
          </div>
        )}

        {!loading && error && services.length === 0 && (
          <div className="rounded-[2.5rem] bg-red-50 p-12 text-center text-red-600 border border-red-100">
            {error}
          </div>
        )}

        {services.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, idx) => (
              <motion.article
                key={service.id}
                variants={itemVariants}
                className={`group relative flex flex-col bg-white rounded-[2rem] border border-slate-100 p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 ${
                   idx === 1 ? 'lg:col-span-1 lg:row-span-1' : ''
                }`}
              >
                <div className="relative mb-6 h-64 w-full overflow-hidden rounded-[1.5rem] bg-slate-100">
                  {service.imageUrl ? (
                    <img 
                      src={service.imageUrl} 
                      alt={service.title} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <FiBriefcase className="text-5xl text-slate-300" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                     <span className="flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-tight text-slate-700 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-(--ui-primary)" />
                        Service • Core
                     </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-2 pb-2">
                  <h3 className="line-clamp-2 text-2xl font-black text-slate-900 leading-tight transition-colors group-hover:text-(--ui-primary)">
                    {service.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-500">
                    {service.description || "Delivering high-quality digital transformation and innovative breakthroughs tailored to your business goals."}
                  </p>
                  
                  <div className="mt-auto pt-8">
                    <Link 
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-900 transition-all hover:bg-slate-900 hover:text-white group-hover:border-slate-900"
                    >
                      <FiCornerDownRight className="text-base" />
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {hasMore && (
          <div className="mt-16 flex justify-center md:hidden">
            <SiteButton
              href="/services"
              variant="secondary"
              size="lg"
              className="w-full rounded-2xl"
              rightIcon={<FiCornerDownRight />}
            >
              View All Services
            </SiteButton>
          </div>
        )}
      </div>
    </section>
  );
}
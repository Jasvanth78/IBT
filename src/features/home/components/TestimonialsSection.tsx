'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  apiClient,
  type PaginationMeta,
  type PublicTestimonial,
} from '@/src/api/client';

import {
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

import { Loader } from '@/src/shared/ui';

import {
  motion,
  AnimatePresence,
} from 'framer-motion';

export function TestimonialsSection() {

  const [testimonials, setTestimonials] =
    useState<PublicTestimonial[]>([]);

  const [testimonialsMeta, setTestimonialsMeta] =
    useState<PaginationMeta>({
      page: 1,
      limit: 2,
      totalPages: 1,
      totalItems: 0,
    });

  const [testimonialsPage, setTestimonialsPage] =
    useState(1);

  const [testimonialsLoading, setTestimonialsLoading] =
    useState(false);

  const [testimonialsError, setTestimonialsError] =
    useState<string | null>(null);

  const testimonialsLoadingRef = useRef(false);

  

  const loadTestimonialsPage = useCallback(
    async (page: number) => {
      if (testimonialsLoadingRef.current) return;

      testimonialsLoadingRef.current = true;

      setTestimonialsLoading(true);
      setTestimonialsError(null);

      try {
        const result =
          await apiClient.getTestimonials(page, 2);

        setTestimonials(result.items ?? []);

        setTestimonialsMeta(
          result.meta ?? {
            page: 1,
            limit: 2,
            totalPages: 1,
            totalItems: 0,
          }
        );

        setTestimonialsPage(page);
      } catch (err) {
        setTestimonialsError(
          err instanceof Error
            ? err.message
            : 'Failed to load testimonials'
        );
      } finally {
        testimonialsLoadingRef.current = false;

        setTestimonialsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    void loadTestimonialsPage(1);
  }, [loadTestimonialsPage]);

  const hasTestimonials = useMemo(
    () => testimonials.length > 0,
    [testimonials]
  );

  const testimonialsTotalPages = Math.max(
    1,
    testimonialsMeta.totalPages ?? 1
  );

  const canGoPrevTestimonials =
    testimonialsPage > 1;

  const canGoNextTestimonials =
    testimonialsPage < testimonialsTotalPages;

 

  if (testimonialsLoading && !hasTestimonials) {
    return (
      <div className="flex items-center justify-center py-20 sm:py-24">
        <Loader
          size="lg"
          label="Loading Testimonials..."
        />
      </div>
    );
  }

 

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

       

        <div className="mb-12 flex flex-col gap-8 sm:mb-16 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">

          {/* LEFT */}
          <div className="text-center lg:text-left">

            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#60708f] sm:text-[12px]">
              Voices
            </p>

            <h2 className="mt-4 text-[36px] font-black leading-tight tracking-[-1.5px] text-[#060b1f] xs:text-[42px] sm:text-[58px] lg:text-[72px]">
              Testimonials
            </h2>
          </div>

          {/* DESKTOP ARROWS */}
          <div className="hidden items-center gap-3 md:flex">

            {/* LEFT */}
            <button
              type="button"
              onClick={() =>
                void loadTestimonialsPage(
                  testimonialsPage - 1
                )
              }
              disabled={
                !canGoPrevTestimonials ||
                testimonialsLoading
              }
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#d9dfe8] bg-white text-[#060b1f] transition-all duration-300 hover:border-(--ui-primary) hover:bg-(--ui-primary) hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12"
            >
              <FiChevronLeft className="text-xl transition-transform duration-300 group-hover:-translate-x-1" />
            </button>

            {/* RIGHT */}
            <button
              type="button"
              onClick={() =>
                void loadTestimonialsPage(
                  testimonialsPage + 1
                )
              }
              disabled={
                !canGoNextTestimonials ||
                testimonialsLoading
              }
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#d9dfe8] bg-white text-[#060b1f] transition-all duration-300 hover:border-(--ui-primary) hover:bg-(--ui-primary) hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12"
            >
              <FiChevronRight className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

       

        {testimonialsError && !hasTestimonials && (
          <div className="rounded-[24px] bg-red-50 p-8 text-center text-red-600">
            {testimonialsError}
          </div>
        )}

        

        {hasTestimonials && (
          <AnimatePresence mode="wait">

            <motion.div
              key={testimonialsPage}
              initial={{
                opacity: 0,
                x: 60,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -60,
              }}
              transition={{
                duration: 0.4,
              }}
              className="grid gap-5 lg:grid-cols-2"
            >

              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-[24px] border border-slate-100 bg-slate-50/50 p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] sm:p-8 lg:p-9"
                >

                  {/* QUOTE */}
                  <div className="absolute left-5 top-3 text-[80px] font-black leading-none text-slate-100 sm:left-6 sm:top-4 sm:text-[100px]">
                    “
                  </div>

                  {/* CONTENT */}
                  <div className="relative z-10">

                    {/* TEXT */}
                    <div 
                      className="max-w-[95%] text-[15px] italic leading-[30px] tracking-[-0.2px] text-[#1b2b4b] sm:text-[16px] sm:leading-[34px] lg:text-[17px] lg:leading-[38px] [&_p]:mb-0 [&_p:last-child]:mb-0"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />

                    {/* USER */}
                    <div className="mt-8 flex items-center gap-4 sm:mt-10">

                      {/* AVATAR */}
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#dbe5f8] text-[18px] font-bold text-[#315efb] sm:h-14 sm:w-14 sm:text-[20px]">

                        {item.avatarUrl ? (
                          <img
                            src={item.avatarUrl}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          item.name
                            ?.split(' ')
                            .map((word) => word[0])
                            .join('')
                            .slice(0, 1)
                            .toUpperCase()
                        )}
                      </div>

                      {/* INFO */}
                      <div>

                        <h3 className="text-[24px] font-black tracking-[-1px] text-[#060b1f] sm:text-[28px] lg:text-[30px]">
                          {item.name}
                        </h3>

                        {(item.role ||
                          item.company) && (
                          <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#60708f] sm:text-[11px]">
                            {[item.role, item.company]
                              .filter(Boolean)
                              .join(' • ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

      

        <div className="mt-8 flex items-center justify-center gap-3 md:hidden">

          {/* LEFT */}
          <button
            type="button"
            onClick={() =>
              void loadTestimonialsPage(
                testimonialsPage - 1
              )
            }
            disabled={
              !canGoPrevTestimonials ||
              testimonialsLoading
            }
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9dfe8] bg-white text-[#060b1f] transition-all duration-300 hover:border-(--ui-primary) hover:bg-(--ui-primary) hover:text-white disabled:opacity-40"
          >
            <FiChevronLeft className="text-xl" />
          </button>

          {/* RIGHT */}
          <button
            type="button"
            onClick={() =>
              void loadTestimonialsPage(
                testimonialsPage + 1
              )
            }
            disabled={
              !canGoNextTestimonials ||
              testimonialsLoading
            }
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9dfe8] bg-white text-[#060b1f] transition-all duration-300 hover:border-(--ui-primary) hover:bg-(--ui-primary) hover:text-white disabled:opacity-40"
          >
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
}
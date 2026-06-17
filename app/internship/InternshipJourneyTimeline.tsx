'use client';

import { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export function InternshipJourneyTimeline({ children }: { children: React.ReactNode }) {
  const timelineRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Navigation Arrows for Mobile/Tablet */}
      <div className="flex justify-end items-center gap-2 lg:hidden mb-6 px-4">
        <button 
          onClick={scrollLeft}
          className="w-10 h-10 bg-white border border-slate-200 rounded-full shadow-sm flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all"
        >
          <FiChevronLeft size={20} />
        </button>
        <button 
          onClick={scrollRight}
          className="w-10 h-10 bg-white border border-slate-200 rounded-full shadow-sm flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all"
        >
          <FiChevronRight size={20} />
        </button>
      </div>

      {/* Horizontal Line for Desktop */}
      <div className="hidden lg:block absolute top-[64px] left-[10%] right-[10%] h-[2px] bg-slate-100 z-0 border-t-2 border-dashed border-slate-200" />

      <div 
        ref={timelineRef}
        className="flex lg:grid lg:grid-cols-5 gap-6 sm:gap-10 overflow-x-auto snap-x snap-mandatory lg:overflow-visible pb-6 custom-scrollbar px-4 lg:px-0 -mx-4 lg:mx-0"
      >
        {children}
      </div>
    </div>
  );
}

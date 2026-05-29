'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiArrowRight, FiCalendar } from 'react-icons/fi';
import { type PublicBlog } from '@/src/api/client';
import { Pagination } from '@/src/shared/ui/Pagination';

type BlogListProps = {
  initialBlogs: PublicBlog[];
  apiOrigin: string;
};

const POSTS_PER_PAGE = 6;

export function BlogList({ initialBlogs, apiOrigin }: BlogListProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  const categories = useMemo(() => {
    const cats = new Set(initialBlogs.map(b => b.category).filter(Boolean));
    return ['All Posts', ...Array.from(cats)];
  }, [initialBlogs]);

  const resolveImageUrl = (imageUrl?: string | null) => {
    if (!imageUrl?.trim()) return null;
    if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
    return `${apiOrigin}${imageUrl}`;
  };

  const getExcerpt = (text?: string | null) => {
    if (!text) return '';
    return text.replace(/<[^>]*>/g, '').replace(/&nbsp;/gi, ' ').trim().slice(0, 160) + '...';
  };

  const formatPublishedAt = (value?: string | null) => {
    if (!value) return 'Latest edition';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Latest edition';

    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase()) || 
                            (blog.description || '').toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All Posts' || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialBlogs, search, selectedCategory]);

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredBlogs.slice(start, start + POSTS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  return (
    <div className="space-y-12 pb-12">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 rounded-[2rem] border border-white/80 bg-white/85 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.06)] backdrop-blur sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat as string}
              onClick={() => setSelectedCategory(cat as string)}
              className={[
                'rounded-full px-5 py-2.5 text-[13px] font-bold transition-all duration-300',
                selectedCategory === cat 
                  ? 'bg-slate-950 text-white shadow-[0_12px_24px_rgba(15,23,42,0.18)]' 
                  : 'border border-slate-100 bg-slate-50 text-slate-500 hover:border-[#343f52] hover:bg-slate-100 hover:text-[#343f52]'
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:max-w-xs">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-slate-100 bg-slate-50 py-2.5 pl-11 pr-5 text-sm outline-none transition-all focus:border-[#3f78e0]/30 focus:bg-white focus:ring-4 focus:ring-[#3f78e0]/5"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {paginatedBlogs.length > 0 ? (
          <motion.div
            key={selectedCategory + search + currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Grid for Sandbox style cards (Uniform Grid) */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedBlogs.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <article className="flex h-full flex-col overflow-hidden rounded-[0.8rem] bg-white shadow-[0_5px_30px_rgba(30,41,59,0.03)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(30,41,59,0.08)]">
                    {/* Image Area */}
                    <div className="relative aspect-[16/11] overflow-hidden">
                      {post.imageUrl ? (
                        <img 
                          src={resolveImageUrl(post.imageUrl) || ''} 
                          alt={post.title} 
                          className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-300 italic text-xs font-bold uppercase tracking-widest">No cover</div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-1 flex-col px-7 py-8">
                      {/* Sandbox style Category Label */}
                      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#aab0bc] mb-4 group-hover:text-[#3f78e0] transition-colors">
                        <span className="w-4 h-[2px] bg-[#aab0bc] opacity-40 group-hover:bg-[#3f78e0]"></span>
                        {post.category || 'IBT JOURNAL'}
                      </p>
                      
                      <h3 className="text-[20px] font-bold tracking-tight text-[#343f52] leading-[1.3] transition-colors group-hover:text-[#3f78e0] mb-4">
                        {post.title}
                      </h3>

                      <p className="text-[15px] leading-[1.6] text-[#60697b] line-clamp-3 mb-8">
                        {getExcerpt(post.description || post.content)}
                      </p>

                      {/* Footer Icons */}
                      <div className="mt-auto flex items-center pt-6 border-t border-slate-50 text-[12px] font-semibold text-[#aab0bc]">
                         <div className="flex items-center gap-1.5">
                            <FiCalendar className="text-[14px]" />
                            <span className="mt-0.5">{formatPublishedAt(post.publishedAt)}</span>
                         </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center pt-8 border-t border-slate-100">
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                />
              </div>
            )}
          </motion.div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-200 py-24 text-center">
             <p className="text-xl font-bold text-slate-500">No articles match your search.</p>
             <button 
              onClick={() => { setSearch(''); setSelectedCategory('All Posts'); }}
              className="mt-6 inline-flex items-center rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#3f78e0]"
             >
               Clear all filters
             </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

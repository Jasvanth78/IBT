'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiClock, FiUser, FiArrowRight } from 'react-icons/fi';
import { type PublicBlog } from '@/src/api/client';

type BlogListProps = {
  initialBlogs: PublicBlog[];
  apiOrigin: string;
};

export function BlogList({ initialBlogs, apiOrigin }: BlogListProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Posts');

  const categories = useMemo(() => {
    const cats = new Set(initialBlogs.map(b => b.category).filter(Boolean));
    return ['All Posts', ...Array.from(cats)];
  }, [initialBlogs]);

  const resolveImageUrl = (imageUrl?: string | null) => {
    if (!imageUrl?.trim()) return null;
    if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
    return `${apiOrigin}${imageUrl}`;
  };

  const calculateReadTime = (content?: string | null) => {
    if (!content) return '1 min read';
    const words = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
    const time = Math.ceil(words / 200);
    return `${time || 1} min read`;
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

  const featuredBlog = filteredBlogs[0];
  const otherBlogs = filteredBlogs.slice(1);

  return (
    <div className="space-y-7 pb-8 sm:space-y-8">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-white/80 bg-white/85 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.06)] backdrop-blur sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat as string}
              onClick={() => setSelectedCategory(cat as string)}
              className={[
                'rounded-full px-4 py-2.5 text-sm font-bold transition-all duration-300',
                selectedCategory === cat 
                  ? 'bg-slate-950 text-white shadow-[0_12px_24px_rgba(15,23,42,0.18)]' 
                  : 'border border-slate-100 bg-slate-50 text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-(--ui-primary)'
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-md">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search stories, topics, or keywords"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-950/5"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filteredBlogs.length > 0 ? (
          <motion.div 
            key={selectedCategory + search}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Featured Post */}
            {featuredBlog && selectedCategory === 'All Posts' && search === '' && (
              <Link href={`/blog/${featuredBlog.slug}`}>
                  <article className="group relative grid gap-4 overflow-hidden rounded-[2.25rem] border border-white/80 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.10)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-0">
                    <div className="relative aspect-[16/11] overflow-hidden bg-slate-100 lg:aspect-auto lg:min-h-[32rem]">
                    {featuredBlog.imageUrl ? (
                      <img 
                        src={resolveImageUrl(featuredBlog.imageUrl) || ''} 
                        alt={featuredBlog.title} 
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 via-white to-red-50 text-slate-300">
                        <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">No cover image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                      <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-white/90">
                        <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 backdrop-blur">{featuredBlog.category || 'Insights'}</span>
                        <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 backdrop-blur">{formatPublishedAt(featuredBlog.publishedAt)}</span>
                      </div>
                    </div>
                  </div>

                    <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.24em] text-slate-500">
                      <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-slate-600">
                        <FiClock /> {calculateReadTime(featuredBlog.content)}
                      </span>
                      <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-(--ui-primary)">
                        <FiUser /> IBT Team
                      </span>
                    </div>

                    <h2 className="mt-6 text-3xl font-black leading-tight text-slate-950 transition-colors group-hover:text-(--ui-primary) sm:text-4xl lg:text-5xl">
                      {featuredBlog.title}
                    </h2>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg line-clamp-3">
                      {getExcerpt(featuredBlog.description || featuredBlog.content)}
                    </p>

                    <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-6">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Published by</p>
                        <p className="mt-2 text-sm font-black text-slate-800">IBT Journal Desk</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-black text-(--ui-primary) transition-transform group-hover:translate-x-1">
                        Read More <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            <div className="flex items-end justify-between gap-4 border-t border-white/80 pt-6 sm:pt-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-(--ui-primary)">Latest stories</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">More articles from the journal</h2>
              </div>
              <p className="hidden max-w-md text-sm leading-6 text-slate-500 sm:block">
                The cards below now sit closer to the featured post, with a cleaner editorial rhythm and less empty vertical space.
              </p>
            </div>

            {/* Grid for other posts */}
            <div className="grid -mt-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-5">
              {(featuredBlog && (selectedCategory !== 'All Posts' || search !== '') ? [featuredBlog, ...otherBlogs] : otherBlogs).map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-white/80 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      {post.imageUrl ? (
                        <img 
                          src={resolveImageUrl(post.imageUrl) || ''} 
                          alt={post.title} 
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 via-white to-orange-50 text-slate-300 italic">No cover</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full border border-white/25 bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-white backdrop-blur-md">
                          {post.category || 'General'}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-white backdrop-blur-md">
                        {formatPublishedAt(post.publishedAt)}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">
                         <FiClock /> {calculateReadTime(post.content)}
                      </div>
                      
                      <h3 className="mt-4 line-clamp-2 text-lg font-black leading-tight text-slate-950 transition-colors group-hover:text-(--ui-primary) sm:text-xl">
                        {post.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">
                        {getExcerpt(post.description || post.content)}
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-6">
                         <div className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
                            IBT Journal
                         </div>
                         <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white transition-all duration-300 group-hover:bg-(--ui-primary) group-hover:shadow-lg group-hover:shadow-(--ui-primary)/30">
                            <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
                         </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-200 py-20 text-center">
             <p className="text-xl font-bold text-slate-500">No articles match your search.</p>
             <button 
              onClick={() => { setSearch(''); setSelectedCategory('All Posts'); }}
              className="mt-4 inline-flex items-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-(--ui-primary)"
             >
               Clear all filters
             </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

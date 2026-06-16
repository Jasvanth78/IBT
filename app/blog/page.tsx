import { apiClient } from '@/src/api/client'
import { BlogList } from '@/src/features/blog/components/BlogList'
import { FiArrowRight, FiFileText, FiGrid, FiUsers } from 'react-icons/fi'
import Link from 'next/link'



const resolveApiOrigin = (value: string | undefined) => {
  const fallback = 'http://localhost:5000'
  if (!value?.trim()) return fallback
  const trimmed = value.trim()
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`
  try { return new URL(withProtocol).origin } catch { return fallback }
}

const formatPublishedAt = (value?: string | null) => {
  if (!value) return 'Latest edition'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Latest edition'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

const getCategoryCount = (items: Array<{ category?: string | null }>) => {
  return new Set(items.map((blog) => blog.category).filter(Boolean)).size
}

const resolveImageUrl = (imageUrl?: string | null, apiOrigin?: string) => {
  if (!imageUrl?.trim()) return null;
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  return `${apiOrigin}${imageUrl}`;
};

export default async function BlogPage() {
  const result = await apiClient.getPublicBlogs(1, 50).catch(() => null)
  const apiOrigin = resolveApiOrigin(process.env.NEXT_PUBLIC_API_URL)

  if (!result) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center">
        <h1 className="text-4xl font-black text-slate-900">Our Blog</h1>
        <div className="mt-8 inline-block rounded-2xl border border-red-100 bg-red-50 p-6 text-[#e63946]">
          <p className="font-bold text-lg">Unable to load stories</p>
          <p className="mt-2 text-sm opacity-80">We&apos;re experiencing some technical issues. Please check back later.</p>
        </div>
      </div>
    )
  }

  const { items } = result
  const totalPosts = items.length
  const totalCategories = getCategoryCount(items)
  
  // Find a featured post, or fallback to the latest
  const featuredPost = items.find((blog) => blog.featured) ?? items[0]

  return (
    <div className="min-h-screen bg-[#f8faff] text-slate-900 font-sans">
      
      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative pt-12 pb-8 lg:pt-20 lg:pb-12 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="relative z-10">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e63946] mb-4">
                IBT BLOG
              </h3>
              
              <h1 className="text-[40px] sm:text-[48px] lg:text-[56px] font-black text-[#0f172a] leading-[1.05] tracking-tight mb-6">
                Ideas, Insights &<br />
                <span className="text-[#e63946]">Innovation</span>
              </h1>
              
              <p className="text-[15px] text-slate-500 font-medium leading-relaxed mb-10 max-w-md">
                Explore expert perspectives, technical guides, industry trends, and innovation stories from the IBACUS TECH team.
              </p>

              {/* Stats Block */}
              <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e63946] border border-red-100 flex items-center justify-center shrink-0">
                    <FiFileText size={18} />
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-[18px] font-black text-[#0f172a] leading-none mb-1">{totalPosts}+</div>
                    <div className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Articles Published</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e63946] border border-red-100 flex items-center justify-center shrink-0">
                    <FiGrid size={18} />
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-[18px] font-black text-[#0f172a] leading-none mb-1">{totalCategories}+</div>
                    <div className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Categories</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e63946] border border-red-100 flex items-center justify-center shrink-0">
                    <FiUsers size={18} />
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-[18px] font-black text-[#0f172a] leading-none mb-1">25K+</div>
                    <div className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Readers Monthly</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Featured Article */}
            <div className="relative z-10">
              <Link href={`/blog/${featuredPost?.slug || ''}`} className="block group">
                <div className="bg-[#0f172a] rounded-3xl overflow-hidden relative shadow-2xl h-[400px] flex flex-col justify-end p-8 sm:p-10 border border-slate-800 hover:border-slate-700 transition-colors">
                  
                  {/* Background Image (Darkened) */}
                  <div className="absolute inset-0">
                    <img 
                      src={resolveImageUrl(featuredPost?.imageUrl, apiOrigin) || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'} 
                      alt="Featured Article Background" 
                      className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-8 left-8">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#e63946] text-white text-[10px] font-black uppercase tracking-widest">
                      FEATURED ARTICLE
                    </span>
                  </div>

                  <div className="relative z-10 w-full">
                    <p className="text-[11px] font-bold text-red-400 uppercase tracking-widest mb-3">
                      {featuredPost?.category || 'SECURITY'}
                    </p>
                    <h2 className="text-[28px] sm:text-[32px] font-black text-white leading-tight mb-4 group-hover:text-red-100 transition-colors">
                      {featuredPost?.title || 'Designing for Accessibility: A Complete Guide'}
                    </h2>
                    <p className="text-[13px] text-slate-300 font-medium line-clamp-2 max-w-sm mb-8">
                      {featuredPost?.description || 'Learn how to build digital products that are inclusive, usable and accessible for everyone.'}
                    </p>

                    <div className="flex items-center justify-between border-t border-slate-700/50 pt-6">
                      <div className="flex items-center gap-3">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" 
                          alt="Author" 
                          className="w-10 h-10 rounded-full object-cover border border-slate-600"
                        />
                        <div>
                          <p className="text-[12px] font-bold text-white leading-tight">IBT Editorial Team</p>
                          <p className="text-[11px] text-slate-400 font-medium">
                            {formatPublishedAt(featuredPost?.publishedAt)} • {(featuredPost as any)?.readTime || '6'} min read
                          </p>
                        </div>
                      </div>
                      
                      {/* Round Button */}
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-[#e63946] transition-colors shrink-0">
                        <FiArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN BLOG LISTING (Client Component)
      ===================================================== */}
      <div className="mx-auto max-w-[1300px] px-4 pt-12 pb-20 sm:px-6 lg:px-8">
        <BlogList initialBlogs={items} apiOrigin={apiOrigin} />
      </div>

    </div>
  )
}

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { 
  FiArrowLeft, FiShare2, FiLinkedin, FiTwitter, FiFacebook, FiLink, 
  FiSearch, FiMail, FiArrowRight, FiEye, FiActivity, FiShield, FiCheckCircle
} from 'react-icons/fi'
import { apiClient } from '@/src/api/client'

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const blogs = await apiClient.getPublicBlogs(1, 100);
    const paths = blogs.items.map((blog) => ({
      slug: blog.slug,
    }));
    return paths.length > 0 ? paths : [{ slug: 'latest' }];
  } catch (error) {
    console.error('Error generating static params for blogs:', error);
    return [{ slug: 'latest' }];
  }
}

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>
}

const resolveApiOrigin = (value: string | undefined) => {
  const fallback = 'http://localhost:5000'
  if (!value?.trim()) return fallback
  const withProtocol = /^https?:\/\//i.test(value.trim()) ? value.trim() : `http://${value.trim()}`
  try { return new URL(withProtocol).origin } catch { return fallback }
}

const resolveImageUrl = (imageUrl?: string | null) => {
  if (!imageUrl?.trim()) return null
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl
  return `${resolveApiOrigin(process.env.NEXT_PUBLIC_API_URL)}${imageUrl}`
}

const formatPublishedAt = (value?: string | null) => {
  if (!value) return 'May 14, 2025' // Fallback to match design
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'May 14, 2025'
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const blog = await apiClient.getPublicBlogBySlug(slug).catch(() => null)

  if (!blog) {
    notFound()
  }

  const imageSrc = resolveImageUrl(blog.imageUrl) || 'https://images.unsplash.com/photo-1614064641936-a5926622ab93?auto=format&fit=crop&q=80&w=1600'

  // We are creating a 100% match of the design requested. 
  // If the backend blog content is just plain text or missing, we fall back to the beautifully styled static content from the design.
  const hasRichContent = blog.content && blog.content.length > 100;

  return (
    <div className="min-h-screen bg-[#f8faff] font-sans pt-10 pb-20">
      <div className="mx-auto w-full max-w-[1300px] px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-bold text-[#e63946] transition-colors hover:text-red-700"
          >
            <FiArrowLeft className="transition-transform group-hover:-translate-x-1" size={16} /> Back to Blog
          </Link>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 lg:gap-16">
          
          {/* =========================================
              LEFT COLUMN: MAIN ARTICLE
          ========================================= */}
          <article className="w-full">
            
            {/* Header Section */}
            <div className="mb-10">
              <span className="inline-block px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.15em] mb-6">
                {blog.category || 'SECURITY'}
              </span>
              
              <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-black text-[#0f172a] leading-[1.1] mb-6 tracking-tight">
                {blog.title || 'Designing for Accessibility: A Complete Guide'}
              </h1>
              
              <p className="text-[17px] sm:text-[19px] text-slate-500 font-medium leading-relaxed max-w-3xl mb-8">
                {blog.description || 'Learn how to build digital products that are inclusive, usable and accessible for everyone. Practical principles, real-world examples, and actionable tips for designers and developers.'}
              </p>
              
              {/* Author and Share Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-slate-200/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 text-[#e63946] flex items-center justify-center font-black text-lg shrink-0">
                    IB
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-[15px] leading-tight mb-1">IBT Editorial Team</p>
                    <p className="text-[13px] font-medium text-slate-500">
                      {formatPublishedAt(blog.publishedAt)} • 8 min read • <span className="text-slate-400">1.2K views</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-bold text-slate-400 mr-1">Share:</span>
                  <a href="#" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2] transition-colors">
                    <FiLinkedin size={14} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[#1d9bf0] hover:bg-[#1d9bf0] hover:text-white hover:border-[#1d9bf0] transition-colors">
                    <FiTwitter size={14} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[#1877f2] hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2] transition-colors">
                    <FiFacebook size={14} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-colors">
                    <FiLink size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full aspect-[16/8] sm:aspect-[21/9] rounded-[2rem] overflow-hidden mb-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 bg-slate-900">
              <img 
                src={imageSrc} 
                alt={blog.title} 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Article Content */}
            {hasRichContent ? (
               <div
                 className="prose prose-lg prose-slate max-w-none 
                            prose-headings:font-black prose-headings:text-[#0f172a] prose-headings:tracking-tight
                            prose-h2:text-[28px] prose-h2:mt-12 prose-h2:mb-6
                            prose-h3:text-[22px] prose-h3:mt-8 prose-h3:mb-4
                            prose-p:text-slate-600 prose-p:leading-[1.8] prose-p:text-[17px] prose-p:mb-6
                            prose-a:text-[#e63946] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                            prose-li:text-slate-600 prose-li:text-[17px] prose-li:leading-[1.8]
                            prose-img:rounded-2xl prose-img:shadow-lg
                            prose-strong:text-slate-900 prose-strong:font-bold"
                 dangerouslySetInnerHTML={{ __html: blog.content }}
               />
            ) : (
              // Hardcoded 100% matched design content if backend content is empty or short
              <div className="text-slate-600 text-[17px] leading-[1.8]">
                <h2 className="text-[28px] font-black text-[#0f172a] mb-6 mt-2 tracking-tight">Introduction</h2>
                <p className="mb-6">
                  Accessibility is no longer a-nice-to-have—it's a necessity. In today's digital landscape, designing for accessibility ensures that people of all abilities can perceive, understand, navigate, and interact with digital products effectively.
                </p>
                <p className="mb-10">
                  This guide walks you through key principles, best practices, and practical steps to build inclusive experiences.
                </p>

                <h3 className="text-[22px] font-black text-[#0f172a] mb-6 tracking-tight">1. Understand Accessibility Principles</h3>
                <p className="mb-6">
                  The foundation of accessible design lies in the WCAG (Web Content Accessibility Guidelines) principles, also known as POUR:
                </p>
                
                <ul className="space-y-6 mb-12">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-[#e63946] flex items-center justify-center shrink-0 border border-red-100">
                      <FiEye size={18} />
                    </div>
                    <div>
                      <strong className="text-slate-900 font-bold">Perceivable</strong> – Information must be presentable to users in ways they can perceive.
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 border border-orange-100">
                      <FiActivity size={18} />
                    </div>
                    <div>
                      <strong className="text-slate-900 font-bold">Operable</strong> – Interface components must be operable.
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0 border border-green-100">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H15"/><path d="M10 21V18"/><path d="M14 21V18"/><path d="M12 18V15"/><path d="M10.29 11.29A4 4 0 1 1 15 12V15H9V12A4 4 0 0 1 10.29 11.29Z"/></svg>
                    </div>
                    <div>
                      <strong className="text-slate-900 font-bold">Understandable</strong> – Information and operation must be understandable.
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center shrink-0 border border-purple-100">
                      <FiShield size={18} />
                    </div>
                    <div>
                      <strong className="text-slate-900 font-bold">Robust</strong> – Content must be robust enough to be interpreted reliably by assistive technologies.
                    </div>
                  </li>
                </ul>

                <h3 className="text-[22px] font-black text-[#0f172a] mb-6 tracking-tight">2. Key Best Practices</h3>
                <ul className="space-y-4 mb-12">
                  {[
                    "Use semantic HTML and proper heading structure.",
                    "Ensure sufficient color contrast.",
                    "Provide alternative text for images.",
                    "Design keyboard navigability.",
                    "Use clear, consistent and descriptive labels."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 text-[#e63946] shrink-0">
                        <FiCheckCircle size={18} />
                      </div>
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-[22px] font-black text-[#0f172a] mb-6 tracking-tight">3. Tools to Help You</h3>
                <p className="mb-6">Use these tools to evaluate and improve accessibility:</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  {/* Tool 1 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-800 text-xl">A</div>
                      <span className="font-bold text-slate-900 text-[15px]">axe DevTools</span>
                    </div>
                    <p className="text-[13px] text-slate-500 leading-relaxed">Browser extension for accessibility testing.</p>
                  </div>
                  {/* Tool 2 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">W</div>
                      <span className="font-bold text-slate-900 text-[15px]">WAVE</span>
                    </div>
                    <p className="text-[13px] text-slate-500 leading-relaxed">Web accessibility evaluation tool.</p>
                  </div>
                  {/* Tool 3 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center font-bold text-xl"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22H22L12 2Z"/></svg></div>
                      <span className="font-bold text-slate-900 text-[15px]">Lighthouse</span>
                    </div>
                    <p className="text-[13px] text-slate-500 leading-relaxed">Audit performance, accessibility & more.</p>
                  </div>
                  {/* Tool 4 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-green-50 text-green-500 flex items-center justify-center font-bold text-xl"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></div>
                      <span className="font-bold text-slate-900 text-[15px]">Color Contrast Checker</span>
                    </div>
                    <p className="text-[13px] text-slate-500 leading-relaxed">Check contrast ratios for accessibility.</p>
                  </div>
                </div>

                <h2 className="text-[28px] font-black text-[#0f172a] mb-6 tracking-tight">Conclusion</h2>
                <p className="mb-10">
                  Designing for accessibility leads to better user experiences for everyone. By following these principles and practices, you can create digital products that are not only compliant but truly inclusive.
                </p>
              </div>
            )}

            {/* Navigation Footer */}
            <div className="mt-16 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link href="#" className="group flex flex-col items-start p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#e63946] hover:shadow-lg transition-all">
                <div className="flex items-center gap-2 text-[12px] font-bold text-[#e63946] uppercase tracking-widest mb-3">
                  <FiArrowLeft className="transition-transform group-hover:-translate-x-1" /> Previous Article
                </div>
                <h4 className="text-[17px] font-bold text-[#0f172a] leading-tight group-hover:text-[#e63946] transition-colors">
                  Why Cyber Security is Non-Negotiable
                </h4>
              </Link>
              
              <Link href="#" className="group flex flex-col items-end text-right p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#e63946] hover:shadow-lg transition-all">
                <div className="flex items-center gap-2 text-[12px] font-bold text-[#e63946] uppercase tracking-widest mb-3">
                  Next Article <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </div>
                <h4 className="text-[17px] font-bold text-[#0f172a] leading-tight group-hover:text-[#e63946] transition-colors">
                  Introduction to Web3 and Decentralization
                </h4>
              </Link>
            </div>

          </article>

          {/* =========================================
              RIGHT COLUMN: SIDEBAR
          ========================================= */}
          <aside className="w-full space-y-10 hidden lg:block">
            
            {/* Search Box */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#e63946] transition-all shadow-sm"
              />
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-[#fff5f6] border border-red-100 rounded-3xl p-8 text-center">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-red-100 flex items-center justify-center text-[#e63946] mx-auto mb-5">
                <FiMail size={24} />
              </div>
              <h3 className="text-[20px] font-black text-[#0f172a] mb-2 leading-tight">Subscribe to our newsletter</h3>
              <p className="text-[13px] text-slate-500 font-medium mb-6 px-2">
                Get the latest articles and insights straight to your inbox.
              </p>
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full h-12 px-4 rounded-xl border border-white bg-white text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#e63946] transition-all shadow-sm"
                  required
                />
                <button 
                  type="submit" 
                  className="w-full h-12 rounded-xl bg-[#e63946] text-white text-[14px] font-bold hover:bg-red-700 transition-colors shadow-md shadow-red-500/20"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="text-[18px] font-black text-[#0f172a] mb-6">Recent Posts</h3>
              <div className="space-y-6">
                {[
                  { title: 'Ethics in Modern AI', date: 'May 14, 2025', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=200&q=80' },
                  { title: 'Introduction to Web3 and Decentralization', date: 'May 12, 2025', img: 'https://images.unsplash.com/photo-1639762681485-074b7f4fced0?auto=format&fit=crop&w=200&q=80' },
                  { title: 'Mastering React Hooks', date: 'May 8, 2025', img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=200&q=80' },
                  { title: 'Cloud Migration Best Practices', date: 'May 4, 2025', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=200&q=80' },
                ].map((post, idx) => (
                  <Link href="#" key={idx} className="group flex gap-4 items-center">
                    <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                      <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#0f172a] leading-snug group-hover:text-[#e63946] transition-colors line-clamp-2 mb-1">
                        {post.title}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-500">{post.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="text-[18px] font-black text-[#0f172a] mb-6">Categories</h3>
              <ul className="space-y-4 mb-6">
                {[
                  { name: 'AI & ML', count: 18 },
                  { name: 'Web Development', count: 24 },
                  { name: 'Blockchain', count: 12 },
                  { name: 'Cyber Security', count: 15 },
                  { name: 'Design', count: 9 },
                  { name: 'Cloud Computing', count: 10 },
                  { name: 'Internship', count: 6 },
                  { name: 'Business', count: 8 },
                ].map((cat, idx) => (
                  <li key={idx}>
                    <Link href="#" className="group flex items-center justify-between text-slate-600 hover:text-[#e63946] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="text-[#e63946] opacity-70 group-hover:opacity-100 transition-opacity">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                        </div>
                        <span className="text-[14px] font-semibold">{cat.name}</span>
                      </div>
                      <span className="text-[12px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                        ({cat.count})
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="#" className="inline-flex items-center gap-2 text-[13px] font-bold text-[#e63946] hover:text-red-700 transition-colors">
                View All Categories <FiArrowRight size={14} />
              </Link>
            </div>

          </aside>
        </div>
      </div>
    </div>
  )
}

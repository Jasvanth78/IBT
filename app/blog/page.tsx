import { apiClient } from '@/src/api/client'
import { BlogList } from '@/src/features/blog/components/BlogList'

export const metadata = {
  title: 'Blog | IBT Solutions',
  description: 'Explore our latest insights, technical deep-dives, and updates from the I-BACUS-TECH team.',
}

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

export default async function BlogPage() {
  const result = await apiClient.getPublicBlogs(1, 50).catch(() => null)
  const apiOrigin = resolveApiOrigin(process.env.NEXT_PUBLIC_API_URL)

  if (!result) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center">
        <h1 className="text-4xl font-black text-slate-900">Our Blog</h1>
        <div className="mt-8 inline-block rounded-2xl border border-red-100 bg-red-50 p-6 text-(--ui-primary)">
          <p className="font-bold text-lg">Unable to load stories</p>
          <p className="mt-2 text-sm opacity-80">We&apos;re experiencing some technical issues. Please check back later.</p>
        </div>
      </div>
    )
  }

  const { items } = result
  const totalPosts = items.length
  const totalCategories = getCategoryCount(items)
  const featuredPost = items.find((blog) => blog.featured) ?? items[0]
  const latestPost = [...items].sort((left, right) => {
    const leftDate = new Date(left.publishedAt ?? 0).getTime()
    const rightDate = new Date(right.publishedAt ?? 0).getTime()
    return rightDate - leftDate
  })[0]

  return (
    <div className="min-h-full bg-[#f6f1ed] pb-20 text-slate-900">
      <section className="relative isolate overflow-hidden border-b border-white/70 bg-[radial-gradient(circle_at_top_left,_rgba(220,20,60,0.16),_transparent_30%),radial-gradient(circle_at_right,_rgba(250,204,21,0.16),_transparent_26%),linear-gradient(180deg,#fffaf8_0%,#f8f1ec_45%,#f6f1ed_100%)] py-14 sm:py-20 lg:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.15)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_86%)]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-(--ui-primary)/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-red-200/70 bg-white/85 px-4 py-2 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur">
                <span className="h-2.5 w-2.5 rounded-full bg-(--ui-primary) shadow-[0_0_0_6px_rgba(220,20,60,0.12)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-500">Insights & stories</span>
              </div>

              <h1 className="mt-8 text-5xl font-black tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-8xl">
                The IBT
                <span className="mt-3 block bg-gradient-to-r from-(--ui-primary) via-orange-500 to-amber-500 bg-clip-text italic text-transparent">
                  Journal
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Editorial stories, technical deep dives, and product updates from the I-BACUS-TECH team, designed to help readers skim the latest thinking and open the articles that matter.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-white/80 bg-white/85 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Posts</p>
                  <p className="mt-3 text-3xl font-black text-slate-950">{totalPosts}</p>
                  <p className="mt-1 text-sm text-slate-500">Published articles in the archive</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/80 bg-white/85 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Categories</p>
                  <p className="mt-3 text-3xl font-black text-slate-950">{totalCategories}</p>
                  <p className="mt-1 text-sm text-slate-500">Topics shaping the journal</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/80 bg-white/85 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Latest</p>
                  <p className="mt-3 text-lg font-black text-slate-950 line-clamp-1">{latestPost?.title ?? 'Fresh stories arriving soon'}</p>
                  <p className="mt-1 text-sm text-slate-500">{formatPublishedAt(latestPost?.publishedAt)}</p>
                </div>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:translate-y-8">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-(--ui-primary)">Featured edition</p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">{featuredPost?.title ?? 'A cleaner editorial feed'}</h2>
                </div>
                <div className="flex gap-1.5 pt-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-(--ui-primary)/60" />
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Reading guide</p>
                  <p className="mt-3 text-3xl font-black">Browse fast</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">Use the filters below to jump between categories, featured posts, and search results.</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-100 bg-gradient-to-br from-red-50 to-orange-50 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-(--ui-primary)">Journal focus</p>
                  <p className="mt-3 text-3xl font-black text-slate-950">Editorial</p>
                  <p className="mt-3 text-sm leading-6 text-slate-500">A layout made to feel more magazine-like, with stronger hierarchy and calmer spacing.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8 lg:pt-16">
        <BlogList initialBlogs={items} apiOrigin={apiOrigin} />
      </div>
    </div>
  )
}

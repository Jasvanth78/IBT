import { notFound } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'
import { apiClient } from '@/src/api/client'

export async function generateStaticParams() {
  try {
    const blogs = await apiClient.getPublicBlogs(1, 100);
    return blogs.items.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for blogs:', error);
    return [];
  }
}

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>
}

const resolveApiOrigin = (value: string | undefined) => {
  const fallback = 'http://localhost:5000'

  if (!value?.trim()) {
    return fallback
  }

  const withProtocol = /^https?:\/\//i.test(value.trim()) ? value.trim() : `http://${value.trim()}`

  try {
    return new URL(withProtocol).origin
  } catch {
    return fallback
  }
}

const resolveImageUrl = (imageUrl?: string | null) => {
  if (!imageUrl?.trim()) {
    return null
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl
  }

  return `${resolveApiOrigin(process.env.NEXT_PUBLIC_API_URL)}${imageUrl}`
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const blog = await apiClient.getPublicBlogBySlug(slug).catch(() => null)

  if (!blog) {
    notFound()
  }

  const imageSrc = resolveImageUrl(blog.imageUrl)

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition-colors hover:text-(--ui-primary)"
        >
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" /> Back to Blog
        </Link>
      </div>

      <article className="overflow-hidden rounded-3xl border border-(--ui-border) bg-white shadow-[0_14px_36px_rgba(35,24,21,0.06)]">
        <div className="relative aspect-[16/7] w-full bg-(--ui-surface-muted)">
          {imageSrc ? (
            <img src={imageSrc} alt={blog.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-(--ui-muted)">
              No blog cover image
            </div>
          )}
        </div>

        <div className="space-y-5 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--ui-primary)">Blog</p>
          <h1 className="text-4xl font-black text-slate-900 sm:text-5xl lg:text-6xl">{blog.title}</h1>
          <div
            className="prose prose-slate max-w-none text-slate-700 font-sans"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>
    </div>
  )
}

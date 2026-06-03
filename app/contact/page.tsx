import { Suspense } from 'react'
import { ContactFormClient } from '@/src/features/contact/ContactFormClient'
import { apiClient } from '@/src/api/client'
import type { PublicBranch } from '@/src/api/client'
import type { SiteSettingsRealtimePayload } from '@/src/types/socket'
import { fetchSiteSettings } from '@/src/api/settings'

type Props = {}

const stripHtmlTags = (value?: string | null) => {
  if (!value) return null
  return value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .trim() || null
}

export default async function ContactPage(_: Props) {
  // Server-side fetch of settings and branches
  const settings = (await fetchSiteSettings().catch(() => ({} as SiteSettingsRealtimePayload))) as SiteSettingsRealtimePayload
  const branches = await apiClient.getBranches(1, 10).then((r) => r.items).catch(() => [] as PublicBranch[])

  const heroTitle = stripHtmlTags(settings.contactHeroTitle)
  const heroDescription = stripHtmlTags(settings.contactHeroDescription)

  return (
    <div className="min-h-screen bg-white text-[#0f172a]">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 lg:px-16 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20 items-start">
          <div className="lg:col-span-5 xl:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-3xl bg-[#1e293b] text-white p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] opacity-95 z-0" />
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[340px] sm:min-h-[400px]">
                <div>
                  <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight leading-tight mb-4 sm:mb-6">
                    {heroTitle ? (
                      heroTitle.split('\n').map((line, index, array) => (
                        <span key={line + index}>
                          {line}
                          {index < array.length - 1 ? <br /> : null}
                        </span>
                      ))
                    ) : (
                      <>Let's build the<br />future together.</>
                    )}
                  </h1>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md mb-8 font-normal">
                    {heroDescription ?? 'Precision in every pixel. Reliability in every line of code. Connect with IBT TECH to elevate your digital infrastructure.'}
                  </p>
                </div>

                <div className="space-y-3 mt-auto w-full">
                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Email Us</p>
                      <p className="text-xs sm:text-sm font-semibold text-white truncate">hello@ibt-tech.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Call Us</p>
                      <p className="text-xs sm:text-sm font-semibold text-white truncate">+1 (555) 000-1234</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Visit Us</p>
                      <p className="text-xs sm:text-sm font-semibold text-white truncate sm:whitespace-normal">123 Innovation Drive, Tech City, CA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-6 order-1 lg:order-2 w-full">
            <Suspense fallback={<div className="py-12"><p className="text-center">Loading form…</p></div>}>
              {/* @ts-ignore server -> client prop passing allowed */}
              <ContactFormClient initialSettings={settings} initialBranches={branches} />
            </Suspense>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 border-t border-slate-100 pt-12 sm:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#f8fafc] rounded-3xl p-5 sm:p-10 lg:p-12">
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Visit Our Offices</h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                We have physical hubs around the globe where our innovators collaborate. Feel free to stop by and say hello.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 pt-2">
                {branches.length > 0 ? (
                  branches.map((branch: PublicBranch) => (
                    <div key={branch.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">{branch.name.includes('HQ') ? 'North America' : 'Global Hub'}</p>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">{branch.name}</h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">{branch.address || branch.location || 'Location details pending.'}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">North America</p>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">San Francisco HQ</h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">201 Spear St, CA 94105</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">Europe</p>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">Berlin Hub</h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">Müllerstraße 45, 13353 Berlin</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 relative h-[280px] sm:h-[360px] lg:h-[400px] w-full rounded-3xl overflow-hidden shadow-inner border border-slate-200">
              <div 
                className="absolute inset-0 bg-[#111] bg-cover bg-center grayscale filter invert"
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000')`,
                  mixBlendMode: 'luminosity'
                }} 
              />
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-lg border border-slate-100">
                <span className="text-[10px] sm:text-xs font-bold text-black tracking-tight">IBT TECH Headquarters</span>
              </div>
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="h-3 w-3 bg-white rounded-full animate-ping absolute" />
                <div className="h-3 w-3 bg-white border-2 border-black rounded-full relative z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { 
  FiArrowRight, 
  FiAward, 
  FiBookOpen, 
  FiBriefcase, 
  FiSend, 
  FiTarget, 
  FiUsers, 
  FiZap 
} from 'react-icons/fi'

export const metadata = {
  title: 'Internship | I-BACUS-TECH',
  description: 'Industry-focused internship program powered by project-based learning and mentorship.',
}

type PublicTestimonial = {
  id: string
  name: string
  content: string
  role?: string | null
  company?: string | null
  avatarUrl?: string | null
}

type PublicApiResponse<T> = {
  data?: T
}

type SiteSettingsPayload = {
  internshipHeroTitle?: string | null
  internshipHeroSubtitle?: string | null
  internshipHeroDescription?: string | null
  internshipHeroImageUrl?: string | null
  internshipIntroTitle?: string | null
  internshipIntroDescription?: string | null
  internshipApproachTitle?: string | null
  internshipApproachDescription?: string | null
  internshipCardOneValue?: string | null
  internshipCardOneTitle?: string | null
  internshipCardOneDescription?: string | null
  internshipCardTwoValue?: string | null
  internshipCardTwoTitle?: string | null
  internshipCardTwoDescription?: string | null
  internshipCardThreeValue?: string | null
  internshipCardThreeTitle?: string | null
  internshipCardThreeDescription?: string | null
  internshipGalleryTitle?: string | null
  internshipGalleryImageUrls?: string | null
  internshipTestimonialsTitle?: string | null
  internshipClosingTitle?: string | null
  internshipClosingContent?: string | null
  internshipApplyEmail?: string | null
}

type InternCard = {
  value: string
  title: string
  description: string
}

const defaults = {
  heroTitle: 'ENROLLMENT OPEN',
  heroSubtitle: 'Master Real-World Engineering',
  heroDescription:
    'Join a high-performance environment where you build production-grade security solutions alongside industry experts.',
  heroImageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  heroStat: '99%',
  heroStatLabel: 'Post-internship placement rate in 2023.',
  introTitle: 'The 70/20/10 Model',
  introDescription:
    'Our methodology is built on a structured framework to maximize retention, execution, and growth.',
  approachTitle: 'The Internship Journey',
  approachDescription:
    'A structured pathway designed to transform technical potential into professional excellence.',
  galleryTitle: 'Internship Gallery',
  testimonialsTitle: 'From Our Alumni',
  closingTitle: 'Ready to Start Your Journey?',
  closingContent: 'The next cohort starts in 45 days. Take the first step towards becoming a world-class engineer.',
  applyEmail: 'hr@ibacustech.com',
}

const defaultCards: InternCard[] = [
  {
    value: '70%',
    title: 'Experiential Learning',
    description:
      'Hands-on project work that mirrors real industry challenges. You won\'t be doing \'busy work\'; you\'ll be building security core modules.',
  },
  {
    value: '20%',
    title: 'Social Learning',
    description:
      'Continuous peer reviews and collaborative sprints. Learn to communicate architectural concepts and defend your architectural choices.',
  },
  {
    value: '10%',
    title: 'Guided Mentorship',
    description:
      'One-on-one sessions with team leads. Get direct feedback on your growth trajectory and professional readiness.',
  },
]

const journeySteps = [
  {
    step: '01',
    phase: 'Step 1: Learn',
    description:
      'Master our core tech stack. From advanced networking protocols to specialized security frameworks, we build your foundation.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Step 1: Learn Image',
  },
  {
    step: '02',
    phase: 'Step 2: Build',
    description:
      'Ship code for internal security tools and client-facing products. Experience the full SDLC in a high-stakes environment.',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Step 2: Build Image',
  },
  {
    step: '03',
    phase: 'Step 3: Grow',
    description:
      'Final phase focusing on career coaching, portfolio presentation, and expanding your professional network within the industry.',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b90473bd58?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Step 3: Grow Image',
  },
]

const defaultGalleryImages = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
]

function normalizeApiBaseUrl(raw: string | undefined) {
  const fallback = 'http://localhost:5000'
  if (!raw?.trim()) return fallback
  const trimmed = raw.trim()
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`
  try {
    return new URL(withProtocol).origin
  } catch {
    return fallback
  }
}

function parseImageList(value: string | null | undefined) {
  if (!value) return [] as string[]
  return value.split('\n').map((line) => line.trim()).filter((line) => line.length > 0)
}

function renderRichTextContent(content: string) {
  const trimmed = content.trim().replace(/<p><\/p>/g, '')

  if (!trimmed) {
    return null
  }

  if (trimmed.includes('<')) {
    return <div className="mt-6 text-base text-slate-600 leading-relaxed max-w-xl" dangerouslySetInnerHTML={{ __html: trimmed }} />
  }

  return <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">{trimmed}</p>
}

function renderSectionRichText(content: string, className: string) {
  const trimmed = content.trim().replace(/<p><\/p>/g, '')

  if (!trimmed) {
    return null
  }

  if (trimmed.includes('<')) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: trimmed }} />
  }

  return <p className={className}>{trimmed}</p>
}

async function getInternshipData() {
  const baseUrl = normalizeApiBaseUrl(process.env.NEXT_PUBLIC_API_URL)

  let settings: SiteSettingsPayload = {}
  let testimonials: PublicTestimonial[] = []

  try {
    const [settingsRes, testimonialsRes] = await Promise.all([
      fetch(`${baseUrl}/api/public/v1/settings/current`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/public/v1/testimonials?page=1&limit=6`, { cache: 'no-store' }),
    ])

    if (settingsRes.ok) {
      const body = (await settingsRes.json()) as PublicApiResponse<SiteSettingsPayload>
      settings = body.data ?? {}
    }

    if (testimonialsRes.ok) {
      const body = (await testimonialsRes.json()) as PublicApiResponse<PublicTestimonial[]>
      testimonials = body.data ?? []
    }
  } catch {
    // Backend unavailable — use defaults
  }

  const cards: InternCard[] = [
    {
      value: settings.internshipCardOneValue?.trim() || defaultCards[0].value,
      title: settings.internshipCardOneTitle?.trim() || defaultCards[0].title,
      description: settings.internshipCardOneDescription?.trim() || defaultCards[0].description,
    },
    {
      value: settings.internshipCardTwoValue?.trim() || defaultCards[1].value,
      title: settings.internshipCardTwoTitle?.trim() || defaultCards[1].title,
      description: settings.internshipCardTwoDescription?.trim() || defaultCards[1].description,
    },
    {
      value: settings.internshipCardThreeValue?.trim() || defaultCards[2].value,
      title: settings.internshipCardThreeTitle?.trim() || defaultCards[2].title,
      description: settings.internshipCardThreeDescription?.trim() || defaultCards[2].description,
    },
  ]

  return {
    heroTitle: settings.internshipHeroTitle?.trim() || defaults.heroTitle,
    heroSubtitle: settings.internshipHeroSubtitle?.trim() || defaults.heroSubtitle,
    heroDescription: settings.internshipHeroDescription?.trim() || defaults.heroDescription,
    heroImageUrl: settings.internshipHeroImageUrl?.trim() || defaults.heroImageUrl,
    introTitle: settings.internshipIntroTitle?.trim() || defaults.introTitle,
    introDescription: settings.internshipIntroDescription?.trim() || defaults.introDescription,
    approachTitle: settings.internshipApproachTitle?.trim() || defaults.approachTitle,
    approachDescription: settings.internshipApproachDescription?.trim() || defaults.approachDescription,
    galleryTitle: settings.internshipGalleryTitle?.trim() || defaults.galleryTitle,
    galleryImages: parseImageList(settings.internshipGalleryImageUrls),
    testimonialsTitle: settings.internshipTestimonialsTitle?.trim() || defaults.testimonialsTitle,
    closingTitle: settings.internshipClosingTitle?.trim() || defaults.closingTitle,
    closingContent: settings.internshipClosingContent?.trim() || defaults.closingContent,
    applyEmail: settings.internshipApplyEmail?.trim() || defaults.applyEmail,
    cards,
    testimonials,
  }
}

export default async function InternshipPage() {
  const data = await getInternshipData()
  const galleryImages = data.galleryImages.length > 0 ? data.galleryImages : defaultGalleryImages

  return (
    <div className="bg-white min-h-screen text-slate-900 overflow-x-hidden">
      
      {/* ── HERO SECTION ── */}
      <section className="relative bg-[#fafafe] pt-16 pb-32 lg:pt-24 lg:pb-40 overflow-hidden">
        {/* Background Geometric Elements */}
        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full border border-blue-50/50 -z-10 animate-pulse" />
        <div className="absolute bottom-40 left-[5%] opacity-20 -z-10">
           <svg width="200" height="200" viewBox="0 0 100 100" fill="none" className="text-slate-200">
             <circle cx="2" cy="2" r="1.5" fill="currentColor" />
             <circle cx="22" cy="2" r="1.5" fill="currentColor" />
             <circle cx="42" cy="2" r="1.5" fill="currentColor" />
             <circle cx="2" cy="22" r="1.5" fill="currentColor" />
             <circle cx="22" cy="22" r="1.5" fill="currentColor" />
             <circle cx="42" cy="22" r="1.5" fill="currentColor" />
             <circle cx="2" cy="42" r="1.5" fill="currentColor" />
             <circle cx="22" cy="42" r="1.5" fill="currentColor" />
             <circle cx="42" cy="42" r="1.5" fill="currentColor" />
           </svg>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="mb-8 flex items-center gap-2 rounded-full border border-slate-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-(--ui-primary) shadow-sm">
                <FiAward className="text-sm" />
                {data.heroTitle}
              </div>
              
              <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-[84px]">
                {data.heroSubtitle.split(' ').map((word, i) => (
                  <span key={i} className={word.toLowerCase() === 'real' ? 'text-(--ui-primary)' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h1>

              {/* Decorative Line */}
              <div className="mt-8 h-1 w-20 rounded-full bg-gradient-to-r from-(--ui-primary) to-transparent" />

              <div className="mt-8 max-w-xl">
                 {renderRichTextContent(data.heroDescription)}
              </div>

              <div className="mt-12 flex flex-wrap gap-5">
                <a
                  href={`mailto:${data.applyEmail}`}
                  className="group flex h-14 items-center gap-3 rounded-2xl bg-(--ui-primary) px-10 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-(--ui-primary-soft)/30 transition hover:brightness-110"
                >
                  <FiSend className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  Apply Now
                </a>
                <a
                  href="#journey"
                  className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-10 text-sm font-black uppercase tracking-widest text-slate-900 shadow-sm transition hover:bg-slate-50 hover:shadow-md"
                >
                  <FiBookOpen className="text-lg" />
                  Curriculum
                </a>
              </div>
            </div>

            {/* Right Column: Visual Graphic */}
            <div className="lg:col-span-6 relative mt-16 lg:mt-0">
              {/* Complex Shaped Background Container */}
              <div className="relative mx-auto max-w-[540px]">
                <div 
                  className="relative aspect-[16/11] overflow-hidden shadow-2xl"
                  style={{
                    clipPath: 'polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)',
                    borderRadius: '40px'
                  }}
                >
                  <img
                    src={data.heroImageUrl}
                    alt="Engineering"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-950/10 mix-blend-multiply" />
                </div>

                {/* Decorative Shape behind the card */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-900 rounded-3xl -z-10 hidden lg:block" />

                {/* Floating Stat Card with Circular Progress */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 lg:left-[-40px] lg:translate-x-0 w-[420px] max-w-[90vw] rounded-3xl border border-slate-100 bg-white/95 p-6 shadow-2xl backdrop-blur sm:p-8">
                  <div className="flex items-center gap-6">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-(--ui-primary) text-white shadow-lg shadow-(--ui-primary-soft)/30">
                       <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                         <path d="M12 20V10M18 20V4M6 20v-4" strokeLinecap="round" strokeLinejoin="round" />
                       </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-black text-slate-950 tracking-tight">
                          {defaults.heroStat}
                        </span>
                        {/* Circular Progress Indicator */}
                        <div className="relative h-10 w-10">
                          <svg className="h-full w-full rotate-[-90deg]">
                            <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                            <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="100.5" strokeDashoffset="10" className="text-(--ui-primary)" />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                        Post-Internship
                      </p>
                      <p className="text-sm text-slate-400">
                        placement rate in 2023.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Feature Bar - Removed absolute positioning to fix overlap into component below */}
        <div className="mt-20 px-4 relative z-30">
           <div className="mx-auto max-w-7xl">
              <div className="rounded-[32px] border border-slate-100 bg-white py-8 px-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] sm:px-12">
                 <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                    <div className="flex items-center gap-5">
                       <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-50 text-(--ui-primary)">
                          <FiTarget className="text-2xl" />
                       </div>
                       <div>
                          <h4 className="text-base font-black text-slate-950 leading-tight">Real World Projects</h4>
                          <p className="mt-1 text-xs text-slate-500 leading-relaxed uppercase tracking-tight font-bold">Industry Relevant</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-5">
                       <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                          <FiUsers className="text-2xl" />
                       </div>
                       <div>
                          <h4 className="text-base font-black text-slate-950 leading-tight">Learn from Experts</h4>
                          <p className="mt-1 text-xs text-slate-500 leading-relaxed uppercase tracking-tight font-bold">Mentorship Led</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-5">
                       <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                          <FiZap className="text-2xl" />
                       </div>
                       <div>
                          <h4 className="text-base font-black text-slate-950 leading-tight">Skill Development</h4>
                          <p className="mt-1 text-xs text-slate-500 leading-relaxed uppercase tracking-tight font-bold">Career Growth</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-5">
                       <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                          <FiBriefcase className="text-2xl" />
                       </div>
                       <div>
                          <h4 className="text-base font-black text-slate-950 leading-tight">Career Opportunities</h4>
                          <p className="mt-1 text-xs text-slate-500 leading-relaxed uppercase tracking-tight font-bold">Direct Pipeline</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* ── METHODOLOGY SECTION (70/20/10 Model) ── */}
      <section className="bg-white py-20 text-slate-900 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              OUR METHODOLOGY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mb-12">
            The 70/20/10 Model
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {data.cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-[32px] p-8 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
              >
                <div>
                  <div className="text-5xl font-black text-(--ui-primary) mb-6 tracking-tight">
                    {card.value}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {card.title}
                  </h3>
                  {renderSectionRichText(card.description, "text-sm leading-relaxed text-slate-500")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRESSION: THE INTERNSHIP JOURNEY ── */}
      <section id="journey" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="mb-20 lg:mb-24">
            <div className="flex flex-col items-start max-w-3xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1 w-10 rounded-full bg-(--ui-primary)" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-(--ui-primary)">
                  PROGRESSION
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.1]">
                {data.approachTitle}
              </h2>
            </div>
          </div>

          {/* Timeline Layout */}
          <div className="relative">
            {/* Vertical timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-slate-100 hidden lg:block" />

            <div className="space-y-24 lg:space-y-40">
              {journeySteps.map((step, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <div
                    key={idx}
                    className="relative grid lg:grid-cols-2 gap-12 lg:gap-24 items-center"
                  >
                    
                    {/* Circle badge on timeline for desktop */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full border-4 border-white bg-slate-950 text-white flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] z-10 hidden lg:flex">
                      <span className="text-sm font-black tracking-tighter">{step.step}</span>
                    </div>

                    {/* Step Details Column */}
                    <div className={`flex flex-col justify-center ${isEven ? 'lg:pr-16 text-left' : 'lg:order-last lg:pl-16 text-left'}`}>
                      {/* Mobile & Section Meta */}
                      <div className="mb-6 flex items-center gap-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white font-black text-xs lg:hidden">
                          {step.step}
                        </span>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-(--ui-primary)">
                              PHASE {step.step}
                           </span>
                           <h3 className="text-2xl font-black text-slate-950 mt-1">
                              {step.phase.split(':')[1]?.trim() || step.phase}
                           </h3>
                        </div>
                      </div>
                      
                      <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        {step.description}
                      </p>

                      <div className="mt-8 flex items-center gap-3 text-(--ui-primary) font-black text-[11px] uppercase tracking-widest">
                         <div className="h-px w-8 bg-(--ui-primary)/30" />
                         Focused Milestone
                      </div>
                    </div>

                    {/* Step Image Column */}
                    <div className={`${isEven ? 'lg:pl-16' : 'lg:order-first lg:pr-16'}`}>
                      <div className="group relative overflow-hidden rounded-[40px] shadow-2xl transition-all duration-500 hover:-translate-y-2">
                        <div className="absolute inset-0 z-10 bg-gradient-to-tr from-slate-900/20 to-transparent" />
                        <div className="aspect-[1.618] w-full overflow-hidden bg-slate-100 border border-slate-100">
                          <img
                            src={step.imageUrl}
                            alt={step.imageAlt}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ── LIFE AT HEADUS (Internship Gallery) ── */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              LIFE AT HEADUS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mb-12">
            {data.galleryTitle}
          </h2>

          {/* Asymmetric Gallery Layout matching Screenshot */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Top-Left: Large Square/Rectangle Card */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[1.5] md:aspect-[4/3] group shadow-md border border-slate-100">
              <img
                src={galleryImages[0]}
                alt="Collaboration Sessions"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-sm font-bold text-white tracking-wide">
                  Collaboration Sessions
                </span>
              </div>
            </div>

            {/* Top-Right: Narrow Vertical Card */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[1.5] md:aspect-[4/3] group shadow-md border border-slate-100">
              <img
                src={galleryImages[1]}
                alt="Projects Focus"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-sm font-bold text-white tracking-wide">
                  Projects Focus
                </span>
              </div>
            </div>

            {/* Bottom Full-Width Landscape Card */}
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden aspect-[2.1] sm:aspect-[3] md:aspect-[2.3] lg:aspect-[2.8] group shadow-md border border-slate-100">
              <img
                src={galleryImages[2]}
                alt="Team Culture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-sm font-bold text-white tracking-wide">
                  Team Culture
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── ALUMNI TESTIMONIALS SECTION ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              VOICES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mb-12">
            {data.testimonialsTitle}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="absolute top-6 left-6 text-[120px] font-serif font-black text-(--ui-primary-soft)/10 leading-none select-none pointer-events-none">
                99
              </div>
              <div className="relative z-10">
                <p className="text-base sm:text-lg italic text-slate-700 leading-relaxed font-medium">
                  &ldquo;IBT delivered a highly responsive and user-friendly environment for learning. Their attention to detail and commitment to engineering quality made the entire transition into professional work smooth and successful. I felt prepared for real-world deployments on day one.&rdquo;
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-(--ui-primary-soft)/10 flex items-center justify-center text-(--ui-primary) font-extrabold text-lg shadow-inner">
                  D
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-950 leading-tight">
                    Deva
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                    Full Stack Engineering Lead
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="absolute top-6 left-6 text-[120px] font-serif font-black text-(--ui-primary-soft)/10 leading-none select-none pointer-events-none">
                99
              </div>
              <div className="relative z-10">
                <p className="text-base sm:text-lg italic text-slate-700 leading-relaxed font-medium">
                  &ldquo;Working with the IBT team was a great experience. Their professionalism, communication, and quality of technical mentorship exceeded my expectations. The structured bridge between academic learning and industry standards is exactly what I needed.&rdquo;
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-(--ui-primary-soft)/10 flex items-center justify-center text-(--ui-primary) font-extrabold text-lg shadow-inner">
                  S
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-950 leading-tight">
                    Surya
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                    Security Systems Architect
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── CALL TO ACTION SECTION ── */}
      <section className="bg-slate-950 py-20 text-white relative overflow-hidden">
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-60" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            {data.closingTitle}
          </h2>
          {renderSectionRichText(data.closingContent, 'mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed')}
          
          <div className="flex flex-wrap justify-center items-center gap-6">
            <a
              href={`mailto:${data.applyEmail}`}
              className="inline-flex items-center justify-center rounded bg-white px-8 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-slate-100 shadow-lg"
            >
              Send Resume
            </a>
            <a
              href={`mailto:${data.applyEmail}`}
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white hover:text-slate-200 transition-all border-b border-transparent hover:border-white"
            >
              Talk with Team
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

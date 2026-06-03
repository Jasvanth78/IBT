'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import {
  FiArrowRight,
  FiTarget,
  FiUsers,
  FiGlobe,
  FiAward,
  FiChevronRight,
  FiMail,
  FiLinkedin,
  FiCheckCircle,
  FiSpeaker,
  FiActivity,
  FiPieChart,
  FiEdit3,
} from 'react-icons/fi'

import {
  apiClient,
  type PublicMember,
  type PublicBranch,
  type PublicStat,
  type PublicContact,
} from '@/src/api/client'
import { useSocketSettings } from '@/src/providers/SocketSettingsProvider'
import { resolveImageUrl } from '@/src/utils/image'
import { Loader } from '@/src/shared/ui/Loader'

export default function AboutPage() {
  const { settings } = useSocketSettings()
  const s = settings as any;
  const [members, setMembers] = useState<PublicMember[]>([])
  const [branches, setBranches] = useState<PublicBranch[]>([])
  const [stats, setStats] = useState<PublicStat[]>([])
  const [contacts, setContacts] = useState<PublicContact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Who Are We dynamic data
  const whoTitle = s.aboutWhoTitle || 'Who Are We?'
  const whoDescription = s.aboutWhoDescription || 'We are a digital and branding company that believes in the power of creative strategy and along with great design.'
  const whoSecondaryDescription = s.aboutWhoSecondaryDescription || 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.'
  const whoFeatures = (s.aboutWhoFeatures && s.aboutWhoFeatures.length > 0) ? s.aboutWhoFeatures : [
    'Aenean eu leo quam ornare curabitur blandit tempus.',
    'Etiam porta sem malesuada magna mollis euismod.',
    'Nullam quis risus eget urna mollis ornare donec elit.',
    'Fermentum massa vivamus faucibus amet euismod.'
  ]
  const whoImages = (s.aboutWhoImages && s.aboutWhoImages.length > 0) ? s.aboutWhoImages : [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800'
  ]

  // How It Works dynamic data
  const processBadge = s.aboutProcessBadge || 'HOW IT WORKS?'
  const processTitle = s.aboutProcessTitle || 'Everything you need on creating a business process.'
  const processFeatures = (s.aboutProcessFeatures && s.aboutProcessFeatures.length > 0) ? s.aboutProcessFeatures : [
    { title: 'Collect Ideas', desc: 'Nulla vitae elit libero pharetra augue dapibus.', icon: 'FiLightbulb' },
    { title: 'Data Analysis', desc: 'Vivamus sagittis lacus augue laoreet vel.', icon: 'FiPieChart' },
    { title: 'Magic Touch', desc: 'Cras mattis consectetur purus sit amet.', icon: 'FiPenTool' }
  ]
  const processImage = s.aboutProcessImage || 'https://sandbox.elemisthemes.com/assets/img/illustrations/i2.png'

  // Contact dynamic data
  const contactBadge = s.aboutContactBadge || 'GET IN TOUCH'
  const contactTitle = s.aboutContactTitle || "Got any questions? Don't hesitate to get in touch."
  const contactImage = s.aboutContactImage || 'https://sandbox.elemisthemes.com/assets/img/illustrations/i3.png'

  // Mission & Vision dynamic data
  const missionTitle = s.aboutMissionTitle || 'Our Mission'
  const missionDesc = s.aboutMissionDesc || 'To provide cutting-edge technology solutions that empower organizations to achieve their full potential in the digital age through innovation and precision.'
  const visionTitle = s.aboutVisionTitle || 'Our Vision'
  const visionDesc = s.aboutVisionDesc || 'To be a global leader in digital transformation recognized for our engineering excellence and sustainable technological impact.'
  const missionCards = (s.aboutMissionCards && s.aboutMissionCards.length === 4) ? s.aboutMissionCards : [
    { value: '50+', label: 'Active Projects' },
    { value: 'Quality', label: 'ISO Certified' },
    { value: '24/7', label: 'Global Support' },
    { value: '100%', label: 'Data Security' },
  ]

  /* =========================================================
     FETCH DATA
  ========================================================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null)
        const [teamData, branchData, statsData, contactData] =
          await Promise.all([
            apiClient.getTeam(1, 100),
            apiClient.getBranches(1, 10),
            apiClient.getStats(1, 4),
            apiClient.getContacts(1, 10),
          ])

        setMembers(teamData.items)
        setBranches(branchData.items)
        setStats(statsData.items)
        setContacts(contactData.items)
      } catch (err) {
        console.warn('Error fetching about data:', err)
        setError(err instanceof Error ? err.message : 'Unable to load data at this time.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading && members.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white gap-6">
        <Loader size="lg" label="Synchronizing Experience..." />
        {error && (
            <div className="flex flex-col items-center gap-4">
               <p className="text-sm text-slate-500 font-medium">{error}</p>
            </div>
        )}
      </div>
    );
  }

  // Error but have no data
  if (error && members.length === 0) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white gap-8 p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                <FiActivity size={40} className="animate-pulse" />
            </div>
            <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-900">Synchronizing...</h2>
                <p className="text-slate-500 max-w-sm mx-auto">
                    {error.includes('taking too long') ? error : "We're having trouble connecting to the soul of our platform. We're trying again automatically."}
                </p>
            </div>
            <div className="flex flex-col items-center gap-4">
                <Loader size="md" label="Auto-retrying..." />
                <button 
                   onClick={() => window.location.reload()}
                   className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-(--ui-primary) transition-colors"
                >
                    Or refresh manually
                </button>
            </div>
        </div>
    )
  }

  return (
    <div className="min-h-screen overflow-hidden bg-white">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative overflow-hidden bg-white pb-20 pt-16 sm:pb-24 lg:pb-32 lg:pt-20">

        {/* BACKGROUND */}
        <div className="absolute right-0 top-0 -z-10 hidden h-full w-1/3 rounded-l-[100px] bg-slate-50 lg:block" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-(--ui-primary) mx-auto lg:mx-0">
                About I-BACUS-TECH
              </span>

              <h1 className="mt-7 text-[40px] font-black leading-[1.1] tracking-[-2px] text-slate-950 sm:text-[72px] sm:tracking-[-3px] lg:text-[90px]">
                We Build
                <br className="hidden sm:block" />
                <span className="text-(--ui-primary)">
                  Digital Excellence
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-[15px] leading-[32px] text-slate-600 sm:text-[17px] mx-auto lg:mx-0">
                I-BACUS-TECH (IBT) is a premier
                technology solutions provider dedicated
                to transforming businesses through
                innovation, precision engineering, and
                strategic digital transformation.
              </p>

              {/* BUTTONS */}
              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">

                <Link
                  href="/contact"
                  className="flex h-[54px] items-center rounded-2xl bg-slate-950 px-8 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  Work With Us
                </Link>

                <Link
                  href="/services"
                  className="flex h-[54px] items-center rounded-2xl border border-slate-200 px-8 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
                >
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
              className="relative mt-12 lg:mt-0"
            >
              <div className="relative mx-auto aspect-[4/3] max-w-lg overflow-hidden rounded-[35px] shadow-2xl sm:aspect-square">
                <img
                  src="/images/about/hero.png"
                  alt="office"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* FLOATING CARD */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-[24px] border border-slate-100 bg-white p-4 shadow-2xl sm:p-6 lg:left-0 lg:translate-x-[-20px]">
                <div className="text-2xl font-black text-(--ui-primary) sm:text-3xl">
                  10+
                </div>

                <div className="mt-1 text-[8px] font-black uppercase tracking-[0.3em] text-slate-500 sm:mt-2 sm:text-[10px]">
                  Years of Innovation
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          2. WHO ARE WE SECTION (Dynamic)
      ===================================================== */}

      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="min-w-0"
            >
              <div className="mb-8">
                <FiSpeaker className="text-4xl text-slate-800 mb-6" />
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-8">
                  {whoTitle}
                </h2>
                <div 
                  className="text-xl text-slate-600 font-medium leading-[1.6] mb-8 prose prose-slate max-w-none whitespace-normal break-words [&_*]:whitespace-normal"
                  dangerouslySetInnerHTML={{ __html: whoDescription }}
                />
                <div 
                  className="text-base text-slate-400 font-medium leading-[1.8] mb-10 prose prose-sm prose-slate max-w-none whitespace-normal break-words [&_*]:whitespace-normal"
                  dangerouslySetInnerHTML={{ __html: whoSecondaryDescription }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {whoFeatures.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                      <FiCheckCircle size={14} />
                    </div>
                    <span className="text-[14px] font-medium text-slate-500 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Overlapping Images */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Decorative dots background */}
              <div className="absolute -top-10 -right-10 w-40 h-40 opacity-10 pointer-events-none -z-10">
                 <div className="grid grid-cols-5 gap-3">
                    {[...Array(25)].map((_, i) => (
                      <div key={i} className="w-1 h-1 rounded-full bg-red-600" />
                    ))}
                 </div>
              </div>

              <div className="relative z-10 grid grid-cols-12 gap-0">
                 {/* Large back image */}
                 <div className="col-span-10 col-start-2">
                    <div className="rounded-[2rem] overflow-hidden shadow-2xl">
                       <img 
                          src={resolveImageUrl(whoImages[1])} 
                          alt="Team brainstorming" 
                          className="w-full aspect-[4/3] object-cover"
                       />
                    </div>
                 </div>

                 {/* Smaller overlapping front image */}
                 <div className="absolute -left-10 bottom-[10%] w-[55%] z-20">
                    <div className="rounded-[2.5rem] p-3 bg-white shadow-2xl">
                       <div className="rounded-[2rem] overflow-hidden">
                          <img 
                             src={resolveImageUrl(whoImages[0])} 
                             alt="Team collaborating" 
                             className="w-full aspect-square object-cover"
                          />
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
          3. HOW IT WORKS SECTION (Dynamic)
      ===================================================== */}

      <section className="py-24 bg-slate-50/50 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Illustration Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative z-10">
                <img 
                  src={resolveImageUrl(processImage)} 
                  alt="Process Illustration" 
                  className="w-full h-auto max-w-[600px] mx-auto drop-shadow-2xl"
                />
              </div>
              
              {/* Decorative shapes */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 bg-[radial-gradient(circle,rgba(59,130,246,0.05)_0%,transparent_70%)] rounded-full animate-pulse" />
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-blue-600" />
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                    {processBadge}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-[42px] font-black text-slate-900 tracking-tight leading-[1.2] mb-12">
                  {processTitle}
                </h2>

                <div className="space-y-10">
                  {processFeatures.map((feat: any, i: number) => {
                    const IconComp = i === 0 ? FiActivity : i === 1 ? FiPieChart : FiEdit3;
                    return (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-6 group"
                      >
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white shadow-xl shadow-slate-100 flex items-center justify-center text-2xl text-slate-800 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-blue-200">
                           <IconComp />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-slate-900 mb-2">{feat.title}</h4>
                          <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                            {feat.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION & VISION
      ===================================================== */}

      <section className="overflow-hidden bg-[#0f172a] py-24 text-white">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-20 lg:grid-cols-2">

            {/* LEFT */}
            <div className="space-y-16">

              {/* MISSION */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ef4444] shadow-lg shadow-red-500/20">
                  <FiTarget className="text-3xl text-white" />
                </div>

                <h2 className="text-4xl font-black text-white mb-6">
                  {missionTitle}
                </h2>

                <p className="text-lg leading-relaxed text-slate-400 max-w-lg">
                  {missionDesc}
                </p>
              </motion.div>

              {/* VISION */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ef4444] shadow-lg shadow-red-500/20">
                  <FiGlobe className="text-3xl text-white" />
                </div>

                <h2 className="text-4xl font-black text-white mb-6">
                  {visionTitle}
                </h2>

                <p className="text-lg leading-relaxed text-slate-400 max-w-lg">
                  {visionDesc}
                </p>
              </motion.div>
            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-6 lg:pt-12">
                <div className="aspect-square rounded-[2.5rem] bg-slate-900 border border-slate-800 p-8 flex flex-col items-center justify-center text-center shadow-2xl">
                    <div className="text-6xl font-black text-[#ef4444]">
                      {missionCards[0]?.value}
                    </div>
                    <div className="mt-4 text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">
                      {missionCards[0]?.label}
                    </div>
                </div>

                <div className="relative aspect-video overflow-hidden rounded-[2.5rem] bg-[#ef4444] p-8 shadow-xl shadow-red-500/20">
                  <FiAward className="absolute right-6 top-6 text-7xl text-white/10" />
                  <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                    <div className="text-4xl font-black text-white">
                      {missionCards[1]?.value}
                    </div>
                    <div className="mt-3 text-[11px] font-black uppercase tracking-[0.3em] text-white/80">
                      {missionCards[1]?.label}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="aspect-video rounded-[2.5rem] bg-white text-slate-900 p-8 flex flex-col items-center justify-center text-center shadow-2xl">
                    <div className="text-5xl font-black text-[#ef4444]">
                      {missionCards[2]?.value}
                    </div>
                    <div className="mt-3 text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">
                      {missionCards[2]?.label}
                    </div>
                </div>

                <div className="aspect-square rounded-[2.5rem] bg-slate-900 border border-slate-800 p-8 flex flex-col items-center justify-center text-center shadow-2xl">
                    <div className="text-6xl font-black text-white">
                      {missionCards[3]?.value}
                    </div>
                    <div className="mt-4 text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">
                      {missionCards[3]?.label}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TEAM SECTION
      ===================================================== */}

      <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* HEADER */}
          <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center justify-center text-center sm:mb-16 lg:mb-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-(--ui-primary)">
              <FiUsers className="text-sm" />
              Our Experts
            </span>

            <h2 className="mx-auto mt-6 text-center text-[32px] font-black tracking-[-1px] text-slate-950 sm:text-[48px] sm:tracking-[-2px] lg:text-[56px] leading-tight">
              Save your time and money by{' '}
              <br className="hidden sm:block" />
              choosing our professional team.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Our team is composed of passionate
              engineers, designers, and strategists
              dedicated to delivering exceptional
              results.
            </p>
          </div>

          {/* LOADING */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-sm text-slate-500">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse flex flex-col items-center text-center p-8"
                >
                  <div className="h-32 w-32 rounded-full bg-slate-100" />
                  <div className="mt-6 h-5 w-28 rounded-full bg-slate-100" />
                  <div className="mt-3 h-3 w-24 rounded-full bg-slate-100" />
                  <div className="mt-5 h-3 w-40 rounded-full bg-slate-100" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-20">

              {members.length > 0 ? (
                (() => {
                  const groupedByBranch = new Map<
                    string,
                    PublicMember[]
                  >()

                  const branchMetaById = new Map(
                    branches.map((branch) => [
                      branch.id,
                      {
                        name: branch.name,
                        order: branch.order ?? Number.MAX_SAFE_INTEGER,
                      },
                    ])
                  )

                  members.forEach((member) => {
                    if (
                      member.branches &&
                      member.branches.length > 0
                    ) {
                      const primaryBranch = member.branches[0].branch
                      const branchId = primaryBranch.id

                      if (
                        !groupedByBranch.has(branchId)
                      ) {
                        groupedByBranch.set(
                          branchId,
                          []
                        )
                      }

                      groupedByBranch
                        .get(branchId)!
                        .push(member)
                    }
                  })

                  const sortedBranchIds = Array.from(
                    groupedByBranch.keys()
                  ).sort((a, b) => {
                    const aMeta = branchMetaById.get(a)
                    const bMeta = branchMetaById.get(b)

                    const orderDiff =
                      (aMeta?.order ?? Number.MAX_SAFE_INTEGER) -
                      (bMeta?.order ?? Number.MAX_SAFE_INTEGER)

                    if (orderDiff !== 0) {
                      return orderDiff
                    }

                    return (aMeta?.name ?? '').localeCompare(bMeta?.name ?? '')
                  })

                  return sortedBranchIds.map(
                    (branchId) => {
                      const branchMeta = branchMetaById.get(branchId)
                      const branchName =
                        branchMeta?.name || 'Branch'

                      const branchMembers =
                        groupedByBranch.get(
                          branchId
                        ) || []

                      const sortedMembers = [...branchMembers].sort(
                        (a, b) => {
                          const aOrder =
                            a.branches?.find((item) => item.branch.id === branchId)?.order ??
                            Number.MAX_SAFE_INTEGER
                          const bOrder =
                            b.branches?.find((item) => item.branch.id === branchId)?.order ??
                            Number.MAX_SAFE_INTEGER

                          return aOrder - bOrder
                        }
                      )

                      return (
                        <div key={branchName}>

                          {/* BRANCH LABEL */}
                          <div className="mb-10 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-(--ui-primary)">
                              <FiGlobe className="text-xl" />
                            </div>

                            <div>
                              <h3 className="text-2xl font-black text-slate-950 sm:text-3xl">
                                {branchName} Office
                              </h3>
                              <div className="mt-2 h-[3px] w-16 rounded-full bg-(--ui-primary)" />
                            </div>
                          </div>

                          {/* TEAM CARDS GRID */}
                          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

                            {sortedMembers.map(
                              (member, idx) => (
                                <motion.div
                                  key={member.id}
                                  initial={{
                                    opacity: 0,
                                    y: 20,
                                  }}
                                  whileInView={{
                                    opacity: 1,
                                    y: 0,
                                  }}
                                  transition={{
                                    delay:
                                      idx * 0.1,
                                  }}
                                  viewport={{
                                    once: true,
                                  }}
                                  className="group"
                                >

                                  {/* CARD */}
                                  <div className="relative flex flex-col items-center rounded-[28px] border border-slate-100 bg-white px-6 pb-8 pt-10 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] hover:border-slate-200">

                                    {/* Decorative corner accent */}
                                    <div className="absolute -top-px -left-px h-16 w-16 rounded-tl-[28px] border-l-[3px] border-t-[3px] border-(--ui-primary) opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                    {/* CIRCULAR AVATAR */}
                                    <div className="relative mb-6">
                                      <div className="h-[120px] w-[120px] overflow-hidden rounded-full border-4 border-white shadow-lg ring-2 ring-slate-100 transition-all duration-500 group-hover:ring-(--ui-primary)/30 group-hover:shadow-xl">
                                        {member.avatarUrl ? (
                                          <img
                                            src={
                                              member.avatarUrl
                                            }
                                            alt={
                                              member.name
                                            }
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                          />
                                        ) : (
                                          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-300">
                                            <FiUsers className="text-4xl" />
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* NAME */}
                                    <h3 className="text-lg font-black tracking-tight text-slate-950 sm:text-xl">
                                      {member.name}
                                    </h3>

                                    {/* ROLE */}
                                    <p className="mt-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-(--ui-primary)">
                                      {member.role}
                                    </p>

                                    {/* BIO / BRANCH */}
                                    {member.branches &&
                                      member.branches.length > 0 && (
                                      <p className="mt-4 text-[13px] leading-relaxed text-slate-500 line-clamp-2">
                                        Dedicated team member at the {member.branches[0].branch.name} office, contributing expertise and innovation.
                                      </p>
                                    )}

                                    {/* SOCIAL ICONS */}
                                    <div className="mt-6 flex items-center justify-center gap-3">
                                      {member.email && (
                                        <a
                                          href={`mailto:${member.email}`}
                                          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-all duration-300 hover:bg-(--ui-primary) hover:text-white hover:shadow-md"
                                          aria-label="Email"
                                        >
                                          <FiMail size={16} />
                                        </a>
                                      )}

                                      {member.linkedinUrl && (
                                        <a
                                          href={member.linkedinUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-all duration-300 hover:bg-(--ui-primary) hover:text-white hover:shadow-md"
                                          aria-label="LinkedIn"
                                        >
                                          <FiLinkedin size={16} />
                                        </a>
                                      )}

                                      <a
                                        href="#"
                                        className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-all duration-300 hover:bg-(--ui-primary) hover:text-white hover:shadow-md"
                                        aria-label="More info"
                                      >
                                        <FiChevronRight size={16} />
                                      </a>
                                    </div>
                                  </div>
                                </motion.div>
                              )
                            )}
                          </div>
                        </div>
                      )
                    }
                  )
                })()
              ) : (
                <div className="rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50 py-20 text-center">

                  <p className="text-lg font-semibold text-slate-500">
                    No team members found.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          5. GET IN TOUCH SECTION (Dynamic)
      ===================================================== */}

      <section className="py-24 bg-white overflow-hidden border-t border-slate-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left: Illustration Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10">
                <img 
                  src={resolveImageUrl(contactImage)} 
                  alt="Contact Illustration" 
                  className="w-full h-auto max-w-[650px] mx-auto drop-shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-red-600" />
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
                    {contactBadge}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-[44px] font-black text-slate-900 tracking-tight leading-[1.2] mb-12">
                   {contactTitle}
                </h2>

                <div className="space-y-10">
                  {/* Address */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-xl text-[#ef4444]">
                       <FiGlobe />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">Address</h4>
                      <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                        {contacts.find(c => c.type === 'ADDRESS')?.value || 'Sector 17, Chandigarh, India'}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-xl text-[#ef4444]">
                       <FiTarget />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">Phone</h4>
                      <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                        {contacts.filter(c => c.type === 'PHONE').map(c => c.value).join(', ') || '+91 98765 43210'}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-xl text-[#ef4444]">
                       <FiMail />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">E-mail</h4>
                      <p className="text-slate-500 font-medium leading-relaxed max-w-sm lowercase">
                        {contacts.find(c => c.type === 'EMAIL')?.value || 'info@i-bacus.com'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  )
}
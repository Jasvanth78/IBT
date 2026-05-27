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
} from 'react-icons/fi'

import {
  apiClient,
  type PublicMember,
  type PublicBranch,
  type PublicStat,
} from '@/src/api/client'

export default function AboutPage() {
  const [members, setMembers] = useState<PublicMember[]>([])
  const [branches, setBranches] = useState<PublicBranch[]>([])
  const [stats, setStats] = useState<PublicStat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /* =========================================================
     FETCH DATA
  ========================================================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null)
        const [teamData, branchData, statsData] =
          await Promise.all([
            apiClient.getTeam(1, 100),
            apiClient.getBranches(1, 10),
            apiClient.getStats(1, 4),
          ])

        setMembers(teamData.items)
        setBranches(branchData.items)
        setStats(statsData.items)
      } catch (err) {
        console.error('Error fetching about data:', err)
        setError('Unable to load data at this time.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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
          MISSION & VISION
      ===================================================== */}

      <section className="overflow-hidden bg-slate-950 py-20 text-white sm:py-24">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-20 lg:grid-cols-2">

            {/* LEFT */}
            <div className="space-y-14">

              {/* MISSION */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--ui-primary)">
                  <FiTarget className="text-2xl text-white" />
                </div>

                <h2 className="text-3xl font-black sm:text-4xl">
                  Our Mission
                </h2>

                <p className="mt-5 text-[15px] leading-[32px] text-slate-400 sm:text-lg">
                  To provide cutting-edge technology
                  solutions that empower organizations
                  to achieve their full potential in the
                  digital age.
                </p>
              </motion.div>

              {/* VISION */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--ui-primary)">
                  <FiGlobe className="text-2xl text-white" />
                </div>

                <h2 className="text-3xl font-black sm:text-4xl">
                  Our Vision
                </h2>

                <p className="mt-5 text-[15px] leading-[32px] text-slate-400 sm:text-lg">
                  To be a global leader in digital
                  transformation recognized for our
                  engineering excellence.
                </p>
              </motion.div>
            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-4 lg:pt-10">
                <div className="aspect-[1.5/1] rounded-[30px] border border-slate-800 bg-slate-900 p-6 sm:aspect-square">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="text-4xl font-black text-(--ui-primary) sm:text-5xl">
                      50+
                    </div>

                    <div className="mt-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                      Active Projects
                    </div>
                  </div>
                </div>

                <div className="relative aspect-video overflow-hidden rounded-[30px] bg-(--ui-primary) p-6">
                  <FiAward className="absolute right-6 top-6 text-6xl text-white/10" />

                  <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                    <div className="text-3xl font-black text-white sm:text-4xl">
                      Quality
                    </div>

                    <div className="mt-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
                      Certified
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">

                <div className="aspect-video rounded-[30px] bg-white/5 p-6 backdrop-blur-sm">

                  <div className="flex h-full flex-col items-center justify-center text-center">

                    <div className="text-3xl font-black text-white sm:text-4xl">
                      24/7
                    </div>

                    <div className="mt-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                      Support
                    </div>
                  </div>
                </div>

                <div className="aspect-square rounded-[30px] border border-slate-800 bg-slate-900 p-6">

                  <div className="flex h-full flex-col items-center justify-center text-center">

                    <div className="text-4xl font-black text-white sm:text-5xl">
                      100%
                    </div>

                    <div className="mt-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                      Security
                    </div>
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
            <span className="inline-flex rounded-full bg-slate-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-(--ui-primary)">
              Our Experts
            </span>

            <h2 className="mx-auto mt-6 text-center text-[32px] font-black tracking-[-1px] text-slate-950 sm:text-[52px] sm:tracking-[-2px] lg:text-[68px]">
              The Collective
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-[28px] border border-slate-100 bg-white"
                >

                  <div className="aspect-[4/5] bg-slate-100" />

                  <div className="p-6">

                    <div className="h-5 w-32 rounded-full bg-slate-100" />

                    <div className="mt-4 h-4 w-24 rounded-full bg-slate-100" />
                  </div>
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

                          {/* BRANCH */}
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

                          {/* GRID */}
                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

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
                                  <div className="overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.10)]">

                                    {/* IMAGE */}
                                    <div className="relative overflow-hidden">

                                      <div className="aspect-[4/5] overflow-hidden bg-slate-100">

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
                                          <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-400">

                                            <FiUsers className="text-5xl" />
                                          </div>
                                        )}
                                      </div>

                                      {/* OVERLAY */}
                                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                                      {/* SOCIALS */}
                                      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 translate-y-10 items-center gap-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                        {member.linkedinUrl && (
                                          <a
                                            href={member.linkedinUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-(--ui-primary) hover:text-white"
                                          >
                                            <FiLinkedin />
                                          </a>
                                        )}

                                        <a
                                          href={`mailto:${member.email}`}
                                          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-(--ui-primary) hover:text-white"
                                        >
                                          <FiMail />
                                        </a>
                                      </div>

                                      {/* BADGE */}
                                      <div className="absolute left-4 top-4">
                                        <span className="rounded-full bg-white/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-(--ui-primary) backdrop-blur">
                                          Team Member
                                        </span>
                                      </div>
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-6 sm:p-7">
                                      <h3 className="line-clamp-1 text-[24px] font-black tracking-[-1px] text-slate-950 sm:text-[28px]">
                                        {member.name}
                                      </h3>

                                      <p className="mt-3 line-clamp-2 text-[11px] font-black uppercase tracking-[0.28em] text-(--ui-primary)">
                                        {member.role}
                                      </p>

                                      {member.branches &&
                                        member.branches
                                          .length >
                                          0 && (
                                          <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">

                                            <FiGlobe className="text-[14px]" />

                                            <span>
                                              {
                                                member
                                                  .branches[0]
                                                  .branch
                                                  .name
                                              }
                                            </span>
                                          </div>
                                        )}

                                   
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
    </div>
  )
}
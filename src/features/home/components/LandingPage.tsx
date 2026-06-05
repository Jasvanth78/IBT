'use client';

import { motion } from 'framer-motion';
import { FiArrowRight, FiStar, FiSend, FiUsers, FiAward, FiPlayCircle, FiSearch, FiBell, FiMenu, FiActivity } from 'react-icons/fi';
import { SiteButton } from '@/src/shared/ui';
import { HomeSections } from './HomeSections';

export function LandingPage() {
  return (
    <div className="relative flex flex-col bg-white text-slate-900 pb-0 overflow-hidden font-sans">

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-16 lg:pb-28 overflow-visible bg-slate-50/50">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-blue-50/50 blur-3xl" />
          <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-50/50 blur-3xl" />
          {/* Subtle dot grid pattern on right */}
          <div className="absolute top-10 right-10 w-48 h-48 opacity-20 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] hidden lg:block" />
        </div>

        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 max-w-xl"
            >
              <h1 className="text-[44px] sm:text-[54px] md:text-[60px] font-extrabold leading-[1.1] text-[#0f172a] tracking-tight mb-6">
                Grow Your Business <br />
                with <span className="text-[#e63946]">AI & Digital Solutions</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 mb-8 max-w-[480px] leading-relaxed">
                We build powerful digital products, AI solutions, and career development programs that help businesses grow and students build successful careers.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <SiteButton
                  href="/contact"
                  className="bg-[#e63946] hover:bg-[#c1121f] text-white rounded-full px-7 py-3.5 font-bold text-sm transition-all shadow-lg shadow-red-500/10 flex items-center gap-1.5"
                >
                  Get Free Consultation
                </SiteButton>
                <SiteButton
                  href="/portfolio"
                  variant="secondary"
                  className="border-2 border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-full px-7 py-3.5 font-bold text-sm transition-all flex items-center gap-2"
                >
                  View Our Work
                </SiteButton>
              </div>

              {/* Stats badges under buttons */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-12">
                {/* Badge 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                    <FiStar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base font-black text-[#0f172a] leading-none mb-0.5">100+</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clients</div>
                  </div>
                </div>
                {/* Badge 2 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                    <FiSend className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base font-black text-[#0f172a] leading-none mb-0.5">500+</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Projects</div>
                  </div>
                </div>
                {/* Badge 3 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                    <FiUsers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base font-black text-[#0f172a] leading-none mb-0.5">50+</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Interns Trained</div>
                  </div>
                </div>
                {/* Badge 4 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                    <FiAward className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base font-black text-[#0f172a] leading-none mb-0.5">10+</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Years Experience</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Laptop + Mobile Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 relative w-full flex items-center justify-center py-6"
            >
              {/* Green Plant */}
              <div className="absolute bottom-[20px] left-[10px] z-20 hidden md:flex flex-col items-center pointer-events-none">
                {/* Leaves */}
                <div className="relative w-24 h-24">
                  <div className="absolute bottom-4 left-4 w-5 h-12 bg-emerald-500 rounded-full origin-bottom rotate-[-35deg] opacity-90 shadow-sm" />
                  <div className="absolute bottom-5 left-8 w-5 h-14 bg-emerald-600 rounded-full origin-bottom rotate-[-10deg] opacity-95 shadow-sm" />
                  <div className="absolute bottom-6 left-12 w-5 h-14 bg-emerald-500 rounded-full origin-bottom rotate-[10deg] opacity-95 shadow-sm" />
                  <div className="absolute bottom-4 left-15 w-5 h-12 bg-emerald-600 rounded-full origin-bottom rotate-[35deg] opacity-90 shadow-sm" />
                </div>
                {/* Pot */}
                <div className="w-10 h-11 bg-white rounded-b-lg border-t-2 border-slate-100 shadow-[0_4px_10px_rgba(0,0,0,0.05)]" />
              </div>

              {/* Laptop Frame */}
              <div className="relative w-full max-w-[520px] aspect-[16/10] bg-[#0c1329] rounded-2xl shadow-[0_30px_60px_-15px_rgba(15,23,42,0.15)] border-[8px] border-slate-800 overflow-hidden flex shrink-0">
                {/* Sidebar */}
                <div className="w-10 border-r border-slate-800 bg-[#0b1227] flex flex-col items-center py-3 gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white font-bold">C</div>
                  <div className="w-5 h-5 rounded-md bg-slate-800/50 flex items-center justify-center text-slate-500"><FiMenu size={10} /></div>
                  <div className="w-5 h-5 rounded-md bg-slate-800/50 flex items-center justify-center text-slate-500"><FiActivity size={10} /></div>
                  <div className="w-5 h-5 rounded-md bg-slate-800/50 flex items-center justify-center text-slate-500"><FiUsers size={10} /></div>
                </div>
                {/* Main Screen Content */}
                <div className="flex-1 flex flex-col">
                  {/* Navbar */}
                  <div className="h-8 border-b border-slate-800 px-3 flex items-center justify-between bg-[#0b1227]/40">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/80" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                      <span className="w-2 h-2 rounded-full bg-green-500/80" />
                    </div>
                    <div className="w-28 h-5 rounded-full bg-[#131b34] flex items-center px-2 gap-1 text-[8px] text-slate-500">
                      <FiSearch size={8} />
                      <span>Search</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiBell className="text-slate-500" size={10} />
                      <div className="w-4.5 h-4.5 rounded-full bg-slate-700" />
                    </div>
                  </div>

                  {/* Dashboard Grid */}
                  <div className="flex-1 p-3 space-y-2.5 overflow-hidden">
                    {/* Top Metrics Cards */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-[#131a35] p-2 rounded-lg border border-slate-800/50">
                        <div className="text-[7px] text-slate-500 uppercase font-bold leading-none">Total Users</div>
                        <div className="text-[11px] font-black text-white mt-0.5">12,645</div>
                        <div className="text-[6px] text-emerald-400 font-bold mt-0.5 flex items-center gap-0.5">▲ 12.5%</div>
                      </div>
                      <div className="bg-[#131a35] p-2 rounded-lg border border-slate-800/50">
                        <div className="text-[7px] text-slate-500 uppercase font-bold leading-none">Revenue</div>
                        <div className="text-[11px] font-black text-white mt-0.5">₹68,945</div>
                        <div className="text-[6px] text-emerald-400 font-bold mt-0.5 flex items-center gap-0.5">▲ 6.2%</div>
                      </div>
                      <div className="bg-[#131a35] p-2 rounded-lg border border-slate-800/50">
                        <div className="text-[7px] text-slate-500 uppercase font-bold leading-none">Projects</div>
                        <div className="text-[11px] font-black text-white mt-0.5">78</div>
                        <div className="text-[6px] text-purple-400 font-bold mt-0.5 flex items-center gap-0.5">▲ 16.0%</div>
                      </div>
                    </div>

                    {/* Middle Charts */}
                    <div className="grid grid-cols-5 gap-2">
                      {/* Performance */}
                      <div className="col-span-3 bg-[#131a35] p-2.5 rounded-lg border border-slate-800/50 flex flex-col justify-between">
                        <span className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">Performance</span>
                        <div className="w-full h-12 relative mt-1">
                          <svg className="w-full h-full text-blue-500 stroke-current fill-none" viewBox="0 0 100 40">
                            <path d="M0,35 Q15,10 30,25 T60,5 T90,30 L100,10" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                      {/* Top Services */}
                      <div className="col-span-2 bg-[#131a35] p-2.5 rounded-lg border border-slate-800/50 flex flex-col justify-between">
                        <span className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">Top Services</span>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-8 h-8 rounded-full border-[5px] border-slate-800 border-t-blue-500 border-r-emerald-500 border-b-purple-500 shrink-0" />
                          <div className="space-y-[1px]">
                            <div className="flex items-center gap-0.5"><span className="w-1 h-1 rounded-full bg-blue-500" /><span className="text-[5px] text-slate-400 scale-[0.9] origin-left">Web Dev</span></div>
                            <div className="flex items-center gap-0.5"><span className="w-1 h-1 rounded-full bg-emerald-500" /><span className="text-[5px] text-slate-400 scale-[0.9] origin-left">AI Sol.</span></div>
                            <div className="flex items-center gap-0.5"><span className="w-1 h-1 rounded-full bg-purple-500" /><span className="text-[5px] text-slate-400 scale-[0.9] origin-left">Mobile</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smartphone Mockup */}
              <div className="absolute -bottom-4 -right-2 w-32 aspect-[9/19] bg-white rounded-[20px] shadow-[0_20px_40px_rgba(15,23,42,0.1)] border-[4px] border-slate-100 p-2 overflow-hidden flex flex-col gap-1.5 z-10 hidden sm:flex">
                <div className="w-10 h-3 bg-black rounded-full mx-auto -mt-2.5 shrink-0" />
                <div className="text-[7px] font-extrabold text-[#0f172a] leading-none mt-1">Dashboard</div>

                {/* Circle Progress */}
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-1.5 flex flex-col items-center justify-center gap-0.5">
                  <div className="w-12 h-12 rounded-full border-[4px] border-slate-200 border-t-blue-500 flex items-center justify-center text-[8px] font-black text-slate-800 bg-white">
                    78%
                  </div>
                  <div className="text-[6px] font-bold text-slate-400 text-center leading-none">Monthly Progress</div>
                </div>

                {/* Activity List */}
                <div className="flex-1 bg-white border border-slate-100 rounded-md p-1 space-y-1">
                  <div className="w-full h-1 bg-slate-100 rounded" />
                  <div className="w-4/5 h-1 bg-slate-100 rounded" />
                  <div className="w-3/5 h-1 bg-slate-100 rounded" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="relative z-20 mt-[-30px] mb-20 mx-auto max-w-[1100px] w-full px-4">
        <HomeSections isFloating={true} />
      </div>

      {/* <SolutionsSection />
      
      <WhyChooseUsSection />

      <RecentWorkSection />
      
      <HowWeWorkSection />

      <StatsDarkSection />

      <PartnersClientsSection />

      <TestimonialsSection />

      <CTASection />
       */}
    </div>
  );
}

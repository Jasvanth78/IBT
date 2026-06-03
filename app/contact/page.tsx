'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiSend,
  FiCheckCircle,
  FiBookOpen,
  FiUsers,
  FiMessageSquare,
  FiArrowRight,
} from 'react-icons/fi';
import { apiClient, PublicBranch } from '@/src/api/client';
import { useSocketSettings } from '@/src/providers/SocketSettingsProvider';
import { Loader } from '@/src/shared/ui/Loader';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [branches, setBranches] = useState<PublicBranch[]>([]);
  const { settings, loading: settingsLoading } = useSocketSettings();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const branchRes = await apiClient.getBranches(1, 10);
        setBranches(branchRes.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || settingsLoading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-white">
        <Loader size="lg" label="Establishing Secure Line..." />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F8FAFC] pt-24 pb-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Contact Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          <div className="grid lg:grid-cols-2">
            
            {/* Left Column: Visual & Header */}
            <div className="p-10 lg:p-20 border-r border-slate-50 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-(--ui-primary) mb-6 block">
                  {settings?.contactGlobalPresenceBadge || 'GET IN TOUCH'}
                </span>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] mb-8">
                  {settings?.contactHeroTitle ? (
                    <span dangerouslySetInnerHTML={{ __html: settings.contactHeroTitle.replace(/\n/g, '<br />') }} />
                  ) : (
                    <>Clinical <br /> Excellence <br /> in <span className="text-(--ui-primary)">Tech.</span></>
                  )}
                </h1>
                <div 
                  className="text-sm text-slate-500 max-w-md font-medium leading-relaxed mb-12"
                  dangerouslySetInnerHTML={{ 
                    __html: (settings?.contactHeroDescription && settings.contactHeroDescription.replace(/<p><\/p>/g, '').trim()) 
                      ? settings.contactHeroDescription 
                      : 'Experience the precision of high-end corporate services. Reach out today for clinical-grade technology solutions and partnerships.' 
                  }}
                />
              </div>

              <div className="relative mt-auto">
                <div className="aspect-square w-full max-w-[400px] mx-auto overflow-hidden rounded-3xl">
                  <img 
                    src="https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800" 
                    alt="Abstract Tech" 
                    className="w-full h-full object-cover grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                  />
                  {/* Decorative Abstract overlay matching the screenshot's red/white spiral style */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-64 h-64 bg-gradient-to-tr from-(--ui-primary) to-white rounded-full opacity-10 blur-3xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Information & Form */}
            <div className="p-10 lg:p-20 bg-slate-50/30">
              
              {/* Category Grid (Support Pipelines) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 mb-20">
                {[
                  { title: settings?.contactSupportItem1Title || "Sales", desc: settings?.contactSupportItem1Desc || "Inquiries about our premium service tiers.", icon: FiSend },
                  { title: settings?.contactSupportItem2Title || "Support", desc: settings?.contactSupportItem2Desc || "24/7 technical clinical assistance.", icon: FiUsers },
                  { title: settings?.contactSupportItem3Title || "Partners", desc: settings?.contactSupportItem3Desc || "Collaborate on IBT Labs innovation.", icon: FiMessageSquare },
                  { title: "Internships", desc: "Begin your journey in professional tech.", icon: FiBookOpen },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="text-(--ui-primary)">
                      <item.icon size={20} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                    <div 
                      className="text-[11px] text-slate-400 font-bold leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    />
                  </div>
                ))}
              </div>

              {/* Form Section */}
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Send a Message</h2>
                
                {!formSubmitted ? (
                  <form 
                    onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">FULL NAME</label>
                        <input 
                          required
                          type="text" 
                          placeholder="John Doe"
                          className="w-full h-14 bg-white border border-slate-200 rounded-xl px-6 text-sm font-bold focus:outline-none focus:border-(--ui-primary) transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">EMAIL ADDRESS</label>
                        <input 
                          required
                          type="email" 
                          placeholder="john@techservices.com"
                          className="w-full h-14 bg-white border border-slate-200 rounded-xl px-6 text-sm font-bold focus:outline-none focus:border-(--ui-primary) transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">INQUIRY TYPE</label>
                      <select className="w-full h-14 bg-white border border-slate-200 rounded-xl px-6 text-sm font-bold appearance-none cursor-pointer focus:outline-none focus:border-(--ui-primary) transition-all">
                        <option>General Inquiry</option>
                        <option>Partnership</option>
                        <option>Internship</option>
                        <option>Support</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">MESSAGE</label>
                      <textarea 
                        required
                        rows={5}
                        placeholder="How can our clinical excellence assist you?"
                        className="w-full bg-white border border-slate-200 rounded-2xl p-6 text-sm font-bold focus:outline-none focus:border-(--ui-primary) transition-all resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full h-16 bg-(--ui-primary) text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-(--ui-primary)/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                    >
                      DISPATCH INQUIRY <FiArrowRight className="mb-0.5" />
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="h-16 w-16 bg-red-50 text-(--ui-primary) rounded-full flex items-center justify-center mx-auto mb-6">
                      <FiCheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Transmission Successful</h3>
                    <p className="text-slate-500 text-[11px] font-bold mb-8">We will respond within 24 operational hours.</p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="text-[10px] font-black uppercase tracking-widest text-(--ui-primary) hover:underline"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Global Hubs Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {loading ? (
            // Loading Skeletons
            [...Array(3)].map((_, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[1.5rem] border border-slate-100 shadow-sm animate-pulse">
                <div className="h-2 w-24 bg-slate-100 rounded mb-4" />
                <div className="h-3 w-48 bg-slate-50 rounded" />
              </div>
            ))
          ) : branches.length > 0 ? (
            branches.map((branch, idx) => (
              <motion.div 
                key={branch.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="bg-white p-8 rounded-[1.5rem] border border-slate-100 shadow-sm h-full"
              >
                <h4 className="text-[10px] font-black text-(--ui-primary) uppercase tracking-widest mb-4">
                  {branch.name}
                </h4>
                <p className="text-xs text-slate-500 font-bold leading-relaxed mb-6">
                  {branch.address || branch.location || 'Location details pending.'}
                </p>
                {branch.mapUrl && (
                  <a 
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] font-black text-(--ui-primary) uppercase tracking-widest hover:gap-3 transition-all"
                  >
                    View on Maps <FiArrowRight size={12} />
                  </a>
                )}
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white rounded-[1.5rem] border border-dashed border-slate-200">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No active branches found</p>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        {settings?.contactFaqTitle && (
          <div className="mt-32 max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">{settings.contactFaqTitle}</h2>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">{settings.contactFaqDescription}</p>
            </div>
            <div className="space-y-4">
              {[
                { q: settings.contactFaq1Question, a: settings.contactFaq1Answer },
                { q: settings.contactFaq2Question, a: settings.contactFaq2Answer },
                { q: settings.contactFaq3Question, a: settings.contactFaq3Answer },
              ].filter(item => item.q && item.a).map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
                >
                  <h3 className="text-lg font-black text-slate-900 mb-3">{item.q}</h3>
                  <div 
                    className="text-sm text-slate-500 font-medium leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.a || '' }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

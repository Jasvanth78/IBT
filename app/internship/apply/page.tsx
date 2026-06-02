'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FiArrowLeft, 
  FiMail, 
  FiPhone, 
  FiUser, 
  FiCheckCircle, 
  FiLoader, 
  FiSend,
  FiCode,
  FiBriefcase,
  FiFileText,
  FiStar,
  FiUploadCloud
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/src/components/Input';
import { Textarea } from '@/src/components/Textarea';
import { ActionButton } from '@/src/components/ActionButton';
import { Toast } from '@/src/components/Toast';

export default function InternshipApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Details, 2: OTP
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    about: '',
    skills: '',
    jobType: '',
    applicationType: 'INTERNSHIP',
    otp: ''
  });
  const [resume, setResume] = useState<File | null>(null);

  const [toast, setToast] = useState({
    open: false,
    message: '',
    variant: 'success' as 'success' | 'error'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      showToast('File size should be less than 5MB', 'error');
      return;
    }
    setResume(file);
  };

  const showToast = (message: string, variant: 'success' | 'error' = 'success') => {
    setToast({ open: true, message, variant });
  };

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.jobType || !resume) {
      showToast('Please fill in all details and upload your resume', 'error');
      return;
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 12) {
      showToast('Phone number must be between 10 and 12 digits', 'error');
      return;
    }

    const wordCount = formData.about.trim().split(/\s+/).length;
    if (wordCount < 20) {
      showToast(`Cover letter must be at least 20 words (currently ${wordCount})`, 'error');
      return;
    }



    setOtpLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/internship/v1/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to send OTP');

      showToast('OTP sent to your email');
      setStep(2);
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.otp) {
      showToast('Please enter the OTP', 'error');
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });
      if (resume) {
        payload.append('resume', resume);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/internship/v1/submit/internship`, {
        method: 'POST',
        body: payload,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Verification failed');

      showToast('Application submitted successfully!');
      setTimeout(() => {
        router.push('/internship');
      }, 2000);
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[var(--ui-primary)]/10 to-transparent -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[var(--ui-primary)]/5 blur-3xl -z-10" />
      <div className="absolute top-40 -left-40 w-72 h-72 rounded-full bg-blue-400/5 blur-3xl -z-10" />

      <Toast 
        open={toast.open} 
        message={toast.message} 
        variant={toast.variant} 
        onClose={() => setToast(prev => ({ ...prev, open: false }))} 
      />
      
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <button 
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-[var(--ui-primary)] uppercase tracking-widest bg-white/50 backdrop-blur px-4 py-2 rounded-full shadow-sm border border-slate-100"
        >
          <FiArrowLeft /> Back to Internship
        </button>

        <div className="overflow-hidden rounded-[2rem] sm:rounded-[3rem] border border-white bg-white/80 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row">
          
          {/* Left Side - Information Panel */}
          <div className="bg-[var(--ui-primary)] lg:w-2/5 p-10 lg:p-14 text-white relative overflow-hidden flex flex-col justify-between">
            {/* Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-8">
                <FiStar className="text-white h-8 w-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-6">
                Start Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                  Career Journey
                </span>
              </h1>
              <p className="text-white/80 font-medium text-lg leading-relaxed max-w-sm">
                Join our innovative team at IBT. We're looking for passionate individuals ready to make an impact.
              </p>
            </div>

            <div className="relative z-10 mt-12 space-y-6">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <FiBriefcase className="text-white h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Real-world Projects</h4>
                  <p className="text-xs text-white/70 mt-1">Work on things that matter.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <FiCode className="text-white h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Mentorship</h4>
                  <p className="text-xs text-white/70 mt-1">Learn from industry experts.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form Panel */}
          <div className="lg:w-3/5 p-8 sm:p-12 lg:p-14 relative bg-white">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form 
                  key="step1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleRequestOTP} 
                  className="space-y-6"
                >
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Application Form</h2>
                    <p className="text-slate-500 text-sm mt-1">Fill in the details below to submit your application.</p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Input
                      label="Full Name"
                      name="name"
                      placeholder="e.g. John Doe"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      startIcon={<FiUser className="text-slate-400" />}
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      startIcon={<FiMail className="text-slate-400" />}
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      startIcon={<FiPhone className="text-slate-400" />}
                    />
                    <div className="grid gap-1.5">
                      <span className="text-sm font-semibold text-slate-700">Applying For</span>
                      <div className="relative">
                        <select
                          name="applicationType"
                          required
                          value={formData.applicationType}
                          onChange={handleInputChange}
                          className="flex h-12 w-full appearance-none items-center rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm font-medium text-slate-900 outline-none transition-all hover:border-slate-300 focus:border-[var(--ui-primary)] focus:bg-white focus:ring-4 focus:ring-[var(--ui-primary)]/10"
                        >
                          <option value="INTERNSHIP">Internship</option>
                          <option value="JOB">Full-time Job</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="grid gap-1.5">
                      <span className="text-sm font-semibold text-slate-700">Role / Interest</span>
                      <div className="relative">
                        <select
                          name="jobType"
                          required
                          value={formData.jobType}
                          onChange={handleInputChange}
                          className="flex h-12 w-full appearance-none items-center rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm font-medium text-slate-900 outline-none transition-all hover:border-slate-300 focus:border-[var(--ui-primary)] focus:bg-white focus:ring-4 focus:ring-[var(--ui-primary)]/10"
                        >
                          <option value="">Select Option</option>
                          <option value="Full Stack Development">Full Stack Development</option>
                          <option value="Frontend Development">Frontend Development</option>
                          <option value="Backend Development">Backend Development</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Cyber Security">Cyber Security</option>
                          <option value="Mobile App Development">Mobile App Development</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                    <Input
                      label="Key Technical Skills"
                      name="skills"
                      placeholder="React, Node.js, UI Design..."
                      required
                      value={formData.skills}
                      onChange={handleInputChange}
                      startIcon={<FiCode className="text-slate-400" />}
                    />
                  </div>

                  <Textarea
                    label="Cover Letter / About You"
                    name="about"
                    placeholder="Briefly tell us why you'd be a great fit for this role..."
                    required
                    rows={3}
                    value={formData.about}
                    onChange={handleInputChange}
                  />

                  <div className="grid gap-1.5">
                    <span className="text-sm font-semibold text-slate-700">Resume Upload</span>
                    <div 
                      className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
                        dragActive ? 'border-[var(--ui-primary)] bg-[var(--ui-primary)]/5' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                      onDragEnter={() => setDragActive(true)}
                      onDragLeave={() => setDragActive(false)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label 
                        htmlFor="resume-upload"
                        className="cursor-pointer flex flex-col items-center w-full"
                      >
                        <div className={`flex h-14 w-14 items-center justify-center rounded-full shadow-sm mb-4 transition-colors ${
                          resume ? 'bg-green-100 text-green-600' : 'bg-white text-[var(--ui-primary)]'
                        }`}>
                          {resume ? <FiCheckCircle size={24} /> : <FiUploadCloud size={24} />}
                        </div>
                        <span className="text-sm font-bold text-slate-900 mb-1">
                          {resume ? resume.name : 'Click to upload or drag and drop'}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {resume ? `${(resume.size / 1024 / 1024).toFixed(2)} MB • Ready to submit` : 'PDF, DOCX up to 5MB'}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <ActionButton
                      type="submit"
                      className="w-full h-14 rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-[var(--ui-primary)]/20 transition-all hover:-translate-y-1"
                      loading={otpLoading}
                      leftIcon={<FiSend className="h-5 w-5" />}
                    >
                      Verify & Submit Application
                    </ActionButton>
                  </div>
                </motion.form>
              ) : (
                <motion.form 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit} 
                  className="flex flex-col items-center justify-center h-full min-h-[500px] text-center"
                >
                  <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--ui-primary)]/10 text-[var(--ui-primary)]">
                    <FiMail size={40} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Check your inbox</h2>
                  <p className="mt-4 text-slate-500 font-medium max-w-sm">
                    We've sent a 6-digit verification code to <br />
                    <span className="font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-md mt-1 inline-block">{formData.email}</span>
                  </p>

                  <div className="w-full max-w-[320px] mt-10 mb-8">
                    <input
                      name="otp"
                      type="text"
                      placeholder="• • • • • •"
                      required
                      maxLength={6}
                      autoFocus
                      className="w-full text-center text-4xl tracking-[0.5em] font-black h-20 rounded-2xl bg-white border-2 border-slate-200 text-slate-800 shadow-sm outline-none transition-all focus:border-[var(--ui-primary)] focus:ring-4 focus:ring-[var(--ui-primary)]/10"
                      value={formData.otp}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setFormData(prev => ({ ...prev, otp: val }));
                      }}
                    />
                  </div>

                  <div className="w-full max-w-[280px] space-y-4">
                    <ActionButton
                      type="submit"
                      className="w-full h-14 rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-[var(--ui-primary)]/20"
                      loading={loading}
                      leftIcon={<FiCheckCircle className="h-5 w-5" />}
                    >
                      Confirm OTP
                    </ActionButton>
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm font-bold text-slate-400 hover:text-slate-800 transition py-2 w-full"
                    >
                      Use a different email
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

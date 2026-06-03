'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { apiClient, type PublicBranch } from '@/src/api/client'

type InquiryType = 'Partnership' | 'Internship' | 'IBT Labs' | 'General'

type ContactFormClientProps = {
  initialSettings: any
  initialBranches: PublicBranch[]
}

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  message: string
}

export function ContactFormClient({ initialSettings, initialBranches }: ContactFormClientProps) {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [inquiryType, setInquiryType] = useState<InquiryType>('IBT Labs')
  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields before submitting.')
      return
    }

    setLoading(true)

    try {
      await apiClient.submitContactForm({
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        company: formData.company.trim() || undefined,
        subject: inquiryType,
        message: formData.message.trim(),
      })

      setFormSubmitted(true)
      setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', message: '' })
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setErrorMessage('Unable to send your message right now. Please try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <span className="inline-block bg-blue-50 text-blue-600 font-semibold text-xs rounded-full px-3 py-1 mb-3">
        Inquiry Form
      </span>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">Send a Message</h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8">
        Fill out the form below and our team will get back to you within 24 hours.
      </p>

      {!formSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {errorMessage ? (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">First Name</label>
              <input
                required
                value={formData.firstName}
                onChange={handleChange('firstName')}
                type="text"
                placeholder="John"
                className="w-full h-12 bg-white border border-slate-200 rounded-lg px-4 text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Last Name</label>
              <input
                required
                value={formData.lastName}
                onChange={handleChange('lastName')}
                type="text"
                placeholder="Doe"
                className="w-full h-12 bg-white border border-slate-200 rounded-lg px-4 text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Work Email</label>
            <input
              required
              value={formData.email}
              onChange={handleChange('email')}
              type="email"
              placeholder="john@company.com"
              className="w-full h-12 bg-white border border-slate-200 rounded-lg px-4 text-sm focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Phone (Optional)</label>
              <input
                value={formData.phone}
                onChange={handleChange('phone')}
                type="tel"
                placeholder="+123 456 7890"
                className="w-full h-12 bg-white border border-slate-200 rounded-lg px-4 text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Company (Optional)</label>
              <input
                value={formData.company}
                onChange={handleChange('company')}
                type="text"
                placeholder="Company name"
                className="w-full h-12 bg-white border border-slate-200 rounded-lg px-4 text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">Inquiry Type</label>
            <div className="flex flex-wrap gap-2">
              {(['Partnership', 'Internship', 'IBT Labs', 'General'] as InquiryType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setInquiryType(type)}
                  className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-full border transition-all ${
                    inquiryType === type
                      ? 'bg-black border-black text-white'
                      : 'bg-[#f1f5f9] border-[#e2e8f0] text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Message</label>
            <textarea
              required
              value={formData.message}
              onChange={handleChange('message')}
              rows={4}
              placeholder="How can we help you?"
              className="w-full bg-white border border-slate-200 rounded-lg p-4 text-sm focus:outline-none focus:border-black transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-black text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Submit Inquiry'}
          </button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-6"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent Successfully!</h3>
          <p className="text-slate-500 text-sm mb-6">Thank you for getting in touch. We will respond shortly.</p>
          <button
            onClick={() => setFormSubmitted(false)}
            className="text-xs font-bold text-black underline hover:text-slate-700"
          >
            Send another inquiry
          </button>
        </motion.div>
      )}
    </div>
  )
}

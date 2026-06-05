'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { apiClient, type PublicContact } from '@/src/api/client';
import { resolveImageUrl } from '@/src/utils/image';

const footerLinks = [
  {
    title: 'Company',
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about' },
      { label: 'Careers', href: '/internship' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Services',
    items: [
      { label: 'Web Development', href: '/services' },
      { label: 'Mobile App Development', href: '/services' },
      { label: 'AI Solutions', href: '/services' },
      { label: 'ERP Systems', href: '/services' },
      { label: 'Training & Courses', href: '/services' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'IBT Labs', href: '/ibt-labs' },
      { label: 'FAQ', href: '/contact' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  PHONE: FiPhone,
  EMAIL: FiMail,
  ADDRESS: FiMapPin,
};

const hrefMap: Record<string, (value: string) => string | undefined> = {
  PHONE: (value: string) => `tel:+91${value}`,
  EMAIL: (value: string) => `mailto:${value}`,
  ADDRESS: () => undefined,
};

const labelMap: Record<string, string> = {
  PHONE: 'Phone',
  EMAIL: 'Email',
  ADDRESS: 'Address',
};

export function SiteFooter() {
  const [contacts, setContacts] = useState<PublicContact[]>([]);
  const [socials, setSocials] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [contactResult, socialResult] = await Promise.all([
          apiClient.getContacts(1, 10),
          apiClient.getSocialLinks(1, 10),
        ]);

        setContacts(
          (contactResult.items || [])
            .sort((a: PublicContact, b: PublicContact) => (a.order || 0) - (b.order || 0))
        );

        setSocials(
          (socialResult.items || [])
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
        );
      } catch (error) {
        console.warn('Failed to load footer data:', error);
      }
    };

    loadData();
  }, []);

  const getSocialIcon = (platform: string) => {
    const name = (platform || '').toLowerCase();
    if (name.includes('facebook')) return FaFacebookF;
    if (name.includes('linkedin')) return FaLinkedinIn;
    if (name.includes('youtube')) return FaYoutube;
    if (name.includes('instagram')) return FaInstagram;
    return FaLinkedinIn;
  };

  return (
    <footer className="bg-[#0f172a] text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">

          {/* Logo + Description + Social (col-span-2) */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="IBACUS TECH SOLUTION"
                width={180}
                height={50}
                className="h-12 w-auto object-contain !bg-white px-2 py-1 rounded"
                priority
              />
            </Link>

            <p className="mt-5 text-sm leading-relaxed !text-white max-w-xs">
              Empowering careers through technology. We build cutting-edge products, AI solutions and career programs that create real impact.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {socials.length > 0 ? (
                socials.map((s) => {
                  const Icon = getSocialIcon(s.platform);
                  return (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 !text-white transition-all duration-300 hover:bg-red-500 hover:text-white"
                    >
                      <Icon className="text-sm" />
                    </a>
                  );
                })
              ) : (
                <>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-white"><FaInstagram className="text-sm" /></span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-white"><FaFacebookF className="text-sm" /></span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-white"><FaLinkedinIn className="text-sm" /></span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-white"><FaYoutube className="text-sm" /></span>
                </>
              )}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-md font-bold !text-red-500 mb-5 uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm !text-white hover:text-red-500 transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Us Column */}
          <div>
            <h4 className="text-md font-bold !text-red-500 mb-5 uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contacts.map((contact) => {
                const Icon = iconMap[contact.type];
                const href = hrefMap[contact.type]?.(contact.value);

                if (!Icon) return null;

                const content = (
                  <div className="flex items-start gap-3">
                    <Icon className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                    <span className="text-sm !text-white leading-relaxed break-words">
                      {contact.value}
                    </span>
                  </div>
                );

                return (
                  <li key={contact.id}>
                    {href ? (
                      <a href={href} className="group hover:text-white transition-colors duration-200">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}

              {/* Fallback if no contacts loaded */}
              {contacts.length === 0 && (
                <>
                  <li className="flex items-start gap-3">
                    <FiPhone className="h-4 w-4 !text-red-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-white">+91 9043045780</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FiMail className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-white">ibacustech@gmail.com</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FiMapPin className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-white">Salem, Tamil Nadu, India</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs !text-white">
            © {new Date().getFullYear()} IBACUS TECH SOLUTION. All rights reserved.
          </p>
          <p className="text-xs !text-white">
            Made with <span className="text-red-500">I-BACUS TECH TEAM</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
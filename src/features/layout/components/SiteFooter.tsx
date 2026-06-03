'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram, FaArrowUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { apiClient, type PublicContact } from '@/src/api/client';

const links = [
  {
    title: 'Product',
    items: [
      { label: 'Services', href: '/services' },
      { label: 'IBT Labs', href: '/ibt-labs' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '#' },
      { label: 'Careers', href: '/internship' },
    ],
  },
  // {
  //   title: 'Legal',
  //   items: [
  //     { label: 'Privacy', href: '#' },
  //     { label: 'Terms', href: '#' },
  //     { label: 'Sitemap', href: '#' },
  //   ],
  // },
];

const iconMap = {
  PHONE: FiPhone,
  EMAIL: FiMail,
  ADDRESS: FiMapPin,
};

const labelMap = {
  PHONE: 'Phone',
  EMAIL: 'Email',
  ADDRESS: 'Address',
};

const socialLinks = [
  { label: 'Twitter', href: 'https://twitter.com/ibacus_tech' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/ibacus-tech/' },
  { label: 'GitHub', href: 'https://github.com/ibacus-tech' },
];


const hrefMap = {
  PHONE: (value: string) => `tel:+91${value}`,
  EMAIL: (value: string) => `mailto:${value}`,
  ADDRESS: () => undefined,
};

export function SiteFooter() {
  const [contacts, setContacts] = useState<PublicContact[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [contactResult, socialResult] = await Promise.all([
          apiClient.getContacts(1, 3),
          apiClient.getSocialLinks(1, 10),
        ]);

        setContacts(
          (contactResult.items || [])
            .sort((a: PublicContact, b: PublicContact) => (a.order || 0) - (b.order || 0))
            .slice(0, 3)
        );

        setSocials(
          (socialResult.items || [])
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
        );
      } catch (error) {
        console.warn('Failed to load footer data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleBackToTop = () => {
    try {
      const selector = 'main, [data-first-section], section';
      const first = document.querySelector<HTMLElement>(selector);

      if (first) {
        first.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-(--ui-border) bg-(--ui-surface) text-(--ui-text)">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              <Image src="/logo.png" alt="IBT" width={180} height={50} className="h-16 w-auto" priority />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-(--ui-muted) leading-7">
              We are educators who kindle your passion and inspiration. We aim to help you achieve your dream.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {loading ? (
                <p className="text-xs text-(--ui-muted)">Loading...</p>
              ) : socials && socials.length > 0 ? (
                socials.map((s) => {
                  const Icon = (() => {
                    const name = (s.platform || '').toString().toLowerCase();
                    if (name.includes('facebook')) return FaFacebookF;
                    if (name.includes('linkedin')) return FaLinkedinIn;
                    if (name.includes('youtube')) return FaYoutube;
                    if (name.includes('instagram')) return FaInstagram;
                    if (name.includes('twitter')) return FaFacebookF; // fallback to simple icon
                    return FaLinkedinIn;
                  })();

                  return (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="flex h-8 w-8 items-center justify-center rounded text-(--ui-primary) bg-transparent hover:bg-(--ui-primary-soft)"
                    >
                      {s.logoUrl ? (
                        <img src={s.logoUrl} alt={s.platform} className="h-full w-full object-cover" />
                      ) : (
                        <Icon />
                      )}
                    </a>
                  );
                })
              ) : (
                <>
                  <FaFacebookF className="h-6 w-6 text-(--ui-muted)" />
                  <FaLinkedinIn className="h-6 w-6 text-(--ui-muted)" />
                  <FaYoutube className="h-6 w-6 text-(--ui-muted)" />
                </>
              )}
            </div>
          </div>

          {links.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-(--ui-text) mb-4">{section.title === 'Product' ? 'Explore' : 'Quick links'}</h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-(--ui-muted) hover:text-(--ui-primary) transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-lg font-semibold text-(--ui-text) mb-4">Contacts</h3>
            <div className="space-y-4">
              {loading ? (
                <p className="text-xs text-(--ui-muted)">Loading...</p>
              ) : contacts.length > 0 ? (
                contacts.map((contact) => {
                  const Icon = iconMap[contact.type as keyof typeof iconMap];
                  const href = hrefMap[contact.type as keyof typeof hrefMap](contact.value);

                  return (
                    <div key={contact.id} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                        <Icon className="h-5 w-5 text-(--ui-primary)" />
                      </div>
                      <div className="text-sm pt-2.5">
                        {href ? (
                          <a href={href} className="text-(--ui-text) hover:text-(--ui-primary) transition-colors">
                            {contact.value}
                          </a>
                        ) : (
                          <span className="text-(--ui-text)">{contact.value}</span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-(--ui-muted)">Contact info unavailable</p>
              )}
            </div>
          </div>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-0 right-0 -top-6 pointer-events-none">
            <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-12 text-(--ui-surface-muted)">
              <path d="M0,30 C150,80 350,0 600,30 C850,60 1050,10 1200,40 L1200,0 L0,0 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 bg-(--ui-surface-muted) py-4">
            <p className="text-sm text-(--ui-muted)">Copyright © {new Date().getFullYear()}I-BACUS TECH SOLUTION. All rights reserved.</p>
          </div>
        </div>

        {/* Back-to-top button moved to WhatsappButton for unified floating controls */}
      </div>
    </footer>
  );
}
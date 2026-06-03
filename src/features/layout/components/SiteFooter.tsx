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
    <Image
      src="/logo.png"
      alt="IBT"
      width={180}
      height={50}
      className="h-16 w-auto"
      priority
    />
  </Link>

  <div className="mt-6">
    <h3 className="text-xl font-semibold text-(--ui-text)">
      Empowering Careers Through Technology
    </h3>

    <p className="mt-3 max-w-md text-sm leading-7 text-(--ui-muted)">
      We provide industry-focused training, internships, and
      career development programs that help students and
      professionals build practical skills and achieve their goals.
    </p>
  </div>

  <div className="mt-8 flex items-center gap-4">
    {loading ? (
      <p className="text-xs text-(--ui-muted)">Loading...</p>
    ) : socials?.length > 0 ? (
      socials.map((s) => {
        const Icon = (() => {
          const name = (s.platform || "").toLowerCase();

          if (name.includes("facebook")) return FaFacebookF;
          if (name.includes("linkedin")) return FaLinkedinIn;
          if (name.includes("youtube")) return FaYoutube;
          if (name.includes("instagram")) return FaInstagram;

          return FaLinkedinIn;
        })();

        return (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.platform}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-(--ui-primary) transition-all duration-300 hover:border-(--ui-primary) hover:bg-(--ui-primary) hover:text-white"
          >
            {s.logoUrl ? (
              <img
                src={s.logoUrl}
                alt={s.platform}
                className="h-7 w-7 object-cover"
              />
            ) : (
              <Icon className="text-base" />
            )}
          </a>
        );
      })
    ) : (
      <>
        <FaFacebookF className="h-5 w-5 text-(--ui-muted)" />
        <FaLinkedinIn className="h-5 w-5 text-(--ui-muted)" />
        <FaYoutube className="h-5 w-5 text-(--ui-muted)" />
      </>
    )}
  </div>
</div>
          {links.map((section) => (
  <div key={section.title}>
    <div className="flex items-center gap-2 mb-5">
      <div className="w-1.5 h-6 bg-(--ui-primary) rounded-full"></div>
      <h3 className="text-xl font-bold text-(--ui-text)">
        {section.title === "Product" ? "Explore" : "Quick Links"}
      </h3>
    </div>

    <ul className="space-y-3">
      {section.items.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className="group flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-white hover:bg-(--ui-primary)/5 hover:border-(--ui-primary)/20 transition-all duration-300"
          >
            <span className="text-sm font-medium text-(--ui-muted) group-hover:text-(--ui-primary)">
              {item.label}
            </span>

            <svg
              className="w-4 h-4 text-(--ui-primary) opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  </div>
))}
    <div>
  <h3 className="text-2xl font-bold text-(--ui-text) mb-6 relative inline-block">
    Contact Us
    <span className="absolute -bottom-2 left-0 w-16 h-1 bg-(--ui-primary) rounded-full"></span>
  </h3>

  <div className="space-y-5 mt-3">
    {contacts.map((contact) => {
      const Icon = iconMap[contact.type];
      const href = hrefMap[contact.type]?.(contact.value);

      return (
        <div
          key={contact.id}
          className="flex items-start gap-3"
        >
          {/* Icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--ui-primary)/10">
            <Icon className="h-4 w-4 text-(--ui-primary)" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase tracking-[4px] text-(--ui-muted) ">
              {contact.type}
            </p>

            {href ? (
              <a
                href={href}
                className="text-sm text-(--ui-text) hover:text-(--ui-primary) transition-colors whitespace-nowrap"
              >
                {contact.value}
              </a>
            ) : (
              <span className="text-sm text-(--ui-text) whitespace-nowrap">
                {contact.value}
              </span>
            )}
          </div>
        </div>
      );
    })}
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
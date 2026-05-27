'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  apiClient,
  type PublicClient,
  type PublicPartner,
} from '@/src/api/client';
import { Loader } from '@/src/shared/ui';
import { motion } from 'framer-motion';

function MarqueeCard({
  item,
}: {
  item: { id: string; name: string; logoUrl?: string | null; website?: string | null };
}) {
  const content = (
    <div className="group flex h-24 w-44 shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-(--ui-border) bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-(--ui-primary-soft) hover:shadow-lg hover:shadow-(--ui-primary)/5">
      <div className="flex h-full w-full items-center justify-center">
        {item.logoUrl ? (
          <img
            src={item.logoUrl}
            alt={item.name}
            className="max-h-14 max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <span className="text-center text-sm font-bold text-(--ui-neutral) transition-colors duration-300 group-hover:text-(--ui-primary) line-clamp-2">
            {item.name}
          </span>
        )}
      </div>
    </div>
  );

  if (item.website) {
    return (
      <a
        href={item.website}
        target="_blank"
        rel="noopener noreferrer"
        className="block shrink-0 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary) focus-visible:ring-offset-2"
      >
        {content}
      </a>
    );
  }

  return <div className="shrink-0">{content}</div>;
}

function InfiniteMarquee({ 
  items, 
  direction = 'left', 
  speed = 5
}: { 
  items: any[]; 
  direction?: 'left' | 'right';
  speed?: number;
}) {
  if (!items || items.length === 0) return null;

  // Duplicate items to ensure smooth infinite scrolling.
  // We use 4 sets of items if there are very few, to ensure it fills the screen width.
  const multipliedItems = items.length < 8 
    ? [...items, ...items, ...items, ...items] 
    : [...items, ...items];

  return (
    <div className="relative flex w-full overflow-hidden py-4">
      <motion.div
        className="flex w-max gap-4 pr-4 sm:gap-6 sm:pr-6"
        animate={{
          x: direction === 'left' ? [0, '-50%'] : ['-50%', 0],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
        // Pause animation on hover for better user experience
        whileHover={{ animationPlayState: 'paused' }}
      >
        {multipliedItems.map((item, i) => (
          <MarqueeCard key={`${item.id}-${i}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export function PartnersClientsSection() {
  const [partners, setPartners] = useState<PublicPartner[]>([]);
  const [partnersLoading, setPartnersLoading] = useState(true);
  const [partnersError, setPartnersError] = useState<string | null>(null);

  const [clients, setClients] = useState<PublicClient[]>([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [clientsError, setClientsError] = useState<string | null>(null);

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    async function loadData() {
      try {
        // Fetch a large limit to populate the marquee without pagination buttons
        const [partnersResult, clientsResult] = await Promise.all([
          apiClient.getPartners(1, 50),
          apiClient.getClients(1, 50)
        ]);
        
        setPartners(partnersResult.items ?? []);
        setClients(clientsResult.items ?? []);
      } catch (err) {
        setPartnersError(err instanceof Error ? err.message : 'Failed to load network data');
        setClientsError(err instanceof Error ? err.message : 'Failed to load network data');
      } finally {
        setPartnersLoading(false);
        setClientsLoading(false);
      }
    }

    void loadData();
  }, []);

  const hasPartners = useMemo(() => partners.length > 0, [partners]);
  const hasClients = useMemo(() => clients.length > 0, [clients]);

  // If there's absolutely no data and we're not loading, hide section
  if (!partnersLoading && !clientsLoading && !hasPartners && !hasClients) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Subtle Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center rounded-full bg-(--ui-primary-soft) px-4 py-1.5 shadow-sm"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-(--ui-primary)">
              Our Network
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-3xl font-extrabold tracking-tight text-(--ui-text) sm:text-4xl"
          >
            Partners & Clients
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-(--ui-muted)"
          >
            Collaborating with brilliant minds and outstanding organizations to build a better future.
          </motion.p>
        </div>

        {/* Marquees Contained in Viewport/Container */}
        <div className="flex flex-col gap-12 w-full overflow-hidden">
          
          {/* Partners Marquee */}
          <div className="flex flex-col w-full">
            <div className="mb-4 text-center">
              <h3 className="text-xl font-bold text-(--ui-text) opacity-90">Strategic Partners</h3>
            </div>
            
            {partnersLoading ? (
              <div className="flex h-24 items-center justify-center">
                <Loader size="sm" label="Loading partners..." />
              </div>
            ) : partnersError ? (
              <div className="text-(--ui-primary) text-center">{partnersError}</div>
            ) : hasPartners ? (
              <InfiniteMarquee items={partners} direction="left" speed={40} />
            ) : null}
          </div>

          {/* Clients Marquee */}
          <div className="flex flex-col w-full">
            <div className="mb-4 text-center">
              <h3 className="text-xl font-bold text-(--ui-text) opacity-90">Trusted Clients</h3>
            </div>
            
            {clientsLoading ? (
              <div className="flex h-24 items-center justify-center">
                <Loader size="sm" label="Loading clients..." />
              </div>
            ) : clientsError ? (
              <div className="text-(--ui-primary) text-center">{clientsError}</div>
            ) : hasClients ? (
              <InfiniteMarquee items={clients} direction="right" speed={10} />
            ) : null}
          </div>

        </div>
      </div>
    </section>
  );
}
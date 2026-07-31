'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CollectionItem {
  id: number;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  paddingTop: number;
}

interface FeaturedCollectionsProps {
  data: CollectionItem[];
}

export default function FeaturedCollections({ data }: FeaturedCollectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = containerRef.current?.querySelectorAll('.coll-panel');
      panels?.forEach((panel) => {
        gsap.fromTo(
          panel,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collections"
      style={{ backgroundColor: '#0e100f', padding: '80px 48px' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }} ref={containerRef}>
        <span style={{ fontSize: 14, color: 'rgba(255,252,225,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 48, display: 'block' }}>
          &#123; Featured Collections &#125;
        </span>

        {/* Asymmetric grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 40, alignItems: 'start' }}>
          {data.map((col) => (
            <div
              key={col.id}
              className="coll-panel"
              style={{ paddingTop: col.paddingTop, display: 'flex', flexDirection: 'column', gap: 24 }}
            >
              <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: 8, overflow: 'hidden', backgroundColor: '#191919' }}>
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  style={{ objectFit: 'cover', filter: 'brightness(0.88)' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                <div>
                  <h3 style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', color: '#fffce1', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 6 }}>{col.title}</h3>
                  <p style={{ fontSize: 14, color: '#7c7c6f', maxWidth: 280 }}>{col.subtitle}</p>
                </div>
                <Link href={col.href} className="btn-ghost-pill" style={{ fontSize: 13, padding: '10px 22px', flexShrink: 0 }}>
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 1, backgroundColor: '#42433d', marginTop: 80 }} />
      </div>
    </section>
  );
}

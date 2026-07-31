'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StoryBlock {
  eyebrow: string;
  title: string;
  body: string;
}

interface FabricStoryProps {
  data: {
    bgImage: string;
    blocks: StoryBlock[];
  };
}

export default function FabricStory({ data }: FabricStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the left image column on desktop only
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 8%',
          end: 'bottom bottom',
          pin: leftRef.current,
          pinSpacing: false,
        });
      });

      // Reveal each story block
      rightRef.current?.querySelectorAll('.story-block').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 78%',
              once: true,
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="fabric" style={{ backgroundColor: '#0e100f', padding: '80px 48px', minHeight: '150vh' }}>
      <div
        ref={containerRef}
        style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}
      >
        {/* Pinned Left Image */}
        <div
          ref={leftRef}
          style={{ position: 'relative', width: '100%', borderRadius: 8, overflow: 'hidden', backgroundColor: '#191919', aspectRatio: '3/4' }}
        >
          <Image
            src={data.bgImage || '/images/IMG-20250221-WA0004-scaled.jpg'}
            alt="Tactile Fabric Details"
            fill
            style={{ objectFit: 'cover', filter: 'brightness(0.92)' }}
            sizes="50vw"
          />
        </div>

        {/* Scrollable Right Content */}
        <div ref={rightRef} style={{ display: 'flex', flexDirection: 'column', gap: 80, paddingTop: 80 }}>
          {data.blocks.map((block, i) => (
            <div key={i} className="story-block">
              <span style={{ fontSize: 14, color: 'rgba(255,252,225,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>
                {block.eyebrow}
              </span>
              <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', color: '#fffce1', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: 20 }}>
                {block.title}
              </h2>
              <p style={{ fontSize: 17, color: '#7c7c6f', lineHeight: 1.7 }}>{block.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: '80px auto 0', height: 1, backgroundColor: '#42433d' }} />
    </section>
  );
}

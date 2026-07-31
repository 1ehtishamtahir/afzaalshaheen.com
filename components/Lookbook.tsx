'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LookbookItem {
  id: number;
  src: string;
  alt: string;
  tall: boolean;
}

interface LookbookProps {
  data: LookbookItem[];
}

export default function Lookbook({ data }: LookbookProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      containerRef.current?.querySelectorAll('.lb-item').forEach((item) => {
        const img = item.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.1 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            }
          );
        }
        // Fade in
        gsap.fromTo(
          item,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const left = data.filter((_, i) => i % 2 === 0);
  const right = data.filter((_, i) => i % 2 !== 0);

  return (
    <section id="lookbook" style={{ backgroundColor: '#0e100f', padding: '80px 48px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }} ref={containerRef}>
        <span style={{ fontSize: 14, color: 'rgba(255,252,225,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 48 }}>
          &#123; Lookbook &#125;
        </span>

        {/* Offset masonry grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {left.map((img) => (
              <div key={img.id} className="lb-item" style={{ position: 'relative', aspectRatio: img.tall ? '3/4' : '4/3', borderRadius: 8, overflow: 'hidden', backgroundColor: '#191919' }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: 'cover', filter: 'brightness(0.88)', transformOrigin: 'center' }}
                  sizes="(max-width: 1280px) 50vw, 600px"
                />
              </div>
            ))}
          </div>
          {/* Right column shifted down */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 80 }}>
            {right.map((img) => (
              <div key={img.id} className="lb-item" style={{ position: 'relative', aspectRatio: img.tall ? '3/4' : '4/3', borderRadius: 8, overflow: 'hidden', backgroundColor: '#191919' }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: 'cover', filter: 'brightness(0.88)', transformOrigin: 'center' }}
                  sizes="(max-width: 1280px) 50vw, 600px"
                />
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: '#42433d', marginTop: 80 }} />
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BrandStatementProps {
  data: {
    eyebrow: string;
    text: string;
  };
}

export default function BrandStatement({ data }: BrandStatementProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0.05, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position: 'relative',
        backgroundColor: '#0e100f',
        padding: '100px 48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 1280, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ fontSize: 14, color: 'rgba(255,252,225,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 32 }}>
          {data.eyebrow}
        </span>
        <div
          ref={textRef}
          className="marquee-container"
          style={{ maxWidth: 1280 }}
        >
          <div className="marquee-track">
            <span
              className="marquee-item"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(24px, 3.4vw, 44px)',
                color: '#fffce1',
                fontWeight: 400,
                lineHeight: 1.35,
                letterSpacing: '-0.01em',
              }}
            >
              {data.text}
            </span>
            <span
              className="marquee-item"
              aria-hidden="true"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(24px, 3.4vw, 44px)',
                color: '#fffce1',
                fontWeight: 400,
                lineHeight: 1.35,
                letterSpacing: '-0.01em',
              }}
            >
              {data.text}
            </span>
          </div>
        </div>
        <div style={{ height: 1, backgroundColor: '#42433d', width: '100%', marginTop: 80 }} />
      </div>
    </section>
  );
}

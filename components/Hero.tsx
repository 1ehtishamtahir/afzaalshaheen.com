'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  data: {
    eyebrow: string;
    line1: string;
    line2: string;
    subheading: string;
    ctaText: string;
    bgImage: string;
  };
}

export default function Hero({ data }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on background image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Hero entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(eyebrowRef.current, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.8 });

      const lines = titleRef.current?.querySelectorAll('.hero-line');
      if (lines && lines.length > 0) {
        tl.fromTo(
          lines,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12 },
          '-=0.4'
        );
      }

      tl.fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5');
      tl.fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 600,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0e100f',
      }}
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        style={{
          position: 'absolute',
          inset: 0,
          top: '-15%',
          height: '130%',
          zIndex: 0,
        }}
      >
        <Image
          src={data.bgImage || '/images/IMG-20250221-WA0006-scaled.jpg'}
          alt="Premium Menswear Editorial"
          fill
          style={{ objectFit: 'cover', filter: 'brightness(0.42) contrast(1.08)' }}
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        background: 'linear-gradient(to top, #0e100f, transparent)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Hero Content */}
      <div style={{
        maxWidth: 1440,
        margin: '0 auto',
        padding: '0 48px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
        paddingTop: 80,
      }}>
        {/* Eyebrow */}
        <span
          ref={eyebrowRef}
          style={{
            fontSize: 14,
            color: 'rgba(255,252,225,0.6)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 24,
            display: 'block',
          }}
        >
          {data.eyebrow}
        </span>

        {/* Title */}
        <h1
          ref={titleRef}
          style={{
            fontSize: 'clamp(72px, 12vw, 180px)',
            lineHeight: 0.92,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: '#fffce1',
            marginBottom: 32,
            textTransform: 'uppercase',
            overflow: 'visible',
          }}
        >
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.05em' }}>
            <span className="hero-line" style={{ display: 'block' }}>{data.line1}</span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.05em' }}>
            <span className="hero-line" style={{ display: 'block' }}>{data.line2}</span>
          </span>
        </h1>

        {/* Subheading */}
        <p
          ref={subRef}
          style={{ fontSize: 16, color: 'rgba(255,252,225,0.55)', maxWidth: 420, lineHeight: 1.6, marginBottom: 40 }}
        >
          {data.subheading}
        </p>

        {/* CTA */}
        <a ref={ctaRef} href="#collections" className="btn-gradient-pill" style={{ fontSize: 15, padding: '14px 36px' }}>
          {data.ctaText}
        </a>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface NewsletterProps {
  data: {
    eyebrow: string;
    title: string;
    body: string;
  };
}

export default function Newsletter({ data }: NewsletterProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!btnRef.current) return;
    // Gentle idle breathing animation on the gold gradient CTA
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(btnRef.current, { scale: 1.03, duration: 2, ease: 'sine.inOut' });
    tl.to(btnRef.current, { scale: 1, duration: 2, ease: 'sine.inOut' });
    return () => { tl.kill(); };
  }, []);

  return (
    <section
      style={{
        backgroundColor: '#0e100f',
        padding: '100px 48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 560, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ fontSize: 14, color: 'rgba(255,252,225,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>
          {data.eyebrow}
        </span>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', color: '#fffce1', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: 16 }}>
          {data.title}
        </h2>
        <p style={{ fontSize: 16, color: '#7c7c6f', lineHeight: 1.7, marginBottom: 40 }}>
          {data.body}
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: 'flex', gap: 12, width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <input
            type="email"
            placeholder="Your email address"
            required
            style={{
              flex: '1 1 240px',
              padding: '14px 22px',
              borderRadius: 100,
              border: '1px solid #42433d',
              backgroundColor: '#191919',
              color: '#fffce1',
              fontSize: 14,
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#fffce1'; }}
            onBlur={(e) => { e.target.style.borderColor = '#42433d'; }}
          />
          <button
            ref={btnRef}
            type="submit"
            className="btn-gradient-pill"
            style={{ fontSize: 14, padding: '14px 30px' }}
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
